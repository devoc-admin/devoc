/**
 * Criterion 1.1: Each informational image has an alternative text
 *
 * Tests:
 * 1.1.1 - <img> or role="img" elements
 * 1.1.2 - <area> elements in image maps
 * 1.1.3 - <input type="image"> elements
 * 1.1.4 - <area> elements used as links
 * 1.1.5 - <object type="image/..."> elements
 * 1.1.6 - <embed type="image/..."> elements
 * 1.1.7 - <svg> elements
 * 1.1.8 - <canvas> elements
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_1({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  // Test 1.1.1 - img and role="img"
  tests.push(await runTest1_1_1(page));

  // Test 1.1.2 - area elements
  tests.push(await runTest1_1_2(page));

  // Test 1.1.3 - input type="image"
  tests.push(await runTest1_1_3(page));

  // Test 1.1.4 - area as links
  tests.push(await runTest1_1_4(page));

  // Test 1.1.5 - object type="image"
  tests.push(await runTest1_1_5(page));

  // Test 1.1.6 - embed type="image"
  tests.push(await runTest1_1_6(page));

  // Test 1.1.7 - svg elements
  tests.push(await runTest1_1_7(page));

  // Test 1.1.8 - canvas elements
  tests.push(await runTest1_1_8(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.1",
    criterionTitle:
      "Chaque image porteuse d'information a-t-elle une alternative textuelle ?",
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

async function runTest1_1_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    // Find all img elements and elements with role="img"
    const imgs = document.querySelectorAll('img, [role="img"]');

    for (const el of imgs) {
      // Skip decorative images
      const alt = el.getAttribute("alt");
      const role = el.getAttribute("role");
      const ariaHidden = el.getAttribute("aria-hidden");

      // Skip if explicitly decorative
      if (alt === "" || role === "presentation" || ariaHidden === "true") {
        continue;
      }

      // Serialize element data
      const selector = generateSelector(el);
      results.push({
        alt,
        ariaDescribedby: getAriaDescribedbyText(el),
        ariaHidden: ariaHidden === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: getAriaLabelledbyText(el),
        attributes: extractAttributes(el),
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role,
        selector,
        src: el.getAttribute("src") || undefined,
        tagName: el.tagName.toLowerCase(),
        textContent: el.textContent?.trim() || null,
        title: el.getAttribute("title"),
      });
    }

    return results;

    // Helper functions (inlined for evaluate)
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

    function getAriaLabelledbyText(element: Element): string | null {
      const labelledby = element.getAttribute("aria-labelledby");
      if (!labelledby) return null;
      const ids = labelledby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      return texts.length > 0 ? texts.join(" ") : null;
    }

    function getAriaDescribedbyText(element: Element): string | null {
      const describedby = element.getAttribute("aria-describedby");
      if (!describedby) return null;
      const ids = describedby.split(/\s+/);
      const texts = ids
        .map((id) => document.getElementById(id)?.textContent?.trim())
        .filter(Boolean);
      return texts.length > 0 ? texts.join(" ") : null;
    }

    function extractAttributes(
      element: Element
    ): Record<string, string | null> {
      const attrs: Record<string, string | null> = {};
      for (const attr of [
        "id",
        "class",
        "src",
        "alt",
        "title",
        "aria-label",
        "role",
      ]) {
        if (element.hasAttribute(attr)) {
          attrs[attr] = element.getAttribute(attr);
        }
      }
      return attrs;
    }
  });

  // Categorize elements
  const passedElements: SerializedElement[] = [];
  const failedElements: SerializedElement[] = [];
  const reviewElements: SerializedElement[] = [];

  for (const el of elements) {
    const hasAlt =
      (el.alt !== null && el.alt !== "") ||
      (el.ariaLabel !== null && el.ariaLabel !== "") ||
      (el.ariaLabelledby !== null && el.ariaLabelledby !== "") ||
      (el.title !== null && el.title !== "");

    if (hasAlt) {
      // Has alt text, but need manual review for relevance
      reviewElements.push(el);
    } else {
      // No alt text - automatic fail
      failedElements.push(el);
    }
  }

  const status =
    elements.length === 0
      ? "not_applicable"
      : failedElements.length > 0
        ? "failed"
        : "needs_review";

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No informational images found"
        : failedElements.length > 0
          ? `${failedElements.length} image(s) without alt text`
          : `${reviewElements.length} image(s) need manual review for alt text relevance`,
    passedCount: passedElements.length,
    passedElements,
    reviewCount: reviewElements.length,
    reviewElements,
    status,
    testability: "semi_automatic",
    testDescription:
      "Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.1",
    totalElements: elements.length,
  };
}

async function runTest1_1_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const areas = document.querySelectorAll("area[href]");

    for (const el of areas) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");

      if (ariaHidden === "true") continue;

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

  const failedElements = elements.filter(
    (el) => !(el.alt || el.ariaLabel || el.title)
  );
  const reviewElements = elements.filter(
    (el) => el.alt || el.ariaLabel || el.title
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No <area> elements found"
        : failedElements.length > 0
          ? `${failedElements.length} area(s) without alt text`
          : `${reviewElements.length} area(s) need manual review`,
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
      "Chaque zone (balise <area>) d'une image réactive porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.2",
    totalElements: elements.length,
  };
}

async function runTest1_1_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const inputs = document.querySelectorAll('input[type="image"]');

    for (const el of inputs) {
      const alt = el.getAttribute("alt");

      results.push({
        alt,
        ariaDescribedby: null,
        ariaHidden: el.getAttribute("aria-hidden") === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt,
          src: el.getAttribute("src"),
          type: "image",
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

  const failedElements = elements.filter(
    (el) => !(el.alt || el.ariaLabel || el.title)
  );
  const reviewElements = elements.filter(
    (el) => el.alt || el.ariaLabel || el.title
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No image buttons found"
        : failedElements.length > 0
          ? `${failedElements.length} image button(s) without alt text`
          : `${reviewElements.length} image button(s) need manual review`,
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
      'Chaque bouton de type image (balise <input> avec l\'attribut type="image") a-t-il une alternative textuelle ?',
    testNumber: "1.1.3",
    totalElements: elements.length,
  };
}

async function runTest1_1_4(page: Page): Promise<TestResult> {
  // Similar to 1.1.2 but specifically for area elements used as links
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const areas = document.querySelectorAll("area[href]");

    for (const el of areas) {
      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: null,
        ariaHidden: el.getAttribute("aria-hidden") === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt: el.getAttribute("alt"),
          href: el.getAttribute("href"),
        },
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

  const failedElements = elements.filter(
    (el) => !(el.alt || el.ariaLabel || el.title)
  );
  const reviewElements = elements.filter(
    (el) => el.alt || el.ariaLabel || el.title
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No area link elements found"
        : failedElements.length > 0
          ? `${failedElements.length} area link(s) without alt text`
          : `${reviewElements.length} area link(s) need manual review`,
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
      "Chaque zone (balise <area>) d'une image réactive, utilisée comme lien, a-t-elle une alternative textuelle ?",
    testNumber: "1.1.4",
    totalElements: elements.length,
  };
}

async function runTest1_1_5(page: Page): Promise<TestResult> {
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

  const failedElements = elements.filter(
    (el) => !(el.ariaLabel || el.title || el.textContent)
  );
  const reviewElements = elements.filter(
    (el) => el.ariaLabel || el.title || el.textContent
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No image objects found"
        : failedElements.length > 0
          ? `${failedElements.length} object(s) without alt text`
          : `${reviewElements.length} object(s) need manual review`,
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
      "Chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.5",
    totalElements: elements.length,
  };
}

async function runTest1_1_6(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll('embed[type^="image/"]');

    for (const el of embeds) {
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
          src: el.getAttribute("src"),
          type: el.getAttribute("type"),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
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

  const failedElements = elements.filter((el) => !(el.ariaLabel || el.title));
  const reviewElements = elements.filter((el) => el.ariaLabel || el.title);

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No embedded images found"
        : failedElements.length > 0
          ? `${failedElements.length} embed(s) without alt text`
          : `${reviewElements.length} embed(s) need manual review`,
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
      "Chaque image embarquée (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.6",
    totalElements: elements.length,
  };
}

async function runTest1_1_7(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Skip decorative SVGs
      if (ariaHidden === "true" || role === "presentation" || role === "none") {
        continue;
      }

      const titleEl = el.querySelector("title");
      const descEl = el.querySelector("desc");

      results.push({
        alt: null,
        ariaDescribedby: descEl?.textContent?.trim() || null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-label": el.getAttribute("aria-label"),
          "aria-labelledby": el.getAttribute("aria-labelledby"),
          role,
        },
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

  const failedElements = elements.filter(
    (el) => !(el.ariaLabel || el.ariaLabelledby || el.textContent || el.title)
  );
  const reviewElements = elements.filter(
    (el) => el.ariaLabel || el.ariaLabelledby || el.textContent || el.title
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No SVG images found"
        : failedElements.length > 0
          ? `${failedElements.length} SVG(s) without alt text`
          : `${reviewElements.length} SVG(s) need manual review`,
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
      "Chaque image vectorielle (balise <svg>) porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.7",
    totalElements: elements.length,
  };
}

async function runTest1_1_8(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const canvases = document.querySelectorAll("canvas");

    for (const el of canvases) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      if (ariaHidden === "true" || role === "presentation" || role === "none") {
        continue;
      }

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-label": el.getAttribute("aria-label"),
          role,
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

  const failedElements = elements.filter(
    (el) => !(el.ariaLabel || el.ariaLabelledby || el.textContent || el.title)
  );
  const reviewElements = elements.filter(
    (el) => el.ariaLabel || el.ariaLabelledby || el.textContent || el.title
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No canvas elements found"
        : failedElements.length > 0
          ? `${failedElements.length} canvas element(s) without alt text`
          : `${reviewElements.length} canvas element(s) need manual review`,
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
      "Chaque image bitmap (balise <canvas>) porteuse d'information a-t-elle une alternative textuelle ?",
    testNumber: "1.1.8",
    totalElements: elements.length,
  };
}
