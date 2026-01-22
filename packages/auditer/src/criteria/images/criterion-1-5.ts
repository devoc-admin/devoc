/**
 * Criterion 1.5: CAPTCHA alternative access
 *
 * Tests:
 * 1.5.1 - CAPTCHA images have alternative access method
 * 1.5.2 - CAPTCHA image buttons have alternative access method
 */

import type { Page } from "playwright";
import { computeOverallStatus } from "../../core/auditer";
import type {
  AuditConfig,
  CriterionResult,
  SerializedElement,
  TestResult,
} from "../../types";

export async function runCriterion1_5({
  page,
}: {
  page: Page;
  config: AuditConfig;
}): Promise<CriterionResult> {
  const tests: TestResult[] = [];

  tests.push(await runTest1_5_1(page));
  tests.push(await runTest1_5_2(page));

  const overallStatus = computeOverallStatus(tests.map((t) => t.status));

  return {
    criteria: tests,
    criterionNumber: "1.5",
    criterionTitle:
      "Pour chaque image utilisée comme CAPTCHA, une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?",
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

async function runTest1_5_1(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const captchaPatterns = [
      /captcha/i,
      /recaptcha/i,
      /hcaptcha/i,
      /securimage/i,
      /turnstile/i,
    ];

    // Find CAPTCHA containers
    const captchaContainers = document.querySelectorAll(
      '[class*="captcha"], [id*="captcha"], [class*="recaptcha"], [class*="hcaptcha"]'
    );

    for (const container of captchaContainers) {
      // Check for audio alternative
      const hasAudioLink =
        container.querySelector('a[href*="audio"], button[class*="audio"]') ||
        container.querySelector('[aria-label*="audio"], [title*="audio"]');

      // Check for alternative CAPTCHA methods
      const hasAlternative = container.querySelector(
        '[class*="alternative"], [class*="switch"], button:not([class*="submit"])'
      );

      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
        ariaLabel: null,
        ariaLabelledby: null,
        attributes: {
          class: container.className,
          hasAlternative: String(!!hasAlternative),
          hasAudioLink: String(!!hasAudioLink),
          id: container.getAttribute("id"),
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: container.outerHTML.slice(0, 500),
        role: null,
        selector: generateSelector(container),
        tagName: container.tagName.toLowerCase(),
        textContent: null,
        title: null,
      });
    }

    // Also check for CAPTCHA iframes
    const captchaIframes = document.querySelectorAll(
      'iframe[src*="recaptcha"], iframe[src*="hcaptcha"]'
    );

    for (const iframe of captchaIframes) {
      results.push({
        alt: null,
        ariaDescribedby: null,
        ariaHidden: false,
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

    // Check for CAPTCHA images
    const allImages = document.querySelectorAll(
      'img, [role="img"], object[type^="image/"], embed[type^="image/"], svg, canvas'
    );

    for (const el of allImages) {
      const src = el.getAttribute("src") || "";
      const className = el.className || "";
      const id = el.getAttribute("id") || "";

      const textToCheck = `${src} ${className} ${id}`;
      const isCaptcha = captchaPatterns.some((pattern) =>
        pattern.test(textToCheck)
      );

      if (!isCaptcha) continue;

      results.push({
        alt: el.getAttribute("alt"),
        ariaDescribedby: null,
        ariaHidden: el.getAttribute("aria-hidden") === "true",
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: null,
        attributes: {
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
        ? "No CAPTCHA elements detected"
        : `${elements.length} CAPTCHA element(s) need manual review for alternative access`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      'Chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role="img") utilisée comme CAPTCHA vérifie-t-elle une de ces conditions ?',
    testNumber: "1.5.1",
    totalElements: elements.length,
  };
}

async function runTest1_5_2(page: Page): Promise<TestResult> {
  const elements = await page.evaluate(() => {
    const results: SerializedElement[] = [];

    const captchaPatterns = [
      /captcha/i,
      /recaptcha/i,
      /hcaptcha/i,
      /securimage/i,
    ];

    // Find image buttons that might be CAPTCHA-related
    const imageButtons = document.querySelectorAll('input[type="image"]');

    for (const el of imageButtons) {
      const src = el.getAttribute("src") || "";
      const className = el.className || "";
      const id = el.getAttribute("id") || "";
      const alt = el.getAttribute("alt") || "";
      const name = el.getAttribute("name") || "";

      const textToCheck = `${src} ${className} ${id} ${alt} ${name}`;
      const isCaptcha = captchaPatterns.some((pattern) =>
        pattern.test(textToCheck)
      );

      // Also check if it's inside a CAPTCHA container
      const inCaptchaContainer = el.closest(
        '[class*="captcha"], [id*="captcha"]'
      );

      if (!(isCaptcha || inCaptchaContainer)) continue;

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
          name,
          src,
        },
        figcaptionText: null,
        isInFigure: false,
        outerHtml: el.outerHTML.slice(0, 500),
        role: null,
        selector: generateSelector(el),
        src: src || undefined,
        tagName: "input",
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
        ? "No CAPTCHA image buttons detected"
        : `${elements.length} CAPTCHA button(s) need manual review for alternative access`,
    passedCount: 0,
    passedElements: [],
    reviewCount: elements.length,
    reviewElements: elements,
    status: elements.length === 0 ? "not_applicable" : "needs_review",
    testability: "manual",
    testDescription:
      'Chaque bouton associé à un CAPTCHA image (balise <input> avec l\'attribut type="image") vérifie-t-il une de ces conditions ?',
    testNumber: "1.5.2",
    totalElements: elements.length,
  };
}
