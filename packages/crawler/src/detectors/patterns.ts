/**
 * Centralized detection patterns for all detectors.
 *
 * NOTE: Many patterns are used inside page.evaluate() (browser context) and cannot
 * reference external modules. This file serves as:
 * 1. A single source of truth for documentation and review
 * 2. A place to check for duplications across detectors
 * 3. Patterns that CAN be imported (technology-detector, category-detector)
 *
 * For patterns used in browser context (marked with 🌐), the detector files
 * must define them locally but should match these definitions.
 */

// =============================================================================
// NEWSLETTER PATTERNS (newsletter-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

export const NEWSLETTER_PROVIDER_PATTERNS = [
  {
    name: "Mailchimp",
    patterns: [
      "mailchimp",
      "list-manage.com",
      "mc.us\\d+.list-manage",
      "chimpstatic",
    ],
  },
  {
    name: "ConvertKit",
    patterns: ["convertkit", "ck.page", "convertkit.com"],
  },
  {
    name: "Brevo",
    patterns: ["sendinblue", "brevo", "sibforms", "sib-form"],
  },
  {
    name: "Substack",
    patterns: ["substack", "substackcdn"],
  },
  {
    name: "HubSpot",
    patterns: ["hubspot", "hs-form", "hsforms"],
  },
  {
    name: "Mailjet",
    patterns: ["mailjet", "mjml"],
  },
  {
    name: "ActiveCampaign",
    patterns: ["activecampaign", "_form.act-on"],
  },
  // French providers
  {
    name: "Sarbacane",
    patterns: ["sarbacane", "tipimail", "sbc\\d+.com"],
  },
  {
    name: "Mailify",
    patterns: ["mailify", "mailifyapis"],
  },
  {
    name: "Digitaleo",
    patterns: ["digitaleo"],
  },
  {
    name: "Spot-hit",
    patterns: ["spot-hit", "spothit"],
  },
  {
    name: "Dolist",
    patterns: ["dolist", "dolist.net"],
  },
  {
    name: "Rapidmail",
    patterns: ["rapidmail"],
  },
  {
    name: "Message Business",
    patterns: ["message-business", "messagebusiness"],
  },
  {
    name: "Getresponse",
    patterns: ["getresponse", "gr-form"],
  },
] as const;

/**
 * Keywords indicating newsletter signup (French & English)
 */
export const NEWSLETTER_KEYWORDS = [
  "newsletter",
  "s'abonner",
  "abonnement",
  "inscription",
  "subscribe",
  "infolettre",
  "bulletin",
  "lettre d'information",
  "email updates",
] as const;

/**
 * CSS selectors for newsletter sections
 */
export const NEWSLETTER_SELECTORS = [
  '[class*="newsletter"]',
  '[id*="newsletter"]',
  '[class*="subscribe"]',
  '[id*="subscribe"]',
  '[data-component*="newsletter"]',
] as const;

// =============================================================================
// RSS/FEED PATTERNS (rss-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

export const PODCAST_PLATFORM_PATTERNS = [
  "podcasts.apple.com",
  "open.spotify.com/show",
  "anchor.fm",
  "podcast.ausha.co",
  "podcasters.spotify.com",
  "deezer.com/.*podcast",
  "podcloud.fr",
  "acast.com",
  "audiomeans.fr",
] as const;

export const FEED_URL_PATTERNS = [
  "/feed/?$",
  "/rss/?$",
  "\\.xml$",
  "/atom/?$",
  "feed\\.json$",
] as const;

// =============================================================================
// SOCIAL MEDIA PATTERNS (social-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

export const SOCIAL_PLATFORM_PATTERNS = {
  facebook: ["facebook.com", "fb.com", "fb.me"],
  github: ["github.com"],
  instagram: ["instagram.com", "instagr.am"],
  linkedin: ["linkedin.com"],
  mastodon: [
    // Generic Mastodon patterns
    "mastodon.",
    "mstdn.",
    // French instances
    "piaille.fr",
    "framapiaf.org",
    "mamot.fr",
    "pouet.chapril.org",
    "mastouille.fr",
    "eldritch.cafe",
    "diaspodon.fr",
    "social.music.free.fr",
    "octodon.social",
    "toot.aquilenet.fr",
    // European instances popular with French users
    "todon.eu",
    "chaos.social",
  ],
  tiktok: ["tiktok.com"],
  twitter: ["twitter.com", "x.com"],
  youtube: ["youtube.com", "youtu.be"],
} as const;

