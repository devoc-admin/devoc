"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import type { Category } from "@/payload-types";

export function ProductFilters({
  categories,
}: {
  categories: Pick<Category, "id" | "slug" | "title">[];
}) {
  const t = useTranslations("shop");
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("")
  );
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("newest")
  );
  const [onSale, setOnSale] = useQueryState(
    "onSale",
    parseAsBoolean.withDefault(false)
  );

  const hasFilters = category || q || onSale;

  function clearFilters() {
    setCategory(null);
    setQ(null);
    setSort(null);
    setOnSale(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-background pr-4 pl-10 text-sm",
            "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
          )}
          onChange={(e) => setQ(e.target.value || null)}
          placeholder={t("filters")}
          type="search"
          value={q}
        />
      </div>

      {/* Category chips + sort */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={cn(
            "rounded-full border px-3 py-1.5 font-medium text-xs transition-colors",
            category
              ? "border-border text-muted-foreground hover:border-primary hover:text-primary"
              : "border-primary bg-primary text-primary-foreground"
          )}
          onClick={() => setCategory(null)}
          type="button"
        >
          {t("allCategories")}
        </button>
        {categories.map((cat) => (
          <button
            className={cn(
              "rounded-full border px-3 py-1.5 font-medium text-xs transition-colors",
              category === cat.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
            key={cat.id}
            onClick={() => setCategory(category === cat.slug ? null : cat.slug)}
            type="button"
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Sort + on sale */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <select
            className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
            onChange={(e) => setSort(e.target.value || null)}
            value={sort}
          >
            <option value="newest">{t("sortNewest")}</option>
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm">
          <input
            checked={onSale}
            className="accent-primary"
            onChange={(e) => setOnSale(e.target.checked || null)}
            type="checkbox"
          />
          {t("onSale")}
        </label>

        {hasFilters && (
          <button
            className="ml-auto flex items-center gap-1 text-muted-foreground text-xs transition-colors hover:text-destructive"
            onClick={clearFilters}
            type="button"
          >
            <X className="size-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
