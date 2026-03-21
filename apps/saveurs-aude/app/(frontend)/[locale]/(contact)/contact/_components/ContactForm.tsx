"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { submitContactForm } from "@/lib/contact-actions";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  // 🌐
  const t = useTranslations("contact");
  // ⚠️
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);
      setIsSubmitting(true);

      try {
        const result = await submitContactForm(value);

        if (result.success) {
          setSuccess(true);
          form.reset();
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

  // ✅
  if (success) {
    return <SuccessMessage t={t} />;
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* ⚠️ */}
      {error && <ErrorBanner message={error} />}

      {/* 👤 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field
          children={(field) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]
                  : undefined
              }
              label={t("name")}
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
          name="name"
          validators={{
            onBlur: ({ value }) =>
              value.trim() ? undefined : "Ce champ est requis",
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
              label={t("email")}
            >
              <input
                className={inputClass}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                value={field.state.value}
              />
            </FieldWrapper>
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
      </div>

      {/* 📝 */}
      <form.Field
        children={(field) => (
          <FieldWrapper
            error={
              field.state.meta.isTouched
                ? field.state.meta.errors[0]
                : undefined
            }
            label={t("subject")}
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
        name="subject"
        validators={{
          onBlur: ({ value }) =>
            value.trim() ? undefined : "Ce champ est requis",
        }}
      />

      {/* 💬 */}
      <form.Field
        children={(field) => (
          <FieldWrapper
            error={
              field.state.meta.isTouched
                ? field.state.meta.errors[0]
                : undefined
            }
            label={t("message")}
          >
            <textarea
              className={cn(inputClass, "min-h-[150px] resize-y")}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          </FieldWrapper>
        )}
        name="message"
        validators={{
          onBlur: ({ value }) =>
            value.trim().length >= 10 ? undefined : "10 caractères minimum",
        }}
      />

      {/* 🔘 */}
      <SubmitButton isSubmitting={isSubmitting} t={t} />
    </form>
  );
}

// ==============================================
// ✅
function SuccessMessage({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div
      className={cn(
        "rounded-lg",
        "border border-green-200",
        "bg-green-50",
        "px-6 py-8",
        "text-center"
      )}
    >
      <p className="font-medium text-green-800">{t("success")}</p>
    </div>
  );
}

// ==============================================
// ⚠️
function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className={cn(
        "rounded-lg",
        "border border-destructive/30",
        "bg-destructive/5",
        "px-4 py-3",
        "text-destructive text-sm"
      )}
    >
      {message}
    </div>
  );
}

// ==============================================
// 🔘
function SubmitButton({
  isSubmitting,
  t,
}: {
  isSubmitting: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <button
      className={cn(
        "w-full sm:w-auto sm:self-end",
        "rounded-lg",
        "bg-primary",
        "px-6 py-3",
        "font-medium text-primary-foreground text-sm",
        "transition-colors hover:bg-primary/90",
        "disabled:cursor-not-allowed disabled:opacity-70"
      )}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? "..." : t("send")}
    </button>
  );
}

// ==============================================
// 🔧
const inputClass = cn(
  "w-full",
  "rounded-lg",
  "border border-border/50",
  "bg-background",
  "px-3 py-2.5",
  "text-sm",
  "transition-colors focus:border-primary focus:outline-none"
);

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
