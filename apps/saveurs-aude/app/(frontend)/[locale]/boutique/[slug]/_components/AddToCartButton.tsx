"use client";

import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { applyDiscount } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Media, Product } from "@/payload-types";

export function AddToCartButton({
  image,
  product,
}: {
  image: Media | null;
  product: Product;
}) {
  const t = useTranslations("product");
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id ?? ""
  );
  const [added, setAdded] = useState(false);

  const variants = product.variants ?? [];
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const outOfStock = !selectedVariant || selectedVariant.stock <= 0;

  function handleAdd() {
    if (!selectedVariant || outOfStock) return;

    const price = applyDiscount(selectedVariant.price, product.promotion);
    addItem({
      image: image?.url ?? undefined,
      price,
      productId: product.id,
      slug: product.slug,
      title: product.title,
      variantId: selectedVariant.id ?? "",
      variantLabel: selectedVariant.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Variant selector */}
      {variants.length > 1 && (
        <div>
          <span className="mb-2 block font-medium text-foreground text-sm">
            {t("selectVariant")}
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm transition-colors",
                  v.id === selectedVariantId
                    ? "border-primary bg-primary/10 font-medium text-primary"
                    : "border-border text-muted-foreground hover:border-primary",
                  v.stock <= 0 && "cursor-not-allowed opacity-40"
                )}
                disabled={v.stock <= 0}
                key={v.id}
                onClick={() => setSelectedVariantId(v.id ?? "")}
                type="button"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock status */}
      <p
        className={cn(
          "font-medium text-sm",
          outOfStock ? "text-destructive" : "text-success"
        )}
      >
        {outOfStock ? t("outOfStock") : t("inStock")}
      </p>

      {/* Add to cart */}
      <button
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all",
          outOfStock && "cursor-not-allowed bg-muted text-muted-foreground",
          !outOfStock && added && "bg-success text-success-foreground",
          !(outOfStock || added) &&
            "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
        )}
        disabled={outOfStock}
        onClick={handleAdd}
        type="button"
      >
        <ShoppingBag className="size-4" />
        {added ? "✓" : t("addToCart")}
      </button>
    </div>
  );
}
