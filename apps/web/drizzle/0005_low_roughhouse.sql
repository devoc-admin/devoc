CREATE TABLE "crawl" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crawl_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawl_url_unique" UNIQUE("url")
);
--> statement-breakpoint
DROP INDEX "crawl_job_auditId_idx";--> statement-breakpoint
ALTER TABLE "crawl_job" ADD COLUMN "crawlId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "crawl_job" ADD CONSTRAINT "crawl_job_crawl_id_fkey" FOREIGN KEY ("crawlId") REFERENCES "public"."crawl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crawl_job_crawlId_idx" ON "crawl_job" USING btree ("crawlId");--> statement-breakpoint
ALTER TABLE "crawl_job" DROP COLUMN "auditId";
