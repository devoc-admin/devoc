/**
 * Criterion 1.7: Detailed description relevance
 *
 * Tests 1.7.1 - 1.7.6
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_7({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_7_1(page));
  tests.push(await runTest1_7_2(page));
  tests.push(await runTest1_7_3(page));
  tests.push(await runTest1_7_4(page));
  tests.push(await runTest1_7_5(page));
  tests.push(await runTest1_7_6(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.7",
    criterionTitle:
      "Pour chaque image porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?",
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

async function runTest1_7_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const images = document.querySelectorAll('img, [role="img"]');

    for (const el of images) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      if (alt === "" || role === "presentation" || ariaHidden === "true")
        continue;

      // Check for detailed description mechanisms
      const ariaDescribedby = el.getAttribute("aria-describedby");
      const longdesc = el.getAttribute("longdesc");

      // Check for adjacent D-link
      const nextSibling = el.nextElementSibling;
      const hasDLink =
        nextSibling?.tagName.toLowerCase() === "a" &&
        (nextSibling.textContent?.toLowerCase().includes("description") ||
          nextSibling.textContent === "D" ||
          nextSibling.textContent === "[D]");

      // Only include if has some form of detailed description
      if (!(ariaDescribedby || longdesc || hasDLink)) continue;

      // Get described by text
      let describedbyText: string | null = null;
      if (ariaDescribedby) {
        const ids = ariaDescribedby.split(/\s+/);
        const texts = ids
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean);
        describedbyText = texts.length > 0 ? texts.join(" ") : null;
      }

      results.push({
        alt,
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-describedby": ariaDescribedby,
          hasDLink: String(hasDLink),
          longdesc,
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
        ? "No images with detailed descriptions found"
        : `${elements.length} image(s) with detailed descriptions need manual review for relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.1",
    totalElements: elements.length,
  };
}

async function runTest1_7_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const inputs = document.querySelectorAll('input[type="image"]');

    for (const el of inputs) {
      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      let describedbyText: string | null = null;
      const ids = ariaDescribedby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      describedbyText = texts.length > 0 ? texts.join(" ") : null;

      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt: el.getAttribute("alt"),
          "aria-describedby": ariaDescribedby,
        },
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
        ? "No image buttons with detailed descriptions found"
        : `${elements.length} image button(s) need manual review for description relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque bouton de type image (balise <input> avec l'attribut type=\"image\") porteur d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.2",
    totalElements: elements.length,
  };
}

async function runTest1_7_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const objects = document.querySelectorAll('object[type^="image/"]');

    for (const el of objects) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation") continue;

      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      let describedbyText: string | null = null;
      const ids = ariaDescribedby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      describedbyText = texts.length > 0 ? texts.join(" ") : null;

      results.push({
        alt: null,
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-describedby": ariaDescribedby,
          data: el.getAttribute("data"),
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
        ? "No object images with detailed descriptions found"
        : `${elements.length} object(s) need manual review for description relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.3",
    totalElements: elements.length,
  };
}

async function runTest1_7_4(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll("embed");

    for (const el of embeds) {
      const ariaHidden = el.getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      let describedbyText: string | null = null;
      const ids = ariaDescribedby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      describedbyText = texts.length > 0 ? texts.join(" ") : null;

      results.push({
        alt: null,
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-describedby": ariaDescribedby,
          src: el.getAttribute("src"),
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
        ? "No embedded images with detailed descriptions found"
        : `${elements.length} embed(s) need manual review for description relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image embarquée (balise <embed>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.4",
    totalElements: elements.length,
  };
}

async function runTest1_7_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const ariaDescribedby = el.getAttribute("aria-describedby");
      const descEl = el.querySelector("desc");

      if (!(ariaDescribedby || descEl)) continue;

      let describedbyText: string | null = null;
      if (ariaDescribedby) {
        const ids = ariaDescribedby.split(/\s+/);
        const texts = ids
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean);
        describedbyText = texts.length > 0 ? texts.join(" ") : null;
      }

      results.push({
        alt: null,
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-describedby": ariaDescribedby,
          hasDesc: String(!!descEl),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector: generateSelector(el),
        tagName: "svg",
        textContent: descEl?.textContent?.trim() || null,
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
        ? "No SVGs with detailed descriptions found"
        : `${elements.length} SVG(s) need manual review for description relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.5",
    totalElements: elements.length,
  };
}

async function runTest1_7_6(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const canvases = document.querySelectorAll("canvas");

    for (const el of canvases) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      let describedbyText: string | null = null;
      const ids = ariaDescribedby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      describedbyText = texts.length > 0 ? texts.join(" ") : null;

      results.push({
        alt: null,
        ariaDescribedby: describedbyText,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-describedby": ariaDescribedby,
        },
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
        ? "No canvas elements with detailed descriptions found"
        : `${elements.length} canvas element(s) need manual review for description relevance`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    testNumber: "1.7.6",
    totalElements: elements.length,
  };
}
