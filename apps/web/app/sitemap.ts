import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

const PATHS = [
  "",
  "/pack-communes",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE_URL}${path}` }));
}
