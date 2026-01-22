// biome-ignore-all lint/performance/noBarrelFile: Re-exporting crawler module for clean public API
export { WebCrawler } from "./core/crawler";
export { detectAuthor } from "./detectors/author-detector";
export { detectCategoryPage } from "./detectors/category-detector";
export { detectContactInfo } from "./detectors/contact-detector";
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
export {
  isInternalUrl,
  normalizeUrl,
  shouldCrawlUrl,
  toAbsoluteUrl,
} from "./utils/url-utils";
