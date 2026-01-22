/**
 * Criterion 1.6: Detailed descriptions for complex images
 *
 * Tests 1.6.1 - 1.6.10
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_6({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_6_1(page));
  tests.push(await runTest1_6_2(page));
  tests.push(await runTest1_6_3(page));
  tests.push(await runTest1_6_4(page));
  tests.push(await runTest1_6_5(page));
  tests.push(await runTest1_6_6(page));
  tests.push(await runTest1_6_7(page));
  tests.push(await runTest1_6_8(page));
  tests.push(await runTest1_6_9(page));
  tests.push(await runTest1_6_10(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.6",
    criterionTitle:
      "Chaque image porteuse d'information a-t-elle, si nécessaire, une description détaillée ?",
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

async function runTest1_6_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const imgs = document.querySelectorAll("img");

    for (const el of imgs) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      // Skip decorative
      if (alt === "" || role === "presentation" || ariaHidden === "true")
        continue;

      // Check for description mechanisms
      const ariaDescribedby = el.getAttribute("aria-describedby");
      const longdesc = el.getAttribute("longdesc");

      // Check for D-link
      const nextSibling = el.nextElementSibling;
      const hasDLink =
        nextSibling?.tagName.toLowerCase() === "a" &&
        (nextSibling.textContent?.toLowerCase().includes("description") ||
          nextSibling.textContent === "D");

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
        tagName: "img",
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
        ? "No informational images found"
        : `${elements.length} image(s) need manual review for detailed description necessity`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image (balise <img>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.6.1",
    totalElements: elements.length,
  };
}

async function runTest1_6_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const inputs = document.querySelectorAll('input[type="image"]');

    for (const el of inputs) {
      const alt = el.getAttribute("alt");
      const ariaDescribedby = el.getAttribute("aria-describedby");

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
          alt,
          "aria-describedby": ariaDescribedby,
          src: el.getAttribute("src"),
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
        ? "No image buttons found"
        : `${elements.length} image button(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque bouton de type image (balise <input> avec l'attribut type=\"image\") porteur d'information, qui nécessite une description détaillée, vérifie-t-il une de ces conditions ?",
    testNumber: "1.6.2",
    totalElements: elements.length,
  };
}

async function runTest1_6_3(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const objects = document.querySelectorAll('object[type^="image/"]');

    for (const el of objects) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation") continue;

      results.push({
        alt: null,
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-describedby": el.getAttribute("aria-describedby"),
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
        ? "No object images found"
        : `${elements.length} object(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.6.3",
    totalElements: elements.length,
  };
}

async function runTest1_6_4(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const embeds = document.querySelectorAll("embed");

    for (const el of embeds) {
      const ariaHidden = el.getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

      results.push({
        alt: null,
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          "aria-describedby": el.getAttribute("aria-describedby"),
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
        ? "No embed elements found"
        : `${elements.length} embed(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image embarquée (balise <embed>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.6.4",
    totalElements: elements.length,
  };
}

async function runTest1_6_5(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const svgs = document.querySelectorAll("svg");

    for (const el of svgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");
      if (ariaHidden === "true" || role === "presentation" || role === "none")
        continue;

      const descEl = el.querySelector("desc");

      results.push({
        alt: null,
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-describedby": el.getAttribute("aria-describedby"),
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
        ? "No SVG elements found"
        : `${elements.length} SVG(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image vectorielle (balise <svg>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.6.5",
    totalElements: elements.length,
  };
}

async function runTest1_6_6(page: Page): Promise<TestResult> {
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
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-describedby": el.getAttribute("aria-describedby"),
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
        ? "No canvas elements found"
        : `${elements.length} canvas element(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Chaque image bitmap (balise <canvas>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    testNumber: "1.6.6",
    totalElements: elements.length,
  };
}

async function runTest1_6_7(page: Page): Promise<TestResult> {
  // Check that aria-describedby actually references correct description
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const allImages = document.querySelectorAll(
      'img, input[type="image"], object, embed, svg, canvas'
    );

    for (const el of allImages) {
      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      // Check if referenced elements exist
      const ids = ariaDescribedby.split(/\s+/);
      const referencedElements = ids.map((id) => ({
        exists: !!document.getElementById(id),
        id,
        text: document.getElementById(id)?.textContent?.trim() || null,
      }));

      const allExist = referencedElements.every((ref) => ref.exists);
      const texts = referencedElements
        .map((ref) => ref.text)
        .filter(Boolean)
        .join(" ");

      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: texts || null,
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          allReferencesExist: String(allExist),
          "aria-describedby": ariaDescribedby,
          referencedIds: JSON.stringify(referencedElements),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role: el.getAttribute("role"),
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

  // Check for broken references
  const failedElements = elements.filter(
    (el) => el.attributes.allReferencesExist === "false"
  );
  const reviewElements = elements.filter(
    (el) => el.attributes.allReferencesExist === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No images with aria-describedby found"
        : failedElements.length > 0
          ? `${failedElements.length} image(s) have broken aria-describedby references`
          : `${reviewElements.length} image(s) with aria-describedby need manual review`,
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
      "Pour chaque image (balise <img>, <input> avec l'attribut type=\"image\", <object>, <embed>, <svg>, <canvas>) porteuse d'information, qui nécessite une description détaillée et qui utilise un attribut WAI-ARIA aria-describedby, la propriété WAI-ARIA aria-describedby référence-t-elle la description détaillée ?",
    testNumber: "1.6.7",
    totalElements: elements.length,
  };
}

async function runTest1_6_8(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const images = document.querySelectorAll(
      'img, input[type="image"], [role="img"]'
    );

    for (const el of images) {
      const alt = el.getAttribute("alt");
      const ariaHidden = el.getAttribute("aria-hidden");
      const role = el.getAttribute("role");

      if (alt === "" || role === "presentation" || ariaHidden === "true")
        continue;

      results.push({
        alt,
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt,
          "aria-describedby": el.getAttribute("aria-describedby"),
          longdesc: el.getAttribute("longdesc"),
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
        ? "No informational images found"
        : `${elements.length} image(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      'Chaque image (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img") porteuse d\'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?',
    testNumber: "1.6.8",
    totalElements: elements.length,
  };
}

async function runTest1_6_9(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const roleImgs = document.querySelectorAll('[role="img"]');

    for (const el of roleImgs) {
      const ariaHidden = el.getAttribute("aria-hidden");
      if (ariaHidden === "true") continue;

      results.push({
        alt: null,
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        attributes: {
          "aria-describedby": el.getAttribute("aria-describedby"),
          "aria-label": el.getAttribute("aria-label"),
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role: "img",
        selector: generateSelector(el),
        tagName: el.tagName.toLowerCase(),
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
        ? "No role='img' elements found"
        : `${elements.length} role='img' element(s) need manual review`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      'Chaque balise possédant un attribut WAI-ARIA role="img" porteuse d\'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?',
    testNumber: "1.6.9",
    totalElements: elements.length,
  };
}

async function runTest1_6_10(page: Page): Promise<TestResult> {
  // Same as 1.6.7 but specifically checking that aria-describedby points to visible adjacent description
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];
    const images = document.querySelectorAll(
      'img[aria-describedby], input[type="image"][aria-describedby], [role="img"][aria-describedby]'
    );

    for (const el of images) {
      const ariaDescribedby = el.getAttribute("aria-describedby");
      if (!ariaDescribedby) continue;

      const ids = ariaDescribedby.split(/\s+/);
      const referencedElements = ids.map((id) => {
        const refEl = document.getElementById(id);
        if (!refEl) return { exists: false, id, isVisible: false, text: null };

        const style = window.getComputedStyle(refEl);
        const isVisible =
          style.display !== "none" && style.visibility !== "hidden";

        return {
          exists: true,
          id,
          isVisible,
          text: refEl.textContent?.trim() || null,
        };
      });

      const allExist = referencedElements.every((ref) => ref.exists);
      const allVisible = referencedElements.every((ref) => ref.isVisible);

      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: referencedElements
          .map((r) => r.text)
          .filter(Boolean)
          .join(" "),
        ariaHidden: false,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          allExist: String(allExist),
          allVisible: String(allVisible),
          "aria-describedby": ariaDescribedby,
        },
        figcaptionText: null,
        isInFigure: !!el.closest("figure"),
        outerHtml: el.outerHTML.slice(0, 500),
        role: el.getAttribute("role"),
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

  const failedElements = elements.filter(
    (el) =>
      el.attributes.allExist === "false" || el.attributes.allVisible === "false"
  );
  const reviewElements = elements.filter(
    (el) =>
      el.attributes.allExist === "true" && el.attributes.allVisible === "true"
  );

  return {
    failedCount: failedElements.length,
    failedElements,
    message:
      elements.length === 0
        ? "No images with aria-describedby found"
        : failedElements.length > 0
          ? `${failedElements.length} image(s) have invalid or hidden aria-describedby references`
          : `${reviewElements.length} image(s) need manual review`,
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
      'Chaque image (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img") porteuse d\'information, qui implémente une description détaillée, et qui utilise une propriété WAI-ARIA aria-describedby, vérifie-t-elle ces conditions ?',
    testNumber: "1.6.10",
    totalElements: elements.length,
  };
}
