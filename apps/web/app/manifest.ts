/** biome-ignore-all lint/style/useNamingConvention: specific file */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#000000",
    categories: ["business", "productivity", "ia", "utilities"],
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet numérique.",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/icon-192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/icon-512.png",
        type: "image/png",
      },
    ],
    lang: "fr",
    name: "Dev'Oc - Création de sites & applications",
    orientation: "portrait-primary",
    short_name: "Dev'Oc",
    start_url: "/",
    theme_color: "#a855f7",
  };
}
