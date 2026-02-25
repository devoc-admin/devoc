"use client";

import { useForm } from "@tanstack/react-form";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import type { CustomerData } from "@/lib/auth-actions";
import { addAddress, removeAddress } from "@/lib/auth-actions";

type Address = CustomerData["addresses"][number];

export function AddressList({ addresses }: { addresses: Address[] }) {
  const t = useTranslations("account.addresses");
  const ta = useTranslations("account");
  const { setCustomer } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-xl">{t("title")}</h2>
        <button
          className="flex items-center gap-1 text-primary text-sm hover:underline"
          onClick={() => setShowForm(!showForm)}
          type="button"
        >
          <Plus className="size-4" />
          {t("add")}
        </button>
      </div>

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

      {addresses.length === 0 && !showForm ? (
        <p className="py-8 text-center text-muted-foreground text-sm">
          {t("empty")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((addr, idx) => (
            <div
              className="flex items-start justify-between rounded-lg border border-border/50 p-4"
              key={addr.id ?? idx}
            >
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">
                    {addr.label}
                    {addr.isDefault && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
                        {t("default")}
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {addr.street}, {addr.zipCode} {addr.city}, {addr.country}
                  </p>
                </div>
              </div>
              <button
                className="p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                disabled={isRemoving === idx}
                onClick={() => handleRemove(idx)}
                type="button"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
      className="mb-6 rounded-lg border border-border/50 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {error && <div className="mb-3 text-destructive text-sm">{error}</div>}

      <div className="flex flex-col gap-3">
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

      <div className="mt-4 flex gap-3">
        <button
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : t("add")}
        </button>
        <button
          className="rounded-lg px-4 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          onClick={onCancel}
          type="button"
        >
          Annuler
        </button>
      </div>
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
