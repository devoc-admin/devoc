import type { Protocol } from "puppeteer";
import { withPage } from "../core/browser";
import type {
  CookieInfo,
  RgpdResult,
  TechnologyInfo,
  TrackerInfo,
} from "../core/types";

// Known consent managers patterns
const CONSENT_MANAGERS = {
  axeptio: ["axeptio", "_axcb"],
  complianz: ["complianz", "cmplz"],
  cookiebot: ["cookiebot", "CookieConsent"],
  cookieYes: ["cookieyes", "cookieyes-consent"],
  didomi: ["didomi"],
  hubspot: ["__hs_cookie_cat_pref"],
  oneTrust: ["onetrust", "OptanonConsent"],
  orejime: ["orejime"],
  quantcast: ["quantcast", "__qca"],
  tarteaucitron: ["tarteaucitron", "tac_"],
} as const;

// Known trackers that require consent
const TRACKERS = {
  "facebook-pixel": {
    patterns: ["facebook.com/tr", "connect.facebook.net", "_fbp", "fbclid"],
    type: "advertising" as const,
  },
  "google-ads": {
    patterns: ["googleadservices.com", "googlesyndication.com", "_gcl"],
    type: "advertising" as const,
  },
  "google-analytics": {
    patterns: [
      "google-analytics.com",
      "googletagmanager.com",
      "_ga",
      "_gid",
      "gtag",
    ],
    type: "analytics" as const,
  },
  "google-fonts": {
    patterns: ["fonts.googleapis.com", "fonts.gstatic.com"],
    type: "font" as const,
  },
  hotjar: {
    patterns: ["hotjar.com", "_hj"],
    type: "analytics" as const,
  },
  linkedin: {
    patterns: ["linkedin.com/px", "lidc", "li_"],
    type: "social" as const,
  },
  matomo: {
    patterns: ["matomo", "piwik", "_pk_"],
    type: "analytics" as const,
  },
  twitter: {
    patterns: ["platform.twitter.com", "twq"],
    type: "social" as const,
  },
  youtube: {
    patterns: ["youtube.com/embed", "youtube-nocookie.com"],
    type: "social" as const,
  },
} as const;

function detectConsentManager(
  html: string,
  cookies: CookieInfo[]
): string | null {
  const htmlLower = html.toLowerCase();
  const cookieNames = cookies.map((c) => c.name.toLowerCase());

  for (const [manager, patterns] of Object.entries(CONSENT_MANAGERS)) {
    for (const pattern of patterns) {
      if (
        htmlLower.includes(pattern.toLowerCase()) ||
        cookieNames.some((n) => n.includes(pattern.toLowerCase()))
      ) {
        return manager;
      }
    }
  }
  return null;
}

function detectTrackers(
  requests: string[],
  cookies: CookieInfo[],
  scripts: string[]
): TrackerInfo[] {
  const detected: TrackerInfo[] = [];
  const allSources = [...requests, ...scripts, ...cookies.map((c) => c.name)];

  for (const [name, config] of Object.entries(TRACKERS)) {
    for (const pattern of config.patterns) {
      const found = allSources.some((src) =>
        src.toLowerCase().includes(pattern.toLowerCase())
      );
      if (found) {
        detected.push({
          domain: config.patterns[0],
          name,
          type: config.type,
          violation: true, // Loaded before consent = violation
        });
        break;
      }
    }
  }
  return detected;
}

