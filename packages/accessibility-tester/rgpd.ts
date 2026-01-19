import puppeteer from "puppeteer";

export interface RgpdResult {
  cookiesDetected: { name: string; domain: string; secure: boolean }[];
  localStorageDetected: { key: string }[];
  sessionStorageDetected: { key: string }[];
  consentBannerDetected: boolean;
  httpsSecure: boolean;
}

export async function runRgpdAudit(url: string): Promise<RgpdResult> {
  console.log(`🔒 Starting RGPD/Privacy audit for: ${url}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Check HTTPS
  const isHttps = url.startsWith("https://");

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Check Cookies
    // Using CDPSession to get all cookies including httpOnly
    const client = await page.createCDPSession();
    const cookiesResponse = await client.send("Network.getAllCookies");
    const cookies = cookiesResponse.cookies;

    // Check Local & Session Storage
    const storageData = await page.evaluate(() => {
      const local = Object.keys(localStorage).map((k) => ({ key: k }));
      const session = Object.keys(sessionStorage).map((k) => ({ key: k }));
      return { local, session };
    });

    // Check for Consent Banner (heuristics)
    const keywords = [
      "cookie",
      "consent",
      "accepter",
      "refuser",
      "rgpd",
      "gdpr",
      "données personnelles",
      "personal data",
      "privacy policy",
    ];

    const bannerDetected = await page.evaluate((keywords) => {
      // Helper to check if an element is likely visible
      const isVisible = (elem: Element) => {
        if (!(elem instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(elem);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0"
        );
      };

      // Search deeply in the body text content is not enough, we need to find a container that looks like a banner
      // We'll look for keywords in visible elements
      const elements = Array.from(document.body.querySelectorAll("*"));

      for (const el of elements) {
        if (!isVisible(el)) continue;

        // Check direct text content (shallow) or check if it's a container with significant keyword density?
        // Simple approach: check if the element text content contains keywords and is "banner-like" (e.g., fixed, bottom/top, or modal)
        // For now, let's just check if *any* visible text on the page contains strong consent keywords.
        // This is a weak heuristic but a start.

        if (el.children.length === 0 && el.textContent) {
          // leaf node
          const text = el.textContent.toLowerCase();
          if (keywords.some((k) => text.includes(k))) {
            // Found a keyword in a visible element.
            // To be more robust, we might want to check if this is part of a "dialog" or "banner"
            // But let's assume if we see "accepter" and "cookie" it's likely a banner or link to policy.
            return true;
          }
        }
      }
      return false;
    }, keywords);

    console.log("✅ RGPD Audit complete!");
    console.log(`   - HTTPS: ${isHttps ? "Yes" : "No"}`);

    console.log(`   - Cookies found immediately: ${cookies.length}`);
    if (cookies.length > 0) {
      console.log("     ⚠️  Cookies set before consent might be a violation!");
      for (const c of cookies.slice(0, 5)) {
        console.log(`       - ${c.name} (${c.domain})`);
      }
      if (cookies.length > 5)
        console.log(`       ... and ${cookies.length - 5} more.`);
    }

    console.log(`   - LocalStorage items: ${storageData.local.length}`);
    console.log(`   - SessionStorage items: ${storageData.session.length}`);

    console.log(
      `   - Consent Banner Detected (heuristic): ${bannerDetected ? "Yes" : "No"}`
    );

    return {
      consentBannerDetected: bannerDetected,
      cookiesDetected: cookies.map((c) => ({
        domain: c.domain,
        name: c.name,
        secure: c.secure,
      })),
      httpsSecure: isHttps,
      localStorageDetected: storageData.local,
      sessionStorageDetected: storageData.session,
    };
  } catch (error) {
    console.error("❌ RGPD audit failed:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
