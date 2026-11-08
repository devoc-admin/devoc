import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "customers" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  CREATE INDEX "products_variants_locales_parent_id_idx" ON "products_variants_locales" USING btree ("_parent_id");
  CREATE INDEX "products_locales_parent_id_idx" ON "products_locales" USING btree ("_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "reviews_locales_parent_id_idx" ON "reviews_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_locales_parent_id_idx" ON "blog_posts_locales" USING btree ("_parent_id");
  CREATE INDEX "faq_locales_parent_id_idx" ON "faq_locales" USING btree ("_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "site_config_exceptional_closures_locales_parent_id_idx" ON "site_config_exceptional_closures_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_locales_parent_id_idx" ON "homepage_locales" USING btree ("_parent_id");
  CREATE INDEX "shipping_config_locales_parent_id_idx" ON "shipping_config_locales" USING btree ("_parent_id");
  CREATE INDEX "cookie_consent_locales_parent_id_idx" ON "cookie_consent_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "products_variants_locales_parent_id_idx";
  DROP INDEX "products_locales_parent_id_idx";
  DROP INDEX "categories_locales_parent_id_idx";
  DROP INDEX "reviews_locales_parent_id_idx";
  DROP INDEX "pages_locales_parent_id_idx";
  DROP INDEX "blog_posts_locales_parent_id_idx";
  DROP INDEX "faq_locales_parent_id_idx";
  DROP INDEX "media_locales_parent_id_idx";
  DROP INDEX "site_config_exceptional_closures_locales_parent_id_idx";
  DROP INDEX "homepage_locales_parent_id_idx";
  DROP INDEX "shipping_config_locales_parent_id_idx";
  DROP INDEX "cookie_consent_locales_parent_id_idx";
  ALTER TABLE "customers" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";`)
}
