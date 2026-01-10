CREATE TYPE "public"."prospect_type" AS ENUM('city', 'administration', 'epci', 'other');--> statement-breakpoint
CREATE TABLE "prospect" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "prospect_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"website" text,
	"location" text,
	"type" "prospect_type" DEFAULT 'other' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
