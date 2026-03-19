import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Where } from "payload";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/shop/product-card";

import { getTypedLocale } from "@/i18n/routing";
import { buildBreadcrumbList } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/payload-types";
import { ProductFilters } from "./_components/product-filters";
import { searchParamsCache } from "./_search-params";

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // 🌐
  const { category, onSale, page, q, sort } =
    await searchParamsCache.parse(searchParams);

  // 📦
  const payload = await getPayloadClient();
  const locale = await getTypedLocale();

  // 🐝
  const where: Where = {
    status: { equals: "published" },
  };

  if (category) {
    where["category.slug"] = { equals: category };
  }

  if (q) {
    where.title = { contains: q };
  }

  if (onSale) {
    where["promotion.type"] = { exists: true };
  }

  const productsResult = await payload.find({
    collection: "products",
    depth: 2,
    limit: PRODUCTS_PER_PAGE,
    locale,
    page,
    sort: getSortField(sort),
    where,
  });

  const products = productsResult.docs as Product[];
  const { totalDocs: count, totalPages } = productsResult;

  // 🟡
  const categoriesResult = await payload.find({
    collection: "categories",
    limit: MAX_CATEGORIES,
    locale,
    sort: "order",
  });
  const categories = categoriesResult.docs as Category[];
  const formattedCategories = categories.map(({ id, slug, title }) => ({
    id,
    slug,
    title,
  }));

  const categoryTitle = category
    ? categories.find((c) => c.slug === category)?.title
    : null;

  // 🌐
  const t = await getTranslations("shop");

  return (
    <div
      className={cn(
        "space-y-8",
        "max-w-6xl",
        "mx-auto",
        "px-4 py-8",
        "sm:px-6"
      )}
    >
      <SEO />
      {/* 🆎 */}
      <div>
        <CurrentCategory title={categoryTitle ?? t("allCategories")} />
        <p className="mt-1 text-muted-foreground text-sm">
          {t("results", { count })}
        </p>
      </div>

      {/* 🟡🟡🟡 */}
      <ProductFilters categories={formattedCategories} />

      {/* 🪴🪴🪴 */}
      {products.length > 0 ? (
        <div
          className={cn(
            "grid",
            "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            "gap-4 sm:gap-6"
          )}
          key={`${category}-${q}-${sort}-${onSale}-${page}`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /*🙅🪴*/
        <NoProducts message={t("noProducts")} />
      )}

      {/* 📃 */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

// =================================
//🤖
function SEO() {
  const baseUrl = getBaseUrl();

  return (
    <JsonLd
      data={buildBreadcrumbList([
        { name: "Accueil", url: baseUrl },
        { name: "Boutique", url: `${baseUrl}/fr/boutique` },
      ])}
    />
  );
}

// =================================
// 🆎
const MAX_CATEGORIES = 50;

function CurrentCategory({ title }: { title: string }) {
  return (
    <h1 className="font-heading text-2xl text-primary sm:text-3xl">{title}</h1>
  );
}

// =================================
// 🙅🪴
function NoProducts({ message }: { message: string }) {
  return (
    <div className="mt-16 text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

// =================================
// 📃
type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      {pages.map((p) => (
        <a
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm",
            "border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary",
            p === currentPage &&
              "border-transparent bg-primary font-medium text-primary-foreground hover:text-primary-foreground"
          )}
          href={`?page=${p}`}
          key={p}
        >
          {p}
        </a>
      ))}
    </nav>
  );
}

// ================================
// 🐵
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tShop = await getTranslations({ locale, namespace: "shop" });
  return {
    description: t("shopDescription"),
    title: tShop("allCategories"),
  };
}

// ================================
// 🔧
function getSortField(sort: string): string {
  switch (sort) {
    case "price-asc":
      return "variants.price";
    case "price-desc":
      return "-variants.price";
    default:
      return "-createdAt";
  }
}
