import type { Page } from "playwright";
import type { SeoDetectionResult } from "../types";

/**
 * Detects SEO and structured data on a page.
 * Extracts: meta tags, Open Graph, Twitter Cards, JSON-LD schemas, hreflang
 */
export async function detectSeo({
  page,
}: {
  page: Page;
}): Promise<SeoDetectionResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: SEO detection requires multiple sequential meta extraction
  return await page.evaluate(() => {
    type JsonLdSchemaTypeLocal =
      | "Organization"
      | "LocalBusiness"
      | "Product"
      | "Article"
      | "WebSite"
      | "WebPage"
      | "BreadcrumbList"
      | "FAQPage"
      | "Other";

    type JsonLdSchemaLocal = {
      type: JsonLdSchemaTypeLocal;
      raw: Record<string, unknown>;
    };

    // Helper to get meta content by name or property
    function getMetaContent(nameOrProperty: string): string | undefined {
      const meta =
        document.querySelector(`meta[name="${nameOrProperty}"]`) ??
        document.querySelector(`meta[property="${nameOrProperty}"]`);
      return meta?.getAttribute("content") ?? undefined;
    }

    // Basic meta tags
    const title = document.querySelector("title")?.textContent ?? undefined;
    const description = getMetaContent("description");
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonicalLink?.getAttribute("href") ?? undefined;
    const robotsMeta = getMetaContent("robots");

    // Open Graph
    const ogTitle = getMetaContent("og:title");
    const ogDescription = getMetaContent("og:description");
    const ogImage = getMetaContent("og:image");
    const ogType = getMetaContent("og:type");
    const ogSiteName = getMetaContent("og:site_name");

    // Twitter Cards
    const twitterCard = getMetaContent("twitter:card");
    const twitterTitle = getMetaContent("twitter:title");
    const twitterDescription = getMetaContent("twitter:description");
    const twitterImage = getMetaContent("twitter:image");

    // Hreflang
    const hreflangLinks = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    const hasHreflang = hreflangLinks.length > 0;
    const hreflangCount =
      hreflangLinks.length > 0 ? hreflangLinks.length : undefined;

    // JSON-LD schemas
    const jsonLdSchemas: JsonLdSchemaLocal[] = [];
    const jsonLdScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    // Map @type to our known schema types
    function mapSchemaType(type: string): JsonLdSchemaTypeLocal {
      const typeMap: Record<string, JsonLdSchemaTypeLocal> = {
        Article: "Article",
        BreadcrumbList: "BreadcrumbList",
        FAQPage: "FAQPage",
        LocalBusiness: "LocalBusiness",
        Organization: "Organization",
        Product: "Product",
        WebPage: "WebPage",
        WebSite: "WebSite",
      };
      return typeMap[type] ?? "Other";
    }

    // Process a single JSON-LD object
    function processJsonLdObject(obj: Record<string, unknown>): void {
      const type = obj["@type"];
      if (typeof type === "string") {
        jsonLdSchemas.push({
          raw: obj,
          type: mapSchemaType(type),
        });
      } else if (Array.isArray(type) && type.length > 0) {
        // Some schemas use array of types, take the first
        jsonLdSchemas.push({
          raw: obj,
          type: mapSchemaType(String(type[0])),
        });
      }
    }

    for (const script of jsonLdScripts) {
      try {
        const content = script.textContent;
        if (!content) continue;

        const parsed = JSON.parse(content) as Record<string, unknown>;

        // Handle @graph arrays (multiple schemas in one script)
        if (Array.isArray(parsed["@graph"])) {
          for (const item of parsed["@graph"]) {
            if (item && typeof item === "object") {
              processJsonLdObject(item as Record<string, unknown>);
            }
          }
        } else if (Array.isArray(parsed)) {
          // Handle array of schemas
          for (const item of parsed) {
            if (item && typeof item === "object") {
              processJsonLdObject(item as Record<string, unknown>);
            }
          }
        } else {
          // Single schema object
          processJsonLdObject(parsed);
        }
      } catch {
        // Invalid JSON-LD, skip
      }
    }

    const hasStructuredData = jsonLdSchemas.length > 0;

    return {
      basicMeta: {
        canonicalUrl,
        description,
        robotsMeta,
        title,
      },
      hasHreflang,
      hasStructuredData,
      hreflangCount,
      jsonLdSchemas,
      openGraph: {
        description: ogDescription,
        image: ogImage,
        siteName: ogSiteName,
        title: ogTitle,
        type: ogType,
      },
      twitterCard: {
        card: twitterCard,
        description: twitterDescription,
        image: twitterImage,
        title: twitterTitle,
      },
    };
  });
}
