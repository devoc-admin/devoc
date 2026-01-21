// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
// biome-ignore-all assist/source/useSortedKeys: platform should come before patterns for readability
import type { Page } from "playwright";
import type { SocialLinksResult } from "../types";

/**
 * Detects social media links on a page.
 * Focuses on header and footer areas.
 * Searches for: Facebook, Twitter/X, LinkedIn, Instagram, YouTube, TikTok, GitHub, Mastodon
 */
export async function detectSocialLinks({
  page,
}: {
  page: Page;
}): Promise<SocialLinksResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: browser code in page.evaluate is difficult to refactor
  return await page.evaluate(() => {
    type SocialPlatformLocal =
      | "facebook"
      | "twitter"
      | "linkedin"
      | "instagram"
      | "youtube"
      | "tiktok"
      | "github"
      | "mastodon";

    const platformPatterns: Array<{
      platform: SocialPlatformLocal;
      patterns: RegExp[];
    }> = [
      {
        platform: "facebook",
        patterns: [/facebook\.com/i, /fb\.com/i, /fb\.me/i],
      },
      {
        platform: "twitter",
        patterns: [/twitter\.com/i, /x\.com/i],
      },
      {
        platform: "linkedin",
        patterns: [/linkedin\.com/i],
      },
      {
        platform: "instagram",
        patterns: [/instagram\.com/i, /instagr\.am/i],
      },
      {
        platform: "youtube",
        patterns: [/youtube\.com/i, /youtu\.be/i],
      },
      {
        platform: "tiktok",
        patterns: [/tiktok\.com/i],
      },
      {
        platform: "github",
        patterns: [/github\.com/i],
      },
      {
        platform: "mastodon",
        patterns: [
          /mastodon\./i,
          /mstdn\./i,
          /piaille\.fr/i,
          /framapiaf\.org/i,
        ],
      },
    ];

    const result: Partial<Record<SocialPlatformLocal, string>> = {};

    // Priority search areas: header and footer
    const searchAreas: Element[] = [];

    // Add header areas
    const headerSelectors = [
      "header",
      '[role="banner"]',
      ".header",
      "#header",
      ".site-header",
    ];
    for (const selector of headerSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        searchAreas.push(element);
        break;
      }
    }

    // Add footer areas
    const footerSelectors = [
      "footer",
      '[role="contentinfo"]',
      ".footer",
      "#footer",
      ".site-footer",
    ];
    for (const selector of footerSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        searchAreas.push(element);
        break;
      }
    }

    // Fallback to entire body if no header/footer found
    if (searchAreas.length === 0) {
      searchAreas.push(document.body);
    }

    // Search for social links in each area
    for (const area of searchAreas) {
      const links = area.querySelectorAll("a[href]");

      for (const link of links) {
        const href = link.getAttribute("href");
        if (!href) continue;

        for (const { platform, patterns } of platformPatterns) {
          // Skip if we already found this platform
          if (result[platform]) continue;

          for (const pattern of patterns) {
            if (pattern.test(href)) {
              result[platform] = href;
              break;
            }
          }
        }
      }
    }

    return result;
  });
}
