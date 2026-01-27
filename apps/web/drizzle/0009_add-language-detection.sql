ALTER TABLE "crawl" ADD COLUMN "primaryLanguage" text;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "availableLanguages" jsonb;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "hasMultipleLanguages" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "crawl" ADD COLUMN "hasGoogleTranslate" boolean DEFAULT false;