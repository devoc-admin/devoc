"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  company: z.string().optional(),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  name: z.string().min(1, "Le nom est requis"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate the input data
    const validatedData = contactFormSchema.parse(data);

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: `Dev'Oc Contact <${process.env.CONTACT_EMAIL || "contact@dev-oc.fr"}>`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.company ? `<p><strong>Organisation:</strong> ${validatedData.company}</p>` : ""}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
            <p style="margin: 0;">Ce message a été envoyé depuis le formulaire de contact du site Dev'Oc.</p>
            <p style="margin: 5px 0 0 0;">Date: ${new Date().toLocaleString("fr-FR")}</p>
          </div>
        </div>
      `,
      subject: `Nouveau message de contact de ${validatedData.name}`,
      text: `
Nouveau message de contact de ${validatedData.name}

Informations du contact:
- Nom: ${validatedData.name}
- Email: ${validatedData.email}
${validatedData.company ? `- Organisation: ${validatedData.company}` : ""}

Message:
${validatedData.message}

---
Ce message a été envoyé depuis le formulaire de contact du site Dev'Oc.
Date: ${new Date().toLocaleString("fr-FR")}
      `,
      to: [process.env.CONTACT_EMAIL || "contact@dev-oc.fr"],
    });

    if (error) {
      return {
        error:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        success: false,
      };
    }

    return {
      message:
        "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0]?.message || "Données invalides",
        success: false,
      };
    }

    return {
      error: "Une erreur inattendue est survenue. Veuillez réessayer.",
      success: false,
    };
  }
}
