import { getTranslations } from "next-intl/server";
import type { Where } from "payload";
import { ProductCard } from "@/components/shop/ProductCard";
import { getPayloadClient } from "@/lib/payload";
import type { Category, Product } from "@/payload-types";
import { ProductFilters } from "./_components/ProductFilters";
import { searchParamsCache } from "./_search-params";

const PRODUCTS_PER_PAGE = 12;

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

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category, onSale, page, q, sort } =
    await searchParamsCache.parse(searchParams);
  const t = await getTranslations("shop");
  const payload = await getPayloadClient();

  // Fetch categories for filter bar
  const categoriesResult = await payload.find({
    collection: "categories",
    limit: 50,
    sort: "order",
  });

  // Build product query
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
    page,
    sort: getSortField(sort),
    where,
  });

  const products = productsResult.docs as Product[];
  const categories = categoriesResult.docs as Category[];
  const { totalDocs, totalPages } = productsResult;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">
        {t("allCategories")}
      </h1>
      <p className="mt-1 text-muted-foreground text-sm">
        {t("results", { count: totalDocs })}
      </p>

      <div className="mt-6">
        <ProductFilters
          categories={categories.map((c) => ({
            id: c.id,
            slug: c.slug,
            title: c.title,
          }))}
        />
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("noProducts")}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {pages.map((p) => (
        <a
          className={
            p === currentPage
              ? "rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm"
              : "rounded-lg border border-border px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
          }
          href={`?page=${p}`}
          key={p}
        >
          {p}
        </a>
      ))}
    </nav>
  );
}
