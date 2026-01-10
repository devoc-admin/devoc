ALTER TABLE "crawl_job" ADD COLUMN "accessibilityTool" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "consentManager" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "hostingProvider" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "usesDsfr" boolean DEFAULT false;