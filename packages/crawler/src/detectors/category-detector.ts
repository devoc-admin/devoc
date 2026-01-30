import type { Page } from "playwright";
import type { CategoryResult, PageCharacteristics } from "../types";
import { URL_CATEGORY_PATTERNS } from "./patterns";

export async function detectCategoryPage({
  page,
  url,
}: {
  page: Page;
  url: string;
}): Promise<CategoryResult> {
  const pathname = new URL(url).pathname;

  // 1. 🌐 Check URL patterns (more reliable)
  for (const [category, patterns] of Object.entries(URL_CATEGORY_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(pathname))) {
      const characteristics = await analyzePageCharacteristics(page);
      return {
        category: category as CategoryResult["category"],
        characteristics,
        confidence: 85,
      };
    }
  }

  // 2. 🔍 Parse DOM
  const characteristics = await analyzePageCharacteristics(page);
  if (characteristics.hasAuthentication) {
    return { category: "authentication", characteristics, confidence: 75 };
  }

  if (characteristics.hasContactForm) {
    return { category: "contact", characteristics, confidence: 70 };
  }

  if (characteristics.hasProgressIndicator) {
    return { category: "multi_step_process", characteristics, confidence: 70 };
  }

  if (characteristics.hasMultimedia) {
    return { category: "multimedia", characteristics, confidence: 70 };
  }

  if (characteristics.hasDocuments) {
    return { category: "document", characteristics, confidence: 70 };
  }

  if (characteristics.hasTable) {
    return { category: "table", characteristics, confidence: 65 };
  }

  if (characteristics.hasForm) {
    return { category: "form", characteristics, confidence: 65 };
  }

  // Default category
  return { category: "other", characteristics, confidence: 50 };
}

export async function analyzePageCharacteristics(
  page: Page
): Promise<PageCharacteristics> {
  return await page.evaluate(() => {
    // 📝 Check forms (at least 2 inputs)
    const forms = document.querySelectorAll("form");
    const hasForm =
      forms.length > 0 &&
      Array.from(forms).some((form) => {
        const inputs = form.querySelectorAll("input, textarea, select");
        return inputs.length >= 2;
      });

    // 🧮 Check tables
    const tables = document.querySelectorAll("table");
    const hasTable = Array.from(tables).some((table) => {
      // Ignore presentation tables
      if (table.getAttribute("role") === "presentation") return false;
      if (table.closest('[role="presentation"]')) return false;

      // Check for headers or enough cells
      const headers = table.querySelectorAll("th");
      const cells = table.querySelectorAll("td");
      return headers.length > 0 || cells.length > 4;
    });

    // 📸 Check multimedia
    const hasMultimedia =
      document.querySelectorAll(
        'video, audio, iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="dailymotion"], iframe[src*="soundcloud"], iframe[src*="spotify"], iframe[src*="deezer"]'
      ).length > 0;

    // 📄 Check document links
    const docLinks = document.querySelectorAll(
      'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".odt"], a[href$=".ods"], a[href$=".pptx"], a[href$=".ppt"], a[href$=".csv"]'
    );
    const hasDocuments = docLinks.length > 0;

    // 🔒 Check authentication
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const loginForms = document.querySelectorAll(
      'form[action*="login"], form[action*="auth"], form[action*="signin"], form[action*="connexion"]'
    );
    const hasAuthentication =
      passwordInputs.length > 0 || loginForms.length > 0;

    // 📞 Check contact form
    const contactKeywords = ["contact", "message", "envoyer", "send"];
    const hasContactForm = Array.from(forms).some((form) => {
      const formText = form.textContent?.toLowerCase() || "";
      const hasContactKeywords = contactKeywords.some((keyword) =>
        formText.includes(keyword)
      );
      const hasEmailField = form.querySelector('input[type="email"]') !== null;
      return hasContactKeywords && hasEmailField;
    });

    // Check progress indicator (multi-step process)
    const hasProgressIndicator =
      document.querySelector(
        '[role="progressbar"], .stepper, [class*="step-indicator"], [aria-valuenow]'
      ) !== null;

    // 🖥️ Layout signature
    const header = document.querySelector("header, [role='banner']");
    const nav = document.querySelector("nav, [role='navigation']");
    const main = document.querySelector("main, [role='main']");
    const aside = document.querySelector("aside, [role='complementary']");
    const footer = document.querySelector("footer, [role='contentinfo']");

    // Columns count
    const columns = document.querySelectorAll(
      '[class*="col-"], [class*="column"], [class*="grid"] > *'
    ).length;

    const layoutSignature = [
      header ? "H" : "",
      nav ? "N" : "",
      main ? "M" : "",
      aside ? "A" : "",
      footer ? "F" : "",
      columns > 3 ? `C${Math.min(columns, 9)}` : "",
    ]
      .filter(Boolean)
      .join("");

    return {
      hasAuthentication,
      hasContactForm,
      hasDocuments,
      hasForm,
      hasMultimedia,
      hasProgressIndicator,
      hasTable,
      layoutSignature,
    };
  });
}
