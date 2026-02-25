"use server";

import { z } from "zod/v4";
import type { ActionResult } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import { getPayloadClient } from "@/lib/payload";
import { calculateShipping } from "@/lib/shipping";
import { getShippingConfig } from "@/lib/shipping.server";
import { getStripe } from "@/lib/stripe";

const checkoutItemSchema = z.object({
  price: z.number().int().min(1),
  productId: z.number().int(),
  quantity: z.number().int().min(1),
  title: z.string().min(1),
  variantId: z.string().min(1),
  variantLabel: z.string().min(1),
});

const checkoutSchema = z.object({
  customer: z.object({
    email: z.email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(1),
  }),
  customerId: z.number().int().optional(),
  deliveryMethod: z.enum(["shipping", "clickAndCollect"]),
  items: z.array(checkoutItemSchema).min(1),
  locale: z.enum(["fr", "en"]),
  shippingAddress: z
    .object({
      city: z.string().min(1),
      country: z.string().min(1),
      street: z.string().min(1),
      zipCode: z.string().min(1),
    })
    .optional(),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

export async function createCheckoutSession(
  data: CheckoutInput
): Promise<ActionResult<{ url: string }>> {
  try {
    const parsed = checkoutSchema.parse(data);
    const payload = await getPayloadClient();

    // Verify products exist, check prices & stock server-side
    const lineItems: {
      price_data: {
        currency: string;
        product_data: { name: string };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    const verifiedItems: {
      productId: number;
      quantity: number;
      unitPrice: number;
      variantId: string;
      variantLabel: string;
    }[] = [];

    for (const item of parsed.items) {
      const product = await payload.findByID({
        collection: "products",
        id: item.productId,
        locale: parsed.locale,
      });

      const variant = product.variants?.find((v) => v.id === item.variantId);
      if (!variant) {
        return {
          error: `Variante introuvable pour "${product.title}"`,
          success: false,
        };
      }

      if (variant.stock < item.quantity) {
        return {
          error: `Stock insuffisant pour "${product.title} - ${variant.label}" (${variant.stock} disponible(s))`,
          success: false,
        };
      }

      const serverPrice = variant.price;
      const displayName = `${product.title} — ${variant.label}`;

      verifiedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: serverPrice,
        variantId: item.variantId,
        variantLabel: variant.label,
      });

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: displayName },
          unit_amount: serverPrice,
        },
        quantity: item.quantity,
      });
    }

    // Calculate shipping
    const subtotal = verifiedItems.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    const shippingConfig = await getShippingConfig();
    const shippingCost = calculateShipping(
      subtotal,
      parsed.deliveryMethod,
      shippingConfig
    );

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Frais de livraison" },
          unit_amount: shippingCost,
        },
        quantity: 1,
      });
    }

    // Build metadata (Stripe limits: 500 chars per value, 50 keys)
    const metadata: Record<string, string> = {
      customerEmail: parsed.customer.email,
      customerFirstName: parsed.customer.firstName,
      customerLastName: parsed.customer.lastName,
      customerPhone: parsed.customer.phone,
      deliveryMethod: parsed.deliveryMethod,
      items: JSON.stringify(
        verifiedItems.map((i) => ({
          pid: i.productId,
          q: i.quantity,
          up: i.unitPrice,
          vid: i.variantId,
          vl: i.variantLabel,
        }))
      ),
      shippingCost: String(shippingCost),
    };

    if (parsed.customerId) {
      metadata.customerId = String(parsed.customerId);
    }

    if (parsed.deliveryMethod === "shipping" && parsed.shippingAddress) {
      metadata.shippingStreet = parsed.shippingAddress.street;
      metadata.shippingCity = parsed.shippingAddress.city;
      metadata.shippingZipCode = parsed.shippingAddress.zipCode;
      metadata.shippingCountry = parsed.shippingAddress.country;
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const localePath = parsed.locale === "en" ? "/en/checkout" : "/fr/commande";

    const session = await getStripe().checkout.sessions.create({
      cancel_url: `${baseUrl}/${parsed.locale === "en" ? "en/cart" : "fr/panier"}`,
      customer_email: parsed.customer.email,
      line_items: lineItems,
      metadata,
      mode: "payment",
      success_url: `${baseUrl}${localePath}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return { response: { url: session.url ?? "" }, success: true };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}
