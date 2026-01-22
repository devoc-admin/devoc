ALTER TABLE "crawl" ADD COLUMN "contactPhones" jsonb;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "contactEmails" jsonb;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "contactAddresses" jsonb;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "seoTitle" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "seoDescription" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "seoCanonicalUrl" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "seoRobotsMeta" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "ogTitle" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "ogDescription" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "ogImage" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "ogType" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "twitterCard" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "twitterTitle" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "twitterImage" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "jsonLdSchemas" jsonb;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "hasStructuredData" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "hasHreflang" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "hreflangCount" integer;