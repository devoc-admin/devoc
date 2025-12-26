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

// Audit

export const audit = pgTable("audit", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: text().unique().notNull(),
  createdAt: timestamp({ mode: "string", withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ mode: "string", withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Audit = typeof audit.$inferSelect;
export type NewAudit = typeof audit.$inferInsert;

// Crawler

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
  includePaths?: string[];
  excludePaths?: string[];
  auth?: {
    type: "basic" | "form" | "cookie";
    credentials?: Record<string, string>;
  };
};

export const crawlJob = pgTable(
  "crawl_job",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    auditId: integer().notNull(),
    status: crawlStatusEnum().default("pending").notNull(),
    maxDepth: integer().default(3).notNull(),
    maxPages: integer().default(50).notNull(),
    pagesDiscovered: integer().default(0).notNull(),
    pagesCrawled: integer().default(0).notNull(),
    errorMessage: text(),
    config: jsonb().$type<CrawlConfig>(),
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
    foreignKey({
      columns: [table.auditId],
      foreignColumns: [audit.id],
      name: "crawl_job_audit_id_fkey",
    }).onDelete("cascade"),
    index("crawl_job_auditId_idx").using(
      "btree",
      table.auditId.asc().nullsLast()
    ),
    index("crawl_job_status_idx").using(
      "btree",
      table.status.asc().nullsLast()
    ),
  ]
);

export type CrawlJob = typeof crawlJob.$inferSelect;
export type NewCrawlJob = typeof crawlJob.$inferInsert;

export const crawledPage = pgTable(
  "crawled_page",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    crawlJobId: text().notNull(),
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
    errorMessage: text(),
    selectedForAudit: boolean().default(false),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.crawlJobId],
      foreignColumns: [crawlJob.id],
      name: "crawled_page_crawlJobId_fkey",
    }).onDelete("cascade"),
    index("crawled_page_crawlJobId_idx").using(
      "btree",
      table.crawlJobId.asc().nullsLast()
    ),
    index("crawled_page_url_idx").using("btree", table.url.asc().nullsLast()),
    index("crawled_page_category_idx").using(
      "btree",
      table.category.asc().nullsLast()
    ),
    unique("crawled_page_job_url").on(table.crawlJobId, table.normalizedUrl),
  ]
);

export type CrawledPage = typeof crawledPage.$inferSelect;
export type NewCrawledPage = typeof crawledPage.$inferInsert;
