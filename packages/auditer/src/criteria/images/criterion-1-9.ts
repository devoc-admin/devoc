/**
 * Criterion 1.9: Image caption association
 *
 * Tests 1.9.1 - 1.9.5
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_9({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_9_1(page));
  tests.push(await runTest1_9_2(page));
  tests.push(await runTest1_9_3(page));
  tests.push(await runTest1_9_4(page));
  tests.push(await runTest1_9_5(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.9",
    criterionTitle:
      "Chaque légende d'image est-elle, si nécessaire, correctement reliée à l'image correspondante ?",
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

async function runTest1_9_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    // Find figures containing img, input[type="image"], or role="img"
    const figures = document.querySelectorAll("figure");

    for (const figure of figures) {
      const img = figure.querySelector(
        'img, input[type="image"], [role="img"]'
      );
      if (!img) continue;

      const figcaption = figure.querySelector("figcaption");
      const figureRole = figure.getAttribute("role");
      const ariaLabelledby = figure.getAttribute("aria-labelledby");

      // Check proper association
      const hasProperRole = figureRole === "figure" || figureRole === "group";
      const hasFigcaption = !!figcaption;

      // Check if aria-labelledby references figcaption
      let ariaLabelReferencesCaption = false;
      if (ariaLabelledby && figcaption?.id) {
        ariaLabelReferencesCaption = ariaLabelledby
          .split(/\s+/)
          .includes(figcaption.id);
      }

      results.push({
        alt: img.getAttribute("alt"),
        ariaDescribedby: null,
        ariaHidden: img.getAttribute("aria-hidden") === "true",
        ariaLabel: figure.getAttribute("aria-label"),
        ariaLabelledby,
        attributes: {
          ariaLabelReferencesCaption: String(ariaLabelReferencesCaption),
          figcaptionId: figcaption?.id || null,
          figureAriaLabelledby: ariaLabelledby,
          figureRole,
          hasFigcaption: String(hasFigcaption),
          hasProperRole: String(hasProperRole),
        },
        figcaptionText: figcaption?.textContent?.trim() || null,
        isInFigure: true,
        outerHtml: figure.outerHTML.slice(0, 500),
        role: figureRole,
        selector: generateSelector(figure),
        src: img.getAttribute("src") || undefined,
        tagName: "figure",
        textContent: null,
        title: null,
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

  // Check for issues
  const failedElements = elements.filter((el) => {
    const hasFigcaption = el.attributes.hasFigcaption === "true";
    if (!hasFigcaption) return true; // Figure without caption is a problem

    // If has figcaption but no proper role, it might need review
    const hasProperRole = el.attributes.hasProperRole === "true";
    return !hasProperRole;
  });

  const reviewElements = elements.filter((el) => {
    const hasFigcaption = el.attributes.hasFigcaption === "true";
    const hasProperRole = el.attributes.hasProperRole === "true";
    return hasFigcaption && hasProperRole;
  });

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No figures with images found"
        : failedElements.length > 0
          ? `${failedElements.length} figure(s) have caption association issues`
          : `${reviewElements.length} figure(s) need manual review for proper caption association`,
    passedCount: 0,
    passedElements: [],
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
      'Chaque image pourvue d\'une légende (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?',
    testNumber: "1.9.1",
    totalElements: elements.length,
  };
}

async function runTest1_9_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const figures = document.querySelectorAll("figure");

    for (const figure of figures) {
      const object = figure.querySelector('object[type^="image/"]');
      if (!object) continue;

      const figcaption = figure.querySelector("figcaption");
      const figureRole = figure.getAttribute("role");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: figure.getAttribute("aria-label"),
        ariaLabelledby: figure.getAttribute("aria-labelledby"),
        attributes: {
          data: object.getAttribute("data"),
          figureRole,
          hasFigcaption: String(!!figcaption),
          hasProperRole: String(
            figureRole === "figure" || figureRole === "group"
          ),
        },
        figcaptionText: figcaption?.textContent?.trim() || null,
        isInFigure: true,
        outerHtml: figure.outerHTML.slice(0, 500),
        role: figureRole,
        selector: generateSelector(figure),
        tagName: "figure",
        textContent: null,
        title: null,
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
    (el) =>
      el.attributes.hasFigcaption === "false" ||
      el.attributes.hasProperRole === "false"
  );
  const reviewElements = elements.filter(
    (el) =>
      el.attributes.hasFigcaption === "true" &&
      el.attributes.hasProperRole === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No figures with object images found"
        : failedElements.length > 0
          ? `${failedElements.length} figure(s) with object have caption issues`
          : `${reviewElements.length} figure(s) need manual review`,
    passedCount: 0,
    passedElements: [],
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
      "Chaque image objet pourvue d'une légende (balise <object> avec l'attribut type=\"image/...\" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    testNumber: "1.9.2",
    totalElements: elements.length,
  };
}

async function runTest1_9_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const figures = document.querySelectorAll("figure");

    for (const figure of figures) {
      const embed = figure.querySelector("embed");
      if (!embed) continue;

      const figcaption = figure.querySelector("figcaption");
      const figureRole = figure.getAttribute("role");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: figure.getAttribute("aria-label"),
        ariaLabelledby: figure.getAttribute("aria-labelledby"),
        attributes: {
          figureRole,
          hasFigcaption: String(!!figcaption),
          hasProperRole: String(
            figureRole === "figure" || figureRole === "group"
          ),
          src: embed.getAttribute("src"),
        },
        figcaptionText: figcaption?.textContent?.trim() || null,
        isInFigure: true,
        outerHtml: figure.outerHTML.slice(0, 500),
        role: figureRole,
        selector: generateSelector(figure),
        src: embed.getAttribute("src") || undefined,
        tagName: "figure",
        textContent: null,
        title: null,
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
    (el) =>
      el.attributes.hasFigcaption === "false" ||
      el.attributes.hasProperRole === "false"
  );
  const reviewElements = elements.filter(
    (el) =>
      el.attributes.hasFigcaption === "true" &&
      el.attributes.hasProperRole === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No figures with embedded images found"
        : failedElements.length > 0
          ? `${failedElements.length} figure(s) with embed have caption issues`
          : `${reviewElements.length} figure(s) need manual review`,
    passedCount: 0,
    passedElements: [],
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
      "Chaque image embarquée pourvue d'une légende (balise <embed> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    testNumber: "1.9.3",
    totalElements: elements.length,
  };
}

async function runTest1_9_4(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const figures = document.querySelectorAll("figure");

    for (const figure of figures) {
      const svg = figure.querySelector("svg");
      if (!svg) continue;

      const ariaHidden = svg.getAttribute("aria-hidden");
      const role = svg.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const figcaption = figure.querySelector("figcaption");
      const figureRole = figure.getAttribute("role");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: figure.getAttribute("aria-label"),
        ariaLabelledby: figure.getAttribute("aria-labelledby"),
        attributes: {
          figureRole,
          hasFigcaption: String(!!figcaption),
          hasProperRole: String(
            figureRole === "figure" || figureRole === "group"
          ),
        },
        figcaptionText: figcaption?.textContent?.trim() || null,
        isInFigure: true,
        outerHtml: figure.outerHTML.slice(0, 500),
        role: figureRole,
        selector: generateSelector(figure),
        tagName: "figure",
        textContent: null,
        title: null,
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
    (el) =>
      el.attributes.hasFigcaption === "false" ||
      el.attributes.hasProperRole === "false"
  );
  const reviewElements = elements.filter(
    (el) =>
      el.attributes.hasFigcaption === "true" &&
      el.attributes.hasProperRole === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No figures with SVGs found"
        : failedElements.length > 0
          ? `${failedElements.length} figure(s) with SVG have caption issues`
          : `${reviewElements.length} figure(s) need manual review`,
    passedCount: 0,
    passedElements: [],
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
      "Chaque image vectorielle pourvue d'une légende (balise <svg> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    testNumber: "1.9.4",
    totalElements: elements.length,
  };
}

async function runTest1_9_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const figures = document.querySelectorAll("figure");

    for (const figure of figures) {
      const canvas = figure.querySelector("canvas");
      if (!canvas) continue;

      const ariaHidden = canvas.getAttribute("aria-hidden");
      const role = canvas.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const figcaption = figure.querySelector("figcaption");
      const figureRole = figure.getAttribute("role");

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: figure.getAttribute("aria-label"),
        ariaLabelledby: figure.getAttribute("aria-labelledby"),
        attributes: {
          figureRole,
          hasFigcaption: String(!!figcaption),
          hasProperRole: String(
            figureRole === "figure" || figureRole === "group"
          ),
        },
        figcaptionText: figcaption?.textContent?.trim() || null,
        isInFigure: true,
        outerHtml: figure.outerHTML.slice(0, 500),
        role: figureRole,
        selector: generateSelector(figure),
        tagName: "figure",
        textContent: null,
        title: null,
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
    (el) =>
      el.attributes.hasFigcaption === "false" ||
      el.attributes.hasProperRole === "false"
  );
  const reviewElements = elements.filter(
    (el) =>
      el.attributes.hasFigcaption === "true" &&
      el.attributes.hasProperRole === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No figures with canvas elements found"
        : failedElements.length > 0
          ? `${failedElements.length} figure(s) with canvas have caption issues`
          : `${reviewElements.length} figure(s) need manual review`,
    passedCount: 0,
    passedElements: [],
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
      "Chaque image bitmap pourvue d'une légende (balise <canvas> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    testNumber: "1.9.5",
    totalElements: elements.length,
  };
}
