/** biome-ignore-all lint/correctness/noChildrenProp: tanstack form requires this pattern */
"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircleIcon, SendIcon, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { type ContactFormData, sendContactEmail } from "@/actions/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// 🎨 Classes CSS
const labelClass = cn("text-base", "xs:text-lg");

const inputClass = cn(
  "text-base!",
  "bg-zinc-950 text-primary-foreground sm:text-lg!"
);

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
} | null;

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

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
  return (
    <form
      className="@container grid grid-cols-2 gap-x-4 gap-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* 🧑 Nom */}
      <form.Field
        children={(field) => (
          <div className={cn("col-span-2", "@md:col-span-1")}>
            <Label className={labelClass} htmlFor={field.name}>
              Nom *
            </Label>
            <Input
              autoComplete="on"
              className={cn("col-span-1", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nom"
              type="text"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="name"
      />

      {/* 📧 Email */}
      <form.Field
        children={(field) => (
          <div className={cn("col-span-2", "@md:col-span-1")}>
            <Label className={labelClass} htmlFor={field.name}>
              Email *
            </Label>
            <Input
              autoComplete="on"
              className={cn("col-span-1", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              type="email"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="email"
      />

      {/* 🏢 Entreprise */}
      <form.Field
        children={(field) => (
          <div className="col-span-2">
            <Label className={labelClass} htmlFor={field.name}>
              Organisation
            </Label>
            <Input
              autoComplete="off"
              className={cn("col-span-2", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nom de votre organisation"
              type="text"
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="company"
      />

      {/* 📝 Message */}
      <form.Field
        children={(field) => (
          <div className="col-span-2">
            <Label className={labelClass} htmlFor={field.name}>
              Message *
            </Label>
            <Textarea
              autoComplete="off"
              className={cn("h-36", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Décrivez votre projet, vos besoins, vos objectifs etc."
              value={field.state.value ?? ""}
            />
          </div>
        )}
        name="message"
      />
      {/* ❌ Erreur de validation */}
      <form.Subscribe
        children={(state) =>
          state.errors.length > 0 && (
            <div className="col-span-2 flex items-center gap-2 text-primary">
              <TriangleAlertIcon size={20} />
              <span>{state.errors[0]}</span>
            </div>
          )
        }
        selector={(state) => state}
      />

      {/* ✅/❌ Statut d'envoi */}
      {submitStatus?.type && (
        <div
          className={cn(
            "col-span-2 flex items-center gap-2 rounded-md p-4",
            submitStatus.type === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          )}
        >
          {submitStatus.type === "success" ? (
            <CheckCircleIcon size={20} />
          ) : (
            <TriangleAlertIcon size={20} />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      {/* 🔔 Envoi du message */}
      <Button
        className={cn(
          "col-span-2 cursor-pointer gap-3 rounded-md bg-primary/90 py-6 font-semibold transition-colors hover:bg-primary",
          "text-base",
          "sm:text-lg",
          isSubmitting && "cursor-not-allowed opacity-50"
        )}
        disabled={isSubmitting}
        type="submit"
      >
        <SendIcon size={20} />
        <span>{isSubmitting ? "Envoi en cours..." : "Envoyer le message"}</span>
      </Button>
    </form>
  );
}

export default ContactForm;
