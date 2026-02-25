"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import type { CustomerData } from "@/lib/auth-actions";
import { updateProfile } from "@/lib/auth-actions";

export function ProfileForm({ customer }: { customer: CustomerData }) {
  const t = useTranslations("account.profile");
  const ta = useTranslations("account");
  const { setCustomer } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      newsletter: customer.newsletter,
      phone: customer.phone,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);
      setIsSubmitting(true);

      try {
        const result = await updateProfile(value);

        if (result.success) {
          setCustomer(result.response);
          setSuccess(true);
        } else {
          setError(result.error);
        }
      } catch {
        setError("Une erreur est survenue");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h1 className="mb-8 font-heading text-3xl">{t("title")}</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/5 px-4 py-3 text-green-700 text-sm">
          {t("saved")}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <FieldWrapper label={t("email")}>
          <input
            className={inputClass}
            defaultValue={customer.email}
            disabled
            type="email"
          />
        </FieldWrapper>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            children={(field) => (
              <FieldWrapper
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]
                    : undefined
                }
                label={t("firstName")}
              >
                <input
                  className={inputClass}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  value={field.state.value}
                />
              </FieldWrapper>
            )}
            name="firstName"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : ta("fieldRequired"),
            }}
          />
          <form.Field
            children={(field) => (
              <FieldWrapper
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]
                    : undefined
                }
                label={t("lastName")}
              >
                <input
                  className={inputClass}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  value={field.state.value}
                />
              </FieldWrapper>
            )}
            name="lastName"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : ta("fieldRequired"),
            }}
          />
        </div>

        <form.Field
          children={(field) => (
            <FieldWrapper label={t("phone")}>
              <input
                className={inputClass}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="tel"
                value={field.state.value}
              />
            </FieldWrapper>
          )}
          name="phone"
        />

        <form.Field
          children={(field) => (
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={field.state.value}
                className="accent-primary"
                onChange={(e) => field.handleChange(e.target.checked)}
                type="checkbox"
              />
              {t("newsletter")}
            </label>
          )}
          name="newsletter"
        />

        <button
          className="mt-2 w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : t("save")}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50";

function FieldWrapper({
  children,
  error,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-foreground text-sm">{label}</span>
      {children}
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}
