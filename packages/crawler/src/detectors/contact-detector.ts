// biome-ignore-all lint/performance/useTopLevelRegex: regexes must be inside page.evaluate (browser context)
import type { Page } from "playwright";
import type { ContactInfoDetectionResult } from "../types";

const MAX_PHONES = 5;
const MAX_EMAILS = 10;
const MAX_ADDRESSES = 3;

/**
 * Detects contact information on a page.
 * Extracts: phone numbers (French format), emails, postal addresses
 */
export async function detectContactInfo({
  page,
}: {
  page: Page;
}): Promise<ContactInfoDetectionResult> {
  return await page.evaluate(
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Contact detection requires multiple sequential checks
    ({ maxPhones, maxEmails, maxAddresses }) => {
      type PhoneNumberLocal = {
        number: string;
        type?: "mobile" | "landline" | "fax" | "unknown";
        isInternational: boolean;
      };

      type EmailAddressLocal = {
        email: string;
        isGeneric: boolean;
      };

      type PostalAddressLocal = {
        raw: string;
        postalCode?: string;
        city?: string;
      };

      const phones: PhoneNumberLocal[] = [];
      const emails: EmailAddressLocal[] = [];
      const addresses: PostalAddressLocal[] = [];
      const seenPhones = new Set<string>();
      const seenEmails = new Set<string>();

      // Generic email prefixes that indicate a general contact rather than personal
      const genericEmailPrefixes = [
        "info",
        "contact",
        "hello",
        "support",
        "admin",
        "webmaster",
        "mairie",
        "accueil",
        "communication",
        "secretariat",
      ];

      // French phone regex - matches formats like:
      // 01 23 45 67 89, 01.23.45.67.89, 0123456789, +33 1 23 45 67 89
      const frenchPhoneRegex = /(?:\+33[\s.-]?|0)([1-9])(?:[\s.-]?\d{2}){4}/g;

      // Email regex
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

      // French postal address pattern: 5-digit postal code followed by city name
      const postalAddressRegex =
        /(\d{5})\s+([A-ZÀ-ÿ][a-zA-ZÀ-ÿ\s-]+?)(?=[.,\s]*(?:<|$|\n|[0-9]|Tél|Tel|Fax|Email|@))/gi;

      // Determine phone type based on first digit after country code
      function getPhoneType(
        firstDigit: string
      ): "mobile" | "landline" | "fax" | "unknown" {
        const digit = Number.parseInt(firstDigit, 10);
        if (digit === 6 || digit === 7) return "mobile";
        if (digit >= 1 && digit <= 5) return "landline";
        if (digit === 9) return "landline"; // VoIP but often fixed
        return "unknown";
      }

      // Check if email is generic
      function isGenericEmail(email: string): boolean {
        const localPart = email.split("@")[0]?.toLowerCase() ?? "";
        return genericEmailPrefixes.some(
          (prefix) => localPart === prefix || localPart.startsWith(`${prefix}.`)
        );
      }

      // Normalize phone number for deduplication
      function normalizePhone(phone: string): string {
        return phone.replace(/[\s.-]/g, "");
      }

      // Get prioritized containers to search in order
      function getPriorityContainers(): Element[] {
        const containers: Element[] = [];

        // 1. Footer / contentinfo
        const footer =
          document.querySelector("footer") ??
          document.querySelector('[role="contentinfo"]');
        if (footer) containers.push(footer);

        // 2. Contact sections
        const contactSections = document.querySelectorAll(
          '[class*="contact" i], [id*="contact" i], [class*="coordonnees" i], [id*="coordonnees" i]'
        );
        for (const section of contactSections) {
          if (!containers.includes(section)) containers.push(section);
        }

        // 3. Header
        const header =
          document.querySelector("header") ??
          document.querySelector('[role="banner"]');
        if (header && !containers.includes(header)) containers.push(header);

        // 4. Fallback to body
        if (containers.length === 0) {
          containers.push(document.body);
        }

        return containers;
      }

      // Extract text content from element
      function getTextContent(element: Element): string {
        return element.textContent ?? "";
      }

      // Search for contact info in containers
      const containers = getPriorityContainers();

      for (const container of containers) {
        if (
          phones.length >= maxPhones &&
          emails.length >= maxEmails &&
          addresses.length >= maxAddresses
        ) {
          break;
        }

        const text = getTextContent(container);

        // Extract phones
        if (phones.length < maxPhones) {
          const phoneMatches = text.matchAll(frenchPhoneRegex);
          for (const match of phoneMatches) {
            if (phones.length >= maxPhones) break;
            const fullMatch = match[0];
            const firstDigit = match[1];
            const normalized = normalizePhone(fullMatch);

            if (!seenPhones.has(normalized) && firstDigit) {
              seenPhones.add(normalized);
              phones.push({
                isInternational: fullMatch.startsWith("+"),
                number: fullMatch.trim(),
                type: getPhoneType(firstDigit),
              });
            }
          }
        }

        // Extract emails from text
        if (emails.length < maxEmails) {
          const emailMatches = text.matchAll(emailRegex);
          for (const match of emailMatches) {
            if (emails.length >= maxEmails) break;
            const email = match[0].toLowerCase();

            if (!seenEmails.has(email)) {
              seenEmails.add(email);
              emails.push({
                email,
                isGeneric: isGenericEmail(email),
              });
            }
          }
        }

        // Extract emails from mailto links
        if (emails.length < maxEmails) {
          const mailtoLinks = container.querySelectorAll('a[href^="mailto:"]');
          for (const link of mailtoLinks) {
            if (emails.length >= maxEmails) break;
            const href = link.getAttribute("href");
            if (href) {
              const email = href
                .replace("mailto:", "")
                .split("?")[0]
                ?.toLowerCase();
              if (email && !seenEmails.has(email)) {
                seenEmails.add(email);
                emails.push({
                  email,
                  isGeneric: isGenericEmail(email),
                });
              }
            }
          }
        }

        // Extract addresses
        if (addresses.length < maxAddresses) {
          const addressMatches = text.matchAll(postalAddressRegex);
          for (const match of addressMatches) {
            if (addresses.length >= maxAddresses) break;
            const postalCode = match[1];
            const city = match[2]?.trim();
            const raw = match[0].trim();

            // Avoid duplicates based on postal code
            const isDuplicate = addresses.some(
              (a) => a.postalCode === postalCode
            );
            if (!isDuplicate && postalCode && city) {
              addresses.push({
                city,
                postalCode,
                raw,
              });
            }
          }
        }
      }

      return { addresses, emails, phones };
    },
    {
      maxAddresses: MAX_ADDRESSES,
      maxEmails: MAX_EMAILS,
      maxPhones: MAX_PHONES,
    }
  );
}
