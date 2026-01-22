/**
 * Alternative text detection helpers
 * These functions help determine if an image has accessible text alternatives
 */

import type { SerializedElement } from "../types";
import {
  extractAttributes,
  generateSelector,
  getAriaDescribedbyText,
  getAriaLabelledbyText,
  getFigcaptionInfo,
  isAriaHidden,
  truncateHtml,
} from "./dom-helpers";

/**
 * Check if an element has any form of alternative text
 */
export function hasAnyAltText(element: Element): boolean {
  // Check alt attribute
  const alt = element.getAttribute("alt");
  if (alt !== null && alt.trim() !== "") {
    return true;
  }

  // Check aria-label
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim() !== "") {
    return true;
  }

  // Check aria-labelledby
  const labelledbyText = getAriaLabelledbyText(element);
  if (labelledbyText && labelledbyText.trim() !== "") {
    return true;
  }

  // Check title attribute
  const title = element.getAttribute("title");
  if (title && title.trim() !== "") {
    return true;
  }

  // For SVG, check for <title> child element
  if (element.tagName.toLowerCase() === "svg") {
    const svgTitle = element.querySelector("title");
    if (svgTitle?.textContent?.trim()) {
      return true;
    }
  }

  // For canvas, check text content fallback
  if (element.tagName.toLowerCase() === "canvas") {
    const textContent = element.textContent?.trim();
    if (textContent) {
      return true;
    }
  }

  // For object/embed, check inner content as fallback
  if (
    element.tagName.toLowerCase() === "object" ||
    element.tagName.toLowerCase() === "embed"
  ) {
    const textContent = element.textContent?.trim();
    if (textContent) {
      return true;
    }
  }

  return false;
}

/**
 * Get all accessible text alternatives for an element
 */
export function getAccessibleName(element: Element): string | null {
  const texts: string[] = [];

  // Priority 1: aria-labelledby
  const labelledbyText = getAriaLabelledbyText(element);
  if (labelledbyText) {
    texts.push(labelledbyText);
  }

  // Priority 2: aria-label
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel?.trim()) {
    texts.push(ariaLabel.trim());
  }

  // Priority 3: alt attribute
  const alt = element.getAttribute("alt");
  if (alt?.trim()) {
    texts.push(alt.trim());
  }

  // Priority 4: title attribute
  const title = element.getAttribute("title");
  if (title?.trim()) {
    texts.push(title.trim());
  }

  // SVG title element
  if (element.tagName.toLowerCase() === "svg") {
    const svgTitle = element.querySelector("title");
    if (svgTitle?.textContent?.trim()) {
      texts.push(svgTitle.textContent.trim());
    }
  }

  return texts.length > 0 ? texts[0] : null;
}

/**
 * Check if an element is marked as decorative
 */
export function isDecorativeImage(element: Element): boolean {
  // Empty alt attribute means explicitly decorative
  const alt = element.getAttribute("alt");
  if (alt === "") {
    return true;
  }

  // role="presentation" or role="none"
  const role = element.getAttribute("role");
  if (role === "presentation" || role === "none") {
    return true;
  }

  // aria-hidden="true"
  if (element.getAttribute("aria-hidden") === "true") {
    return true;
  }

  return false;
}

/**
 * Check if a decorative image has conflicting accessible name
 * (decorative images should NOT have alt text)
 */
export function hasConflictingAccessibleName(element: Element): boolean {
  if (!isDecorativeImage(element)) {
    return false;
  }

  // If marked as decorative but has aria-label
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim() !== "") {
    return true;
  }

  // If marked as decorative but has aria-labelledby
  const labelledbyText = getAriaLabelledbyText(element);
  if (labelledbyText && labelledbyText.trim() !== "") {
    return true;
  }

  // If has empty alt but also has title
  const alt = element.getAttribute("alt");
  const title = element.getAttribute("title");
  if (alt === "" && title && title.trim() !== "") {
    return true;
  }

  return false;
}

/**
 * Serialize an element to a transferable object (for page.evaluate results)
 */
export function serializeElement(element: Element): SerializedElement {
  const figInfo = getFigcaptionInfo(element);

  return {
    alt: element.getAttribute("alt"),
    ariaDescribedby: getAriaDescribedbyText(element),
    ariaHidden: isAriaHidden(element),
    ariaLabel: element.getAttribute("aria-label"),
    ariaLabelledby: getAriaLabelledbyText(element),
    attributes: extractAttributes(element),
    figcaptionText: figInfo.figcaptionText,
    isInFigure: figInfo.isInFigure,
    outerHtml: truncateHtml(element.outerHTML),
    role: element.getAttribute("role"),
    selector: generateSelector(element),
    src: element.getAttribute("src") || undefined,
    tagName: element.tagName.toLowerCase(),
    textContent: element.textContent?.trim() || null,
    title: element.getAttribute("title"),
  };
}

/**
 * Check if element looks like a CAPTCHA based on heuristics
 */
export function looksLikeCaptcha(element: Element): boolean {
  const src = element.getAttribute("src") || "";
  const className = element.className || "";
  const id = element.getAttribute("id") || "";
  const alt = element.getAttribute("alt") || "";

  const captchaPatterns = [
    /captcha/i,
    /recaptcha/i,
    /hcaptcha/i,
    /securimage/i,
    /turnstile/i,
  ];

  const textToCheck = `${src} ${className} ${id} ${alt}`;

  return captchaPatterns.some((pattern) => pattern.test(textToCheck));
}

/**
 * Check if element has a detailed description mechanism
 */
export function hasDetailedDescription(element: Element): boolean {
  // Check aria-describedby
  const describedbyText = getAriaDescribedbyText(element);
  if (describedbyText && describedbyText.length > 50) {
    return true;
  }

  // Check longdesc attribute
  const longdesc = element.getAttribute("longdesc");
  if (longdesc) {
    return true;
  }

  // Check for adjacent link to description (D-link pattern)
  const nextSibling = element.nextElementSibling;
  if (
    nextSibling?.tagName.toLowerCase() === "a" &&
    nextSibling.textContent?.toLowerCase().includes("description")
  ) {
    return true;
  }

  return false;
}
