import type { Page } from "playwright";
import categories from "wapalyzer/categories.json";

// @ts-expect-error - wapalyzer has no types
import Wappalyzer from "wapalyzer/wappalyzer.js";
import type {
  DetectedTechnology,
  FrenchTechDetection,
  TechnologyDetectionResult,
} from "../types";

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
    function extractHtml(): string {
      return document.documentElement.outerHTML.slice(0, 500_000);
    }

    function extractScripts(): string[] {
      const scripts: string[] = [];
      for (const script of document.querySelectorAll("script:not([src])")) {
        if (script.textContent) {
          scripts.push(script.textContent.slice(0, 50_000));
        }
      }
      return scripts;
    }

    function extractScriptSrc(): string[] {
      const scriptSrc: string[] = [];
      for (const script of document.querySelectorAll("script[src]")) {
        const src = script.getAttribute("src");
        if (src) scriptSrc.push(src);
      }
      return scriptSrc;
    }

    function extractMeta(): Record<string, string[]> {
      const meta: Record<string, string[]> = {};
      for (const el of document.querySelectorAll(
        "meta[name], meta[property]"
      )) {
        const key =
          el.getAttribute("name") ||
          el.getAttribute("property") ||
          el.getAttribute("http-equiv");
        const content = el.getAttribute("content");
        if (key && content) {
          const keyLower = key.toLowerCase();
          if (!meta[keyLower]) {
            meta[keyLower] = [];
          }
          meta[keyLower].push(content);
        }
      }
      return meta;
    }

    function extractCookies(): Record<string, string> {
      const cookies: Record<string, string> = {};
      for (const cookie of document.cookie.split(";")) {
        const [name, value] = cookie.trim().split("=");
        if (name) {
          cookies[name] = value || "";
        }
      }
      return cookies;
    }

    return {
      cookies: extractCookies(),
      html: extractHtml(),
      meta: extractMeta(),
      scriptSrc: extractScriptSrc(),
      scripts: extractScripts(),
    };
  });

  return data;
}

type TechPattern = { name: string; patterns: string[] };

const CONSENT_MANAGERS: TechPattern[] = [
  { name: "Tarteaucitron", patterns: ["tarteaucitron"] },
  { name: "Axeptio", patterns: ["axeptio"] },
  { name: "Didomi", patterns: ["didomi"] },
  { name: "OneTrust", patterns: ["onetrust", "optanon"] },
  { name: "Cookiebot", patterns: ["cookiebot"] },
  { name: "CookieFirst", patterns: ["cookiefirst"] },
  { name: "Quantcast", patterns: ["quantcast"] },
  { name: "TrustCommander", patterns: ["trustcommander", "trustpid"] },
];

const ACCESSIBILITY_TOOLS: TechPattern[] = [
  { name: "RGAA", patterns: ["rgaa"] },
  { name: "Axe", patterns: ["axe-core", "deque"] },
  { name: "WAVE", patterns: ["wave.webaim"] },
  { name: "Siteimprove", patterns: ["siteimprove"] },
  { name: "AccessiBe", patterns: ["accessibe", "acsbapp"] },
  { name: "UserWay", patterns: ["userway"] },
  { name: "EqualWeb", patterns: ["equalweb"] },
];

