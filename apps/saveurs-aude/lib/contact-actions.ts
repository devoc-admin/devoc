"use server";

import { z } from "zod/v4";
import type { ActionResult } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import { sendContactConfirmation, sendContactMessage } from "@/lib/email";

const contactSchema = z.object({
  email: z.email(),
  message: z.string().min(10),
  name: z.string().min(1),
  subject: z.string().min(1),
});

type ContactInput = z.infer<typeof contactSchema>;

export async function submitContactForm(
  data: ContactInput
): Promise<ActionResult> {
  try {
    const parsed = contactSchema.parse(data);

    await Promise.all([
      sendContactMessage(parsed),
      sendContactConfirmation(parsed),
    ]);

    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}
