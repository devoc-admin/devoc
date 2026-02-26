"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/newsletter-actions";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);
      setIsSubmitting(true);

      try {
        const result = await subscribeNewsletter(value);

        if (result.success) {
          setSuccess(true);
          form.reset();
        } else {
          setError(t("newsletterError"));
        }
      } catch {
        setError(t("newsletterError"));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (success) {
    return (
      <p className="font-medium text-green-600 text-sm">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        children={(field) => (
          <div className="flex flex-1 flex-col gap-1">
            <input
              className="w-full rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={t("newsletterPlaceholder")}
              type="email"
              value={field.state.value}
            />
            {field.state.meta.isTouched && field.state.meta.errors[0] && (
              <span className="text-destructive text-xs">
                {field.state.meta.errors[0]}
              </span>
            )}
            {error && <span className="text-destructive text-xs">{error}</span>}
          </div>
        )}
        name="email"
        validators={{
          onBlur: ({ value }) => {
            if (!value.trim()) return "Ce champ est requis";
            if (!EMAIL_REGEX.test(value)) return "Email invalide";
            return undefined;
          },
        }}
      />
      <button
        className="shrink-0 self-start rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "..." : t("newsletterSubscribe")}
      </button>
    </form>
  );
}
