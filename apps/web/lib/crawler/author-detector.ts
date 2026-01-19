// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
import type { Page } from "playwright";
import type { AuthorDetectionResult } from "./types";

/**
 * Detects author/signature (web agency, developer) on a page.
 * Typically found in footer as "Réalisé par...", "Réalisation", "Crédit", etc.
 */
export async function detectAuthor({
  page,
}: {
  page: Page;
}): Promise<AuthorDetectionResult | undefined> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: browser code in page.evaluate is difficult to refactor
  return await page.evaluate(() => {
    // Patterns to search for
    const textPatterns = [
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
    ];

    // Keywords indicating a web agency in title/aria-label
    const agencyKeywords =
      /agence|conseil|communication|digital|web|studio|design|d[ée]veloppement|cr[ée]ation/i;
    const signatureKeywords = /réalis|créa|agence|site\s+par/i;

    // 1. Search in footer first, then body
    const footerSelectors = [
      "footer",
      '[role="contentinfo"]',
      ".footer",
      "#footer",
      ".site-footer",
      "#site-footer",
    ];
    let searchArea: Element = document.body;
    for (const selector of footerSelectors) {
      const footer = document.querySelector(selector);
      if (footer) {
        searchArea = footer;
        break;
      }
    }

    // 2. Find links with relevant title/aria-label or surrounding text
    const links = searchArea.querySelectorAll("a[href]");

    for (const link of links) {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("/")) continue;

      // Skip internal links and common non-author links
      try {
        const linkUrl = new URL(href, window.location.origin);
        if (linkUrl.origin === window.location.origin) continue;
      } catch {
        continue;
      }

      const title = link.getAttribute("title") || "";
      const ariaLabel = link.getAttribute("aria-label") || "";
      const text = link.textContent?.trim() || "";

      // Check title attribute for agency signature
      if (title && agencyKeywords.test(title)) {
        return {
          foundVia: "title" as const,
          name: title,
          url: href,
        };
      }

      // Check aria-label for signature
      if (ariaLabel && signatureKeywords.test(ariaLabel)) {
        return {
          foundVia: "aria-label" as const,
          name: ariaLabel,
          url: href,
        };
      }

      // Check surrounding text and link text
      const parent = link.parentElement;
      const parentText = parent?.textContent || "";

      for (const pattern of textPatterns) {
        if (pattern.test(parentText) || pattern.test(text)) {
          // Extract clean name from link text or hostname
          let name = text;
          if (!name || pattern.test(name)) {
            // If link text is the pattern itself, try to extract just the name
            const match = parentText.match(
              /(?:réalis[ée]s?\s+par|réalisation\s*[:.]?|cr[ée]dit[s]?\s*[:.]?|con[cç]u\s+par|d[ée]velopp[ée]\s+par|cr[ée]ation\s*[:.]?|site\s+(?:web\s+)?par|powered\s+by|made\s+by|built\s+by)\s*(.+)/i
            );
            if (match?.[1]) {
              name = match[1].trim();
            } else {
              try {
                name = new URL(href).hostname.replace("www.", "");
              } catch {
                name = href;
              }
            }
          }

          return {
            foundVia: "text" as const,
            name,
            url: href,
          };
        }
      }
    }

    return undefined;
  });
}
