"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth";
import { registerCustomer } from "@/lib/auth-actions";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const tc = useTranslations("checkout");
  const router = useRouter();
  const { setCustomer } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await registerCustomer(value);

        if (result.success) {
          setCustomer(result.response);
          router.push("/compte/commandes");
        } else {
          setError(result.error);
          setIsSubmitting(false);
        }
      } catch {
        setError(t("error"));
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
      <h1 className="mb-8 text-center font-heading text-3xl">{t("title")}</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
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
                value.trim() ? undefined : tc("fieldRequired"),
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
                value.trim() ? undefined : tc("fieldRequired"),
            }}
          />
        </div>

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
              if (!value.trim()) return tc("fieldRequired");
              if (!EMAIL_REGEX.test(value)) return tc("invalidEmail");
              return undefined;
            },
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
              label={t("phone")}
            >
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
            <FieldWrapper
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]
                  : undefined
              }
              label={t("password")}
            >
              <input
                className={inputClass}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={t("passwordMin")}
                type="password"
                value={field.state.value}
              />
            </FieldWrapper>
          )}
          name="password"
          validators={{
            onBlur: ({ value }) => {
              if (!value) return tc("fieldRequired");
              if (value.length < 8) return t("passwordMin");
              return undefined;
            },
          }}
        />

        <button
          className="mt-2 w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : t("submit")}
        </button>
      </div>

      <p className="mt-6 text-center text-muted-foreground text-sm">
        {t("hasAccount")}{" "}
        <Link
          className="font-medium text-primary hover:underline"
          href="/compte/connexion"
        >
          {t("login")}
        </Link>
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none";

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
