CREATE TABLE "dpo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dpo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"url" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prospect" ADD COLUMN "hasDpo" boolean;--> statement-breakpoint
ALTER TABLE "prospect" ADD COLUMN "dpoId" integer;--> statement-breakpoint
ALTER TABLE "prospect" ADD CONSTRAINT "prospect_dpoId_fkey" FOREIGN KEY ("dpoId") REFERENCES "public"."dpo"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prospect_dpoId_idx" ON "prospect" USING btree ("dpoId");