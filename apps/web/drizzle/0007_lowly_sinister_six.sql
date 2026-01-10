CREATE TABLE "crawl_job_technology" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crawl_job_technology_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"crawlJobId" text NOT NULL,
	"technologyId" integer NOT NULL,
	"version" text,
	"confidence" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawl_job_technology_unique" UNIQUE("crawlJobId","technologyId")
);
--> statement-breakpoint
CREATE TABLE "technology" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "technology_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"icon" text,
	"website" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "technology_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "primaryCms" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "primaryFramework" text;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "analyticsTools" jsonb;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "detectedTechCount" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "crawl_job_technology" ADD CONSTRAINT "crawl_job_technology_crawlJobId_fkey" FOREIGN KEY ("crawlJobId") REFERENCES "public"."crawl_job"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crawl_job_technology" ADD CONSTRAINT "crawl_job_technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crawl_job_technology_crawlJobId_idx" ON "crawl_job_technology" USING btree ("crawlJobId");--> statement-breakpoint
CREATE INDEX "crawl_job_technology_technologyId_idx" ON "crawl_job_technology" USING btree ("technologyId");--> statement-breakpoint
CREATE INDEX "technology_slug_idx" ON "technology" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "technology_category_idx" ON "technology" USING btree ("category");