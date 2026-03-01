import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Where } from "payload";
import { JsonLd } from "@/components/JsonLd";
import {
  FadeInUp,
  StaggerContainerOnScroll,
  StaggerItem,
} from "@/components/motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { buildBreadcrumbList } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/payload-types";
import { ProductFilters } from "./_components/ProductFilters";
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
    page,
    sort: getSortField(sort),
    where,
  });

  const products = productsResult.docs as Product[];
  const { totalDocs: count, totalPages } = productsResult;

  // 🌐
  const baseUrl = getBaseUrl();

  return (
    <div
      className={cn(
        "space-y-8",
        "mx-auto",
        "max-w-6xl",
        "px-4 py-8",
        "sm:px-6"
      )}
    >
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", url: baseUrl },
          { name: "Boutique", url: `${baseUrl}/fr/boutique` },
        ])}
      />
      {/* 🆎 */}
      <FadeInUp>
        <AllCategories />
        <Results count={count} />
      </FadeInUp>

      {/* 🟡🟡🟡 */}
      <Categories />

      {/* 🪴🪴🪴 */}
      {products.length > 0 ? (
        <StaggerContainerOnScroll
          className={cn(
            "grid",
            "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            "gap-4 sm:gap-6"
          )}
        >
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainerOnScroll>
      ) : (
        /*🙅🪴*/
        <NoProducts />
      )}

      {/* 📃 */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

// =================================
// 🆎
async function AllCategories() {
  // 🗣️
  const t = await getTranslations("shop");
  return (
    <h1 className="font-heading text-2xl text-primary sm:text-3xl">
      {t("allCategories")}
    </h1>
  );
}

async function Results({ count }: { count: number }) {
  // 🗣️
  const t = await getTranslations("shop");

  return (
    <p className="mt-1 text-muted-foreground text-sm">
      {t("results", { count })}
    </p>
  );
}

// =================================
// 🟡

const MAX_CATEGORIES = 50;
async function Categories() {
  // 📦
  const payload = await getPayloadClient();

  // 🐝
  const categoriesResult = await payload.find({
    collection: "categories",
    limit: MAX_CATEGORIES,
    sort: "order",
  });

  const categories = categoriesResult.docs as Category[];
  const formattedCategories = categories.map(({ id, slug, title }) => ({
    id,
    slug,
    title,
  }));

  return <ProductFilters categories={formattedCategories} />;
}

// =================================
// 🙅🪴
async function NoProducts() {
  // 🗣️
  const t = await getTranslations("shop");
  return (
    <div className="mt-16 text-center">
      <p className="text-muted-foreground">{t("noProducts")}</p>
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
