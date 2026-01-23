/**
 * Validates if a string is a valid URL format.
 * Does NOT check if the URL is accessible.
 *
 * @param url - The string to validate
 * @returns true if the string is a valid URL, false otherwise
 */
export function isValidUrlFormat(url: string): boolean {
  try {
    const urlObject = new URL(url);
    return ["http:", "https:"].includes(urlObject.protocol);
  } catch {
    return false;
  }
}

/**
 * Validates that a URL is a Google Maps or Apple Maps link pointing to a specific location.
 */
export function isValidMapsUrl(url: string): boolean {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname.toLowerCase();

    // Google Maps validation
    if (
      hostname === "www.google.com" ||
      hostname === "google.com" ||
      hostname === "maps.google.com"
    ) {
      // Must be a maps URL with a place or coordinates
      // Example: /maps/place/... or /maps/@lat,lng
      const pathname = urlObject.pathname;
      return pathname.includes("/maps/place/") || pathname.includes("/maps/@");
    }

    // Google short URLs (goo.gl/maps)
    if (hostname === "goo.gl" && urlObject.pathname.startsWith("/maps/")) {
      return true;
    }

    // Apple Maps validation
    if (hostname === "maps.apple.com") {
      // Must have location parameters (ll, q, address, or daddr)
      const params = urlObject.searchParams;
      return (
        params.has("ll") ||
        params.has("q") ||
        params.has("address") ||
        params.has("daddr")
      );
    }

    return false;
  } catch {
    return false;
  }
}
