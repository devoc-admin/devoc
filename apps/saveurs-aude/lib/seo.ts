import type { Media } from "@/payload-types";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://saveurs-aude.fr";
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
    alt: media.alt ?? "",
    height: media.height ?? 630,
    url: media.url,
    width: media.width ?? 1200,
  };
}
