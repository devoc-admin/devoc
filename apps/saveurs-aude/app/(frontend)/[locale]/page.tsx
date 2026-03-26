import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ViewTransition } from "react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { getTypedLocale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { getProductImage } from "@/lib/product";
import { getBaseUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/payload-types";
import Hero from "./_components/hero/hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    description: t("homeDescription"),
    title: "Saveurs d'Aude — Spécialités artisanales de Carcassonne",
  };
}

export default function HomePage() {
  return (
    <>
      {/* 🆘 */}
      <SEO />
      {/* 🦸‍♂️ */}
      <Hero />
      <div
        className={cn(
          "max-w-[900px]",
          "mx-auto",
          "px-6",
          "md:px-6",
          "py-24",
          "space-y-24"
        )}
      >
        <NotreSelection />
        <NosUniversGourmands />
      </div>
      <FadeIn>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "px-4 pb-20"
          )}
        >
          {/*♿*/}
          <AccessibleTitle />
        </div>
      </FadeIn>
    </>
  );
}

// ===================================
// 🆎 Section title

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={cn(
        "text-4xl",
        "text-center",
        "text-primary",
        "font-medium",
        "uppercase"
      )}
    >
      {children}
    </h3>
  );
}

// ===================================
// 🛒
async function NotreSelection() {
  // 🌐
  const locale = await getTypedLocale();
  const t = await getTranslations({ locale, namespace: "home" });

  // 📦
  const payload = await getPayloadClient();

  const productsResult = await payload.find({
    collection: "products",
    depth: 2,
    limit: 10,
    locale,
    select: {
      category: true,
      description: true,
      images: true,
      slug: true,
      title: true,
      variants: true,
    },
  });

  // 📦
  const selectedProducts = shuffleAndPick<Partial<Product>>(
    productsResult.docs,
    3
  );

  return (
    <div className={cn("flex flex-col items-center", "space-y-12")}>
      <SectionTitle>{t("ourSelection")}</SectionTitle>
      <div
        className={cn(
          "w-full",
          "grid",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "gap-10"
        )}
      >
        {selectedProducts.map((product, index) => (
          <ProductCardHomepage key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCardHomepage({
  product,
  seeProductLabel,
}: {
  product: Partial<Product>;
}) {
  // 🖼️
  const image = getProductImage(product);
  const imageUrl = image?.url;
  const imageAlt = image?.alt || product.title;
  const { slug } = product;
  if (!(imageUrl && imageAlt && slug)) return null;

  return (
    <Link
      className={cn("flex flex-col items-center gap-y-2")}
      href={{
        params: { slug },
        pathname: "/boutique/[slug]",
      }}
      key={product.slug}
    >
      <ProductImage product={product} />
      <div className="space-y-1">
        <ProductTitle product={product} />
        <ProductQuantity product={product} />
      </div>
      <div className="mt-auto space-y-6">
        <ProductPrice product={product} />
        <SeeProduct product={product} />
      </div>
    </Link>
  );
}

// 🖼️
function ProductImage({ product }: { product: Partial<Product> }) {
  // 🖼️
  const image = getProductImage(product);
  const imageUrl = image?.url;
  const imageAlt = image?.alt || product.title;
  const { slug } = product;

  if (!(imageUrl && imageAlt && slug)) return null;
  return (
    <ViewTransition name={`product-image-${slug}`}>
      <div
        className={cn(
          "relative",
          "rounded-md",
          "overflow-hidden",
          "aspect-4/5",
          "min-w-58",
          "w-full",
          "max-w-90"
        )}
      >
        <Image
          alt={imageAlt}
          fill
          src={imageUrl}
          style={{ objectFit: "cover" }}
        />
      </div>
    </ViewTransition>
  );
}

// 🆎 Title
function ProductTitle({ product }: { product: Partial<Product> }) {
  return (
    <div className={cn("text-lg", "text-center font-bold leading-tight")}>
      {product.title}
    </div>
  );
}

// 🔢 Quantity
function ProductQuantity({ product }: { product: Partial<Product> }) {
  const label = product?.variants?.[0]?.label;
  if (!label) return null;

  return <div className={cn("text-base", "text-center")}>{label}</div>;
}

//💰 Price
function ProductPrice({ product }: { product: Partial<Product> }) {
  const price = product?.variants?.[0]?.price;
  if (!price) return null;
  return (
    <div
      className={cn(
        "text-2xl",
        "font-bold",
        "font-heading",
        "text-primary",
        "text-center"
      )}
    >
      {formatPrice(price)}
    </div>
  );
}

// 🛒
async function SeeProduct({ product }: { product: Partial<Product> }) {
  // 🌐
  const locale = await getTypedLocale();
  const t = await getTranslations({ locale, namespace: "home" });

  const { slug } = product;
  if (!slug) return null;

  return (
    <button
      className={cn(
        "px-5 py-2.5",
        "transition-colors",
        "hover:bg-primary/90",
        "bg-primary",
        "mt-2",
        "text-primary-foreground",
        "font-semibold",
        "rounded-lg",
        "text-sm",
        "cursor-pointer"
      )}
      type="button"
    >
      {t("seeProduct")}
    </button>
  );
}
// ===================================
// 🥬
async function NosUniversGourmands() {
  // 📦
  const payload = await getPayloadClient();
  const locale = await getTypedLocale();
  const t = await getTranslations({ locale, namespace: "home" });

  const categoryResults = await payload.find({
    collection: "categories",
    depth: 2,
    limit: 10,
    locale,
    select: {
      image: true,
      slug: true,
      title: true,
    },
  });

  // 📦
  const selectedCategories = shuffleAndPick<Partial<Product>>(
    categoryResults.docs,
    3
  );

  return (
    <div className={cn("flex flex-col items-center", "space-y-12")}>
      <SectionTitle>{t("ourGourmetWorlds")}</SectionTitle>
      <div
        className={cn(
          "w-full",
          "grid",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "gap-10"
        )}
      >
        {selectedCategories.map((category, index) => (
          <CategoryCardHomepage
            category={category}
            key={index}
            seeProductLabel={t("ourGourmetWorlds")}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCardHomepage({
  category,
  seeProductLabel,
}: {
  category: Partial<Category>;
  seeProductLabel: string;
}) {
  return null;
  // 🖼️
  // const image = getProductImage(product);
  // const imageUrl = image?.url;
  // const imageAlt = image?.alt || product.title;
  // const { slug } = product;
  // if (!(imageUrl && imageAlt && slug)) return null;

  // return (
  //   <Link
  //     className={cn("flex flex-col items-center gap-y-2")}
  //     href={{
  //       params: { slug },
  //       pathname: "/boutique/[slug]",
  //     }}
  //     key={product.slug}
  //   >
  //     <ProductImage product={product} />
  //     <div className="space-y-1">
  //       <ProductTitle product={product} />
  //       <ProductQuantity product={product} />
  //     </div>
  //     <div className="mt-auto space-y-6">
  //       <ProductPrice product={product} />
  //       <SeeProduct label={seeProductLabel} product={product} />
  //     </div>
  //   </Link>
  // );
}

// ===================================
// 🆘
function SEO() {
  const baseUrl = getBaseUrl();

  return (
    <JsonLd
      data={[
        buildLocalBusiness(),
        buildBreadcrumbList([{ name: "Accueil", url: baseUrl }]),
      ]}
    />
  );
}

// ===================================
// ♿
function AccessibleTitle() {
  return <h1 className="sr-only">Saveurs d'Aude - Épicerie Fine</h1>;
}

// ==========================
function shuffleAndPick<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}
