/**
 * Criterion 1.2: Each decorative image is correctly ignored by assistive technologies
 *
 * Tests:
 * 1.2.1 - <img> decorative images
 * 1.2.2 - <area> without href (decorative)
 * 1.2.3 - <object type="image/..."> decorative
 * 1.2.4 - <svg> decorative
 * 1.2.5 - <canvas> decorative
 * 1.2.6 - <embed type="image/..."> decorative
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_2({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_2_1(page));
  tests.push(await runTest1_2_2(page));
  tests.push(await runTest1_2_3(page));
  tests.push(await runTest1_2_4(page));
  tests.push(await runTest1_2_5(page));
  tests.push(await runTest1_2_6(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.2",
    criterionTitle:
      "Chaque image de décoration est-elle correctement ignorée par les technologies d'assistance ?",
    failedTests: tests.filter((t) => t.status === "failed").length,
    notApplicableTests: tests.filter((t) => t.status === "not_applicable")
      .length,
    overallStatus,
    passedTests: tests.filter((t) => t.status === "passed").length,
    reviewTests: tests.filter((t) => t.status === "needs_review").length,
    testability: "semi_automatic",
    tests,
    totalTests: tests.length,
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  };
}

async function runTest1_2_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    // Find decorative images (alt="" or role="presentation" or aria-hidden="true")
    const imgs = document.querySelectorAll("img");

    for (const el of imgs) {
      const alt = el.getAttribute("alt");
      const role = el.getAttribute("role");
      const ariaHidden = el.getAttribute("aria-hidden");
      const ariaLabel = el.getAttribute("aria-label");
      const title = el.getAttribute("title");

      // Skip if inside figure (should use criterion 1.9)
      if (el.closest("figure")) continue;

      // Check if marked as decorative
      const isDecorative =
        alt === "" ||
        role === "presentation" ||
        role === "none" ||
        ariaHidden === "true";

      if (!isDecorative) continue;

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel,
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          alt,
          "aria-hidden": ariaHidden,
          "aria-label": ariaLabel,
          role,
          src: el.getAttribute("src"),
          title,
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        src: el.getAttribute("src") || undefined,
        tagName: "img",
        textContent: null,
        title,
      });
    }

    return results;

    function generateSelector(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const path: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        if (current.id) {
          path.unshift(`#${CSS.escape(current.id)}`);
          break;
        }
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

  // Check for violations: decorative images with conflicting accessible names
  const passedElements: SerializedElement[] = [];
  const failedElements: SerializedElement[] = [];
  const reviewElements: SerializedElement[] = [];

  for (const el of elements) {
    // Decorative but has aria-label or title = fail
    const hasConflictingName =
      (el.ariaLabel && el.ariaLabel.trim() !== "") ||
      (el.ariaLabelledby && el.ariaLabelledby.trim() !== "") ||
      (el.alt === "" && el.title && el.title.trim() !== "");

    if (hasConflictingName) {
      failedElements.push(el);
    } else {
      // Properly hidden decorative image, needs review to confirm it's decorative
      reviewElements.push(el);
    }
  }

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative images found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative image(s) with conflicting accessible names`
          : `${reviewElements.length} decorative image(s) need manual verification`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: reviewElements.length,
    reviewElements,
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "needs_review",
    testability: "semi_automatic",
    testDescription:
      "Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.2.1",
    totalElements: elements.length,
  };
}

async function runTest1_2_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const areas = document.querySelectorAll("area:not([href])");

    for (const el of areas) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: { alt, "aria-hidden": ariaHidden },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: "area:not([href])",
        tagName: "area",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  const passedElements = elements.filter(
    (el) => el.alt === "" || el.ariaHidden === true
  );
  const failedElements = elements.filter(
    (el) => el.alt !== "" && el.alt !== null && el.ariaHidden !== true
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative area elements found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative area(s) not properly hidden`
          : `${passedElements.length} decorative area(s) properly hidden`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: 0,
    reviewElements: [],
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "passed",
    testability: "semi_automatic",
    testDescription:
      "Chaque zone non cliquable (balise <area> sans attribut href) de décoration vérifie-t-elle une de ces conditions ?",
    testNumber: "1.2.2",
    totalElements: elements.length,
  };
}

async function runTest1_2_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const objects = document.querySelectorAll('object[type^="image/"]');

    for (const el of objects) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Only consider decorative objects
      if (ariaHidden !== "true" && role !== "presentation" && role !== "none") {
        continue;
      }

      if (el.closest("figure")) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-hidden": ariaHidden,
          data: el.getAttribute("data"),
          role,
          type: el.getAttribute("type"),
        },
        figcaptionText: null,
        isInFigure: false,
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

  const failedElements = elements.filter(
    (el) => el.ariaLabel || el.title || el.textContent
  );
  const passedElements = elements.filter(
    (el) => !(el.ariaLabel || el.title || el.textContent)
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative object images found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative object(s) with conflicting accessible names`
          : `${passedElements.length} decorative object(s) properly hidden`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: 0,
    reviewElements: [],
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "passed",
    testability: "semi_automatic",
    testDescription:
      'Chaque image objet (balise <object> avec l\'attribut type="image/...") de décoration, sans légende, vérifie-t-elle une de ces conditions ?',
    testNumber: "1.2.3",
    totalElements: elements.length,
  };
}

async function runTest1_2_4(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Only consider decorative SVGs
      if (ariaHidden !== "true" && role !== "presentation" && role !== "none") {
        continue;
      }

      if (el.closest("figure")) continue;

      const titleEl = el.querySelector("title");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-hidden": ariaHidden,
          "aria-label": el.getAttribute("aria-label"),
          role,
        },
        figcaptionText: null,
        isInFigure: false,
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

  const failedElements = elements.filter(
    (el) => el.ariaLabel || el.ariaLabelledby || el.textContent || el.title
  );
  const passedElements = elements.filter(
    (el) => !(el.ariaLabel || el.ariaLabelledby || el.textContent || el.title)
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative SVGs found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative SVG(s) with conflicting accessible names`
          : `${passedElements.length} decorative SVG(s) properly hidden`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: 0,
    reviewElements: [],
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "passed",
    testability: "semi_automatic",
    testDescription:
      "Chaque image vectorielle (balise <svg>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.2.4",
    totalElements: elements.length,
  };
}

async function runTest1_2_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const canvases = document.querySelectorAll("canvas");

    for (const el of canvases) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Only consider decorative canvases
      if (ariaHidden !== "true" && role !== "presentation" && role !== "none") {
        continue;
      }

      if (el.closest("figure")) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-hidden": ariaHidden,
          role,
        },
        figcaptionText: null,
        isInFigure: false,
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

  const failedElements = elements.filter(
    (el) => el.ariaLabel || el.ariaLabelledby || el.textContent || el.title
  );
  const passedElements = elements.filter(
    (el) => !(el.ariaLabel || el.ariaLabelledby || el.textContent || el.title)
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative canvas elements found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative canvas(es) with conflicting accessible names`
          : `${passedElements.length} decorative canvas(es) properly hidden`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: 0,
    reviewElements: [],
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "passed",
    testability: "semi_automatic",
    testDescription:
      "Chaque image bitmap (balise <canvas>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.2.5",
    totalElements: elements.length,
  };
}

async function runTest1_2_6(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll('embed[type^="image/"]');

    for (const el of embeds) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Only consider decorative embeds
      if (ariaHidden !== "true" && role !== "presentation" && role !== "none") {
        continue;
      }

      if (el.closest("figure")) continue;

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-hidden": ariaHidden,
          role,
          src: el.getAttribute("src"),
          type: el.getAttribute("type"),
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: `embed[src="${el.getAttribute("src")}"]`,
        src: el.getAttribute("src") || undefined,
        tagName: "embed",
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    return results;
  });

  const failedElements = elements.filter((el) => el.ariaLabel || el.title);
  const passedElements = elements.filter((el) => !(el.ariaLabel || el.title));

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No decorative embedded images found"
        : failedElements.length > 0
          ? `${failedElements.length} decorative embed(s) with conflicting accessible names`
          : `${passedElements.length} decorative embed(s) properly hidden`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: 0,
    reviewElements: [],
    status:
      elements.length === 0
        ? "not_applicable"
        : failedElements.length > 0
          ? "failed"
          : "passed",
    testability: "semi_automatic",
    testDescription:
      'Chaque image embarquée (balise <embed> avec l\'attribut type="image/...") de décoration, sans légende, vérifie-t-elle une de ces conditions ?',
    testNumber: "1.2.6",
    totalElements: elements.length,
  };
}
