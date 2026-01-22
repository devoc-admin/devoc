// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
// biome-ignore-all assist/source/useSortedKeys: hasRssFeed should come before feedUrl for readability
import type { Page } from "playwright";
import type { RssFeedDetectionResult } from "../types";

/**
 * Detects RSS/Atom/JSON feeds and podcasts on a page.
 * Searches for:
 * - <link rel="alternate" type="application/rss+xml">
 * - <link rel="alternate" type="application/atom+xml">
 * - <link rel="alternate" type="application/feed+json"> (JSON Feed)
 * - Podcast feeds (iTunes, Spotify, etc.)
 * - Links containing /feed, /rss, .xml patterns
 */
export async function detectRssFeed({
  page,
}: {
  page: Page;
}): Promise<RssFeedDetectionResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: browser code in page.evaluate is difficult to refactor
  return await page.evaluate(() => {
    // 1. Check for RSS link tags in head
    const rssLink = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    );
    if (rssLink) {
      const href = rssLink.getAttribute("href");
      const isPodcast =
        href?.includes("podcast") ||
        href?.includes("itunes") ||
        href?.includes("anchor.fm");
      return {
        hasRssFeed: true,
        feedUrl: href || undefined,
        feedType: isPodcast ? "podcast" : "rss",
      } as const;
    }

    // 2. Check for Atom link tags
    const atomLink = document.querySelector(
      'link[rel="alternate"][type="application/atom+xml"]'
    );
    if (atomLink) {
      const href = atomLink.getAttribute("href");
      return {
        hasRssFeed: true,
        feedUrl: href || undefined,
        feedType: "atom",
      } as const;
    }

    // 3. Check for JSON Feed link tags
    const jsonFeedLink = document.querySelector(
      'link[rel="alternate"][type="application/feed+json"]'
    );
    if (jsonFeedLink) {
      const href = jsonFeedLink.getAttribute("href");
      return {
        hasRssFeed: true,
        feedUrl: href || undefined,
        feedType: "json",
      } as const;
    }

    // 4. Check for podcast platform links (Apple Podcasts, Spotify, etc.)
    const podcastPatterns = [
      /podcasts\.apple\.com/i,
      /open\.spotify\.com\/show/i,
      /anchor\.fm/i,
      /podcast\.ausha\.co/i,
      /podcasters\.spotify\.com/i,
      /deezer\.com\/.*podcast/i,
      /podcloud\.fr/i,
      /acast\.com/i,
      /audiomeans\.fr/i,
    ];

    const allLinks = document.querySelectorAll("a[href]");
    for (const link of allLinks) {
      const href = link.getAttribute("href");
      if (!href) continue;

      for (const pattern of podcastPatterns) {
        if (pattern.test(href)) {
          return {
            hasRssFeed: true,
            feedUrl: href,
            feedType: "podcast",
          } as const;
        }
      }
    }

    // 5. Search for feed links in anchors
    const feedPatterns = [
      /\/feed\/?$/i,
      /\/rss\/?$/i,
      /\.xml$/i,
      /\/atom\/?$/i,
      /feed\.json$/i,
    ];

    for (const link of allLinks) {
      const href = link.getAttribute("href");
      if (!href) continue;

      for (const pattern of feedPatterns) {
        if (pattern.test(href)) {
          // Determine feed type from URL
          let feedType: "rss" | "atom" | "json" | "podcast" = "rss";
          if (/atom/i.test(href)) feedType = "atom";
          if (/\.json$/i.test(href) || /feed\.json/i.test(href))
            feedType = "json";
          if (/podcast/i.test(href)) feedType = "podcast";

          // Make URL absolute
          try {
            const absoluteUrl = new URL(href, window.location.origin).href;
            return {
              hasRssFeed: true,
              feedUrl: absoluteUrl,
              feedType,
            };
          } catch {
            return {
              hasRssFeed: true,
              feedUrl: href,
              feedType,
            };
          }
        }
      }
    }

    return { hasRssFeed: false };
  });
}
