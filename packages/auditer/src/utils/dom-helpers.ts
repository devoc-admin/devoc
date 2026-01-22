/**
 * DOM helper functions for extracting element information
 * These functions are designed to run inside page.evaluate() context
 */

// Regex patterns for splitting whitespace-separated IDs
const WHITESPACE_SPLIT_REGEX = /\s+/;

/**
 * Generate a unique CSS selector for an element
 */
export function generateSelector(element: Element): string {
  // If element has an id, use that
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  // Build path from element to root
  const path: string[] = [];
  let current: Element | null = element;

  while (current && current !== document.documentElement) {
    let selector = current.tagName.toLowerCase();

    // Add class names if present (first 2 classes max for readability)
    const classes = Array.from(current.classList).slice(0, 2);
    if (classes.length > 0) {
      selector += `.${classes.map((c) => CSS.escape(c)).join(".")}`;
    }

    // Add nth-child if there are siblings with same tag
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (child) => child.tagName === current?.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }

    path.unshift(selector);
    current = parent;
  }

  return path.join(" > ");
}

/**
 * Check if an element is visually hidden
 */
export function isVisuallyHidden(element: Element): boolean {
  const style = window.getComputedStyle(element);

  // Check display and visibility
  if (style.display === "none" || style.visibility === "hidden") {
    return true;
  }

  // Check opacity
  if (style.opacity === "0") {
    return true;
  }

  // Check position/clip patterns for screen-reader-only content
  if (
    style.position === "absolute" &&
    (style.clip === "rect(0px, 0px, 0px, 0px)" ||
      style.clipPath === "inset(50%)" ||
      (Number.parseInt(style.width, 10) <= 1 &&
        Number.parseInt(style.height, 10) <= 1))
  ) {
    return true;
  }

  return false;
}

/**
 * Check if element is semantically hidden from assistive technologies
 */
export function isAriaHidden(element: Element): boolean {
  // Check aria-hidden on element itself
  if (element.getAttribute("aria-hidden") === "true") {
    return true;
  }

  // Check if any ancestor has aria-hidden="true"
  let parent = element.parentElement;
  while (parent) {
    if (parent.getAttribute("aria-hidden") === "true") {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

/**
 * Get the text content of an element referenced by aria-labelledby
 */
export function getAriaLabelledbyText(element: Element): string | null {
  const labelledby = element.getAttribute("aria-labelledby");
  if (!labelledby) return null;

  const ids = labelledby.split(WHITESPACE_SPLIT_REGEX).filter(Boolean);
  const texts: string[] = [];

  for (const id of ids) {
    const referenced = document.getElementById(id);
    if (referenced) {
      texts.push(referenced.textContent?.trim() || "");
    }
  }

  return texts.length > 0 ? texts.join(" ").trim() : null;
}

/**
 * Get the text content of an element referenced by aria-describedby
 */
export function getAriaDescribedbyText(element: Element): string | null {
  const describedby = element.getAttribute("aria-describedby");
  if (!describedby) return null;

  const ids = describedby.split(WHITESPACE_SPLIT_REGEX).filter(Boolean);
  const texts: string[] = [];

  for (const id of ids) {
    const referenced = document.getElementById(id);
    if (referenced) {
      texts.push(referenced.textContent?.trim() || "");
    }
  }

  return texts.length > 0 ? texts.join(" ").trim() : null;
}

/**
 * Check if element is inside a figure with figcaption
 */
export function getFigcaptionInfo(element: Element): {
  isInFigure: boolean;
  figcaptionText: string | null;
} {
  const figure = element.closest("figure");
  if (!figure) {
    return { figcaptionText: null, isInFigure: false };
  }

  const figcaption = figure.querySelector("figcaption");
  return {
    figcaptionText: figcaption?.textContent?.trim() || null,
    isInFigure: true,
  };
}

/**
 * Truncate outerHTML for storage (avoid huge payloads)
 */
export function truncateHtml(html: string, maxLength = 500): string {
  if (html.length <= maxLength) return html;
  return `${html.slice(0, maxLength)}...`;
}

/**
 * Extract common attributes from an element
 */
export function extractAttributes(
  element: Element
): Record<string, string | null> {
  const attrs: Record<string, string | null> = {};
  const commonAttrs = [
    "id",
    "class",
    "src",
    "alt",
    "title",
    "aria-label",
    "aria-labelledby",
    "aria-describedby",
    "aria-hidden",
    "role",
    "longdesc",
    "usemap",
    "ismap",
    "width",
    "height",
    "type",
    "href",
  ];

  for (const attr of commonAttrs) {
    if (element.hasAttribute(attr)) {
      attrs[attr] = element.getAttribute(attr);
    }
  }

  return attrs;
}