const HOSTING_PROVIDERS: TechPattern[] = [
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

// French CMS patterns
const FRENCH_CMS: TechPattern[] = [
  { name: "SPIP", patterns: ["spip", "spip.net", "spip_loader"] },
  { name: "Dotclear", patterns: ["dotclear"] },
  { name: "PluXml", patterns: ["pluxml"] },
  { name: "e-monsite", patterns: ["e-monsite"] },
  { name: "Jimdo", patterns: ["jimdo"] },
  { name: "Webnode", patterns: ["webnode"] },
];

// French Analytics patterns
const FRENCH_ANALYTICS: TechPattern[] = [
  {
    name: "AT Internet/Piano",
    patterns: ["atinternet", "piano.io", "xiti", "xtcore"],
  },
  { name: "Eulerian", patterns: ["eulerian"] },
  { name: "Matomo", patterns: ["matomo", "piwik"] },
  { name: "ContentSquare", patterns: ["contentsquare", "cs-analytics"] },
  { name: "Kameleoon", patterns: ["kameleoon"] },
  { name: "AB Tasty", patterns: ["abtasty"] },
];

function findInWappalyzerByName(
  technologies: DetectedTechnology[],
  patterns: TechPattern[]
): string | undefined {
  for (const tech of technologies) {
    const nameLower = tech.name.toLowerCase();
    for (const pattern of patterns) {
      if (pattern.patterns.some((p) => nameLower.includes(p))) {
        return tech.name;
      }
    }
  }
  return undefined;
}

function findInSources(
  sources: string[],
  patterns: TechPattern[]
): string | undefined {
  const sourcesLower = sources.map((s) => s.toLowerCase());
  for (const pattern of patterns) {
    if (
      sourcesLower.some((src) => pattern.patterns.some((p) => src.includes(p)))
    ) {
      return pattern.name;
    }
  }
  return undefined;
}

function detectConsentManager(
  wappalyzerTechnologies: DetectedTechnology[],
  scriptSrc: string[]
): string | undefined {
  return (
    findInWappalyzerByName(wappalyzerTechnologies, CONSENT_MANAGERS) ??
    findInSources(scriptSrc, CONSENT_MANAGERS)
  );
}

function detectAccessibilityTool(
  wappalyzerTechnologies: DetectedTechnology[],
  scriptSrc: string[],
  html: string
): string | undefined {
  const fromWappalyzer = findInWappalyzerByName(
    wappalyzerTechnologies,
    ACCESSIBILITY_TOOLS
  );
  if (fromWappalyzer) return fromWappalyzer;

  const fromScripts = findInSources(scriptSrc, ACCESSIBILITY_TOOLS);
  if (fromScripts) return fromScripts;

  const htmlLower = html.toLowerCase();
  for (const at of ACCESSIBILITY_TOOLS) {
    if (at.patterns.some((p) => htmlLower.includes(p))) {
      return at.name;
    }
  }
  return undefined;
}

function detectHostingProvider(
  wappalyzerTechnologies: DetectedTechnology[],
  responseHeaders: Record<string, string>
): string | undefined {
  for (const tech of wappalyzerTechnologies) {
    const categoryLower = tech.category.toLowerCase();
    if (
      categoryLower.includes("hosting") ||
      categoryLower.includes("paas") ||
      categoryLower.includes("cdn")
    ) {
      return tech.name;
    }
  }

  const headersLower = Object.entries(responseHeaders).map(
    ([k, v]) => `${k.toLowerCase()}:${v.toLowerCase()}`
  );
  for (const hp of HOSTING_PROVIDERS) {
    if (headersLower.some((h) => hp.patterns.some((p) => h.includes(p)))) {
      return hp.name;
    }
  }
  return undefined;
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
  // 1. Detect DSFR (Design System de l'Etat)
  const usesDsfr = await page.evaluate(() => {
    const dsfrCss = Array.from(document.querySelectorAll("link[href]")).some(
      (link) => {
        const href = link.getAttribute("href") || "";
        return href.includes("dsfr") || href.includes("gouvfr");
      }
    );

    const dsfrClasses =
      document.body.className.includes("fr-") ||
      document.querySelector(".fr-header") !== null ||
      document.querySelector(".fr-footer") !== null;

    const dsfrWindow =
      typeof (window as unknown as { dsfr?: unknown }).dsfr !== "undefined";

    return dsfrCss || dsfrClasses || dsfrWindow;
  });

  // 2. Detect French CMS
  const frenchCms =
    findInWappalyzerByName(wappalyzerTechnologies, FRENCH_CMS) ??
    findInSources(pageData.scriptSrc, FRENCH_CMS) ??
    findInSources([pageData.html], FRENCH_CMS);

  // 3. Detect French Analytics
  const frenchAnalytics =
    findInWappalyzerByName(wappalyzerTechnologies, FRENCH_ANALYTICS) ??
    findInSources(pageData.scriptSrc, FRENCH_ANALYTICS);

  return {
    accessibilityTool: detectAccessibilityTool(
      wappalyzerTechnologies,
      pageData.scriptSrc,
      pageData.html
    ),
    analytics: frenchAnalytics,
    cms: frenchCms,
    consentManager: detectConsentManager(
      wappalyzerTechnologies,
      pageData.scriptSrc
    ),
    hostingProvider: detectHostingProvider(
      wappalyzerTechnologies,
      responseHeaders
    ),
    usesDsfr,
  };
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
