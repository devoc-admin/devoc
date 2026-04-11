import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  type ContactFormData,
  sendContactEmail,
} from "@/app/_actions/send-email";

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
} | null;

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const hasSubmitted = submitStatus?.type === "success";
  const form = useForm({
    defaultValues: {
      company: "",
      email: "",
      message: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitStatus({ message: "", type: null });

      try {
        const result = await sendContactEmail(value as ContactFormData);

        if (result.success) {
          setSubmitStatus({
            message: result.message || "Message envoyé avec succès",
            type: "success",
          });
          form.reset();
        } else {
          setSubmitStatus({
            message: result.error || "Une erreur est survenue",
            type: "error",
          });
        }
      } catch {
        setSubmitStatus({
          message: "Une erreur inattendue est survenue. Veuillez réessayer.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.name) {
          return "Merci de renseigner un nom";
        }

        if (!(value.email.includes("@") && value.email.includes("."))) {
          return "Merci de renseigner un email valide";
        }

        if (!value.message || value.message.length < 10) {
          return "Expliquez nous brièvement votre projet ou vos besoins pour que nous puissions vous aider au mieux 🤝";
        }

        return false;
      },
    },
  });

  return { form, hasSubmitted, isSubmitting, submitStatus };
}
