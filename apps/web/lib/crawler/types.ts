import type { pageCategoryEnum } from "@/lib/db/schema";

export type CrawlResult = {
  pages: CrawlPageResult[];
  errors?: Array<{ url: string; error: string }>;
};

export type CrawlPageResult = {
  url: string;
  normalizedUrl: string;
  title: string | null;
  depth: number;
  category: PageCategory;
  categoryConfidence: number;
  characteristics: PageCharacteristics;
  httpStatus: number;
  contentType: string;
  responseTime: number;
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
  currentUrl: string;
}) => Promise<void>;

type PageCategory = (typeof pageCategoryEnum.enumValues)[number];

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
