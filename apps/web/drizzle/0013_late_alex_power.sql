ALTER TABLE "crawl_job" ADD COLUMN "hasRssFeed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "hasNewsletter" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "newsletterProvider" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "socialLinks" jsonb;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD COLUMN "description" text;