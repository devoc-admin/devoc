export function normalizeUrl({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}) {
  try {
    const parsed = new URL(url, baseUrl);

    // Remove trailing slash for consistency (root "/" becomes "")
    let pathname = parsed.pathname;
    if (pathname.endsWith("/")) {
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

    // Build normalized URL - only lowercase protocol and host (they're case-insensitive)
    // Keep path and query case-sensitive for Linux/Unix servers
    const normalizedOrigin = `${parsed.protocol.toLowerCase()}//${parsed.host.toLowerCase()}`;
    let normalized = normalizedOrigin + pathname;
    const queryString = cleanParams.toString();
    if (queryString) {
      normalized += `?${queryString}`;
    }

    return normalized;
  } catch {
    // For malformed URLs, try to at least lowercase the protocol/host portion
    try {
      const parsed = new URL(url);
      return `${parsed.protocol.toLowerCase()}//${parsed.host.toLowerCase()}${parsed.pathname}${parsed.search}`;
    } catch {
      return url;
    }
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

export function toAbsoluteUrl({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}): string | null {
  try {
    // Ignore special URLs
    if (
      url.startsWith("#") ||
      url.startsWith("javascript:") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("data:")
    ) {
      return null;
    }

    const parsed = new URL(url, baseUrl);

    // Remove trailing slash from pathname (including root for consistency)
    let pathname = parsed.pathname;
    if (pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Rebuild URL without trailing slash
    return `${parsed.origin}${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}
