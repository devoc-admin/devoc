import type { BlogPost, Faq, Media, Product } from "@/payload-types";
import { getLowestPrice } from "./product";
import { getBaseUrl, getMediaUrl } from "./seo";

type JsonLd = Record<string, unknown>;

export function buildLocalBusiness(): JsonLd {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@id": `${baseUrl}/#localbusiness`,
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressLocality: "Carcassonne",
      addressRegion: "Occitanie",
      postalCode: "11000",
      streetAddress: "Carcassonne",
    },
    description:
      "Boutique de spécialités audoises et occitanes artisanales. Cassoulet, vins, miels, confits et douceurs du Sud.",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2107,
      longitude: 2.3491,
    },
    image: `${baseUrl}/saveurs_aude_logo_no_margin.svg`,
    name: "Saveurs d'Aude",
    priceRange: "€€",
    telephone: "+33468000000",
    url: baseUrl,
  };
}

export function buildProduct(product: Product): JsonLd {
  const baseUrl = getBaseUrl();
  const image = product.images?.[0];
  const imageUrl =
    image && typeof image.image !== "number" ? image.image.url : undefined;
  const lowestPrice = getLowestPrice(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    description: product.shortDescription ?? undefined,
    image: imageUrl ?? undefined,
    name: product.title,
    offers: {
      "@type": "Offer",
      availability: product.variants?.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price: (lowestPrice / 100).toFixed(2),
      priceCurrency: "EUR",
      url: `${baseUrl}/fr/boutique/${product.slug}`,
    },
    sku: product.variants?.[0]?.sku ?? undefined,
    url: `${baseUrl}/fr/boutique/${product.slug}`,
  };
}

export function buildFAQPage(entries: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: extractTextFromRichText(entry.answer),
      },
      name: entry.question,
    })),
  };
}

export function buildBlogPosting(post: BlogPost): JsonLd {
  const baseUrl = getBaseUrl();
  const coverUrl =
    typeof post.coverImage === "object" && post.coverImage
      ? getMediaUrl(post.coverImage as Media)
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: "Saveurs d'Aude" },
    dateModified: post.updatedAt,
    datePublished: post.publishedAt,
    description: post.excerpt ?? undefined,
    headline: post.title,
    image: coverUrl ?? undefined,
    publisher: {
      "@type": "Organization",
      name: "Saveurs d'Aude",
      url: baseUrl,
    },
    url: `${baseUrl}/fr/blog/${post.slug}`,
  };
}

export function buildBreadcrumbList(
  items: { name: string; url: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: item.url,
      name: item.name,
      position: index + 1,
    })),
  };
}

function extractTextFromRichText(richText: Faq["answer"]): string {
  if (!richText?.root?.children) return "";
  return richText.root.children
    .map((child: Record<string, unknown>) => extractNodeText(child))
    .filter(Boolean)
    .join(" ");
}

function extractNodeText(node: Record<string, unknown>): string {
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map(extractNodeText).filter(Boolean).join("");
  }
  return "";
}
