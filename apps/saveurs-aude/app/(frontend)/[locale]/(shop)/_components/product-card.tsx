"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRouter as useNextRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useCallback, useState, ViewTransition } from "react";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import {
  applyDiscount,
  getPriceRange,
  getProductImage,
  hasActivePromotion,
  isInStock,
} from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Product } from "@/payload-types";

export function ProductCard({ product }: { product: Product }) {
  // 🖼️
  const image = getProductImage(product);
  const imageUrl = image?.url;
  const imageAlt = image?.alt || product.title;

  // ✨
  const [loaded, setLoaded] = useState(!imageUrl);

  // 🚀
  const router = useNextRouter();
  const locale = useLocale() as Locale;
  const handlePrefetch = useCallback(() => {
    const path = getPathname({
      href: { params: { slug: product.slug }, pathname: "/boutique/[slug]" },
      locale,
    });
    router.prefetch(path);
  }, [locale, product.slug, router]);

  // 🏷️
  const promotion = product.promotion;
  const promo = hasActivePromotion(promotion);
  const outOfStock = !isInStock(product);

  // 🟡
  const categoryTitle =
    typeof product.category === "object" ? product.category.title : null;

  // 💰
  const { min, hasRange } = getPriceRange(product);
  const discounted = promo ? applyDiscount(min, promotion) : min;

  // ♿
  const reduced = useReducedMotion();

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: onMouseEnter is for prefetch only
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: onMouseEnter is for prefetch only
    <div className="relative" onMouseEnter={handlePrefetch}>
      {/* 💀 Skeleton — visible while image loads */}
      {!(reduced || loaded) && (
        <div className="space-y-3">
          <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      )}

      {/* 🃏 Real card — fades in once image is ready */}
      <motion.div
        animate={
          reduced || loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        className={cn(!(reduced || loaded) && "absolute inset-0")}
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={reduced ? { duration: 0 } : { duration: 0.4 }}
      >
        <Link
          className={cn(
            "group",
            "flex flex-col",
            "h-full",
            "overflow-hidden",
            "rounded-lg",
            "border border-border/50",
            "bg-card",
            "transition-shadow hover:shadow-md"
          )}
          href={{
            params: { slug: product.slug },
            pathname: "/boutique/[slug]",
          }}
        >
          {/* 🖼️🏷️ */}
          <div
            className={cn(
              "relative",
              "aspect-square",
              "overflow-hidden",
              "bg-secondary-900/30"
            )}
          >
            {/* 🖼️ */}
            <ProductImage
              alt={imageAlt}
              onLoad={() => setLoaded(true)}
              slug={product.slug}
              url={imageUrl}
            />

            {/* 🏷️ */}
            <div className={cn("absolute top-2 left-2", "flex flex-col gap-1")}>
              {promo && <Promotion promotion={promotion} />}
              {outOfStock && <OutOfStock />}
            </div>
          </div>

          {/* 📝 */}
          <div className={cn("flex flex-1 flex-col", "gap-y-1", "p-3")}>
            <Category>{categoryTitle}</Category>
            <ProductTitle>{product.title}</ProductTitle>
            <Price
              discounted={discounted}
              hasRange={hasRange}
              min={min}
              promo={promo}
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

// =================================
// 🖼️
function ProductImage({
  url,
  alt,
  onLoad,
  slug,
}: {
  url?: string | null;
  alt: string;
  onLoad: () => void;
  slug?: string;
}) {
  if (!url) return <NoProductImage />;
  return (
    <ViewTransition name={`product-image-${slug}`}>
      <Image
        alt={alt}
        className={cn(
          "object-cover",
          "transition-transform duration-500",
          "group-hover:scale-105"
        )}
        fill
        onLoad={onLoad}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        src={url}
      />
    </ViewTransition>
  );
}

function NoProductImage() {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "h-full",
        "text-muted-foreground/40"
      )}
    >
      <span className="font-heading text-4xl">S</span>
    </div>
  );
}

// =================================
// 🏷️
function Promotion({ promotion }: { promotion: Product["promotion"] }) {
  if (!promotion) return null;

  let value: string | null = null;
  switch (promotion.type) {
    // %
    case "percentage":
      value = `-${promotion.value}%`;
      break;
    // 🔢
    case "fixed":
      value = `-${formatPrice(promotion.value ?? 0)}`;
      break;
    default:
      value = null;
  }
  return (
    <span
      className={cn(
        "px-2 py-0.5",
        "rounded",
        "bg-destructive",
        "font-semibold text-white text-xs"
      )}
    >
      {value}
    </span>
  );
}

function OutOfStock() {
  return (
    <span className="rounded bg-muted px-2 py-0.5 font-semibold text-muted-foreground text-xs">
      Rupture
    </span>
  );
}

// =================================
// 🟡
function Category({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span className="text-accent text-xs uppercase tracking-wider">
      {children}
    </span>
  );
}

// =================================
// 🆎
function ProductTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={cn(
        "line-clamp-2",
        "font-heading",
        "text-foreground",
        "text-sm",
        "leading-snug"
      )}
    >
      {children}
    </h3>
  );
}

// =================================
// 💰
type PriceProps = {
  promo: boolean;
  hasRange: boolean;
  discounted: number;
  min: number;
};

function Price({ promo, hasRange, discounted, min }: PriceProps) {
  return (
    <div className="mt-auto flex items-baseline gap-2 pt-2">
      <span
        className={cn(
          "font-accent font-semibold text-lg",
          "text-primary",
          promo && "text-destructive"
        )}
      >
        {hasRange ? "d\u00E8s " : ""}
        {formatPrice(discounted)}
      </span>
      {promo && (
        <span className="text-muted-foreground text-sm line-through">
          {formatPrice(min)}
        </span>
      )}
    </div>
  );
}
