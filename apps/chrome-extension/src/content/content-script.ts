// Content script for Dev-OC Accessibility Auditor
// Runs accessibility checks on the current page

type AuditIssue = {
  type: "error" | "warning" | "info";
  message: string;
  element?: string;
  wcag?: string;
};

type AuditResult = {
  url: string;
  timestamp: string;
  issues: AuditIssue[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
};

function getElementSelector(element: Element): string {
  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : "";
  const classes = element.className
    ? `.${element.className.toString().split(" ").filter(Boolean).join(".")}`
    : "";
  return `<${tag}${id}${classes}>`;
}

function checkImagesForAlt(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const images = document.querySelectorAll("img");

  for (const img of images) {
    if (!img.hasAttribute("alt")) {
      issues.push({
        element: getElementSelector(img),
        message: "Image missing alt attribute",
        type: "error",
        wcag: "WCAG 1.1.1",
      });
    } else if (
      img.alt === "" &&
      !img.getAttribute("role")?.includes("presentation")
    ) {
      // Empty alt is only acceptable for decorative images
      issues.push({
        element: getElementSelector(img),
        message:
          "Image has empty alt attribute. Ensure this is a decorative image.",
        type: "warning",
        wcag: "WCAG 1.1.1",
      });
    }
  }

  return issues;
}

function checkFormLabels(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const inputs = document.querySelectorAll(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea'
  );

  for (const input of inputs) {
    const id = input.id;
    const hasLabel =
      (id && document.querySelector(`label[for="${id}"]`)) ||
      input.closest("label") ||
      input.getAttribute("aria-label") ||
      input.getAttribute("aria-labelledby");

    if (!hasLabel) {
      issues.push({
        element: getElementSelector(input),
        message: "Form input missing associated label",
        type: "error",
        wcag: "WCAG 1.3.1",
      });
    }
  }

  return issues;
}

function checkHeadingStructure(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

  let lastLevel = 0;
  let h1Count = 0;

  for (const heading of headings) {
    const level = Number.parseInt(heading.tagName[1], 10);

    if (level === 1) {
      h1Count++;
    }

    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({
        element: getElementSelector(heading),
        message: `Heading level skipped (h${lastLevel} to h${level})`,
        type: "warning",
        wcag: "WCAG 1.3.1",
      });
    }

    if (heading.textContent?.trim() === "") {
      issues.push({
        element: getElementSelector(heading),
        message: "Empty heading element",
        type: "error",
        wcag: "WCAG 1.3.1",
      });
    }

    lastLevel = level;
  }

  if (h1Count === 0) {
    issues.push({
      message: "Page is missing an h1 heading",
      type: "warning",
      wcag: "WCAG 1.3.1",
    });
  } else if (h1Count > 1) {
    issues.push({
      message: `Page has multiple h1 headings (${h1Count})`,
      type: "info",
      wcag: "WCAG 1.3.1",
    });
  }

  return issues;
}

function checkLinks(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const links = document.querySelectorAll("a");

  for (const link of links) {
    const text = link.textContent?.trim() || "";
    const ariaLabel = link.getAttribute("aria-label");
    const hasImage = link.querySelector("img[alt]");

    if (!(text || ariaLabel || hasImage)) {
      issues.push({
        element: getElementSelector(link),
        message: "Link has no accessible text",
        type: "error",
        wcag: "WCAG 2.4.4",
      });
    }

    const genericTexts = [
      "click here",
      "read more",
      "learn more",
      "here",
      "more",
    ];
    if (genericTexts.includes(text.toLowerCase())) {
      issues.push({
        element: getElementSelector(link),
        message: `Link text "${text}" is not descriptive`,
        type: "warning",
        wcag: "WCAG 2.4.4",
      });
    }

    if (
      link.getAttribute("target") === "_blank" &&
      !link.textContent?.includes("new window") &&
      !link.getAttribute("aria-label")?.includes("new window")
    ) {
      issues.push({
        element: getElementSelector(link),
        message: "Link opens in new window without warning",
        type: "info",
        wcag: "WCAG 3.2.5",
      });
    }
  }

  return issues;
}

function checkColorContrast(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Basic check for very small text
  const smallTexts = document.querySelectorAll("*");
  for (const el of smallTexts) {
    const style = window.getComputedStyle(el);
    const fontSize = Number.parseFloat(style.fontSize);

    if (fontSize < 12 && el.textContent?.trim()) {
      issues.push({
        element: getElementSelector(el),
        message: `Text may be too small (${fontSize}px)`,
        type: "warning",
        wcag: "WCAG 1.4.4",
      });
    }
  }

  return issues.slice(0, 5); // Limit to avoid overwhelming results
}

function checkButtonsAndInteractive(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check buttons without accessible names
  const buttons = document.querySelectorAll('button, [role="button"]');
  for (const button of buttons) {
    const text = button.textContent?.trim() || "";
    const ariaLabel = button.getAttribute("aria-label");
    const hasImage = button.querySelector("img[alt]");
    const title = button.getAttribute("title");

    if (!(text || ariaLabel || hasImage || title)) {
      issues.push({
        element: getElementSelector(button),
        message: "Button has no accessible name",
        type: "error",
        wcag: "WCAG 4.1.2",
      });
    }
  }

  // Check for click handlers on non-interactive elements
  const divSpans = document.querySelectorAll("div[onclick], span[onclick]");
  for (const el of divSpans) {
    if (!(el.getAttribute("role") || el.getAttribute("tabindex"))) {
      issues.push({
        element: getElementSelector(el),
        message:
          "Non-interactive element has click handler without proper role/tabindex",
        type: "error",
        wcag: "WCAG 4.1.2",
      });
    }
  }

  return issues;
}

function checkLanguage(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const html = document.documentElement;

  if (!html.getAttribute("lang")) {
    issues.push({
      message: "Page is missing lang attribute on <html>",
      type: "error",
      wcag: "WCAG 3.1.1",
    });
  }

  return issues;
}

function checkLandmarks(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  const hasMain =
    document.querySelector("main") || document.querySelector('[role="main"]');
  const hasNav =
    document.querySelector("nav") ||
    document.querySelector('[role="navigation"]');

  if (!hasMain) {
    issues.push({
      message: "Page is missing a <main> landmark",
      type: "warning",
      wcag: "WCAG 1.3.1",
    });
  }

  if (!hasNav) {
    issues.push({
      message: "Page has no <nav> landmark",
      type: "info",
      wcag: "WCAG 1.3.1",
    });
  }

  return issues;
}

function runAccessibilityAudit(): AuditResult {
  const issues: AuditIssue[] = [
    ...checkLanguage(),
    ...checkImagesForAlt(),
    ...checkFormLabels(),
    ...checkHeadingStructure(),
    ...checkLinks(),
    ...checkButtonsAndInteractive(),
    ...checkLandmarks(),
    ...checkColorContrast(),
  ];

  const summary = {
    errors: issues.filter((i) => i.type === "error").length,
    info: issues.filter((i) => i.type === "info").length,
    warnings: issues.filter((i) => i.type === "warning").length,
  };

  return {
    issues,
    summary,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "runAccessibilityAudit") {
    try {
      const result = runAccessibilityAudit();
      sendResponse({ result });
    } catch (error) {
      sendResponse({
        error: error instanceof Error ? error.message : "Audit failed",
      });
    }
  }
  return true;
});

export {};
