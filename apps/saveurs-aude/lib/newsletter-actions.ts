"use server";

import { z } from "zod/v4";
import type { ActionResult } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import { sendNewsletterConfirmation } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

const newsletterSchema = z.object({
  email: z.email(),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export async function subscribeNewsletter(
  data: NewsletterInput
): Promise<ActionResult> {
  try {
    const parsed = newsletterSchema.parse(data);
    const payload = await getPayloadClient();

    // Check if already subscribed in newsletter-subscribers
    const existing = await payload.find({
      collection: "newsletter-subscribers",
      limit: 1,
      where: { email: { equals: parsed.email } },
    });

    if (existing.docs.length > 0) {
      return { success: true };
    }

    // Check if already a customer with newsletter enabled
    const existingCustomer = await payload.find({
      collection: "customers",
      limit: 1,
      where: {
        and: [
          { email: { equals: parsed.email } },
          { newsletter: { equals: true } },
        ],
      },
    });

    if (existingCustomer.docs.length > 0) {
      return { success: true };
    }

    // Create new subscriber
    await payload.create({
      collection: "newsletter-subscribers",
      data: { email: parsed.email },
    });

    await sendNewsletterConfirmation({ email: parsed.email });

    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}
