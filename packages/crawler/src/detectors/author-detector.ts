// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
import type { Page } from "playwright";
import type { AuthorDetectionResult } from "../types";

/**
 * Detects author/signature (web agency, developer) on a page.
 * Typically found in footer as "Realise par...", "Realisation", "Credit", etc.
 */
export async function detectAuthor({
  page,
}: {
  page: Page;
}): Promise<AuthorDetectionResult | undefined> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: exception
  return await page.evaluate(() => {
    // ========================================
    // Constants and patterns
    // ========================================
    const PATTERNS = {
      // Keywords indicating a web agency in title/aria-label/text
      agencyKeywords:
        /agence|conseil|communication|digital|web|studio|design|d[ée]veloppement|cr[ée]ation/i,
      // More restrictive pattern for footer text (requires uppercase start)
      footerSignature:
        /(?:réalis[ée]s?\s+par|réalisation\s*[:.]?|cr[ée]dit[s]?\s*[:.]?|con[cç]u\s+par|d[ée]velopp[ée]\s+par|cr[ée]ation\s*[:.]?|site\s+(?:web\s+)?par|powered\s+by|made\s+by|built\s+by|\bby\s+|designer\s*[:.]?|d[ée]veloppeur\s*[:.]?|developer\s*[:.]?)\s*([A-ZÀ-ÿ][\w\sÀ-ÿ&.-]+)/i,
      // Pattern to extract name after signature keywords
      signatureExtraction:
        /(?:réalis[ée]s?\s+par|réalisation\s*[:.]?|cr[ée]dit[s]?\s*[:.]?|con[cç]u\s+par|d[ée]velopp[ée]\s+par|cr[ée]ation\s*[:.]?|site\s+(?:web\s+)?par|powered\s+by|made\s+by|built\s+by|\bby\s+|designer\s*[:.]?|d[ée]veloppeur\s*[:.]?|developer\s*[:.]?)\s*(.+)/i,
      // Keywords indicating a signature in aria-label
      signatureKeywords: /réalis|créa|agence|site\s+par/i,
      // Patterns to detect signature text
      text: [
        /réalis[ée]s?\s+par/i,
        /réalisation\s*[:.]?/i,
        /cr[ée]dit[s]?\s*[:.]?/i,
        /con[cç]u\s+par/i,
        /d[ée]velopp[ée]\s+par/i,
        /cr[ée]ation\s*[:.]?/i,
        /site\s+(web\s+)?par/i,
        /powered\s+by/i,
        /made\s+by/i,
        /built\s+by/i,
        /\bby\s+/i,
        /designer\s*[:.]?/i,
        /d[ée]veloppeur\s*[:.]?/i,
        /developer\s*[:.]?/i,
      ],
    };

    const FOOTER_SELECTORS = [
      "footer",
      '[role="contentinfo"]',
      ".footer",
      "#footer",
      ".site-footer",
      "#site-footer",
    ];

    // ========================================
    // Helper functions (browser context)
    // ========================================

    /**
     * Finds the search area (footer or body)
     */
    function findSearchArea(): Element {
      for (const selector of FOOTER_SELECTORS) {
        const footer = document.querySelector(selector);
        if (footer) return footer;
      }
      return document.body;
    }

    /**
     * Checks if a link is a valid external link
     */
    function isValidExternalLink(href: string): boolean {
      if (!href || href.startsWith("#") || href.startsWith("/")) return false;

      try {
        const linkUrl = new URL(href, window.location.origin);
        return linkUrl.origin !== window.location.origin;
      } catch {
        return false;
      }
    }

    /**
     * Checks the title attribute for agency keywords
     */
    function checkLinkTitle(
      title: string,
      href: string
    ): AuthorDetectionResult | null {
      if (title && PATTERNS.agencyKeywords.test(title)) {
        return {
          foundVia: "title" as const,
          name: title,
          url: href,
        };
      }
      return null;
    }

    /**
     * Checks the aria-label attribute for signature keywords
     */
    function checkLinkAriaLabel(
      ariaLabel: string,
      href: string
    ): AuthorDetectionResult | null {
      if (ariaLabel && PATTERNS.signatureKeywords.test(ariaLabel)) {
        return {
          foundVia: "aria-label" as const,
          name: ariaLabel,
          url: href,
        };
      }
      return null;
    }

    /**
     * Checks the link text for agency keywords
     */
    function checkLinkText(
      text: string,
      href: string
    ): AuthorDetectionResult | null {
      if (text && PATTERNS.agencyKeywords.test(text)) {
        return {
          foundVia: "text" as const,
          name: text,
          url: href,
        };
      }
      return null;
    }

    /**
     * Checks if the URL hostname contains "agence"
     */
    function checkLinkUrl(
      text: string,
      href: string
    ): AuthorDetectionResult | null {
      try {
        const linkUrl = new URL(href);
        if (/agence/i.test(linkUrl.hostname)) {
          return {
            foundVia: "url" as const,
            name: text || linkUrl.hostname.replace("www.", ""),
            url: href,
          };
        }
      } catch {
        // Invalid URL
      }
      return null;
    }

    /**
     * Extracts the name from a signature pattern match
     */
    function extractNameFromSignature(
      text: string,
      parentText: string,
      href: string
    ): string {
      const textMatch = text.match(PATTERNS.signatureExtraction);
      const parentMatch = parentText.match(PATTERNS.signatureExtraction);

      if (textMatch?.[1]) {
        return textMatch[1].trim();
      }
      if (parentMatch?.[1]) {
        return parentMatch[1].trim();
      }

      // Fallback to hostname
      try {
        return new URL(href).hostname.replace("www.", "");
      } catch {
        return href;
      }
    }

    /**
     * Checks surrounding text and link text for signature patterns
     */
    function checkSurroundingText(
      link: Element,
      text: string,
      href: string
    ): AuthorDetectionResult | null {
      const parent = link.parentElement;
      const parentText = parent?.textContent || "";

      for (const pattern of PATTERNS.text) {
        if (pattern.test(parentText) || pattern.test(text)) {
          let name = text;

          if (!name || pattern.test(name)) {
            name = extractNameFromSignature(text, parentText, href);
          }

          return {
            foundVia: "text" as const,
            name,
            url: href,
          };
        }
      }

      return null;
    }

    /**
     * Searches the footer text for signature patterns (fallback without links)
     */
    function searchFooterText(
      searchArea: Element
    ): AuthorDetectionResult | null {
      const footerText = searchArea.textContent || "";
      const footerMatch = footerText.match(PATTERNS.footerSignature);

      if (footerMatch?.[1]) {
        const extractedName = footerMatch[1]
          .trim()
          .replace(/[.,;:!?]+$/, "")
          .slice(0, 100);

        if (extractedName.length >= 2) {
          return {
            foundVia: "text" as const,
            name: extractedName,
          };
        }
      }

      return null;
    }

    // *** Execution
    const searchArea = findSearchArea();
    const links = searchArea.querySelectorAll("a[href]");

    // Fallback: store first link containing "agence" in text
    let agenceFallback: { name: string; url: string } | null = null;

    for (const link of links) {
      const href = link.getAttribute("href");
      if (!(href && isValidExternalLink(href))) continue;

      const title = link.getAttribute("title") || "";
      const ariaLabel = link.getAttribute("aria-label") || "";
      const text = link.textContent?.trim() || "";

      // Check title attribute for agency signature
      const titleResult = checkLinkTitle(title, href);
      if (titleResult) return titleResult;

      // Check aria-label for signature
      const ariaResult = checkLinkAriaLabel(ariaLabel, href);
      if (ariaResult) return ariaResult;

      // Check link text for agency keywords
      const textResult = checkLinkText(text, href);
      if (textResult) return textResult;

      // Check if URL hostname contains "agence"
      const urlResult = checkLinkUrl(text, href);
      if (urlResult) return urlResult;

      // Check surrounding text for signature patterns
      const surroundingResult = checkSurroundingText(link, text, href);
      if (surroundingResult) return surroundingResult;

      // Store first link containing "agence" as fallback
      if (!agenceFallback && /agence/i.test(text)) {
        agenceFallback = { name: text, url: href };
      }
    }

    // Return link containing "agence" if nothing else found
    if (agenceFallback) {
      return {
        foundVia: "text" as const,
        name: agenceFallback.name,
        url: agenceFallback.url,
      };
    }

    // Final fallback: search footer text for signature patterns
    return searchFooterText(searchArea) ?? undefined;
  });
}
