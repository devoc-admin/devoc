import type { Media, Product } from "@/payload-types";

export function getLowestPrice(product: Product): number {
  const prices = product.variants?.map((v) => v.price) ?? [];
  return prices.length > 0 ? Math.min(...prices) : 0;
}

export function getPriceRange(product: Product): {
  hasRange: boolean;
  max: number;
  min: number;
} {
  const prices = product.variants?.map((v) => v.price) ?? [];
  if (prices.length === 0) return { hasRange: false, max: 0, min: 0 };
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { hasRange: min !== max, max, min };
}

export function applyDiscount(
  price: number,
  promotion: Product["promotion"]
): number {
  if (!(promotion?.type && promotion.value)) return price;

  const now = new Date();
  if (promotion.startDate && new Date(promotion.startDate) > now) return price;
  if (promotion.endDate && new Date(promotion.endDate) < now) return price;

  if (promotion.type === "percentage") {
    return Math.round(price * (1 - promotion.value / 100));
  }
  return Math.max(0, price - promotion.value);
}

export function hasActivePromotion(promotion: Product["promotion"]): boolean {
  if (!(promotion?.type && promotion.value)) return false;
  const now = new Date();
  if (promotion.startDate && new Date(promotion.startDate) > now) return false;
  if (promotion.endDate && new Date(promotion.endDate) < now) return false;
  return true;
}

export function isInStock(product: Product): boolean {
  return product.variants?.some((v) => v.stock > 0) ?? false;
}

export function getProductImage(product: Product): Media | null {
  const first = product.images?.[0];
  if (!first) return null;
  return typeof first.image === "number" ? null : first.image;
}