// =============================================================================
// TECHNOLOGY PATTERNS (technology-detector.ts)
// ✅ Can be imported directly
// =============================================================================

export type TechPattern = { name: string; patterns: string[] };

export const CONSENT_MANAGERS: TechPattern[] = [
  { name: "Tarteaucitron", patterns: ["tarteaucitron"] },
  { name: "Axeptio", patterns: ["axeptio"] },
  { name: "Didomi", patterns: ["didomi"] },
  { name: "OneTrust", patterns: ["onetrust", "optanon"] },
  { name: "Cookiebot", patterns: ["cookiebot"] },
  { name: "CookieFirst", patterns: ["cookiefirst"] },
  { name: "Quantcast", patterns: ["quantcast"] },
  { name: "TrustCommander", patterns: ["trustcommander", "trustpid"] },
];

export const ACCESSIBILITY_TOOLS: TechPattern[] = [
  { name: "RGAA", patterns: ["rgaa"] },
  { name: "Axe", patterns: ["axe-core", "deque"] },
  { name: "WAVE", patterns: ["wave.webaim"] },
  { name: "Siteimprove", patterns: ["siteimprove"] },
  { name: "AccessiBe", patterns: ["accessibe", "acsbapp"] },
  { name: "UserWay", patterns: ["userway"] },
  { name: "EqualWeb", patterns: ["equalweb"] },
];

export const HOSTING_PROVIDERS: TechPattern[] = [
  { name: "OVH", patterns: ["ovh"] },
  { name: "Scaleway", patterns: ["scaleway", "scw"] },
  { name: "Clever Cloud", patterns: ["clever-cloud", "cleverapps"] },
  { name: "Gandi", patterns: ["gandi"] },
  { name: "Online.net", patterns: ["online.net", "scaleway"] }, // NOTE: "scaleway" duplicated with Scaleway entry
  { name: "AWS", patterns: ["aws", "amazon", "cloudfront"] },
  { name: "Google Cloud", patterns: ["google", "gcp", "appspot"] },
  { name: "Azure", patterns: ["azure", "microsoft"] },
  { name: "Vercel", patterns: ["vercel"] },
  { name: "Netlify", patterns: ["netlify"] },
  { name: "Cloudflare", patterns: ["cloudflare"] },
];

export const FRENCH_CMS: TechPattern[] = [
  { name: "SPIP", patterns: ["spip", "spip.net", "spip_loader"] },
  { name: "Dotclear", patterns: ["dotclear"] },
  { name: "PluXml", patterns: ["pluxml"] },
  { name: "e-monsite", patterns: ["e-monsite"] },
  { name: "Jimdo", patterns: ["jimdo"] },
  { name: "Webnode", patterns: ["webnode"] },
];

export const FRENCH_ANALYTICS: TechPattern[] = [
  {
    name: "AT Internet/Piano",
    patterns: ["atinternet", "piano.io", "xiti", "xtcore"],
  },
  { name: "Eulerian", patterns: ["eulerian"] },
  { name: "Matomo", patterns: ["matomo", "piwik"] },
  { name: "ContentSquare", patterns: ["contentsquare", "cs-analytics"] },
  { name: "Kameleoon", patterns: ["kameleoon"] },
  { name: "AB Tasty", patterns: ["abtasty"] },
];

// =============================================================================
// LANGUAGE PATTERNS (language-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

export const LANGUAGE_SWITCHER_SELECTORS = [
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
] as const;

export const COMMON_LANGUAGE_CODES = [
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
] as const;

// =============================================================================
// AUTHOR/SIGNATURE PATTERNS (author-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

/**
 * Keywords indicating a web agency in title/aria-label/text
 */
export const AGENCY_KEYWORDS = [
  "agence",
  "conseil",
  "communication",
  "digital",
  "web",
  "studio",
  "design",
  "développement",
  "developpement",
  "création",
  "creation",
] as const;

/**
 * Signature keywords (French & English)
 */
