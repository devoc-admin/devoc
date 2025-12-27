// biome-ignore lint/performance/noBarrelFile: Re-exporting crawler module for clean public API
export { detectCategoryPage } from "./category-detector";
export { WebCrawler } from "./crawler";
export type {
  CategoryResult,
  CrawlPageResult,
  CrawlProgressCallback,
  CrawlResult,
  PageCharacteristics,
  QueueItem,
} from "./types";
export {
  isInternalUrl,
  normalizeUrl,
  shouldCrawlUrl,
  toAbsoluteUrl,
} from "./url-utils";
