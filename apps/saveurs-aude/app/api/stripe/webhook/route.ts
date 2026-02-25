import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Payload } from "payload";
import type Stripe from "stripe";
import type { OrderEmailData } from "@/lib/email";
import { sendNewOrderNotification, sendOrderConfirmation } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { getStripe } from "@/lib/stripe";

type ItemMeta = {
  pid: number;
  q: number;
  up: number;
  vid: string;
  vl: string;
};

function parseShippingAddress(
  metadata: Record<string, string>,
  deliveryMethod: string
) {
  if (deliveryMethod !== "shipping") return undefined;
  return {
    city: metadata.shippingCity || "",
    country: metadata.shippingCountry || "",
    street: metadata.shippingStreet || "",
    zipCode: metadata.shippingZipCode || "",
  };
}

function parseCustomer(metadata: Record<string, string>) {
  return {
    email: metadata.customerEmail || "",
    firstName: metadata.customerFirstName || "",
    lastName: metadata.customerLastName || "",
    phone: metadata.customerPhone || "",
  };
}

async function updateStock(
  payload: Payload,
  items: ItemMeta[]
): Promise<Map<number, string>> {
  const productNames = new Map<number, string>();
  for (const item of items) {
    const product = await payload.findByID({
      collection: "products",
      id: item.pid,
    });

    productNames.set(item.pid, product.title);

    const updatedVariants = product.variants?.map((v) =>
      v.id === item.vid ? { ...v, stock: Math.max(0, v.stock - item.q) } : v
    );

    await payload.update({
      collection: "products",
      data: { variants: updatedVariants },
      id: item.pid,
    });
  }
  return productNames;
}

async function sendOrderEmails(
  metadata: Record<string, string>,
  items: ItemMeta[],
  productNames: Map<number, string>,
  orderNumber: string,
  deliveryMethod: "shipping" | "clickAndCollect",
  shippingCost: number,
  totalAmount: number
) {
  try {
    const emailData: OrderEmailData = {
      customer: parseCustomer(metadata),
      deliveryMethod,
      items: items.map((item) => ({
        name: productNames.get(item.pid) ?? "Produit",
        price: item.up,
        quantity: item.q,
        variant: item.vl,
      })),
      orderNumber,
      shippingAddress: parseShippingAddress(metadata, deliveryMethod),
      shippingCost,
      totalAmount,
    };

    await Promise.all([
      sendOrderConfirmation(emailData),
      sendNewOrderNotification(emailData),
    ]);
  } catch (err) {
    console.error("Failed to send order emails:", err);
  }
}

async function processCheckoutCompleted(
  session: Stripe.Checkout.Session,
  payload: Payload
) {
  const metadata = session.metadata ?? {};

  const existing = await payload.find({
    collection: "orders",
    limit: 1,
    where: { stripeSessionId: { equals: session.id } },
  });

  if (existing.docs.length > 0) return;

  const items: ItemMeta[] = JSON.parse(metadata.items || "[]");

  const deliveryMethod =
    (metadata.deliveryMethod as "shipping" | "clickAndCollect") || "shipping";
  const shippingCost = Number(metadata.shippingCost) || 0;
  const totalAmount = session.amount_total ?? 0;

  const createdOrder = await payload.create({
    collection: "orders",
    data: {
      customer: parseCustomer(metadata),
      customerAccount: metadata.customerId
        ? Number(metadata.customerId)
        : undefined,
      deliveryMethod,
      items: items.map((item) => ({
        product: item.pid,
        quantity: item.q,
        unitPrice: item.up,
        variantLabel: item.vl,
      })),
      orderNumber: "",
      shippingAddress: parseShippingAddress(metadata, deliveryMethod),
      shippingCost,
      status: "confirmed",
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : "",
      stripeSessionId: session.id,
      totalAmount,
    },
    draft: false,
  });

  const productNames = await updateStock(payload, items);

  await sendOrderEmails(
    metadata,
    items,
    productNames,
    createdOrder.orderNumber,
    deliveryMethod,
    shippingCost,
    totalAmount
  );
}

export async function POST(request: Request) {
  console.log("[webhook] POST /api/stripe/webhook called");

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const payload = await getPayloadClient();
      await processCheckoutCompleted(event.data.object, payload);
    } catch (err) {
      console.error("Error processing webhook:", err);
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
