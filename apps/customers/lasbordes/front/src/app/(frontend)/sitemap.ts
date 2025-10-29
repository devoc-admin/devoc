import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lasbordes11400.fr";

  const routes = [
    "",
    "/actualites",
    "/actualites/inauguration-salle-polyvalente",
    "/actualites/collecte-dechets-verts",
    "/actualites/marche-noel-2024",
    "/mairie",
    "/services",
    "/histoire",
    "/vie-culturelle-associative",
    "/commerces",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/accessibilite",
  ];

  // Constants for priority values
  const PRIORITY_HOME = 1;
  const PRIORITY_ACTUALITE_DETAIL = 0.8;
  const PRIORITY_DEFAULT = 0.7;

  return routes.map((route) => {
    const isHome = route === "";
    const isActualitesIndex = route === "/actualites";
    const isActualitesDetail =
      route.startsWith("/actualites/") && !isActualitesIndex;

    const changeFrequency = isHome || isActualitesIndex ? "daily" : "weekly";

    let priority = PRIORITY_DEFAULT;
    if (isHome) {
      priority = PRIORITY_HOME;
    } else if (isActualitesDetail) {
      priority = PRIORITY_ACTUALITE_DETAIL;
    }

    return {
      changeFrequency,
      lastModified: new Date(),
      priority,
      url: `${baseUrl}${route}`,
    };
  });
}
