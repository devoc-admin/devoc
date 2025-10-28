import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const minSubjectLength = 3;
const contactSchema = z.object({
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  subject: z
    .string()
    .min(
      minSubjectLength,
      `Le sujet doit contenir au moins ${minSubjectLength} caractères`
    ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM || "Mairie <no-reply@lasbordes11400.fr>",
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Sujet:</strong> ${validatedData.subject}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: validatedData.email,
      subject: `[Site Web] ${validatedData.subject}`,
      text: `
Nouveau message depuis le formulaire de contact

Nom: ${validatedData.name}
Email: ${validatedData.email}
Sujet: ${validatedData.subject}

Message:
${validatedData.message}
      `,
      to: process.env.CONTACT_EMAIL || "mairie@lasbordes11400.fr",
    });

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { details: error.errors, error: "Données invalides", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message", success: false },
      { status: 500 }
    );
  }
}
