import type { CrawlConfig } from "@/lib/db/schema";

export function normalizeUrl({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}) {
  try {
    const parsed = new URL(url, baseUrl);

    // Delete trailing slash (except for root path)
    let pathname = parsed.pathname;
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Remove search params
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "ref",
      "source",
    ];

    const cleanParams = new URLSearchParams();
    for (const [key, value] of parsed.searchParams) {
      if (!trackingParams.includes(key.toLowerCase())) {
        cleanParams.append(key, value);
      }
    }

    // Build normalized URL
    let normalized = parsed.origin + pathname;
    const queryString = cleanParams.toString();
    if (queryString) {
      normalized += `?${queryString}`;
    }

    return normalized.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

export function isInternalUrl({
  url,
  baseOrigin,
}: {
  url: string;
  baseOrigin: string;
}): boolean {
  try {
    const parsed = new URL(url);
    return parsed.origin === baseOrigin;
  } catch {
    return !url.startsWith("http");
  }
}

export function shouldCrawlUrl({
  url,
  config,
}: {
  url: string;
  config: CrawlConfig;
}): boolean {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();

    // 📂 Extensions à ignorer (ressources statiques)
    const skipExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".svg",
      ".webp",
      ".css",
      ".js",
      ".woff",
      ".woff2",
      ".ttf",
      ".eot",
      ".zip",
      ".rar",
      ".tar",
      ".gz",
      ".mp3",
      ".mp4",
      ".avi",
      ".mov",
      ".webm",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
    ];

    if (skipExtensions.some((ext) => path.endsWith(ext))) {
      return false;
    }

    // 🚫 Vérifie les chemins exclus
    if (
      config.excludePaths?.some((pattern) =>
        path.includes(pattern.toLowerCase())
      )
    ) {
      return false;
    }

    // ✅ Vérifie les chemins inclus (si spécifiés)
    if (config.includePaths?.length) {
      return config.includePaths.some((pattern) =>
        path.includes(pattern.toLowerCase())
      );
    }

    return true;
  } catch {
    return false;
  }
}

export function toAbsoluteUrl({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}): string | null {
  try {
    // Ignore les URLs spéciales
    if (
      url.startsWith("#") ||
      url.startsWith("javascript:") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("data:")
    ) {
      return null;
    }

    return new URL(url, baseUrl).href;
  } catch {
    return null;
  }
}