export async function runRgpdAudit(url: string): Promise<RgpdResult> {
  console.log(`  Audit RGPD: ${url}`);

  return withPage(async (page) => {
    const requests: string[] = [];
    const scripts: string[] = [];

    // Intercept network requests to detect trackers
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      requests.push(req.url());
      req.continue();
    });

    // Check HTTPS
    const isHttps = url.startsWith("https://");

    try {
      await page.goto(url, {
        timeout: 30_000,
        waitUntil: "networkidle2",
      });

      // Get cookies via CDP
      const client = await page.createCDPSession();
      const cookiesResponse = await client.send("Network.getAllCookies");
      const cookies: CookieInfo[] = cookiesResponse.cookies.map(
        (c: Protocol.Network.Cookie) => ({
          domain: c.domain,
          httpOnly: c.httpOnly,
          name: c.name,
          sameSite: c.sameSite,
          secure: c.secure,
        })
      );

      // Get storage
      const storageData = await page.evaluate(() => {
        const local = Object.keys(localStorage).map((k) => ({ key: k }));
        const session = Object.keys(sessionStorage).map((k) => ({ key: k }));
        return { local, session };
      });

      // Get page HTML and scripts for detection
      const html = await page.content();
      scripts.push(
        ...(await page.evaluate(() =>
          Array.from(document.querySelectorAll("script[src]")).map(
            (s) => (s as HTMLScriptElement).src
          )
        ))
      );

      // Detect consent manager
      const consentManager = detectConsentManager(html, cookies);

      // Detect consent banner (improved heuristics)
      const bannerDetected = await page.evaluate(() => {
        const keywords = [
          "cookie",
          "consent",
          "accepter",
          "refuser",
          "rgpd",
          "gdpr",
          "données personnelles",
          "personal data",
          "privacy",
          "paramétrer",
          "préférences",
          "continuer sans accepter",
        ];

        const isVisible = (elem: Element): boolean => {
          if (!(elem instanceof HTMLElement)) return false;
          const style = window.getComputedStyle(elem);
          const rect = elem.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number.parseFloat(style.opacity) > 0 &&
            rect.width > 0 &&
            rect.height > 0
          );
        };

        // Look for common banner selectors
        const bannerSelectors = [
          '[class*="cookie"]',
          '[id*="cookie"]',
          '[class*="consent"]',
          '[id*="consent"]',
          '[class*="rgpd"]',
          '[id*="rgpd"]',
          '[class*="gdpr"]',
          '[id*="gdpr"]',
          '[class*="tarteaucitron"]',
          '[class*="axeptio"]',
          '[class*="orejime"]',
          ".cc-banner",
          ".cookie-banner",
          "#cookie-banner",
        ];

        for (const selector of bannerSelectors) {
          const elements = document.querySelectorAll(selector);
          for (const el of elements) {
            if (isVisible(el)) {
              const text = el.textContent?.toLowerCase() || "";
              if (keywords.some((k) => text.includes(k))) {
                return true;
              }
            }
          }
        }

        // Fallback: check for fixed/modal elements with keywords
        const fixedElements = document.querySelectorAll("*");
        for (const el of fixedElements) {
          if (!isVisible(el)) continue;
          const style = window.getComputedStyle(el);
          if (
            style.position === "fixed" ||
            el.getAttribute("role") === "dialog" ||
            el.getAttribute("aria-modal") === "true"
          ) {
            const text = el.textContent?.toLowerCase() || "";
            if (keywords.filter((k) => text.includes(k)).length >= 2) {
              return true;
            }
          }
        }
        return false;
      });

      // Detect trackers loaded before consent
      const trackers = detectTrackers(requests, cookies, scripts);

      // Summary
      const violations: string[] = [];
      if (!isHttps) violations.push("Site non HTTPS");
      if (cookies.length > 0)
        violations.push(`${cookies.length} cookies avant consentement`);
      if (!(bannerDetected || consentManager))
        violations.push("Banniere cookies absente");
      if (trackers.length > 0) {
        violations.push(
          `Trackers sans consentement: ${trackers.map((t) => t.name).join(", ")}`
        );
      }

      console.log(`    HTTPS: ${isHttps ? "Oui" : "Non"}`);
      console.log(`    Cookies initiaux: ${cookies.length}`);
      console.log(
        `    Banniere: ${bannerDetected ? "Oui" : "Non"} (${consentManager || "non detecte"})`
      );
      console.log(`    Trackers: ${trackers.length}`);

      return {
        consentBannerDetected: bannerDetected,
        consentBannerType: consentManager,
        cookiesDetected: cookies,
        httpsSecure: isHttps,
        localStorageDetected: storageData.local,
        sessionStorageDetected: storageData.session,
        trackersBeforeConsent: trackers,
      };
    } catch (error) {
      console.error(
        `    Erreur RGPD: ${error instanceof Error ? error.message : "Unknown"}`
      );
      return {
        consentBannerDetected: false,
        consentBannerType: null,
        cookiesDetected: [],
        httpsSecure: isHttps,
        localStorageDetected: [],
        sessionStorageDetected: [],
        trackersBeforeConsent: [],
      };
    }
  });
}

