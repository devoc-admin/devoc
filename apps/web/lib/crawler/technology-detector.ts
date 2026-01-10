import type { Page } from "playwright";
import categories from "wapalyzer/categories.json";

// @ts-expect-error - wapalyzer has no types
import Wappalyzer from "wapalyzer/wappalyzer.js";
import type { DetectedTechnology, TechnologyDetectionResult } from "./types";

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

    return {
      detectedAt: new Date().toISOString(),
      detectedOnUrl: url,
      technologies,
    };
  } catch (error) {
    console.error("Technology detection error:", error);
    // Return empty result on error rather than failing the crawl
    return {
      detectedAt: new Date().toISOString(),
      detectedOnUrl: url,
      technologies: [],
    };
  }
}
