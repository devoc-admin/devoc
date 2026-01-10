import type { Page } from "playwright";
import categories from "wapalyzer/categories.json";

// @ts-expect-error - wapalyzer has no types
import Wappalyzer from "wapalyzer/wappalyzer.js";
import type {
  DetectedTechnology,
  FrenchTechDetection,
  TechnologyDetectionResult,
} from "./types";

// Technology patterns from wapalyzer package
const techFiles = [
  "_",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let wappalyzerInitialized = false;

async function initWappalyzer() {
  if (wappalyzerInitialized) return;

  // Load all technology patterns
  const technologies: Record<string, unknown> = {};

  for (const file of techFiles) {
    try {
      // Dynamic import for each technology file
      const techModule = await import(`wapalyzer/technologies/${file}.json`);
      Object.assign(technologies, techModule.default || techModule);
    } catch {
      // Some files might not exist
    }
  }

  // Initialize Wappalyzer with technologies and categories
  Wappalyzer.setTechnologies(technologies);
  Wappalyzer.setCategories(categories);

  wappalyzerInitialized = true;
}

type PageData = {
  html: string;
  scripts: string[];
  scriptSrc: string[];
  meta: Record<string, string[]>;
  cookies: Record<string, string>;
};

async function extractPageData(page: Page): Promise<PageData> {
  const data = await page.evaluate(() => {
    // Get HTML (limit size for performance)
    const html = document.documentElement.outerHTML.slice(0, 500_000);

    // Get script content (inline scripts)
    const scripts: string[] = [];
    document.querySelectorAll("script:not([src])").forEach((script) => {
      if (script.textContent) {
        scripts.push(script.textContent.slice(0, 50_000));
      }
    });

    // Get script sources
    const scriptSrc: string[] = [];
    document.querySelectorAll("script[src]").forEach((script) => {
      const src = script.getAttribute("src");
      if (src) scriptSrc.push(src);
    });

    // Get meta tags
    const meta: Record<string, string[]> = {};
    document.querySelectorAll("meta[name], meta[property]").forEach((el) => {
      const key =
        el.getAttribute("name") ||
        el.getAttribute("property") ||
        el.getAttribute("http-equiv");
      const content = el.getAttribute("content");
      if (key && content) {
        if (!meta[key.toLowerCase()]) {
          meta[key.toLowerCase()] = [];
        }
        meta[key.toLowerCase()].push(content);
      }
    });

    // Get cookies
    const cookies: Record<string, string> = {};
    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name) {
        cookies[name] = value || "";
      }
    });

    return { cookies, html, meta, scriptSrc, scripts };
  });

  return data;
}

/**
 * Detect French-specific technologies that Wappalyzer might miss
 */
