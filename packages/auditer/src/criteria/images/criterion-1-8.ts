/**
 * Criterion 1.8: Text images should use styled text
 *
 * Tests 1.8.1 - 1.8.6
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_8({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_8_1(page));
  tests.push(await runTest1_8_2(page));
  tests.push(await runTest1_8_3(page));
  tests.push(await runTest1_8_4(page));
  tests.push(await runTest1_8_5(page));
  tests.push(await runTest1_8_6(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.8",
    criterionTitle:
      "Chaque image texte porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    failedTests: tests.filter((t) => t.status === "failed").length,
    notApplicableTests: tests.filter((t) => t.status === "not_applicable")
      .length,
    overallStatus,
    passedTests: tests.filter((t) => t.status === "passed").length,
    reviewTests: tests.filter((t) => t.status === "needs_review").length,
    testability: "manual",
    tests,
    totalTests: tests.length,
    wcagCriteria: "1.4.5",
    wcagLevel: "AA",
  };
}

async function runTest1_8_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const images = document.querySelectorAll('img, [role="img"]');

    const textImagePatterns = [
      /logo/i,
      /banner/i,
      /header/i,
      /title/i,
      /button/i,
      /text/i,
      /slogan/i,
      /quote/i,
      /headline/i,
      /cta/i,
    ];

    for (const el of images) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Skip decorative
      if (alt === "" || role === "presentation" || ariaHidden === "true")
        continue;

      const src = el.getAttribute("src") || "";
      const className = el.className || "";

      // Check if might be text image
      const textToCheck = `${src} ${alt || ""} ${className}`;
      const mightBeTextImage = textImagePatterns.some((pattern) =>
        pattern.test(textToCheck)
      );

      // Include all images for manual review, but flag likely text images
      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt,
          class: className,
          mightBeTextImage: String(mightBeTextImage),
          src,
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        src: src || undefined,
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

  // Filter to likely text images for priority review
  const likelyTextImages = elements.filter(
    (el) => el.attributes.mightBeTextImage === "true"
  );

  return {
    failedCount: 0,
    failedElements: [],
    message:
      elements.length === 0
        ? "No informational images found"
        : `${likelyTextImages.length} potential text image(s) detected, ${elements.length} total images need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image texte (balise <img> ou possédant un attribut WAI-ARIA role=\"img\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.1",
    totalElements: elements.length,
  };
}

async function runTest1_8_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const inputs = document.querySelectorAll('input[type="image"]');

    for (const el of inputs) {
      const alt = el.getAttribute("alt");
      const src = el.getAttribute("src") || "";

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt,
          src,
          value: el.getAttribute("value"),
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: `input[type="image"][src="${src}"]`,
        src: src || undefined,
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
        ? "No image buttons found"
        : `${elements.length} image button(s) need manual review for text image usage`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque bouton « image texte » (balise <input> avec l'attribut type=\"image\") porteur d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacé par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.2",
    totalElements: elements.length,
  };
}

async function runTest1_8_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const objects = document.querySelectorAll('object[type^="image/"]');

    for (const el of objects) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation") continue;

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
        ? "No object images found"
        : `${elements.length} object(s) need manual review for text image usage`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image objet texte (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.3",
    totalElements: elements.length,
  };
}

async function runTest1_8_4(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll('embed[type^="image/"]');

    for (const el of embeds) {
      const ariaHidden = el.getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

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
        ? "No embedded images found"
        : `${elements.length} embed(s) need manual review for text image usage`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image embarquée texte (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.4",
    totalElements: elements.length,
  };
}

async function runTest1_8_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      // Check for text elements inside SVG
      const textElements = el.querySelectorAll("text, tspan");
      const hasText = textElements.length > 0;

      if (!hasText) continue; // Only flag SVGs that contain text

      const textContent = Array.from(textElements)
        .map((t) => t.textContent?.trim())
        .filter(Boolean)
        .join(" ");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          containsText: String(hasText),
          textContent,
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        tagName: "svg",
        textContent,
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
        ? "No SVGs with text content found"
        : `${elements.length} SVG(s) with text need manual review for styled text replacement`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image vectorielle texte (balise <svg>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.5",
    totalElements: elements.length,
  };
}

async function runTest1_8_6(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const canvases = document.querySelectorAll("canvas");

    for (const el of canvases) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {},
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
        ? "No canvas elements found"
        : `${elements.length} canvas element(s) need manual review for text image usage`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image bitmap texte (balise <canvas>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    testNumber: "1.8.6",
    totalElements: elements.length,
  };
}
