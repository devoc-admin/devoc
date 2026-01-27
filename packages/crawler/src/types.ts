export type CrawlResult = {
  pages: CrawlPageResult[];
  errors?: Array<{ url: string; error: string }>;
};

export type CrawlPageResult = {
  url: string;
  createdAt: string;
  normalizedUrl: string;
  title: string | null;
  depth: number;
  category: PageCategory;
  categoryConfidence: number;
  characteristics: PageCharacteristics;
  httpStatus: number;
  contentType: string;
  responseTime: number;
  screenshotUrl?: string;
  technologies?: TechnologyDetectionResult;
  author?: AuthorDetectionResult;
  description?: string;
  rssFeed?: RssFeedDetectionResult;
  newsletter?: NewsletterDetectionResult;
  socialLinks?: SocialLinksResult;
  contactInfo?: ContactInfoDetectionResult;
  seo?: SeoDetectionResult;
  languageInfo?: LanguageDetectionResult;
  links: string[];
  error?: string;
};

export type QueueItem = {
  url: string;
  depth: number;
};

export type CrawlProgressCallback = (progress: {
  discovered: number;
  crawled: number;
  crawledPage: CrawlPageResult;
}) => Promise<void>;

// Page category - standalone type matching the db enum values
export type PageCategory =
  | "homepage"
  | "contact"
  | "legal_notices"
  | "accessibility"
  | "sitemap"
  | "help"
  | "authentication"
  | "form"
  | "table"
  | "multimedia"
  | "document"
  | "multi_step_process"
  | "distinct_layout"
  | "other";

export type PageCharacteristics = {
  hasForm: boolean;
  hasTable: boolean;
  hasMultimedia: boolean;
  hasDocuments: boolean;
  hasAuthentication: boolean;
  hasContactForm?: boolean;
  hasProgressIndicator?: boolean;
  layoutSignature: string;
};

export type CategoryResult = {
  category: PageCategory;
  confidence: number;
  characteristics: PageCharacteristics;
};

// Crawl configuration - standalone type matching the db schema
export type CrawlConfig = {
  maxDepth: number;
  maxPages: number;
  delayBetweenRequests: number;
  respectRobotsTxt: boolean;
  skipResources?: boolean;
  skipScreenshots?: boolean;
  useLocalScreenshots?: boolean;
  concurrency?: number;
  includePaths?: string[];
  excludePaths?: string[];
  auth?: {
    type: "basic" | "form" | "cookie";
    credentials?: Record<string, string>;
  };
};

// Technology detection types
export type DetectedTechnology = {
  name: string;
  slug: string;
  category: string;
  version?: string;
  confidence: number;
  icon?: string;
  website?: string;
};

// French-specific technology detection
export type FrenchTechDetection = {
  accessibilityTool?: string;
  analytics?: string;
  cms?: string;
  consentManager?: string;
  hostingProvider?: string;
  usesDsfr: boolean;
};

export type TechnologyDetectionResult = {
  detectedAt: string;
  detectedOnUrl: string;
  technologies: DetectedTechnology[];
  frenchTech: FrenchTechDetection;
};

// Author/signature detection
export type AuthorDetectionResult = {
  name: string;
  url?: string;
  foundVia: "text" | "title" | "aria-label" | "url";
};

// RSS feed detection
export type RssFeedDetectionResult = {
  hasRssFeed: boolean;
  feedUrl?: string;
  feedType?: "rss" | "atom" | "json" | "podcast";
};

// Newsletter detection
export type NewsletterDetectionResult = {
  hasNewsletter: boolean;
  provider?: string;
};

// Social links detection
export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "github"
  | "mastodon";

export type SocialLinksResult = Partial<Record<SocialPlatform, string>>;

// Contact info detection
export type PhoneNumber = {
  number: string;
  type?: "mobile" | "landline" | "fax" | "unknown";
  isInternational: boolean;
};

export type EmailAddress = {
  email: string;
  isGeneric: boolean;
};

export type PostalAddress = {
  raw: string;
  postalCode?: string;
  city?: string;
};

export type ContactInfoDetectionResult = {
  phones: PhoneNumber[];
  emails: EmailAddress[];
  addresses: PostalAddress[];
};

// SEO/Structured data detection
export type SeoBasicMeta = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robotsMeta?: string;
};

export type OpenGraphData = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  siteName?: string;
};

export type TwitterCardData = {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
};

export type JsonLdSchemaType =
  | "Organization"
  | "LocalBusiness"
  | "Product"
  | "Article"
  | "WebSite"
  | "WebPage"
  | "BreadcrumbList"
  | "FAQPage"
  | "Other";

export type JsonLdSchema = {
  type: JsonLdSchemaType;
  raw: Record<string, unknown>;
};

export type SeoDetectionResult = {
  basicMeta: SeoBasicMeta;
  openGraph: OpenGraphData;
  twitterCard: TwitterCardData;
  jsonLdSchemas: JsonLdSchema[];
  hasHreflang: boolean;
  hreflangCount?: number;
  hasStructuredData: boolean;
};

// Language detection
export type LanguageDetectionResult = {
  primaryLanguage: string | null;
  availableLanguages: string[];
  hasMultipleLanguages: boolean;
  hasGoogleTranslate: boolean;
};
