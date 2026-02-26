"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartContent({
  freeShippingThreshold,
  shippingCost,
}: {
  freeShippingThreshold: number;
  shippingCost: number;
}) {
  const t = useTranslations("cart");
  const { items, removeItem, totalPrice, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="font-heading text-2xl text-muted-foreground">
          {t("empty")}
        </p>
        <Link
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/boutique"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const remaining = Math.max(0, freeShippingThreshold - totalPrice);
  const progress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const estimatedShipping = isFreeShipping ? 0 : shippingCost;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <FadeInUp>
        <h1 className="font-heading text-2xl text-primary sm:text-3xl">
          {t("title")}
        </h1>
      </FadeInUp>

      {/* Free shipping progress */}
      <FadeInUp delay={0.1}>
        <div className="mt-6 rounded-lg border border-border/50 bg-card p-4">
          <p className="text-sm">
            {isFreeShipping ? (
              <span className="font-medium text-success">
                {t("freeShippingReached")}
              </span>
            ) : (
              <span className="text-muted-foreground">
                {t("freeShippingProgress", {
                  remaining: (remaining / 100).toFixed(2).replace(".00", ""),
                })}
              </span>
            )}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary/50">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isFreeShipping ? "bg-success" : "bg-accent"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </FadeInUp>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <div
            className="flex items-center gap-4 rounded-lg border border-border/50 bg-card p-4"
            key={item.variantId}
          >
            {/* Image */}
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-secondary/30">
              {item.image ? (
                <Image
                  alt={item.title}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={item.image}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground/30">
                  <span className="font-heading text-xl">S</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-1">
              <Link
                className="font-heading text-sm hover:text-primary"
                href={{
                  params: { slug: item.slug },
                  pathname: "/boutique/[slug]",
                }}
              >
                {item.title}
              </Link>
              <span className="text-muted-foreground text-xs">
                {item.variantLabel}
              </span>
              <span className="font-accent font-semibold text-primary text-sm">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-1">
              <button
                className="rounded p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() =>
                  updateQuantity(item.variantId, item.quantity - 1)
                }
                type="button"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-medium text-sm">
                {item.quantity}
              </span>
              <button
                className="rounded p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() =>
                  updateQuantity(item.variantId, item.quantity + 1)
                }
                type="button"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Line total + remove */}
            <div className="flex flex-col items-end gap-1">
              <span className="font-accent font-semibold text-sm">
                {formatPrice(item.price * item.quantity)}
              </span>
              <button
                className="text-muted-foreground/60 transition-colors hover:text-destructive"
                onClick={() => removeItem(item.variantId)}
                type="button"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 flex flex-col items-end gap-4 border-border/50 border-t pt-6">
        <div className="flex w-full max-w-xs flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("subtotal")}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("shippingCost")}</span>
            <span>
              {estimatedShipping === 0
                ? t("freeShippingReached")
                : formatPrice(estimatedShipping)}
            </span>
          </div>
          <hr className="my-1 border-border/50" />
          <div className="flex justify-between">
            <span className="font-heading text-lg">{t("total")}</span>
            <span className="font-heading text-lg text-primary">
              {formatPrice(totalPrice + estimatedShipping)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className={cn(
              "w-full rounded-lg border border-border px-6 py-3 text-center font-medium text-muted-foreground text-sm sm:w-auto",
              "transition-colors hover:border-primary hover:text-primary"
            )}
            href="/boutique"
          >
            {t("continueShopping")}
          </Link>
          <Link
            className="w-full rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 sm:w-auto"
            href="/commande"
          >
            {t("checkout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