async function detectFrenchTech(
  page: Page,
  pageData: PageData,
  responseHeaders: Record<string, string>,
  wappalyzerTechnologies: DetectedTechnology[]
): Promise<FrenchTechDetection> {
  const result: FrenchTechDetection = {
    usesDsfr: false,
  };

  // Check if already detected by Wappalyzer
  const techNames = wappalyzerTechnologies.map((t) => t.name.toLowerCase());
  const techCategories = wappalyzerTechnologies.map((t) =>
    t.category.toLowerCase()
  );

  // 1. Detect DSFR (Design System de l'État)
  const dsfrDetection = await page.evaluate(() => {
    // Check for DSFR CSS
    const dsfrCss = Array.from(document.querySelectorAll("link[href]")).some(
      (link) => {
        const href = link.getAttribute("href") || "";
        return href.includes("dsfr") || href.includes("gouvfr");
      }
    );

    // Check for DSFR classes in body
    const dsfrClasses =
      document.body.className.includes("fr-") ||
      document.querySelector(".fr-header") !== null ||
      document.querySelector(".fr-footer") !== null;

    // Check for window.dsfr
    const dsfrWindow =
      typeof (window as unknown as { dsfr?: unknown }).dsfr !== "undefined";

    return dsfrCss || dsfrClasses || dsfrWindow;
  });
  result.usesDsfr = dsfrDetection;

  // 2. Detect consent managers
  const consentManagers = [
    { name: "Tarteaucitron", patterns: ["tarteaucitron"] },
    { name: "Axeptio", patterns: ["axeptio"] },
    { name: "Didomi", patterns: ["didomi"] },
    { name: "OneTrust", patterns: ["onetrust", "optanon"] },
    { name: "Cookiebot", patterns: ["cookiebot"] },
    { name: "CookieFirst", patterns: ["cookiefirst"] },
    { name: "Quantcast", patterns: ["quantcast"] },
    { name: "TrustCommander", patterns: ["trustcommander", "trustpid"] },
  ];

  // Check from Wappalyzer results first
  for (const tech of wappalyzerTechnologies) {
    const nameLower = tech.name.toLowerCase();
    for (const cm of consentManagers) {
      if (cm.patterns.some((p) => nameLower.includes(p))) {
        result.consentManager = tech.name;
        break;
      }
    }
    if (result.consentManager) break;
  }

  // If not found, check script sources
  if (!result.consentManager) {
    const scriptsLower = pageData.scriptSrc.map((s) => s.toLowerCase());
    for (const cm of consentManagers) {
      if (
        scriptsLower.some((src) => cm.patterns.some((p) => src.includes(p)))
      ) {
        result.consentManager = cm.name;
        break;
      }
    }
  }

  // 3. Detect accessibility tools
  const accessibilityTools = [
    { name: "RGAA", patterns: ["rgaa"] },
    { name: "Axe", patterns: ["axe-core", "deque"] },
    { name: "WAVE", patterns: ["wave.webaim"] },
    { name: "Siteimprove", patterns: ["siteimprove"] },
    { name: "AccessiBe", patterns: ["accessibe", "acsbapp"] },
    { name: "UserWay", patterns: ["userway"] },
    { name: "EqualWeb", patterns: ["equalweb"] },
  ];

  // Check from Wappalyzer results first
  for (const tech of wappalyzerTechnologies) {
    const nameLower = tech.name.toLowerCase();
    for (const at of accessibilityTools) {
      if (at.patterns.some((p) => nameLower.includes(p))) {
        result.accessibilityTool = tech.name;
        break;
      }
    }
    if (result.accessibilityTool) break;
  }

  // If not found, check script sources and HTML
  if (!result.accessibilityTool) {
    const scriptsLower = pageData.scriptSrc.map((s) => s.toLowerCase());
    const htmlLower = pageData.html.toLowerCase();
    for (const at of accessibilityTools) {
      if (
        scriptsLower.some((src) => at.patterns.some((p) => src.includes(p))) ||
        at.patterns.some((p) => htmlLower.includes(p))
      ) {
        result.accessibilityTool = at.name;
        break;
      }
    }
  }

  // 4. Detect hosting provider from headers
  const hostingProviders = [
    { name: "OVH", patterns: ["ovh"] },
    { name: "Scaleway", patterns: ["scaleway", "scw"] },
    { name: "Clever Cloud", patterns: ["clever-cloud", "cleverapps"] },
    { name: "Gandi", patterns: ["gandi"] },
    { name: "Online.net", patterns: ["online.net", "scaleway"] },
    { name: "AWS", patterns: ["aws", "amazon", "cloudfront"] },
    { name: "Google Cloud", patterns: ["google", "gcp", "appspot"] },
    { name: "Azure", patterns: ["azure", "microsoft"] },
    { name: "Vercel", patterns: ["vercel"] },
    { name: "Netlify", patterns: ["netlify"] },
    { name: "Cloudflare", patterns: ["cloudflare"] },
  ];

  // Check from Wappalyzer results first (often detects CDN/hosting)
  for (const tech of wappalyzerTechnologies) {
    const categoryLower = tech.category.toLowerCase();
    if (
      categoryLower.includes("hosting") ||
      categoryLower.includes("paas") ||
      categoryLower.includes("cdn")
    ) {
      result.hostingProvider = tech.name;
      break;
    }
  }

  // If not found, check headers
  if (!result.hostingProvider) {
    const headersLower = Object.entries(responseHeaders).map(
      ([k, v]) => `${k.toLowerCase()}:${v.toLowerCase()}`
    );
    for (const hp of hostingProviders) {
      if (headersLower.some((h) => hp.patterns.some((p) => h.includes(p)))) {
        result.hostingProvider = hp.name;
        break;
      }
    }
  }

  return result;
}

export async function detectTechnologies({
  page,
  url,
  responseHeaders,
}: {
  page: Page;
  url: string;
  responseHeaders: Record<string, string>;
}): Promise<TechnologyDetectionResult> {
  try {
    await initWappalyzer();

    // Extract data from page
    const pageData = await extractPageData(page);

    // Format headers for Wappalyzer (expects Record<string, string[]>)
    const headers: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(responseHeaders)) {
      headers[key.toLowerCase()] = [value];
    }

    // Analyze with Wappalyzer
    const items = {
      cookies: pageData.cookies,
      headers,
      html: pageData.html,
      meta: pageData.meta,
      scriptSrc: pageData.scriptSrc,
      scripts: pageData.scripts.join("\n"),
      url,
    };

    const detections = Wappalyzer.analyze(items);
    const resolved = Wappalyzer.resolve(detections);

    // Format results
    const technologies: DetectedTechnology[] = resolved.map(
      (detection: {
        technology: {
          name: string;
          categories: number[];
          icon?: string;
          website?: string;
        };
        confidence: number;
        version?: string;
      }) => {
        const tech = detection.technology;
        const categoryNames = tech.categories
          .map((catId: number) => {
            const cat = Wappalyzer.getCategory(catId);
            return cat?.name || "Other";
          })
          .filter(Boolean);

        return {
          category: categoryNames[0] || "Other",
          confidence: detection.confidence,
          icon: tech.icon,
          name: tech.name,
          slug: Wappalyzer.slugify(tech.name),
          version: detection.version || undefined,
          website: tech.website,
        };
      }
    );

    // Detect French-specific technologies
    const frenchTech = await detectFrenchTech(
      page,
      pageData,
      responseHeaders,
      technologies
    );

    return {
      detectedAt: new Date().toISOString(),
      detectedOnUrl: url,
      frenchTech,
      technologies,
    };
  } catch (error) {
    console.error("Technology detection error:", error);
    // Return empty result on error rather than failing the crawl
    return {
      detectedAt: new Date().toISOString(),
      detectedOnUrl: url,
      frenchTech: { usesDsfr: false },
      technologies: [],
    };
  }
}
