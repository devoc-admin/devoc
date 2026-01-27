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

      // File extensions to exclude (not valid email TLDs)
      const fileExtensions = new Set([
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "svg",
        "ico",
        "bmp",
        "tiff",
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
        "rar",
        "tar",
        "gz",
        "7z",
        "mp3",
        "mp4",
        "avi",
        "mov",
        "wmv",
        "flv",
        "wav",
        "ogg",
        "js",
        "css",
        "html",
        "htm",
        "xml",
        "json",
        "csv",
        "txt",
        "woff",
        "woff2",
        "ttf",
        "eot",
        "otf",
      ]);

      // Pattern that looks like image retina suffix (e.g., @2x, @3x)
      const retinaPattern = /^[0-9]+x(-[0-9]+)?$/i;

      // Validate if string looks like a real email address
      // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Email validation requires multiple sequential checks
      function isValidEmail(candidate: string): boolean {
        const parts = candidate.split("@");
        if (parts.length !== 2) return false;

        const [localPart, domain] = parts;
        if (!(localPart && domain)) return false;

        // Check if domain part looks like a retina suffix (e.g., 2x-1.png)
        const domainFirstPart = domain.split(".")[0];
        if (domainFirstPart && retinaPattern.test(domainFirstPart)) {
          return false;
        }

        // Check if TLD is actually a file extension
        const tld = domain.split(".").pop()?.toLowerCase();
        if (tld && fileExtensions.has(tld)) {
          return false;
        }

        // Domain should have at least one dot and reasonable structure
        if (!domain.includes(".")) return false;

        // Domain part before TLD should be at least 2 chars
        const domainParts = domain.split(".");
        if (domainParts.length < 2) return false;
        const domainName = domainParts.slice(0, -1).join(".");
        if (domainName.length < 2) return false;

        // Local part should not be purely numeric
        if (/^[0-9]+$/.test(localPart)) return false;

        return true;
      }

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

        // Extract phones from tel: links (most reliable source)
        if (phones.length < maxPhones) {
          const telLinks = container.querySelectorAll('a[href^="tel:"]');
          for (const link of telLinks) {
            if (phones.length >= maxPhones) break;
            const href = link.getAttribute("href");
            if (href) {
              const rawNumber = href.replace("tel:", "").trim();
              const normalized = normalizePhone(rawNumber);

              if (normalized && !seenPhones.has(normalized)) {
                seenPhones.add(normalized);

                const isInternational = rawNumber.startsWith("+");

                // Extract first significant digit for type detection
                let firstDigit = "0";
                if (isInternational) {
                  // Format: +33X... - extract digit after country code
                  const afterCountryCode = normalized.replace(/^\+\d{2}/, "");
                  firstDigit = afterCountryCode[0] ?? "0";
                } else {
                  // Format: 0X... - extract second digit
                  firstDigit = normalized[1] ?? "0";
                }

                phones.push({
                  isInternational,
                  number: rawNumber,
                  type: getPhoneType(firstDigit),
                });
              }
            }
          }
        }

        // Extract phones from text (fallback)
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

            if (!seenEmails.has(email) && isValidEmail(email)) {
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
              if (email && !seenEmails.has(email) && isValidEmail(email)) {
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
