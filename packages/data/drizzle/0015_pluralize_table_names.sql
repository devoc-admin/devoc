ALTER TABLE "crawl" RENAME TO "crawls";
--> statement-breakpoint
ALTER TABLE "crawled_page" RENAME TO "crawled_pages";
--> statement-breakpoint
ALTER TABLE "dpo" RENAME TO "dpos";
--> statement-breakpoint
ALTER TABLE "prospect" RENAME TO "prospects";
--> statement-breakpoint
ALTER TABLE "technology" RENAME TO "technologies";
--> statement-breakpoint
ALTER TABLE "crawl_technology" RENAME TO "crawl_technologies";
--> statement-breakpoint
ALTER TABLE "rgaa_theme" RENAME TO "rgaa_themes";
--> statement-breakpoint
ALTER TABLE "rgaa_criterion" RENAME TO "rgaa_criteria";
--> statement-breakpoint
ALTER TABLE "rgaa_test" RENAME TO "rgaa_tests";
--> statement-breakpoint
ALTER TABLE "crawled_page_audit" RENAME TO "crawled_page_audits";
--> statement-breakpoint
ALTER TABLE "audit" RENAME TO "audits";
--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";
--> statement-breakpoint
ALTER TABLE "session" RENAME TO "sessions";
--> statement-breakpoint
ALTER TABLE "account" RENAME TO "accounts";
--> statement-breakpoint
ALTER TABLE "verification" RENAME TO "verifications";
--> statement-breakpoint
ALTER TABLE "rgaa_criteria" RENAME CONSTRAINT "rgaa_criterion_number_unique" TO "rgaa_criteria_number_unique";
--> statement-breakpoint
ALTER TABLE "rgaa_tests" RENAME CONSTRAINT "rgaa_test_number_unique" TO "rgaa_tests_number_unique";
--> statement-breakpoint
ALTER TABLE "rgaa_themes" RENAME CONSTRAINT "rgaa_theme_number_unique" TO "rgaa_themes_number_unique";
--> statement-breakpoint
ALTER TABLE "technologies" RENAME CONSTRAINT "technology_slug_unique" TO "technologies_slug_unique";
