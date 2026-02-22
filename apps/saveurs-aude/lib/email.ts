import { Resend } from "resend";

import NewOrderNotification from "@/emails/NewOrderNotification";
import type { OrderItem } from "@/emails/OrderConfirmation";
import OrderConfirmation from "@/emails/OrderConfirmation";

const FROM = "Saveurs d'Aude <onboarding@resend.dev>";
const ADMIN_EMAIL = "internal.devoc@gmail.com";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? "");
  }
  return _resend;
}

type OrderEmailData = {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  deliveryMethod: "shipping" | "clickAndCollect";
  items: OrderItem[];
  orderNumber: string;
  shippingAddress?: {
    city: string;
    country: string;
    street: string;
    zipCode: string;
  };
  shippingCost: number;
  totalAmount: number;
};

export async function sendOrderConfirmation(order: OrderEmailData) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("[email] Sending order confirmation to:", order.customer.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: OrderConfirmation({
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      deliveryMethod: order.deliveryMethod,
      items: order.items,
      orderNumber: order.orderNumber,
      shippingAddress: order.shippingAddress,
      shippingCost: order.shippingCost,
      subtotal,
      total: order.totalAmount,
    }),
    subject: `Confirmation de commande ${order.orderNumber}`,
    to: order.customer.email,
  });

  if (result.error) {
    console.error("[email] Resend error (order confirmation):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Order confirmation sent:", result.data?.id);
}

export async function sendNewOrderNotification(order: OrderEmailData) {
  console.log("[email] Sending admin notification to:", ADMIN_EMAIL);

  const result = await getResend().emails.send({
    from: FROM,
    react: NewOrderNotification({
      customerEmail: order.customer.email,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      customerPhone: order.customer.phone,
      deliveryMethod: order.deliveryMethod,
      items: order.items,
      orderNumber: order.orderNumber,
      total: order.totalAmount,
    }),
    subject: `Nouvelle commande ${order.orderNumber}`,
    to: ADMIN_EMAIL,
  });

  if (result.error) {
    console.error("[email] Resend error (admin notification):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Admin notification sent:", result.data?.id);
}

export type { OrderEmailData };
