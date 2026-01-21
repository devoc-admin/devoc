/** biome-ignore-all assist/source/useSortedKeys: database schema */

import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    id: text().primaryKey().notNull(),
    image: text(),
    name: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique("user_email_key").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    expiresAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: text().primaryKey().notNull(),
    ipAddress: text(),
    token: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    index("session_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_userId_fkey",
    }).onDelete("cascade"),
    unique("session_token_key").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    accessToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "string", withTimezone: true }),
    accountId: text().notNull(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    id: text().primaryKey().notNull(),
    idToken: text(),
    password: text(),
    providerId: text().notNull(),
    refreshToken: text(),
    refreshTokenExpiresAt: timestamp({ mode: "string", withTimezone: true }),
    scope: text(),
    updatedAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    userId: text().notNull(),
  },
  (table) => [
    index("account_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_userId_fkey",
    }).onDelete("cascade"),
  ]
);

export const verification = pgTable(
  "verification",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    expiresAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    value: text().notNull(),
  },
  (table) => [
    index("verification_identifier_idx").using(
      "btree",
      table.identifier.asc().nullsLast().op("text_ops")
    ),
  ]
);

// Crawl

export const crawlStatusEnum = pgEnum("crawl_status", [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled",
]);

export const pageCategoryEnum = pgEnum("page_category", [
  "homepage",
  "contact",
  "legal_notices",
  "accessibility",
  "sitemap",
  "help",
  "authentication",
  "form",
  "table",
  "multimedia",
  "document",
  "multi_step_process",
  "distinct_layout",
  "other",
]);

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

export const crawl = pgTable(
  "crawl",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    url: text().notNull(),
    status: crawlStatusEnum().default("pending").notNull(),
    maxDepth: integer().default(3).notNull(),
    maxPages: integer().default(50).notNull(),
    pagesDiscovered: integer().default(0).notNull(),
    pagesCrawled: integer().default(0).notNull(),
    skipResources: boolean().default(false),
    skipScreenshots: boolean().default(false),
    useLocalScreenshots: boolean().default(false),
    errorMessage: text(),
    config: jsonb().$type<CrawlConfig>(),
    // 🤖 Technology detection summary
    primaryCms: text(),
    primaryFramework: text(),
    analyticsTools: jsonb().$type<string[]>(),
    detectedTechCount: integer().default(0),
    // 🇫🇷 French-specific technology detection
    accessibilityTool: text(),
    consentManager: text(),
    hostingProvider: text(),
    usesDsfr: boolean().default(false),
    // 🏢 Author/signature detection
    author: text(),
    authorUrl: text(),
    // 📡 RSS, Newsletter & Social detection
    hasRssFeed: boolean().default(false),
    hasNewsletter: boolean().default(false),
    newsletterProvider: text(),
    socialLinks: jsonb().$type<Record<string, string>>(),
    //🗓️ Dates
    startedAt: timestamp({ mode: "string", withTimezone: true }),
    completedAt: timestamp({ mode: "string", withTimezone: true }),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("crawl_status_idx").using("btree", table.status.asc().nullsLast()),
    index("crawl_url_idx").using("btree", table.url.asc().nullsLast()),
  ]
);

export type Crawl = typeof crawl.$inferSelect;
export type NewCrawl = typeof crawl.$inferInsert;

export const crawledPage = pgTable(
  "crawled_page",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    crawlId: text().notNull(),
    url: text().notNull(),
    normalizedUrl: text().notNull(),
    title: text(),
    depth: integer().notNull(),
    category: pageCategoryEnum().default("other").notNull(),
    categoryConfidence: integer().default(0),
    hasForm: boolean().default(false),
    hasTable: boolean().default(false),
    hasMultimedia: boolean().default(false),
    hasDocuments: boolean().default(false),
    hasAuthentication: boolean().default(false),
    layoutSignature: text(),
    httpStatus: integer(),
    contentType: text(),
    responseTime: integer(),
    screenshotUrl: text(),
    description: text(),
    errorMessage: text(),
    selectedForAudit: boolean().default(false),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.crawlId],
      foreignColumns: [crawl.id],
      name: "crawled_page_crawlId_fkey",
    }).onDelete("cascade"),
    index("crawled_page_crawlId_idx").using(
      "btree",
      table.crawlId.asc().nullsLast()
    ),
    index("crawled_page_url_idx").using("btree", table.url.asc().nullsLast()),
    index("crawled_page_category_idx").using(
      "btree",
      table.category.asc().nullsLast()
    ),
    unique("crawled_page_crawl_url").on(table.crawlId, table.normalizedUrl),
  ]
);

export type CrawledPage = typeof crawledPage.$inferSelect;
export type NewCrawledPage = typeof crawledPage.$inferInsert;

// Prospects

export const prospectTypeEnum = pgEnum("prospect_type", [
  "city",
  "administration",
  "epci",
  "other",
]);

export const prospect = pgTable("prospect", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  website: text(),
  location: text(),
  latitude: text(),
  longitude: text(),
  type: prospectTypeEnum().default("other").notNull(),
  createdAt: timestamp({ mode: "string", withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ mode: "string", withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Prospect = typeof prospect.$inferSelect;
export type NewProspect = typeof prospect.$inferInsert;

// Technology detection

export const technology = pgTable(
  "technology",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    slug: text().unique().notNull(),
    category: text().notNull(),
    icon: text(),
    website: text(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("technology_slug_idx").using("btree", table.slug.asc().nullsLast()),
    index("technology_category_idx").using(
      "btree",
      table.category.asc().nullsLast()
    ),
  ]
);

export type Technology = typeof technology.$inferSelect;
export type NewTechnology = typeof technology.$inferInsert;

export const crawlTechnology = pgTable(
  "crawl_technology",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    crawlId: text().notNull(),
    technologyId: integer().notNull(),
    version: text(),
    confidence: integer().notNull(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.crawlId],
      foreignColumns: [crawl.id],
      name: "crawl_technology_crawlId_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.technologyId],
      foreignColumns: [technology.id],
      name: "crawl_technology_technologyId_fkey",
    }).onDelete("cascade"),
    index("crawl_technology_crawlId_idx").using(
      "btree",
      table.crawlId.asc().nullsLast()
    ),
    index("crawl_technology_technologyId_idx").using(
      "btree",
      table.technologyId.asc().nullsLast()
    ),
    unique("crawl_technology_unique").on(table.crawlId, table.technologyId),
  ]
);

export type CrawlTechnology = typeof crawlTechnology.$inferSelect;
export type NewCrawlTechnology = typeof crawlTechnology.$inferInsert;
