import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import type { BlogPost, Product } from "@/payload-types";

type StaticRoute = {
  frPath: string;
  enPath: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: StaticRoute[] = [
  { changeFrequency: "daily", enPath: "", frPath: "", priority: 1.0 },
  {
    changeFrequency: "daily",
    enPath: "/shop",
    frPath: "/boutique",
    priority: 0.8,
  },
  {
    changeFrequency: "weekly",
    enPath: "/blog",
    frPath: "/blog",
    priority: 0.8,
  },
  {
    changeFrequency: "monthly",
    enPath: "/contact",
    frPath: "/contact",
    priority: 0.5,
  },
  { changeFrequency: "monthly", enPath: "/faq", frPath: "/faq", priority: 0.5 },
  {
    changeFrequency: "weekly",
    enPath: "/reviews",
    frPath: "/avis",
    priority: 0.5,
  },
  {
    changeFrequency: "monthly",
    enPath: "/about",
    frPath: "/a-propos",
    priority: 0.5,
  },
  {
    changeFrequency: "yearly",
    enPath: "/terms",
    frPath: "/cgv",
    priority: 0.3,
  },
  {
    changeFrequency: "yearly",
    enPath: "/legal-notice",
    frPath: "/mentions-legales",
    priority: 0.3,
  },
  {
    changeFrequency: "yearly",
    enPath: "/privacy-policy",
    frPath: "/politique-confidentialite",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const payload = await getPayloadClient();

  const entries: MetadataRoute.Sitemap = [];

  // Static routes for both locales
  for (const route of staticRoutes) {
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.enPath}`,
          fr: `${baseUrl}/fr${route.frPath}`,
        },
      },
      changeFrequency: route.changeFrequency,
      lastModified: new Date(),
      priority: route.priority,
      url: `${baseUrl}/fr${route.frPath}`,
    });
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.enPath}`,
          fr: `${baseUrl}/fr${route.frPath}`,
        },
      },
      changeFrequency: route.changeFrequency,
      lastModified: new Date(),
      priority: route.priority,
      url: `${baseUrl}/en${route.enPath}`,
    });
  }

  // Dynamic product routes
  const products = await payload.find({
    collection: "products",
    depth: 0,
    limit: 1000,
    where: { status: { equals: "published" } },
  });

  for (const product of products.docs as Product[]) {
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en/shop/${product.slug}`,
          fr: `${baseUrl}/fr/boutique/${product.slug}`,
        },
      },
      changeFrequency: "weekly",
      lastModified: new Date(product.updatedAt),
      priority: 0.7,
      url: `${baseUrl}/fr/boutique/${product.slug}`,
    });
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en/shop/${product.slug}`,
          fr: `${baseUrl}/fr/boutique/${product.slug}`,
        },
      },
      changeFrequency: "weekly",
      lastModified: new Date(product.updatedAt),
      priority: 0.7,
      url: `${baseUrl}/en/shop/${product.slug}`,
    });
  }

  // Dynamic blog post routes
  const posts = await payload.find({
    collection: "blog-posts",
    depth: 0,
    limit: 1000,
    where: { status: { equals: "published" } },
  });

  for (const post of posts.docs as BlogPost[]) {
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          fr: `${baseUrl}/fr/blog/${post.slug}`,
        },
      },
      changeFrequency: "monthly",
      lastModified: new Date(post.updatedAt),
      priority: 0.7,
      url: `${baseUrl}/fr/blog/${post.slug}`,
    });
    entries.push({
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          fr: `${baseUrl}/fr/blog/${post.slug}`,
        },
      },
      changeFrequency: "monthly",
      lastModified: new Date(post.updatedAt),
      priority: 0.7,
      url: `${baseUrl}/en/blog/${post.slug}`,
    });
  }

  return entries;
}