export const SIGNATURE_KEYWORDS = [
  "réalisé par",
  "realise par",
  "réalisation",
  "realisation",
  "crédits",
  "credits",
  "conçu par",
  "concu par",
  "développé par",
  "developpe par",
  "création",
  "creation",
  "site par",
  "site web par",
  "powered by",
  "made by",
  "built by",
  "by",
  "designer",
  "développeur",
  "developpeur",
  "developer",
] as const;

export const FOOTER_SELECTORS = [
  "footer",
  '[role="contentinfo"]',
  ".footer",
  "#footer",
  ".site-footer",
  "#site-footer",
] as const;

// =============================================================================
// CATEGORY/URL PATTERNS (category-detector.ts)
// ✅ Can be imported directly
// =============================================================================

export const URL_CATEGORY_PATTERNS: Record<string, RegExp[]> = {
  accessibility: [/\/accessibilite/i, /\/accessibility/i, /\/a11y/i],
  authentication: [
    /\/login/i,
    /\/connexion/i,
    /\/signin/i,
    /\/sign-in/i,
    /\/auth/i,
    /\/inscription/i,
    /\/register/i,
    /\/signup/i,
    /\/sign-up/i,
    /\/mon-compte/i,
    /\/account/i,
  ],
  contact: [/\/contact/i, /\/nous-contacter/i, /\/contactez/i],
  document: [
    /\/documents/i,
    /\/telechargement/i,
    /\/download/i,
    /\/ressources/i,
    /\/resources/i,
  ],
  help: [/\/aide$/i, /\/help$/i, /\/faq/i, /\/support/i, /\/assistance/i],
  homepage: [/^\/$/, /^\/index\.html?$/i, /^\/accueil$/i, /^\/home$/i],
  legal_notices: [
    /\/mentions-legales/i,
    /\/legal/i,
    /\/cgu$/i,
    /\/cgv$/i,
    /\/conditions/i,
    /\/politique-de-confidentialite/i,
    /\/privacy/i,
  ],
  multi_step_process: [
    /\/etape/i,
    /\/step/i,
    /\/wizard/i,
    /\/checkout/i,
    /\/panier/i,
    /\/cart/i,
    /\/commande/i,
    /\/order/i,
  ],
  multimedia: [/\/video/i, /\/audio/i, /\/media/i, /\/galerie/i, /\/gallery/i],
  sitemap: [/\/plan-du-site/i, /\/sitemap/i, /\/plan$/i],
};

// =============================================================================
// CONTACT PATTERNS (contact-detector.ts)
// 🌐 Used in browser context - must be copied to detector
// =============================================================================

/**
 * Generic email prefixes that indicate a general contact rather than personal
 */
export const GENERIC_EMAIL_PREFIXES = [
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
] as const;

/**
 * File extensions to exclude when validating emails (not valid TLDs)
 */
export const FILE_EXTENSIONS = [
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
] as const;

/**
 * French phone regex pattern string
 * Matches: 01 23 45 67 89, 01.23.45.67.89, 0123456789, +33 1 23 45 67 89
 */
export const FRENCH_PHONE_PATTERN =
  "(?:\\+33[\\s.-]?|0)([1-9])(?:[\\s.-]?\\d{2}){4}";

/**
 * Email regex pattern string
 */
export const EMAIL_PATTERN = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";

/**
 * French postal address pattern string
 * Matches: 5-digit postal code followed by city name
 */
export const FRENCH_POSTAL_ADDRESS_PATTERN =
  "(\\d{5})\\s+([A-ZÀ-ÿ][a-zA-ZÀ-ÿ\\s-]+?)(?=[.,\\s]*(?:<|$|\\n|[0-9]|Tél|Tel|Fax|Email|@))";

// =============================================================================
// DUPLICATIONS DETECTED
// =============================================================================
/**
 * Potential duplications found:
 *
 * 1. HOSTING_PROVIDERS: "scaleway" appears in both "Scaleway" and "Online.net"
 *
 * 2. SOCIAL_PLATFORM_PATTERNS.mastodon: "social.music.free.fr" appears twice
 *
 * 3. FOOTER_SELECTORS: Similar selectors used in:
 *    - author-detector.ts
 *    - contact-detector.ts (inline as priority containers)
 *
 * 4. "subscribe" keyword appears in both:
 *    - NEWSLETTER_KEYWORDS
 *    - NEWSLETTER_SELECTORS
 *    (This is intentional - different usage contexts)
 */
