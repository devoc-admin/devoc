"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth";
import { loginCustomer } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

export function LoginForm() {
  // 🌐
  const t = useTranslations("auth.login");
  const tc = useTranslations("checkout");
  // 🧭
  const router = useRouter();
  // 👤
  const { setCustomer } = useAuth();
  // ⚠️
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await loginCustomer(value);

        if (result.success) {
          setCustomer(result.response);
          router.push("/compte/commandes");
        } else {
          setError(t("error"));
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
      {/* 🆎 */}
      <h1 className="font-heading mb-8 text-center text-3xl">{t("title")}</h1>

      {/* ⚠️ */}
      {error && <ErrorBanner message={error} />}

      <div className="flex flex-col gap-4">
        {/* 📧 */}
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
            },
          }}
        />

        {/* 🔑 */}
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
                type="password"
                value={field.state.value}
              />
            </FieldWrapper>
          )}
          name="password"
          validators={{
            onBlur: ({ value }) =>
              value.trim() ? undefined : tc("fieldRequired"),
          }}
        />

        {/* 🔘 */}
        <SubmitButton isSubmitting={isSubmitting} t={t} />
      </div>

      {/* 🔗 */}
      <RegisterLink t={t} />
    </form>
  );
}

// ==============================================
// ⚠️
function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className={cn(
        "mb-4",
        "rounded-lg",
        "border-destructive/30 border",
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
        "mt-2 w-full",
        "rounded-lg",
        "bg-primary",
        "px-6 py-3",
        "text-primary-foreground text-sm font-medium",
        "hover:bg-primary/90 transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-70"
      )}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? "..." : t("submit")}
    </button>
  );
}

// ==============================================
// 🔗
function RegisterLink({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <p className="text-muted-foreground mt-6 text-center text-sm">
      {t("noAccount")}{" "}
      <Link
        className="text-primary font-medium hover:underline"
        href="/compte/inscription"
      >
        {t("register")}
      </Link>
    </p>
  );
}

// ==============================================
// 🔧
const inputClass = cn(
  "w-full",
  "rounded-lg",
  "border-border/50 border",
  "px-3 py-2.5",
  "text-sm",
  "focus:border-primary transition-colors focus:outline-none"
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
      <span className="text-foreground text-sm font-medium">{label}</span>
      {children}
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}
