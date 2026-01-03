"use server";
export async function isValidWebsite(url: string): Promise<boolean> {
  try {
    console.log("Checking website validity...");
    console.log("url", url);
    // Validate URL format first
    const urlObject = new URL(url);
    console.log("urlObject", urlObject);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObject.protocol)) {
      return false;
    }
    console.log("here");

    // 🐝 Make a HEAD request (lighter than GET)
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    console.log("response", response);

    // 🔍 Consider 2xx and 3xx as valid
    return response.ok || (response.status >= 300 && response.status < 400);
  } catch {
    return false;
  }
}
