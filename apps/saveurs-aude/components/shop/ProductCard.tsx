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
  const image = getProductImage(product);
  const { hasRange, min } = getPriceRange(product);
  const promo = hasActivePromotion(product.promotion);
  const discounted = promo ? applyDiscount(min, product.promotion) : min;
  const inStock = isInStock(product);
  const categoryTitle =
    typeof product.category === "object" ? product.category.title : null;

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-shadow hover:shadow-md"
      href={{ params: { slug: product.slug }, pathname: "/boutique/[slug]" }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {image?.url ? (
          <Image
            alt={image.alt || product.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={image.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40">
            <span className="font-heading text-4xl">S</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {promo && (
            <span className="rounded bg-destructive px-2 py-0.5 font-semibold text-white text-xs">
              {product.promotion?.type === "percentage"
                ? `-${product.promotion.value}%`
                : `-${formatPrice(product.promotion?.value ?? 0)}`}
            </span>
          )}
          {!inStock && (
            <span className="rounded bg-muted px-2 py-0.5 font-semibold text-muted-foreground text-xs">
              Rupture
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        {categoryTitle && (
          <span className="text-accent text-xs uppercase tracking-wider">
            {categoryTitle}
          </span>
        )}
        <h3 className="line-clamp-2 font-heading text-foreground text-sm leading-snug">
          {product.title}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span
            className={cn(
              "font-accent font-semibold text-lg",
              promo ? "text-destructive" : "text-primary"
            )}
          >
            {hasRange ? "dès " : ""}
            {formatPrice(discounted)}
          </span>
          {promo && (
            <span className="text-muted-foreground text-sm line-through">
              {formatPrice(min)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
