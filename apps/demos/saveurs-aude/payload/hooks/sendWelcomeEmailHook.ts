import type { CollectionAfterChangeHook } from "payload";
import { sendWelcomeEmail } from "@/lib/email";

export const sendWelcomeEmailHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation !== "create") return doc;

  const email = doc.email as string | undefined;
  const firstName = doc.firstName as string | undefined;

  if (!email) return doc;

  try {
    await sendWelcomeEmail({ email, firstName: firstName ?? "" });
  } catch (error) {
    console.error("[hook] Failed to send welcome email:", error);
  }

  return doc;
};
