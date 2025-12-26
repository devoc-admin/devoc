CREATE TYPE "public"."crawl_status" AS ENUM('pending', 'running', 'is_completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."page_category" AS ENUM('homepage', 'contact', 'legal_notices', 'accessibility', 'sitemap', 'help', 'authentication', 'form', 'table', 'multimedia', 'document', 'multi_step_process', 'distinct_layout', 'other');--> statement-breakpoint
CREATE TABLE "crawl_job" (
	"id" text PRIMARY KEY NOT NULL,
	"auditId" integer NOT NULL,
	"status" "crawl_status" DEFAULT 'pending' NOT NULL,
	"maxDepth" integer DEFAULT 3 NOT NULL,
	"maxPages" integer DEFAULT 3 NOT NULL,
	"pagesCrawled" integer DEFAULT 0 NOT NULL,
	"errorMessage" text,
	"config" jsonb,
	"startedAt" timestamp with time zone,
	"completedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crawled_page" (
	"id" text PRIMARY KEY NOT NULL,
	"crawlJobId" text NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"depth" integer NOT NULL,
	"category" "page_category" DEFAULT 'other' NOT NULL,
	"categoryConfidence" integer DEFAULT 0,
	"hasForm" boolean DEFAULT false,
	"hasTable" boolean DEFAULT false,
	"hasMultimedia" boolean DEFAULT false,
	"hasAuthentication" boolean DEFAULT false,
	"layoutSignature" text,
	"httpStatus" integer,
	"contentType" text,
	"selectedForAudit" boolean DEFAULT false,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawled_page_job_url" UNIQUE("crawlJobId","url")
);
--> statement-breakpoint
ALTER TABLE "crawl_job" ADD CONSTRAINT "crawl_job_audit_id_fkey" FOREIGN KEY ("auditId") REFERENCES "public"."audit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD CONSTRAINT "crawled_page_crawlJobId_fkey" FOREIGN KEY ("crawlJobId") REFERENCES "public"."crawl_job"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crawl_job_auditId_idx" ON "crawl_job" USING btree ("auditId");--> statement-breakpoint
CREATE INDEX "crawl_job_status_idx" ON "crawl_job" USING btree ("status");--> statement-breakpoint
CREATE INDEX "crawled_page_crawlJobId_idx" ON "crawled_page" USING btree ("crawlJobId");--> statement-breakpoint
CREATE INDEX "crawled_page_url_idx" ON "crawled_page" USING btree ("url");--> statement-breakpoint
CREATE INDEX "crawled_page_category_idx" ON "crawled_page" USING btree ("category");