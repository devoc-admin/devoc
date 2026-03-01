import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {
  FadeInUp,
  StaggerContainerOnScroll,
  StaggerItem,
} from "@/components/motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatPrice } from "@/lib/format";
import { buildBreadcrumbList, buildProduct } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import {
  applyDiscount,
  getPriceRange,
  getProductImage,
  hasActivePromotion,
} from "@/lib/product";
import { buildOgImage, getBaseUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Media, Product } from "@/payload-types";
import { AddToCartButton } from "./_components/AddToCartButton";
import { ProductGallery } from "./_components/ProductGallery";

async function getProduct(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "products",
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
  });
  return (result.docs[0] as Product) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const firstImage = getProductImage(product);
  const ogImage = buildOgImage(product.seo?.image ?? firstImage);

  return {
    description:
      product.seo?.description ?? product.shortDescription ?? undefined,
    openGraph: {
      images: ogImage ? [ogImage] : undefined,
      type: "website",
    },
    title: product.seo?.title ?? product.title,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // 🌐
  const t = await getTranslations("product");
  // 📦
  const payload = await getPayloadClient();

  // 🖼️
  const images: Media[] = (product.images ?? [])
    .map((entry) => (typeof entry.image === "number" ? null : entry.image))
    .filter(Boolean) as Media[];

  const mainImage = getProductImage(product);

  // 💰
  const promo = hasActivePromotion(product.promotion);
  const { hasRange, min } = getPriceRange(product);
  const discounted = promo ? applyDiscount(min, product.promotion) : min;

  // 🟡
  const categoryTitle =
    typeof product.category === "object" ? product.category.title : null;

  // 🔗
  const categoryId =
    typeof product.category === "object"
      ? product.category.id
      : product.category;
  const relatedResult = await payload.find({
    collection: "products",
    depth: 2,
    limit: 4,
    where: {
      and: [
        { category: { equals: categoryId } },
        { id: { not_equals: product.id } },
        { status: { equals: "published" } },
      ],
    },
  });

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd
        data={[
          buildProduct(product),
          buildBreadcrumbList([
            { name: "Accueil", url: baseUrl },
            { name: "Boutique", url: `${baseUrl}/fr/boutique` },
            {
              name: product.title,
              url: `${baseUrl}/fr/boutique/${product.slug}`,
            },
          ]),
        ]}
      />

      {/* 📦 */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* 🖼️ */}
        <ProductGallery images={images} />

        {/* 📝 */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-col gap-4">
            {/* 🟡 */}
            {categoryTitle && (
              <ProductCategory>{categoryTitle}</ProductCategory>
            )}

            {/* 🆎 */}
            <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
              {product.title}
            </h1>

            {/* 📝 */}
            {product.shortDescription && (
              <p className="text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* 💰 */}
            <ProductPrice
              discounted={discounted}
              hasRange={hasRange}
              min={min}
              promo={promo}
              promotion={product.promotion}
            />

            <hr className="border-border/50" />

            {/* 🛒 */}
            <AddToCartButton image={mainImage} product={product} />

            {/* 🔖 */}
            {product.variants?.[0]?.sku && (
              <p className="text-muted-foreground/60 text-xs">
                {t("sku")}: {product.variants[0].sku}
              </p>
            )}
          </div>
        </FadeInUp>
      </div>

      {/* 🔗 */}
      {relatedResult.docs.length > 0 && (
        <RelatedProducts products={relatedResult.docs as Product[]} t={t} />
      )}
    </div>
  );
}

// =================================
// 🟡
function ProductCategory({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "font-medium",
        "text-accent text-xs",
        "uppercase tracking-wider"
      )}
    >
      {children}
    </span>
  );
}

// =================================
// 💰
function ProductPrice({
  discounted,
  hasRange,
  min,
  promo,
  promotion,
}: {
  discounted: number;
  hasRange: boolean;
  min: number;
  promo: boolean;
  promotion: Product["promotion"];
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-accent font-semibold text-2xl text-primary">
        {hasRange ? "dès " : ""}
        {formatPrice(discounted)}
      </span>
      {promo && (
        <span className="text-lg text-muted-foreground line-through">
          {formatPrice(min)}
        </span>
      )}
      {promo && <PromoBadge promotion={promotion} />}
    </div>
  );
}

// =================================
// 🏷️
function PromoBadge({ promotion }: { promotion: Product["promotion"] }) {
  return (
    <span
      className={cn(
        "rounded",
        "bg-destructive/10",
        "px-2 py-0.5",
        "font-semibold text-destructive text-xs"
      )}
    >
      {promotion?.type === "percentage"
        ? `-${promotion.value}%`
        : `-${formatPrice(promotion?.value ?? 0)}`}
    </span>
  );
}

// =================================
// 🔗
function RelatedProducts({
  products,
  t,
}: {
  products: Product[];
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <section className="mt-16">
      <h2 className="font-heading text-2xl text-foreground">
        {t("relatedProducts")}
      </h2>
      <StaggerContainerOnScroll
        className={cn(
          "mt-6",
          "grid",
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "gap-4 sm:gap-6"
        )}
      >
        {products.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </StaggerContainerOnScroll>
    </section>
  );
}
