import type { MetadataRoute } from "next";
import { getBaseUrl, SITE_INDEXABLE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Crawling stays allowed so engines can read the noindex and drop any page
  // already indexed; a Disallow would hide it from them.
  if (!SITE_INDEXABLE) {
    return { rules: { allow: "/", userAgent: "*" } };
  }

  const baseUrl = getBaseUrl();

  return {
    rules: {
      allow: "/",
      disallow: ["/admin/", "/api/", "/*/panier", "/*/commande", "/*/compte"],
      userAgent: "*",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
