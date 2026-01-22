/**
 * Criterion 1.4: CAPTCHA alt text identifies nature and function
 *
 * Test 1.4.1 - Check that CAPTCHA images have alt text describing their nature
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_4({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_4_1(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.4",
    criterionTitle:
      "Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?",
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

async function runTest1_4_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    // Find potential CAPTCHA elements
    const allImages = document.querySelectorAll(
      'img, [role="img"], input[type="image"], object[type^="image/"], embed[type^="image/"], svg, canvas'
    );

    const captchaPatterns = [
      /captcha/i,
      /recaptcha/i,
      /hcaptcha/i,
      /securimage/i,
      /turnstile/i,
      /challenge/i,
      /verify/i,
    ];

    for (const el of allImages) {
      const src = el.getAttribute("src") || "";
      const className = el.className || "";
      const id = el.getAttribute("id") || "";
      const alt = el.getAttribute("alt") || "";
      const dataAttrs = Array.from(el.attributes)
        .filter((attr) => attr.name.startsWith("data-"))
        .map((attr) => attr.value)
        .join(" ");

      const textToCheck = `${src} ${className} ${id} ${alt} ${dataAttrs}`;

      const isCaptcha = captchaPatterns.some((pattern) =>
        pattern.test(textToCheck)
      );

      if (!isCaptcha) continue;

      // Also check parent elements for CAPTCHA indicators
      const parent = el.closest(
        '[class*="captcha"], [id*="captcha"], [class*="recaptcha"], [class*="hcaptcha"]'
      );

      if (!(isCaptcha || parent)) continue;

      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: null,
        ariaHidden: el.getAttribute("aria-hidden") === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          alt: el.getAttribute("alt"),
          class: className,
          id,
          src,
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: el.getAttribute("role"),
        selector: generateSelector(el),
        src: src || undefined,
        tagName: el.tagName.toLowerCase(),
        textContent: null,
        title: el.getAttribute("title"),
      });
    }

    // Also look for reCAPTCHA/hCaptcha iframes
    const captchaIframes = document.querySelectorAll(
      'iframe[src*="recaptcha"], iframe[src*="hcaptcha"], iframe[title*="captcha"], iframe[title*="reCAPTCHA"]'
    );

    for (const iframe of captchaIframes) {
      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: iframe.getAttribute("aria-hidden") === "true",
        ariaLabel: iframe.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
          src: iframe.getAttribute("src"),
          title: iframe.getAttribute("title"),
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: iframe.outerHTML.slice(0, 500),
        role: null,
        selector: generateSelector(iframe),
        tagName: "iframe",
        textContent: null,
        title: iframe.getAttribute("title"),
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
        ? "No CAPTCHA images detected"
        : `${elements.length} CAPTCHA element(s) need manual review for alt text appropriateness`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      "Pour chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role=\"img\") utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?",
    testNumber: "1.4.1",
    totalElements: elements.length,
  };
}
