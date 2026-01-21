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
  url: string;
  foundVia: "text" | "title" | "aria-label";
};

// RSS feed detection
export type RssFeedDetectionResult = {
  hasRssFeed: boolean;
  feedUrl?: string;
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
