ALTER TABLE "audit" ADD COLUMN "test" text NOT NULL;--> statement-breakpoint
ALTER TABLE "audit" ADD CONSTRAINT "audit_test_unique" UNIQUE("test");