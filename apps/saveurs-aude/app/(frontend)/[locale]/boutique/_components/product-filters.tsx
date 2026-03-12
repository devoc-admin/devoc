"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { cn } from "@/lib/utils";
import type { Category } from "@/payload-types";

type CustomCategory = Pick<Category, "id" | "slug" | "title">;

export function ProductFilters({
  categories,
}: {
  categories: CustomCategory[];
}) {
  // 🔍
  const [q, setQ] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 300 })
  );
  // 🏷️
  const [selectedCategory, setSelectedCategory] = useQueryState(
    "category",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );
  // 📃
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );
  // ↕️
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("newest").withOptions({ shallow: false })
  );
  // 💱
  const [onSale, setOnSale] = useQueryState(
    "onSale",
    parseAsBoolean.withDefault(false).withOptions({ shallow: false })
  );

  // ↩️
  const hasFilters = selectedCategory || q || onSale || sort || page;
  function clearFilters() {
    setSelectedCategory(null);
    setQ(null);
    setSort(null);
    setOnSale(null);
    setPage(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 */}
      <SearchBar q={q} setQ={setQ} />

      {/* 🏷️ */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setPage={setPage}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ↕️💱 */}
      <div className="flex flex-wrap items-center gap-x-3">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
        {/*↕️*/}
        <Sort setSort={setSort} sort={sort} />
        {/* 💱 */}
        <OnSaleFilter onSale={onSale} setOnSale={setOnSale} />
        {/* ↩️ */}
        {hasFilters && <ResetFilters clearFilters={clearFilters} />}
      </div>
    </div>
  );
}

// ==============================================
// 🔍
function SearchBar({ q, setQ }: { q: string; setQ: (value: string) => void }) {
  // 🌐
  const t = useTranslations("shop");

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        className={cn(
          "h-10 w-full",
          "rounded-lg",
          "border border-input",
          "bg-white",
          "pr-4 pl-10",
          "text-sm",
          "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
        )}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("searchProduct")}
        type="search"
        value={q}
      />
    </div>
  );
}

// ==============================================
// ↕️
type SortProps = {
  sort: string;
  setSort: (
    value: string | ((old: string) => string | null) | null
  ) => Promise<URLSearchParams>;
};

function Sort({ sort, setSort }: SortProps) {
  // 🌐
  const t = useTranslations("shop");
  return (
    <select
      className={cn(
        "rounded-lg",
        "border border-input",
        "bg-white",
        "px-3 py-1.5",
        "text-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring/50"
      )}
      onChange={(e) => setSort(e.target.value || null)}
      value={sort}
    >
      <option value="newest">{t("sortNewest")}</option>
      <option value="price-asc">{t("sortPriceAsc")}</option>
      <option value="price-desc">{t("sortPriceDesc")}</option>
    </select>
  );
}

// ==============================================
// 🏷️
type CategoriesProps = {
  selectedCategory: string;
  categories: CustomCategory[];
  setPage: (value: number | null) => Promise<URLSearchParams>;
  setSelectedCategory: (
    value: string | ((old: string) => string | null) | null
  ) => Promise<URLSearchParams>;
};

function Categories({
  selectedCategory,
  setSelectedCategory,
  setPage,
  categories,
}: CategoriesProps) {
  // 🌐
  const t = useTranslations("shop");

  function handleCategoryChange(value: string | null) {
    setSelectedCategory(value);
    setPage(null);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className={cn(
          "rounded-full border px-3 py-1.5 font-medium text-xs transition-colors",
          "border-primary bg-primary text-primary-foreground",
          selectedCategory &&
            "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary"
        )}
        onClick={() => handleCategoryChange(null)}
        type="button"
      >
        {t("allCategories")}
      </button>
      {categories.map((category) => (
        <CategoryButton
          category={category}
          key={category.id}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}

type CategoryButtonProps = {
  selectedCategory: string;
  category: CustomCategory;
  onCategoryChange: (value: string | null) => void;
};

function CategoryButton({
  selectedCategory,
  category,
  onCategoryChange,
}: CategoryButtonProps) {
  const { slug, id, title } = category;
  const isSelected = selectedCategory === slug;
  return (
    <button
      className={cn(
        "px-3 py-1.5",
        "rounded-full",
        "transition-colors",
        "cursor-pointer",
        "font-medium",
        "text-muted-foreground text-xs hover:text-primary",
        "border border-border hover:border-primary",
        isSelected &&
          "border-primary bg-primary text-primary-foreground hover:text-primary-foreground"
      )}
      key={id}
      onClick={() => onCategoryChange(selectedCategory === slug ? null : slug)}
      type="button"
    >
      {title}
    </button>
  );
}

// ==============================================
// 💱
function OnSaleFilter({
  onSale,
  setOnSale,
}: {
  onSale: boolean;
  setOnSale: (value: boolean | null) => void;
}) {
  // 🌐
  const t = useTranslations("shop");

  return (
    <label className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm">
      <input
        checked={onSale}
        className="cursor-pointer accent-primary"
        onChange={(e) => setOnSale(e.target.checked || null)}
        type="checkbox"
      />
      {t("onSale")}
    </label>
  );
}

// ==============================================
// ↩️
function ResetFilters({ clearFilters }: { clearFilters: () => void }) {
  // 🌐
  const t = useTranslations("shop");

  return (
    <button
      className={cn(
        "flex items-center gap-x-1",
        "ml-auto",
        "cursor-pointer",
        "text-muted-foreground text-sm",
        "transition-colors",
        "hover:text-destructive"
      )}
      onClick={clearFilters}
      type="button"
    >
      <X className="size-3.5" />
      {t("reset")}
    </button>
  );
}
