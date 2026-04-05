import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dev-oc.fr";
  const currentDate = new Date();

  return [
    {
      changeFrequency: "monthly",
      lastModified: currentDate,
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "monthly",
      lastModified: currentDate,
      priority: 0.8,
      url: `${baseUrl}/#services`,
    },
    {
      changeFrequency: "weekly",
      lastModified: currentDate,
      priority: 0.8,
      url: `${baseUrl}/#realisations`,
    },
    {
      changeFrequency: "monthly",
      lastModified: currentDate,
      priority: 0.7,
      url: `${baseUrl}/#contact`,
    },
    {
      changeFrequency: "yearly",
      lastModified: currentDate,
      priority: 0.3,
      url: `${baseUrl}/mentions-legales`,
    },
    {
      changeFrequency: "yearly",
      lastModified: currentDate,
      priority: 0.3,
      url: `${baseUrl}/politique-de-confidentialite`,
    },
  ];
}
