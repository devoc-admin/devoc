import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: [
      {
        allow: "/",
        disallow: ["/private/"],
        userAgent: "*",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
