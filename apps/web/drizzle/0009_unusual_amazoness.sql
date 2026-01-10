ALTER TABLE "crawl_job" ADD COLUMN "skipResources" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "skipScreenshots" boolean DEFAULT false;