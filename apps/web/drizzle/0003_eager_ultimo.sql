ALTER TABLE "crawled_page" DROP CONSTRAINT "crawled_page_job_url";--> statement-breakpoint
ALTER TABLE "crawl_job" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crawl_job" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."crawl_status";--> statement-breakpoint
CREATE TYPE "public"."crawl_status" AS ENUM('pending', 'running', 'completed', 'failed', 'cancelled');--> statement-breakpoint
ALTER TABLE "crawl_job" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."crawl_status";--> statement-breakpoint
ALTER TABLE "crawl_job" ALTER COLUMN "status" SET DATA TYPE "public"."crawl_status" USING "status"::"public"."crawl_status";--> statement-breakpoint
ALTER TABLE "crawl_job" ALTER COLUMN "maxPages" SET DEFAULT 50;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "pagesDiscovered" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD COLUMN "normalizedUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD COLUMN "hasDocuments" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD COLUMN "responseTime" integer;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD COLUMN "errorMessage" text;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD CONSTRAINT "crawled_page_job_url" UNIQUE("crawlJobId","normalizedUrl");