// biome-ignore-all lint/performance/noBarrelFile: Re-exporting crawler module for clean public API
export { WebCrawler } from "./core/crawler";
export { detectAuthor } from "./detectors/author-detector";
export { detectCategoryPage } from "./detectors/category-detector";
export type {
  AuthorDetectionResult,
  CategoryResult,
  CrawlConfig,
  CrawlPageResult,
  CrawlProgressCallback,
  CrawlResult,
  DetectedTechnology,
  FrenchTechDetection,
  NewsletterDetectionResult,
  PageCategory,
  PageCharacteristics,
  QueueItem,
  RssFeedDetectionResult,
  SocialLinksResult,
  SocialPlatform,
  TechnologyDetectionResult,
} from "./types";
export {
  isInternalUrl,
  normalizeUrl,
  shouldCrawlUrl,
  toAbsoluteUrl,
} from "./utils/url-utils";
