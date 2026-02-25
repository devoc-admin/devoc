import type { CollectionAfterChangeHook } from "payload";
import type { OrderStatusEmailData } from "@/lib/email";
import {
  sendOrderReadyForPickup,
  sendOrderShipped,
  sendOrderStatusUpdate,
} from "@/lib/email";

export const sendOrderStatusEmail: CollectionAfterChangeHook = async ({
  doc,
  operation,
  previousDoc,
}) => {
  if (operation === "create") return doc;

  const newStatus = doc.status as string | undefined;
  const previousStatus = previousDoc?.status as string | undefined;

  if (!newStatus || newStatus === previousStatus) return doc;
  if (newStatus === "pending") return doc;

  const customer = doc.customer as
    | { email?: string; firstName?: string; lastName?: string }
    | undefined;

  if (!customer?.email) return doc;

  const emailData: OrderStatusEmailData = {
    customer: {
      email: customer.email,
      firstName: customer.firstName ?? "",
      lastName: customer.lastName ?? "",
    },
    deliveryMethod:
      (doc.deliveryMethod as "shipping" | "clickAndCollect") ?? "shipping",
    orderNumber: (doc.orderNumber as string) ?? "",
    status: newStatus,
    trackingNumber: (doc.trackingNumber as string) ?? null,
  };

  try {
    if (newStatus === "shipped") {
      await sendOrderShipped(emailData);
    } else if (
      newStatus === "ready" &&
      emailData.deliveryMethod === "clickAndCollect"
    ) {
      await sendOrderReadyForPickup(emailData);
    } else {
      await sendOrderStatusUpdate(emailData);
    }
  } catch (error) {
    console.error("[hook] Failed to send order status email:", error);
  }

  return doc;
};
