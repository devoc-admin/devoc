import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/base-path";

// Dynamic manifest so icon `src` paths get the Multi-Zones basePath prefix.
// Next applies basePath to the <link rel="manifest"> href automatically, but
// NOT to the icon `src` values inside the manifest body — hence BASE_PATH here.
export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: `${BASE_PATH}/web-app-manifest-192x192.png`,
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: `${BASE_PATH}/web-app-manifest-512x512.png`,
        type: "image/png",
      },
    ],
    name: "Saveurs d'Aude",
    short_name: "Saveurs d'Aude",
    theme_color: "#ffffff",
  };
}
