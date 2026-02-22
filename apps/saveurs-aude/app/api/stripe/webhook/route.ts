import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Payload } from "payload";
import type Stripe from "stripe";
import { getPayloadClient } from "@/lib/payload";
import { getStripe } from "@/lib/stripe";

type ItemMeta = {
  pid: number;
  q: number;
  up: number;
  vid: string;
  vl: string;
};

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

  await payload.create({
    collection: "orders",
    data: {
      customer: {
        email: metadata.customerEmail || "",
        firstName: metadata.customerFirstName || "",
        lastName: metadata.customerLastName || "",
        phone: metadata.customerPhone || "",
      },
      deliveryMethod:
        (metadata.deliveryMethod as "shipping" | "clickAndCollect") ||
        "shipping",
      items: items.map((item) => ({
        product: item.pid,
        quantity: item.q,
        unitPrice: item.up,
        variantLabel: item.vl,
      })),
      orderNumber: "",
      shippingAddress:
        metadata.deliveryMethod === "shipping"
          ? {
              city: metadata.shippingCity || "",
              country: metadata.shippingCountry || "",
              street: metadata.shippingStreet || "",
              zipCode: metadata.shippingZipCode || "",
            }
          : undefined,
      shippingCost: Number(metadata.shippingCost) || 0,
      status: "confirmed",
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : "",
      stripeSessionId: session.id,
      totalAmount: session.amount_total ?? 0,
    },
    draft: false,
  });

  for (const item of items) {
    const product = await payload.findByID({
      collection: "products",
      id: item.pid,
    });

    const updatedVariants = product.variants?.map((v) =>
      v.id === item.vid ? { ...v, stock: Math.max(0, v.stock - item.q) } : v
    );

    await payload.update({
      collection: "products",
      data: { variants: updatedVariants },
      id: item.pid,
    });
  }
}

export async function POST(request: Request) {
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
