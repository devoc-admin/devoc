import Image from "next/image";
import { Link } from "@/i18n/navigation";
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

  return (
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
      href={{ params: { slug: product.slug }, pathname: "/boutique/[slug]" }}
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
        <ProductImage alt={imageAlt} url={imageUrl} />

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
  );
}

// =================================
// 🖼️
function ProductImage({ url, alt }: { url?: string | null; alt: string }) {
  if (!url) return <NoProductImage />;
  return (
    <Image
      alt={alt}
      className={cn(
        "object-cover",
        "transition-transform duration-500",
        "group-hover:scale-105"
      )}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      src={url}
    />
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
