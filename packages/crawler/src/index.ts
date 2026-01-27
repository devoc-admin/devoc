// biome-ignore-all lint/performance/noBarrelFile: Re-exporting crawler module for clean public API

export { isInternalUrl, normalizeUrl, toAbsoluteUrl } from "@dev-oc/utils/url";
export { WebCrawler } from "./core/crawler";
export { detectAuthor } from "./detectors/author-detector";
export { detectCategoryPage } from "./detectors/category-detector";
export { detectContactInfo } from "./detectors/contact-detector";
export { detectLanguages } from "./detectors/language-detector";
export { detectSeo } from "./detectors/seo-detector";
export type {
  AuthorDetectionResult,
  CategoryResult,
  ContactInfoDetectionResult,
  CrawlConfig,
  CrawlPageResult,
  CrawlProgressCallback,
  CrawlResult,
  DetectedTechnology,
  EmailAddress,
  FrenchTechDetection,
  JsonLdSchema,
  JsonLdSchemaType,
  LanguageDetectionResult,
  NewsletterDetectionResult,
  OpenGraphData,
  PageCategory,
  PageCharacteristics,
  PhoneNumber,
  PostalAddress,
  QueueItem,
  RssFeedDetectionResult,
  SeoBasicMeta,
  SeoDetectionResult,
  SocialLinksResult,
  SocialPlatform,
  TechnologyDetectionResult,
  TwitterCardData,
} from "./types";
export { shouldCrawlUrl } from "./utils/url-utils";
