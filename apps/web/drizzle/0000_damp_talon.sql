CREATE TABLE "crawl" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"status" "crawl_status" DEFAULT 'pending' NOT NULL,
	"maxDepth" integer DEFAULT 3 NOT NULL,
	"maxPages" integer DEFAULT 50 NOT NULL,
	"pagesDiscovered" integer DEFAULT 0 NOT NULL,
	"pagesCrawled" integer DEFAULT 0 NOT NULL,
	"skipResources" boolean DEFAULT false,
	"skipScreenshots" boolean DEFAULT false,
	"useLocalScreenshots" boolean DEFAULT false,
	"errorMessage" text,
	"config" jsonb,
	"primaryCms" text,
	"primaryFramework" text,
	"analyticsTools" jsonb,
	"detectedTechCount" integer DEFAULT 0,
	"accessibilityTool" text,
	"consentManager" text,
	"hostingProvider" text,
	"usesDsfr" boolean DEFAULT false,
	"author" text,
	"authorUrl" text,
	"hasRssFeed" boolean DEFAULT false,
	"hasNewsletter" boolean DEFAULT false,
	"newsletterProvider" text,
	"socialLinks" jsonb,
	"startedAt" timestamp with time zone,
	"completedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crawled_page" (
	"id" text PRIMARY KEY NOT NULL,
	"crawlId" text NOT NULL,
	"url" text NOT NULL,
	"normalizedUrl" text NOT NULL,
	"title" text,
	"depth" integer NOT NULL,
	"category" "page_category" DEFAULT 'other' NOT NULL,
	"categoryConfidence" integer DEFAULT 0,
	"hasForm" boolean DEFAULT false,
	"hasTable" boolean DEFAULT false,
	"hasMultimedia" boolean DEFAULT false,
	"hasDocuments" boolean DEFAULT false,
	"hasAuthentication" boolean DEFAULT false,
	"layoutSignature" text,
	"httpStatus" integer,
	"contentType" text,
	"responseTime" integer,
	"screenshotUrl" text,
	"description" text,
	"errorMessage" text,
	"selectedForAudit" boolean DEFAULT false,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawled_page_crawl_url" UNIQUE("crawlId","normalizedUrl")
);
--> statement-breakpoint
CREATE TABLE "crawl_technology" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crawl_technology_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"crawlId" text NOT NULL,
	"technologyId" integer NOT NULL,
	"version" text,
	"confidence" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawl_technology_unique" UNIQUE("crawlId","technologyId")
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
ALTER TABLE "crawl_technology" ADD CONSTRAINT "crawl_technology_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "public"."crawl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crawl_technology" ADD CONSTRAINT "crawl_technology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crawled_page" ADD CONSTRAINT "crawled_page_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "public"."crawl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crawl_status_idx" ON "crawl" USING btree ("status");--> statement-breakpoint
CREATE INDEX "crawl_url_idx" ON "crawl" USING btree ("url");--> statement-breakpoint
CREATE INDEX "crawl_technology_crawlId_idx" ON "crawl_technology" USING btree ("crawlId");--> statement-breakpoint
CREATE INDEX "crawl_technology_technologyId_idx" ON "crawl_technology" USING btree ("technologyId");--> statement-breakpoint
CREATE INDEX "crawled_page_crawlId_idx" ON "crawled_page" USING btree ("crawlId");--> statement-breakpoint
CREATE INDEX "crawled_page_url_idx" ON "crawled_page" USING btree ("url");--> statement-breakpoint
CREATE INDEX "crawled_page_category_idx" ON "crawled_page" USING btree ("category");--> statement-breakpoint
CREATE INDEX "technology_slug_idx" ON "technology" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "technology_category_idx" ON "technology" USING btree ("category");--> statement-breakpoint
