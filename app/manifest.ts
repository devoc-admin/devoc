/** biome-ignore-all lint/style/useNamingConvention: specific file */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dev'Oc - Création de sites & applications",
    short_name: "Dev'Oc",
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#a855f7",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity", "ia", "utilities"],
    lang: "fr",
    orientation: "portrait-primary",
  };
}
