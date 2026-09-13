import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dev-oc.fr";

  return {
    host: baseUrl,
    rules: [
      {
        allow: "/",
        disallow: ["/_next/", "/private/"],
        userAgent: "*",
      },
      {
        disallow: "/",
        userAgent: "GPTBot",
      },
      {
        disallow: "/",
        userAgent: "ChatGPT-User",
      },
      {
        disallow: "/",
        userAgent: "CCBot",
      },
      {
        disallow: "/",
        userAgent: "anthropic-ai",
      },
      {
        disallow: "/",
        userAgent: "Claude-Web",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
