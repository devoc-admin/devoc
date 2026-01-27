// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
import type { Page } from "playwright";
import type { LanguageDetectionResult } from "../types";

/**
 * Detects language support on a page.
 * Extracts: primary language, available languages from hreflang and language switchers
 */
export async function detectLanguages({
  page,
}: {
  page: Page;
}): Promise<LanguageDetectionResult> {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Language detection requires multiple sequential checks in browser context
  return await page.evaluate(() => {
    const languages: string[] = [];
    const seenLanguages = new Set<string>();

    // Normalize language code (e.g., "fr-FR" -> "fr", "en-US" -> "en")
    function normalizeLanguageCode(code: string): string {
      return code.toLowerCase().split("-")[0] ?? code.toLowerCase();
    }

    // Add language if not already seen
    function addLanguage(code: string): void {
      const normalized = normalizeLanguageCode(code);
      if (
        normalized &&
        normalized.length >= 2 &&
        !seenLanguages.has(normalized)
      ) {
        seenLanguages.add(normalized);
        languages.push(normalized);
      }
    }

    // 1. Get primary language from <html lang="...">
    const htmlLang = document.documentElement.getAttribute("lang");
    const primaryLanguage = htmlLang ? normalizeLanguageCode(htmlLang) : null;
    if (primaryLanguage) {
      addLanguage(primaryLanguage);
    }

    // 2. Extract languages from hreflang tags
    const hreflangLinks = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    for (const link of hreflangLinks) {
      const hreflang = link.getAttribute("hreflang");
      if (hreflang && hreflang !== "x-default") {
        addLanguage(hreflang);
      }
    }

    // 3. Look for language switcher patterns in the DOM
    // Common selectors for language switchers
    const languageSwitcherSelectors = [
      '[class*="language-switcher"]',
      '[class*="lang-switcher"]',
      '[class*="language-selector"]',
      '[class*="lang-selector"]',
      '[id*="language-switcher"]',
      '[id*="lang-switcher"]',
      '[class*="wpml-ls"]', // WordPress WPML plugin
      '[class*="polylang"]', // WordPress Polylang plugin
      '[class*="qtranslate"]', // WordPress qTranslate plugin
      'nav[aria-label*="langue" i]',
      'nav[aria-label*="language" i]',
      '[role="navigation"][aria-label*="langue" i]',
      '[role="navigation"][aria-label*="language" i]',
    ];

    for (const selector of languageSwitcherSelectors) {
      const switcher = document.querySelector(selector);
      if (switcher) {
        // Look for links with lang attribute or hreflang
        const langLinks = switcher.querySelectorAll("a[lang], a[hreflang]");
        for (const link of langLinks) {
          const lang =
            link.getAttribute("lang") ?? link.getAttribute("hreflang");
          if (lang) {
            addLanguage(lang);
          }
        }

        // Look for links with language codes in href
        const allLinks = switcher.querySelectorAll("a[href]");
        for (const link of allLinks) {
          const href = link.getAttribute("href") ?? "";
          // Match patterns like /fr/, /en/, ?lang=fr, etc.
          const langMatch = href.match(/\/([a-z]{2})\/|[?&]lang=([a-z]{2})/i);
          if (langMatch) {
            const langCode = langMatch[1] ?? langMatch[2];
            if (langCode) {
              addLanguage(langCode);
            }
          }
        }
      }
    }

    // 4. Look for links with common language path patterns
    const allPageLinks = document.querySelectorAll('a[href^="/"]');
    const languagePathPattern = /^\/([a-z]{2})(?:\/|$)/i;
    const foundPathLanguages = new Set<string>();

    for (const link of allPageLinks) {
      const href = link.getAttribute("href");
      if (href) {
        const match = href.match(languagePathPattern);
        if (match?.[1]) {
          foundPathLanguages.add(match[1].toLowerCase());
        }
      }
    }

    // Only add path-based languages if we found at least 2 different ones
    // (to avoid false positives from other 2-letter paths)
    if (foundPathLanguages.size >= 2) {
      for (const lang of foundPathLanguages) {
        // Validate it's a likely language code (common ones)
        const commonLangCodes = [
          "fr",
          "en",
          "de",
          "es",
          "it",
          "pt",
          "nl",
          "pl",
          "ru",
          "zh",
          "ja",
          "ko",
          "ar",
          "sv",
          "da",
          "no",
          "fi",
          "cs",
          "sk",
          "hu",
          "ro",
          "bg",
          "el",
          "tr",
          "he",
          "uk",
          "ca",
          "eu",
          "gl",
          "br",
        ];
        if (commonLangCodes.includes(lang)) {
          addLanguage(lang);
        }
      }
    }

    // 5. Check for Google Translate widget
    const hasGoogleTranslate =
      document.querySelector("#google_translate_element") !== null ||
      document.querySelector(".goog-te-combo") !== null ||
      document.querySelector('script[src*="translate.google"]') !== null;

    return {
      availableLanguages: languages,
      hasGoogleTranslate,
      hasMultipleLanguages: languages.length > 1 || hasGoogleTranslate,
      primaryLanguage,
    };
  });
}
