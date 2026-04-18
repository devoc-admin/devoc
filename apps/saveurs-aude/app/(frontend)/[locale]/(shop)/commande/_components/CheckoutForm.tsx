"use client";

import { useForm, useStore } from "@tanstack/react-form";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/checkout-actions";
import { formatPrice } from "@/lib/format";
import { calculateShipping, type ShippingConfig } from "@/lib/shipping";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutFormValues = {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  deliveryMethod: "shipping" | "clickAndCollect";
  shippingAddress: {
    city: string;
    country: string;
    street: string;
    zipCode: string;
  };
};

function useCheckoutForm(defaultValues: CheckoutFormValues) {
  return useForm({ defaultValues });
}

type CheckoutForm = ReturnType<typeof useCheckoutForm>;

export function CheckoutForm({
  shippingConfig,
}: {
  shippingConfig: ShippingConfig;
}) {
  // 🌐
  const t = useTranslations("checkout");
  const locale = useLocale();
  // 🛒
  const { items, totalPrice } = useCart();
  // 👤
  const { customer: authCustomer } = useAuth();
  // ⚠️
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAddress = authCustomer?.addresses?.find((a) => a.isDefault);

  const form = useForm({
    defaultValues: {
      customer: {
        email: authCustomer?.email ?? "",
        firstName: authCustomer?.firstName ?? "",
        lastName: authCustomer?.lastName ?? "",
        phone: authCustomer?.phone ?? "",
      },
      deliveryMethod: "shipping" as "shipping" | "clickAndCollect",
      shippingAddress: {
        city: defaultAddress?.city ?? "",
        country: defaultAddress?.country ?? "France",
        street: defaultAddress?.street ?? "",
        zipCode: defaultAddress?.zipCode ?? "",
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await createCheckoutSession({
          customer: value.customer,
          customerId: authCustomer?.id,
          deliveryMethod: value.deliveryMethod,
          items: items.map((item) => ({
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
            title: item.title,
            variantId: item.variantId,
            variantLabel: item.variantLabel,
          })),
          locale: locale as Locale,
          shippingAddress:
            value.deliveryMethod === "shipping"
              ? value.shippingAddress
              : undefined,
        });

        if (result.success) {
          window.location.href = result.response.url;
        } else {
          setError(result.error);
          setIsSubmitting(false);
        }
      } catch {
        setError(t("errorGeneric"));
        setIsSubmitting(false);
      }
    },
  });

  // 🚚
  const deliveryMethod = useStore(
    form.store,
    (state) => state.values.deliveryMethod
  );
  const shippingCost = calculateShipping(
    totalPrice,
    deliveryMethod,
    shippingConfig
  );
  const total = totalPrice + shippingCost;

  // 🙅
  if (items.length === 0) {
    return <EmptyCart t={t} />;
  }

  return (
    <form
      className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* ⬅️ */}
      <div className="flex flex-col gap-8">
        {/* ⚠️ */}
        {error && <ErrorBanner message={error} />}

        {/* 👤 */}
        <CustomerInfoSection form={form} t={t} />

        {/* 🚚 */}
        <DeliveryMethodSection
          form={form}
          shippingConfig={shippingConfig}
          t={t}
        />

        {/* 📍 */}
        {deliveryMethod === "shipping" && (
          <ShippingAddressSection form={form} t={t} />
        )}
      </div>

      {/* ➡️ */}
      <OrderSummary
        isSubmitting={isSubmitting}
        items={items}
        shippingCost={shippingCost}
        t={t}
        total={total}
        totalPrice={totalPrice}
      />
    </form>
  );
}

// ==============================================
// 🙅
function EmptyCart({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="py-16 text-center">
      <p className="font-heading text-2xl text-muted-foreground">
        {t("emptyCart")}
      </p>
      <Link
        className={cn(
          "mt-6 inline-block",
          "rounded-lg",
          "bg-primary",
          "px-6 py-3",
          "font-medium text-primary-foreground text-sm",
          "transition-colors hover:bg-primary/90"
        )}
        href="/panier"
      >
        {t("backToCart")}
      </Link>
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
// 👤
function CustomerInfoSection({
  form,
  t,
}: {
  form: CheckoutForm;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-foreground text-xl">
        {t("customerInfo")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("firstName")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                value={value}
              />
            </FieldWrapper>
          )}
          name="customer.firstName"
          validators={{
            onBlur: ({ value }: { value: string }) =>
              value.trim() ? undefined : t("fieldRequired"),
          }}
        />
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("lastName")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                value={value}
              />
            </FieldWrapper>
          )}
          name="customer.lastName"
          validators={{
            onBlur: ({ value }: { value: string }) =>
              value.trim() ? undefined : t("fieldRequired"),
          }}
        />
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("email")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="email"
                value={value}
              />
            </FieldWrapper>
          )}
          name="customer.email"
          validators={{
            onBlur: ({ value }: { value: string }) => {
              if (!value.trim()) return t("fieldRequired");
              if (!EMAIL_REGEX.test(value)) return t("invalidEmail");
              return undefined;
            },
          }}
        />
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("phone")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="tel"
                value={value}
              />
            </FieldWrapper>
          )}
          name="customer.phone"
          validators={{
            onBlur: ({ value }: { value: string }) =>
              value.trim() ? undefined : t("fieldRequired"),
          }}
        />
      </div>
    </section>
  );
}

