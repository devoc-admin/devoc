/** biome-ignore-all lint/correctness/noChildrenProp: tanstack form requires this pattern */
"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircleIcon, SendIcon, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import {
  type ContactFormData,
  sendContactEmail,
} from "@/app/_actions/send-email";
import { Button } from "@/components/ui/custom-button/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// 🎨 Classes CSS
const labelClass = cn("text-base text-white", "xs:text-lg");

const inputClass = cn(
  "text-base!",
  "border-zinc-800",
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
              aria-required="true"
              autoComplete="name"
              className={cn("col-span-1", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Nom"
              required
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
              aria-required="true"
              autoComplete="email"
              className={cn("col-span-1", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              required
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
              aria-required="true"
              autoComplete="off"
              className={cn("h-36", inputClass)}
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Décrivez votre projet, vos besoins, vos objectifs etc."
              required
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
            <div
              aria-atomic="true"
              aria-live="assertive"
              className="col-span-2 flex items-center gap-2 text-primary"
              role="alert"
            >
              <TriangleAlertIcon aria-hidden="true" size={20} />
              <span>{state.errors[0]}</span>
            </div>
          )
        }
        selector={(state) => state}
      />

      {/* ✅/❌ Statut d'envoi */}
      {submitStatus?.type && (
        <div
          aria-atomic="true"
          aria-live="polite"
          className={cn(
            "col-span-2 flex items-center gap-2 rounded-md p-4",
            submitStatus.type === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          )}
          role="alert"
        >
          {submitStatus.type === "success" ? (
            <CheckCircleIcon aria-hidden="true" size={20} />
          ) : (
            <TriangleAlertIcon aria-hidden="true" size={20} />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      {/* 📜 RGPD */}
      <p className="col-span-2 text-xs text-zinc-500">
        En soumettant ce formulaire, vous acceptez que vos données soient
        traitées conformément à notre{" "}
        <a
          className="underline transition-colors hover:text-zinc-300"
          href="/politique-de-confidentialite"
        >
          politique de confidentialité
        </a>
        .
      </p>

      {/* 🔔 Envoi du message */}
      {!(submitStatus?.type && submitStatus.type === "success") && (
        <SendMessage isSubmitting={isSubmitting} />
      )}
    </form>
  );
}

// 🔔
// =============================
function SendMessage({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button
      className={cn("col-span-2 grow font-kanit", "@xs:text-xl text-lg")}
      disabled={isSubmitting}
      type="submit"
    >
      <SendIcon className={cn("size-4", "@xs:size-5", "shrink-0")} />
      <span>{isSubmitting ? "Envoi en cours..." : "Envoyer le message"}</span>
    </Button>
  );
}

export default ContactForm;
