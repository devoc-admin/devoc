import type { Media } from "@/payload-types";

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Set by Vercel: the project's production domain, without protocol.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export function getMediaUrl(
  media: Media | number | null | undefined
): string | null {
  if (!media || typeof media === "number") return null;
  return media.url ?? null;
}

export function buildOgImage(
  media: Media | number | null | undefined
): { alt: string; height: number; url: string; width: number } | null {
  if (!media || typeof media === "number") return null;
  if (!media.url) return null;

  return {
    alt: media.alt,
    height: media.height ?? 630,
    url: media.url,
    width: media.width ?? 1200,
  };
}