// ==============================================
// 🚚
function DeliveryMethodSection({
  form,
  shippingConfig,
  t,
}: {
  form: CheckoutForm;
  shippingConfig: ShippingConfig;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-foreground text-xl">
        {t("deliveryMethod")}
      </h2>
      <form.Field
        children={({ state: { value }, handleChange }) => {
          const methods = shippingConfig.clickAndCollectEnabled
            ? (["shipping", "clickAndCollect"] as const)
            : (["shipping"] as const);
          return (
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((method) => (
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3",
                    "rounded-lg border",
                    "p-4",
                    "transition-colors",
                    "border-border/50 hover:border-primary/50",
                    value === method &&
                      "border-primary bg-primary/5"
                  )}
                  key={method}
                >
                  <input
                    checked={value === method}
                    className="accent-primary"
                    name="deliveryMethod"
                    onChange={() => handleChange(method)}
                    type="radio"
                    value={method}
                  />
                  <span className="font-medium text-sm">{t(method)}</span>
                </label>
              ))}
            </div>
          );
        }}
        name="deliveryMethod"
      />
    </section>
  );
}

// ==============================================
// 📍
function ShippingAddressSection({
  form,
  t,
}: {
  form: CheckoutForm;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-foreground text-xl">
        {t("shippingAddress")}
      </h2>
      <div className="grid gap-4">
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("street")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                value={value}
              />
            </FieldWrapper>
          )}
          name="shippingAddress.street"
          validators={{
            onBlur: ({ value }: { value: string }) =>
              value.trim() ? undefined : t("fieldRequired"),
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            children={({ state: { meta, value }, handleBlur, handleChange }) => (
              <FieldWrapper
                error={
                  meta.isTouched
                    ? meta.errors[0]
                    : undefined
                }
                label={t("zipCode")}
              >
                <input
                  className={inputClass}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  type="text"
                  value={value}
                />
              </FieldWrapper>
            )}
            name="shippingAddress.zipCode"
            validators={{
              onBlur: ({ value }: { value: string }) =>
                value.trim() ? undefined : t("fieldRequired"),
            }}
          />
          <form.Field
            children={({ state: { meta, value }, handleBlur, handleChange }) => (
              <FieldWrapper
                error={
                  meta.isTouched
                    ? meta.errors[0]
                    : undefined
                }
                label={t("city")}
              >
                <input
                  className={inputClass}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  type="text"
                  value={value}
                />
              </FieldWrapper>
            )}
            name="shippingAddress.city"
            validators={{
              onBlur: ({ value }: { value: string }) =>
                value.trim() ? undefined : t("fieldRequired"),
            }}
          />
        </div>
        <form.Field
          children={({ state: { meta, value }, handleBlur, handleChange }) => (
            <FieldWrapper
              error={
                meta.isTouched
                  ? meta.errors[0]
                  : undefined
              }
              label={t("country")}
            >
              <input
                className={inputClass}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                value={value}
              />
            </FieldWrapper>
          )}
          name="shippingAddress.country"
          validators={{
            onBlur: ({ value }: { value: string }) =>
              value.trim() ? undefined : t("fieldRequired"),
          }}
        />
      </div>
    </section>
  );
}

// ==============================================
// 📦
function OrderSummary({
  isSubmitting,
  items,
  shippingCost,
  t,
  total,
  totalPrice,
}: {
  isSubmitting: boolean;
  items: ReturnType<typeof useCart>["items"];
  shippingCost: number;
  t: ReturnType<typeof useTranslations>;
  total: number;
  totalPrice: number;
}) {
  return (
    <div className="lg:sticky lg:top-8 lg:self-start">
      <div
        className={cn(
          "rounded-lg",
          "border border-border/50",
          "bg-card",
          "p-6"
        )}
      >
        <h2 className="mb-4 font-heading text-foreground text-xl">
          {t("orderSummary")}
        </h2>

        {/* 🛒 */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <SummaryItem item={item} key={item.variantId} />
          ))}
        </div>

        <hr className="my-4 border-border/50" />

        {/* 💰 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("subtotal")}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("shippingCost")}</span>
            <span>
              {shippingCost === 0
                ? t("freeShipping")
                : formatPrice(shippingCost)}
            </span>
          </div>
          <hr className="my-1 border-border/50" />
          <div className="flex justify-between">
            <span className="font-heading text-lg">{t("total")}</span>
            <span className="font-heading text-lg text-primary">
              {formatPrice(total)}
            </span>
          </div>

          {/* 🔘 */}
          <PayButton isSubmitting={isSubmitting} t={t} total={total} />
        </div>
      </div>
    </div>
  );
}

// ==============================================
// 🛒
function SummaryItem({
  item,
}: {
  item: ReturnType<typeof useCart>["items"][number];
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "relative",
          "size-12 shrink-0",
          "overflow-hidden rounded-md",
          "bg-secondary/30"
        )}
      >
        {item.image ? (
          <Image
            alt={item.title}
            className="object-cover"
            fill
            sizes="48px"
            src={item.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/30">
            <span className="font-heading text-xs">S</span>
          </div>
        )}
      </div>
      <div className="flex-1 text-sm">
        <p className="font-medium">{item.title}</p>
        <p className="text-muted-foreground text-xs">
          {item.variantLabel} x {item.quantity}
        </p>
      </div>
      <span className="font-accent font-semibold text-sm">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  );
}

// ==============================================
// 🔘
function PayButton({
  isSubmitting,
  t,
  total,
}: {
  isSubmitting: boolean;
  t: ReturnType<typeof useTranslations>;
  total: number;
}) {
  return (
    <button
      className={cn(
        "mt-4 w-full",
        "rounded-lg",
        "bg-primary",
        "px-6 py-3",
        "font-medium text-primary-foreground text-sm",
        "transition-colors",
        "hover:bg-primary/90",
        isSubmitting && "cursor-not-allowed opacity-70"
      )}
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting
        ? t("processing")
        : t("pay", { amount: formatPrice(total) })}
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
