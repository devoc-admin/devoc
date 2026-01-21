// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
// biome-ignore-all assist/source/useSortedKeys: hasRssFeed should come before feedUrl for readability
import type { Page } from "playwright";
import type { RssFeedDetectionResult } from "../types";

/**
 * Detects RSS/Atom feeds on a page.
 * Searches for:
 * - <link rel="alternate" type="application/rss+xml">
 * - <link rel="alternate" type="application/atom+xml">
 * - Links containing /feed, /rss, .xml patterns
 */
export async function detectRssFeed({
  page,
}: {
  page: Page;
}): Promise<RssFeedDetectionResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: browser code in page.evaluate is difficult to refactor
  return await page.evaluate(() => {
    // 1. Check for RSS/Atom link tags in head
    const rssLink = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    );
    if (rssLink) {
      const href = rssLink.getAttribute("href");
      return {
        hasRssFeed: true,
        feedUrl: href || undefined,
      };
    }

    const atomLink = document.querySelector(
      'link[rel="alternate"][type="application/atom+xml"]'
    );
    if (atomLink) {
      const href = atomLink.getAttribute("href");
      return {
        hasRssFeed: true,
        feedUrl: href || undefined,
      };
    }

    // 2. Search for feed links in anchors
    const feedPatterns = [
      /\/feed\/?$/i,
      /\/rss\/?$/i,
      /\.xml$/i,
      /\/atom\/?$/i,
    ];

    const links = document.querySelectorAll("a[href]");
    for (const link of links) {
      const href = link.getAttribute("href");
      if (!href) continue;

      for (const pattern of feedPatterns) {
        if (pattern.test(href)) {
          // Make URL absolute
          try {
            const absoluteUrl = new URL(href, window.location.origin).href;
            return {
              hasRssFeed: true,
              feedUrl: absoluteUrl,
            };
          } catch {
            return {
              hasRssFeed: true,
              feedUrl: href,
            };
          }
        }
      }
    }

    return { hasRssFeed: false };
  });
}
