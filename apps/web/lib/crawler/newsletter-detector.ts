// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
import type { Page } from "playwright";
import type { NewsletterDetectionResult } from "./types";

/**
 * Detects newsletter signup forms on a page.
 * Searches for:
 * - Forms with email input + newsletter keywords
 * - Known newsletter provider patterns (Mailchimp, ConvertKit, Sendinblue/Brevo, Substack, HubSpot)
 */
export async function detectNewsletter({
  page,
}: {
  page: Page;
}): Promise<NewsletterDetectionResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: browser code in page.evaluate is difficult to refactor
  return await page.evaluate(() => {
    // Provider detection patterns
    const providerPatterns: Array<{ name: string; patterns: RegExp[] }> = [
      {
        name: "Mailchimp",
        patterns: [
          /mailchimp/i,
          /list-manage\.com/i,
          /mc\.us\d+\.list-manage/i,
          /chimpstatic/i,
        ],
      },
      {
        name: "ConvertKit",
        patterns: [/convertkit/i, /ck\.page/i, /convertkit\.com/i],
      },
      {
        name: "Brevo",
        patterns: [/sendinblue/i, /brevo/i, /sibforms/i, /sib-form/i],
      },
      {
        name: "Substack",
        patterns: [/substack/i, /substackcdn/i],
      },
      {
        name: "HubSpot",
        patterns: [/hubspot/i, /hs-form/i, /hsforms/i],
      },
      {
        name: "Mailjet",
        patterns: [/mailjet/i, /mjml/i],
      },
      {
        name: "ActiveCampaign",
        patterns: [/activecampaign/i, /_form\.act-on/i],
      },
    ];

    // Newsletter keywords (French & English)
    const newsletterKeywords =
      /newsletter|s'abonner|abonnement|inscription|subscribe|infolettre|bulletin|lettre\s+d'information|email\s+updates/i;

    // 1. Check for known provider scripts/forms in page source
    const pageHtml = document.documentElement.outerHTML;

    for (const provider of providerPatterns) {
      for (const pattern of provider.patterns) {
        if (pattern.test(pageHtml)) {
          return {
            hasNewsletter: true,
            provider: provider.name,
          };
        }
      }
    }

    // 2. Search for forms with email input and newsletter keywords
    const forms = document.querySelectorAll("form");

    for (const form of forms) {
      const hasEmailInput =
        form.querySelector('input[type="email"]') !== null ||
        form.querySelector('input[name*="email"]') !== null ||
        form.querySelector('input[placeholder*="email" i]') !== null;

      if (!hasEmailInput) continue;

      // Check form for newsletter keywords
      const formText =
        form.textContent || form.getAttribute("aria-label") || "";
      const formAction = form.getAttribute("action") || "";
      const formClass = form.getAttribute("class") || "";
      const formId = form.getAttribute("id") || "";

      const combinedText = `${formText} ${formAction} ${formClass} ${formId}`;

      if (newsletterKeywords.test(combinedText)) {
        // Try to identify provider from form action
        for (const provider of providerPatterns) {
          for (const pattern of provider.patterns) {
            if (pattern.test(formAction)) {
              return {
                hasNewsletter: true,
                provider: provider.name,
              };
            }
          }
        }

        return {
          hasNewsletter: true,
        };
      }
    }

    // 3. Check for newsletter sections in page
    const newsletterSelectors = [
      '[class*="newsletter"]',
      '[id*="newsletter"]',
      '[class*="subscribe"]',
      '[id*="subscribe"]',
      '[data-component*="newsletter"]',
    ];

    for (const selector of newsletterSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const hasEmailInput =
          element.querySelector('input[type="email"]') !== null ||
          element.querySelector('input[name*="email"]') !== null;

        if (hasEmailInput) {
          return {
            hasNewsletter: true,
          };
        }
      }
    }

    return { hasNewsletter: false };
  });
}
