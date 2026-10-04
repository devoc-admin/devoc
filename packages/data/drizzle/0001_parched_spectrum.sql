CREATE TYPE "public"."audit_type" AS ENUM('rgaa', 'wcag');--> statement-breakpoint
CREATE TABLE "audit" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"name" text,
	"type" "audit_type" DEFAULT 'rgaa' NOT NULL,
	"status" "crawl_status" DEFAULT 'pending' NOT NULL,
	"crawlId" text,
	"totalCriteria" integer DEFAULT 0,
	"compliantCount" integer DEFAULT 0,
	"nonCompliantCount" integer DEFAULT 0,
	"notApplicableCount" integer DEFAULT 0,
	"notTestedCount" integer DEFAULT 0,
	"complianceRate" integer,
	"errorMessage" text,
	"startedAt" timestamp with time zone,
	"completedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit" ADD CONSTRAINT "audit_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "public"."crawl"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_status_idx" ON "audit" USING btree ("status");--> statement-breakpoint
CREATE INDEX "audit_url_idx" ON "audit" USING btree ("url");--> statement-breakpoint
CREATE INDEX "audit_type_idx" ON "audit" USING btree ("type");