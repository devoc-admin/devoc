"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth";
import { loginCustomer } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      <h1 className="mb-8 text-center font-heading text-3xl">{t("title")}</h1>

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
              return undefined;
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
        "mt-2 w-full",
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
      {isSubmitting ? "..." : t("submit")}
    </button>
  );
}

// ==============================================
// 🔗
function RegisterLink({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <p className="mt-6 text-center text-muted-foreground text-sm">
      {t("noAccount")}{" "}
      <Link
        className="font-medium text-primary hover:underline"
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
