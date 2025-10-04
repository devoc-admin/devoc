/** biome-ignore-all lint/style/useNamingConvention: specific file */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dev'Oc - Agence Web en Occitanie",
    short_name: "Dev'Oc",
    description:
      "Agence web en Occitanie spécialisée en développement de sites internet, applications web, UX/UI et le référencement.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#a855f7",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity", "ia", "utilities"],
    lang: "fr",
    orientation: "portrait-primary",
  };
}