// Detect technology stack
export async function detectTechnology(url: string): Promise<TechnologyInfo> {
  return withPage(async (page) => {
    try {
      await page.goto(url, { timeout: 30_000, waitUntil: "networkidle2" });

      const result = await page.evaluate(() => {
        const html = document.documentElement.outerHTML.toLowerCase();
        const meta = Array.from(document.querySelectorAll("meta"));
        const scripts = Array.from(
          document.querySelectorAll("script[src]")
        ).map((s) => (s as HTMLScriptElement).src);
        const links = Array.from(document.querySelectorAll("link[href]")).map(
          (l) => (l as HTMLLinkElement).href
        );

        // CMS Detection
        let cms: string | null = null;
        let cmsVersion: string | null = null;

        // WordPress
        if (html.includes("wp-content") || html.includes("wp-includes")) {
          cms = "WordPress";
          const genMeta = meta.find(
            (m) => m.getAttribute("name") === "generator"
          );
          if (genMeta?.content?.includes("WordPress")) {
            const match = genMeta.content.match(/WordPress\s*([\d.]+)/);
            if (match && match[1]) cmsVersion = match[1];
          }
        }
        // Drupal
        else if (
          html.includes("drupal") ||
          scripts.some((s) => s.includes("drupal"))
        ) {
          cms = "Drupal";
        }
        // TYPO3
        else if (
          html.includes("typo3") ||
          scripts.some((s) => s.includes("typo3"))
        ) {
          cms = "TYPO3";
        }
        // Joomla
        else if (html.includes("joomla") || html.includes("/media/jui/")) {
          cms = "Joomla";
        }
        // SPIP
        else if (
          html.includes("spip") ||
          scripts.some((s) => s.includes("spip"))
        ) {
          cms = "SPIP";
        }
        // Concrete5
        else if (html.includes("concrete5") || html.includes("ccm_")) {
          cms = "Concrete5";
        }

        // Framework detection
        let framework: string | null = null;
        if (scripts.some((s) => s.includes("react"))) framework = "React";
        else if (scripts.some((s) => s.includes("vue"))) framework = "Vue";
        else if (scripts.some((s) => s.includes("angular")))
          framework = "Angular";
        else if (html.includes("bootstrap")) framework = "Bootstrap";

        // Consent manager
        let consentManager: string | null = null;
        if (html.includes("tarteaucitron")) consentManager = "Tarteaucitron";
        else if (html.includes("axeptio")) consentManager = "Axeptio";
        else if (html.includes("cookiebot")) consentManager = "Cookiebot";
        else if (html.includes("orejime")) consentManager = "Orejime";
        else if (html.includes("didomi")) consentManager = "Didomi";

        // Analytics
        const analytics: string[] = [];
        if (
          html.includes("google-analytics") ||
          html.includes("gtag") ||
          html.includes("ga(")
        ) {
          analytics.push("Google Analytics");
        }
        if (html.includes("matomo") || html.includes("piwik")) {
          analytics.push("Matomo");
        }

        // Plugins (WordPress specific)
        const plugins: string[] = [];
        if (cms === "WordPress") {
          if (html.includes("elementor")) plugins.push("Elementor");
          if (html.includes("divi")) plugins.push("Divi");
          if (html.includes("visual-composer") || html.includes("js_composer"))
            plugins.push("Visual Composer");
          if (html.includes("slider-revolution") || html.includes("rev_slider"))
            plugins.push("Slider Revolution");
          if (html.includes("gravity")) plugins.push("Gravity Forms");
          if (html.includes("contact-form-7")) plugins.push("Contact Form 7");
          if (html.includes("yoast")) plugins.push("Yoast SEO");
          if (html.includes("ubermenu")) plugins.push("UberMenu");
        }

        return {
          analytics,
          cms,
          cmsVersion,
          consentManager,
          framework,
          plugins,
        };
      });

      return result;
    } catch {
      return {
        analytics: [],
        cms: null,
        cmsVersion: null,
        consentManager: null,
        framework: null,
        plugins: [],
      };
    }
  });
}
