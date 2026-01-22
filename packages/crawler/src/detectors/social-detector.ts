// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
// biome-ignore-all assist/source/useSortedKeys: platform should come before patterns for readability
import type { Page } from "playwright";
import type { SocialLinksResult } from "../types";

/**
 * Detects social media links on a page.
 * Searches for: Facebook, Twitter/X, LinkedIn, Instagram, YouTube, TikTok, GitHub, Mastodon
 */
export async function detectSocialLinks({
  page,
}: {
  page: Page;
}): Promise<SocialLinksResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: nested loops for multi-pattern matching
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
          // Generic Mastodon patterns
          /mastodon\./i,
          /mstdn\./i,
          // French instances
          /piaille\.fr/i,
          /framapiaf\.org/i,
          /mamot\.fr/i,
          /pouet\.chapril\.org/i,
          /mastouille\.fr/i,
          /eldritch\.cafe/i,
          /diaspodon\.fr/i,
          /social\.music\.free\.fr/i,
          /octodon\.social/i,
          /toot\.aquilenet\.fr/i,
          /social\.music\.free\.fr/i,
          // European instances popular with French users
          /todon\.eu/i,
          /chaos\.social/i,
        ],
      },
    ];

    const result: Partial<Record<SocialPlatformLocal, string>> = {};

    // Search all links on the page
    const links = document.querySelectorAll("a[href]");

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

    return result;
  });
}
