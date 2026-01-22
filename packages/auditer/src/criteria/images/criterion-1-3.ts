/**
 * Criterion 1.3: Alternative text relevance for informational images
 *
 * This is a MANUAL criterion - we can only collect elements for review
 * The auditor must verify that alt text accurately describes image content
 *
 * Tests 1.3.1 - 1.3.9
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_3({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_3_1(page));
  tests.push(await runTest1_3_2(page));
  tests.push(await runTest1_3_3(page));
  tests.push(await runTest1_3_4(page));
  tests.push(await runTest1_3_5(page));
  tests.push(await runTest1_3_6(page));
  tests.push(await runTest1_3_7(page));
  tests.push(await runTest1_3_8(page));
  tests.push(await runTest1_3_9(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.3",
    criterionTitle:
      "Pour chaque image porteuse d'information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    failedTests: tests.filter((t) => t.status === "failed").length,
    notApplicableTests: tests.filter((t) => t.status === "not_applicable")
      .length,
    overallStatus,
    passedTests: tests.filter((t) => t.status === "passed").length,
    reviewTests: tests.filter((t) => t.status === "needs_review").length,
    testability: "manual",
    tests,
    totalTests: tests.length,
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  };
}

async function runTest1_3_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const imgs = document.querySelectorAll('img, [role="img"]');

    for (const el of imgs) {
      const alt = el.getAttribute("alt");
      const ariaLabel = el.getAttribute("aria-label");
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Skip decorative
      if (alt === "" || role === "presentation" || ariaHidden === "true") {
        continue;
      }

      // Only include if has alt text
      if (!(alt || ariaLabel)) continue;

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel,
        ariaLabelledby: getAriaLabelledbyText(el),
        attributes: {
          alt,
          "aria-label": ariaLabel,
          src: el.getAttribute("src"),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        src: el.getAttribute("src") || undefined,
        tagName: el.tagName.toLowerCase(),
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;

    function generateSelector(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const path: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) => c.tagName === current?.tagName
          );
          if (siblings.length > 1) {
            selector += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        path.unshift(selector);
        current = parent;
      }
      return path.join(" > ");
    }

    function getAriaLabelledbyText(element: Element): string | null {
      const labelledby = element.getAttribute("aria-labelledby");
      if (!labelledby) return null;
      const ids = labelledby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      return texts.length > 0 ? texts.join(" ") : null;
    }
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No informational images with alt text found"
        : `${elements.length} image(s) need manual review for alt text relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.1",
    totalElements: elements.length,
  };
}

async function runTest1_3_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const areas = document.querySelectorAll("area[href]");

    for (const el of areas) {
      const alt = el.getAttribute("alt");
      if (!alt) continue;

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: { alt, href: el.getAttribute("href") },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: `area[href="${el.getAttribute("href")}"]`,
        tagName: "area",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No area elements with alt text found"
        : `${elements.length} area(s) need manual review for alt text relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque zone (balise <area>) d'une image réactive porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.2",
    totalElements: elements.length,
  };
}

async function runTest1_3_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const inputs = document.querySelectorAll('input[type="image"]');

    for (const el of inputs) {
      const alt = el.getAttribute("alt");
      if (!(alt || el.getAttribute("aria-label"))) continue;

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: { alt, src: el.getAttribute("src") },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: `input[type="image"][src="${el.getAttribute("src")}"]`,
        src: el.getAttribute("src") || undefined,
        tagName: "input",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No image buttons with alt text found"
        : `${elements.length} image button(s) need manual review for alt text relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      'Pour chaque bouton de type image (balise <input> avec l\'attribut type="image"), ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?',
    testNumber: "1.3.3",
    totalElements: elements.length,
  };
}

async function runTest1_3_4(page: Page): Promise<TestResult> {
  // Same as 1.3.2 - area as links
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const areas = document.querySelectorAll("area[href]");

    for (const el of areas) {
      const alt = el.getAttribute("alt");
      if (!alt) continue;

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: { alt, href: el.getAttribute("href") },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: `area[href="${el.getAttribute("href")}"]`,
        tagName: "area",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No area link elements with alt text found"
        : `${elements.length} area link(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque zone (balise <area>) d'une image réactive, utilisée comme lien, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.4",
    totalElements: elements.length,
  };
}

async function runTest1_3_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const objects = document.querySelectorAll('object[type^="image/"]');

    for (const el of objects) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation") continue;

      const hasAlt =
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        el.textContent?.trim();
      if (!hasAlt) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          data: el.getAttribute("data"),
          type: el.getAttribute("type"),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: `object[data="${el.getAttribute("data")}"]`,
        tagName: "object",
        textContent: el.textContent?.trim() || null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No object images with alt text found"
        : `${elements.length} object(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.5",
    totalElements: elements.length,
  };
}

async function runTest1_3_6(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll('embed[type^="image/"]');

    for (const el of embeds) {
      const ariaHidden = el.getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

      const hasAlt = el.getAttribute("aria-label") || el.getAttribute("title");
      if (!hasAlt) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          src: el.getAttribute("src"),
          type: el.getAttribute("type"),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: `embed[src="${el.getAttribute("src")}"]`,
        src: el.getAttribute("src") || undefined,
        tagName: "embed",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No embedded images with alt text found"
        : `${elements.length} embed(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image embarquée (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.6",
    totalElements: elements.length,
  };
}

async function runTest1_3_7(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const titleEl = el.querySelector("title");
      const hasAlt =
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        titleEl?.textContent?.trim();
      if (!hasAlt) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: { "aria-label": el.getAttribute("aria-label"), role },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        tagName: "svg",
        textContent: titleEl?.textContent?.trim() || null,
        title: el.getAttribute("title"),
      });
    }

    return results;

    function generateSelector(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const path: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) => c.tagName === current?.tagName
          );
          if (siblings.length > 1) {
            selector += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        path.unshift(selector);
        current = parent;
      }
      return path.join(" > ");
    }
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No SVGs with alt text found"
        : `${elements.length} SVG(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.7",
    totalElements: elements.length,
  };
}

async function runTest1_3_8(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const canvases = document.querySelectorAll("canvas");

    for (const el of canvases) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const hasAlt =
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        el.textContent?.trim();
      if (!hasAlt) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: { "aria-label": el.getAttribute("aria-label"), role },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        tagName: "canvas",
        textContent: el.textContent?.trim() || null,
        title: el.getAttribute("title"),
      });
    }

    return results;

    function generateSelector(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const path: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) => c.tagName === current?.tagName
          );
          if (siblings.length > 1) {
            selector += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        path.unshift(selector);
        current = parent;
      }
      return path.join(" > ");
    }
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No canvas elements with alt text found"
        : `${elements.length} canvas element(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    testNumber: "1.3.8",
    totalElements: elements.length,
  };
}

async function runTest1_3_9(page: Page): Promise<TestResult> {
  // Check if alt text is short and concise
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const allImages = document.querySelectorAll(
      'img, [role="img"], area, input[type="image"], object[type^="image/"], embed[type^="image/"], svg, canvas'
    );

    for (const el of allImages) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      // Get the alt text
      let altText =
        el.getAttribute("alt") ||
        el.getAttribute("aria-label") ||
        el.getAttribute("title");

      if (el.tagName.toLowerCase() === "svg") {
        const titleEl = el.querySelector("title");
        if (titleEl) altText = titleEl.textContent?.trim() || altText;
      }

      if (!altText) continue;

      // Flag if alt text seems too long (> 125 characters is generally too long)
      const isTooLong = altText.length > 125;

      results.push({
        alt: altText,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt: altText,
          altLength: String(altText.length),
          isTooLong: String(isTooLong),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        src: el.getAttribute("src") || undefined,
        tagName: el.tagName.toLowerCase(),
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;

    function generateSelector(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const path: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) => c.tagName === current?.tagName
          );
          if (siblings.length > 1) {
            selector += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        path.unshift(selector);
        current = parent;
      }
      return path.join(" > ");
    }
  });

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No images with alt text found"
        : `${elements.length} image(s) need manual review for alt text conciseness`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas> ou possédant un attribut WAI-ARIA role=\"img\") porteuse d'information, ayant une alternative textuelle, l'alternative textuelle est-elle courte et concise (hors cas particuliers) ?",
    testNumber: "1.3.9",
    totalElements: elements.length,
  };
}
