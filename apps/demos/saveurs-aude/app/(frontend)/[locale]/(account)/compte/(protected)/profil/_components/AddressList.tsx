"use client";

import { useForm } from "@tanstack/react-form";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { useAuth } from "@/lib/auth";
import type { CustomerData } from "@/lib/auth-actions";
import { addAddress, removeAddress } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

export function AddressList({
  addresses,
}: {
  addresses: CustomerData["addresses"][number][];
}) {
  // 🌐
  const t = useTranslations("account.addresses");
  const ta = useTranslations("account");
  // 👤
  const { setCustomer } = useAuth();
  // ⚠️
  const [showForm, setShowForm] = useState(false);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  // ❌
  async function handleRemove(index: number) {
    setIsRemoving(index);
    const result = await removeAddress(index);
    if (result.success) {
      setCustomer(result.response);
    }
    setIsRemoving(null);
  }

  return (
    <div>
      {/* 🆎 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-xl">{t("title")}</h2>
        <button
          className="text-primary flex items-center gap-1 text-sm hover:underline"
          onClick={() => setShowForm(!showForm)}
          type="button"
        >
          <Plus className="size-4" />
          {t("add")}
        </button>
      </div>

      {/* ➕ */}
      {showForm && (
        <AddressForm
          onCancel={() => setShowForm(false)}
          onSuccess={(customer) => {
            setCustomer(customer);
            setShowForm(false);
          }}
          t={t}
          ta={ta}
        />
      )}

      {/* 📍 */}
      {addresses.length === 0 && !showForm ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((addr, idx) => (
            <AddressCard
              address={addr}
              isRemoving={isRemoving === idx}
              key={addr.id ?? idx}
              onRemove={() => handleRemove(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==============================================
// 📍
function AddressCard({
  address,
  isRemoving,
  onRemove,
}: {
  address: CustomerData["addresses"][number];
  isRemoving: boolean;
  onRemove: () => void;
}) {
  const t = useTranslations("account.addresses");
  return (
    <div
      className={cn(
        "flex items-start justify-between",
        "rounded-lg",
        "border-border/50 border",
        "p-4"
      )}
    >
      <div className="flex items-start gap-3">
        <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" />
        <div className="text-sm">
          <p className="font-medium">
            {address.label}
            {address.isDefault && <DefaultBadge t={t} />}
          </p>
          <p className="text-muted-foreground">
            {address.street}, {address.zipCode} {address.city},{" "}
            {address.country}
          </p>
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label={t("remove")}
            className={cn(
              "p-1",
              "text-muted-foreground",
              "hover:text-destructive transition-colors",
              "disabled:opacity-50"
            )}
            disabled={isRemoving}
            onClick={onRemove}
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("remove")}</TooltipContent>
      </Tooltip>
    </div>
  );
}

// ==============================================
// 🏷️
function DefaultBadge({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <span
      className={cn(
        "ml-2",
        "rounded-full",
        "bg-primary/10",
        "px-2 py-0.5",
        "text-primary text-xs"
      )}
    >
      {t("default")}
    </span>
  );
}

// ==============================================
// ➕
function AddressForm({
  onCancel,
  onSuccess,
  t,
  ta,
}: {
  onCancel: () => void;
  onSuccess: (customer: CustomerData) => void;
  t: ReturnType<typeof useTranslations>;
  ta: ReturnType<typeof useTranslations>;
}) {
  // ⚠️
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      city: "",
      country: "France",
      isDefault: false,
      label: "",
      street: "",
      zipCode: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await addAddress(value);

        if (result.success) {
          onSuccess(result.response);
        } else {
          setError(result.error);
        }
      } catch {
        setError("Erreur");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      className={cn("mb-6", "rounded-lg", "border-border/50 border", "p-4")}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* ⚠️ */}
      {error && <div className="text-destructive mb-3 text-sm">{error}</div>}

      <div className="flex flex-col gap-3">
        {/* 🏷️ */}
        <form.Field
          children={(field) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]
                  : undefined
              }
              label={t("label")}
            >
              <input
                className={inputClass}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Maison, Bureau..."
                type="text"
                value={field.state.value}
              />
            </FieldWrapper>
          )}
          name="label"
          validators={{
            onBlur: ({ value }) =>
              value.trim() ? undefined : ta("fieldRequired"),
          }}
        />

        {/* 📍 */}
        <form.Field
          children={(field) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]
                  : undefined
              }
              label={t("street")}
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
          name="street"
          validators={{
            onBlur: ({ value }) =>
              value.trim() ? undefined : ta("fieldRequired"),
          }}
        />

        {/* 📮 */}
        <div className="grid gap-3 sm:grid-cols-2">
          <form.Field
            children={(field) => (
              <FieldWrapper
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]
                    : undefined
                }
                label={t("zipCode")}
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
            name="zipCode"
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
                label={t("city")}
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
            name="city"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : ta("fieldRequired"),
            }}
          />
        </div>

        {/* 🌍 */}
        <form.Field
          children={(field) => (
            <FieldWrapper label={t("country")}>
              <input
                className={inputClass}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                value={field.state.value}
              />
            </FieldWrapper>
          )}
          name="country"
        />

        {/* ☑️ */}
        <form.Field
          children={(field) => (
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={field.state.value}
                className="accent-primary"
                onChange={(e) => field.handleChange(e.target.checked)}
                type="checkbox"
              />
              {t("setDefault")}
            </label>
          )}
          name="isDefault"
        />
      </div>

      {/* 🔘 */}
      <div className="mt-4 flex gap-3">
        <button
          className={cn(
            "rounded-lg",
            "bg-primary",
            "px-4 py-2",
            "text-primary-foreground text-sm font-medium",
            "hover:bg-primary/90 transition-colors",
            "disabled:opacity-70"
          )}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : t("add")}
        </button>
        <button
          className={cn(
            "rounded-lg",
            "px-4 py-2",
            "text-muted-foreground text-sm",
            "hover:text-foreground transition-colors"
          )}
          onClick={onCancel}
          type="button"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

// ==============================================
// 🔧
const inputClass = cn(
  "w-full",
  "rounded-lg",
  "border-border/50 border",
  "bg-background",
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
