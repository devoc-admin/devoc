import { Resend } from "resend";

import ContactConfirmation from "@/emails/ContactConfirmation";
import ContactMessage from "@/emails/ContactMessage";
import NewOrderNotification from "@/emails/NewOrderNotification";
import NewsletterSubscription from "@/emails/NewsletterSubscription";
import type { OrderItem } from "@/emails/OrderConfirmation";
import OrderConfirmation from "@/emails/OrderConfirmation";
import OrderReadyForPickup from "@/emails/OrderReadyForPickup";
import OrderShipped from "@/emails/OrderShipped";
import OrderStatusUpdate from "@/emails/OrderStatusUpdate";
import Welcome from "@/emails/Welcome";

const FROM = "Saveurs d'Aude <contact@saveurs-aude.fr>";
const ADMIN_EMAIL = "internal.devoc@gmail.com";
const NEWSLETTER_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? "");
  }
  return _resend;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

type OrderStatusEmailData = {
  customer: { email: string; firstName: string; lastName: string };
  deliveryMethod: "shipping" | "clickAndCollect";
  orderNumber: string;
  status: string;
  trackingNumber?: string | null;
};

type ContactEmailData = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

type WelcomeEmailData = {
  email: string;
  firstName: string;
};

type NewsletterEmailData = {
  email: string;
};

// ---------------------------------------------------------------------------
// Order emails (checkout flow)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Order status emails
// ---------------------------------------------------------------------------

export async function sendOrderStatusUpdate(data: OrderStatusEmailData) {
  const customerName = `${data.customer.firstName} ${data.customer.lastName}`;
  console.log("[email] Sending status update to:", data.customer.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: OrderStatusUpdate({
      customerName,
      newStatus: data.status,
      orderNumber: data.orderNumber,
    }),
    subject: `Commande ${data.orderNumber} — mise à jour`,
    to: data.customer.email,
  });

  if (result.error) {
    console.error("[email] Resend error (status update):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Status update sent:", result.data?.id);
}

export async function sendOrderShipped(data: OrderStatusEmailData) {
  const customerName = `${data.customer.firstName} ${data.customer.lastName}`;
  console.log("[email] Sending shipped notification to:", data.customer.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: OrderShipped({
      customerName,
      orderNumber: data.orderNumber,
      trackingNumber: data.trackingNumber ?? "",
    }),
    subject: `Commande ${data.orderNumber} expédiée`,
    to: data.customer.email,
  });

  if (result.error) {
    console.error("[email] Resend error (shipped):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Shipped notification sent:", result.data?.id);
}

export async function sendOrderReadyForPickup(data: OrderStatusEmailData) {
  const customerName = `${data.customer.firstName} ${data.customer.lastName}`;
  console.log("[email] Sending ready-for-pickup to:", data.customer.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: OrderReadyForPickup({
      customerName,
      orderNumber: data.orderNumber,
    }),
    subject: `Commande ${data.orderNumber} prête à retirer`,
    to: data.customer.email,
  });

  if (result.error) {
    console.error("[email] Resend error (ready for pickup):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Ready-for-pickup sent:", result.data?.id);
}

// ---------------------------------------------------------------------------
// Contact emails
// ---------------------------------------------------------------------------

export async function sendContactMessage(data: ContactEmailData) {
  console.log("[email] Sending contact message to admin");

  const result = await getResend().emails.send({
    from: FROM,
    react: ContactMessage({
      email: data.email,
      message: data.message,
      name: data.name,
      subject: data.subject,
    }),
    subject: `Contact — ${data.subject}`,
    to: ADMIN_EMAIL,
  });

  if (result.error) {
    console.error("[email] Resend error (contact message):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Contact message sent:", result.data?.id);
}

export async function sendContactConfirmation(data: ContactEmailData) {
  console.log("[email] Sending contact confirmation to:", data.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: ContactConfirmation({ name: data.name }),
    subject: "Nous avons bien reçu votre message",
    to: data.email,
  });

  if (result.error) {
    console.error("[email] Resend error (contact confirmation):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Contact confirmation sent:", result.data?.id);
}

// ---------------------------------------------------------------------------
// Welcome email
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  console.log("[email] Sending welcome email to:", data.email);

  const result = await getResend().emails.send({
    from: FROM,
    react: Welcome({ firstName: data.firstName }),
    subject: "Bienvenue chez Saveurs d'Aude",
    to: data.email,
  });

  if (result.error) {
    console.error("[email] Resend error (welcome):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Welcome email sent:", result.data?.id);
}

// ---------------------------------------------------------------------------
// Newsletter email
// ---------------------------------------------------------------------------

export async function sendNewsletterConfirmation(data: NewsletterEmailData) {
  console.log("[email] Sending newsletter confirmation to:", data.email);

  const resend = getResend();

  // Add contact to Resend audience
  const contactResult = await resend.contacts.create({
    audienceId: NEWSLETTER_AUDIENCE_ID,
    email: data.email,
    unsubscribed: false,
  });

  if (contactResult.error) {
    console.error("[email] Resend error (add contact):", contactResult.error);
    throw new Error(contactResult.error.message);
  }

  console.log("[email] Contact added to audience:", contactResult.data?.id);

  // Send confirmation email
  const result = await resend.emails.send({
    from: FROM,
    react: NewsletterSubscription({ email: data.email }),
    subject: "Inscription à la newsletter confirmée",
    to: data.email,
  });

  if (result.error) {
    console.error("[email] Resend error (newsletter):", result.error);
    throw new Error(result.error.message);
  }

  console.log("[email] Newsletter confirmation sent:", result.data?.id);
}

export type {
  ContactEmailData,
  NewsletterEmailData,
  OrderEmailData,
  OrderStatusEmailData,
  WelcomeEmailData,
};
