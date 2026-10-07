CREATE TYPE "public"."userType" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "users_to_customers" (
	"userId" text NOT NULL,
	"customerId" integer NOT NULL,
	CONSTRAINT "users_to_customers_userId_customerId_pk" PRIMARY KEY("userId","customerId")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "type" "userType" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users_to_customers" ADD CONSTRAINT "users_to_customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;