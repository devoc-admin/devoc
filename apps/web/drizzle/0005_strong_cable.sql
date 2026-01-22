ALTER TABLE "prospect" ADD COLUMN "crawlId" text;--> statement-breakpoint
ALTER TABLE "prospect" ADD CONSTRAINT "prospect_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "public"."crawl"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prospect_crawlId_idx" ON "prospect" USING btree ("crawlId");