CREATE TYPE "public"."audit_status" AS ENUM('compliant', 'non_compliant', 'not_applicable', 'not_tested');--> statement-breakpoint
CREATE TYPE "public"."testability" AS ENUM('automatic', 'semi_automatic', 'manual');--> statement-breakpoint
CREATE TYPE "public"."wcag_level" AS ENUM('A', 'AA', 'AAA');--> statement-breakpoint
CREATE TABLE "crawled_page_audit" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crawled_page_audit_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"crawledPageId" text NOT NULL,
	"criterionId" integer NOT NULL,
	"status" "audit_status" DEFAULT 'not_tested' NOT NULL,
	"comment" text,
	"testedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "crawled_page_audit_unique" UNIQUE("crawledPageId","criterionId")
);
--> statement-breakpoint
CREATE TABLE "rgaa_criterion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rgaa_criterion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"themeId" integer NOT NULL,
	"number" text NOT NULL,
	"title" text NOT NULL,
	"wcagCriteria" text,
	"wcagLevel" "wcag_level",
	"testability" "testability" NOT NULL,
	CONSTRAINT "rgaa_criterion_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "rgaa_test" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rgaa_test_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"criterionId" integer NOT NULL,
	"number" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "rgaa_test_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "rgaa_theme" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rgaa_theme_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"number" integer NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "rgaa_theme_number_unique" UNIQUE("number")
);
--> statement-breakpoint
ALTER TABLE "crawled_page_audit" ADD CONSTRAINT "crawled_page_audit_crawledPageId_fkey" FOREIGN KEY ("crawledPageId") REFERENCES "public"."crawled_page"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crawled_page_audit" ADD CONSTRAINT "crawled_page_audit_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."rgaa_criterion"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rgaa_criterion" ADD CONSTRAINT "rgaa_criterion_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "public"."rgaa_theme"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rgaa_test" ADD CONSTRAINT "rgaa_test_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."rgaa_criterion"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crawled_page_audit_crawledPageId_idx" ON "crawled_page_audit" USING btree ("crawledPageId");--> statement-breakpoint
CREATE INDEX "crawled_page_audit_criterionId_idx" ON "crawled_page_audit" USING btree ("criterionId");--> statement-breakpoint
CREATE INDEX "rgaa_criterion_themeId_idx" ON "rgaa_criterion" USING btree ("themeId");--> statement-breakpoint
CREATE INDEX "rgaa_criterion_number_idx" ON "rgaa_criterion" USING btree ("number");--> statement-breakpoint
CREATE INDEX "rgaa_test_criterionId_idx" ON "rgaa_test" USING btree ("criterionId");