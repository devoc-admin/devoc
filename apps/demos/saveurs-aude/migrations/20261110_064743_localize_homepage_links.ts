import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_locales" ADD COLUMN "hero_cta_link" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "promotion_banner_link" varchar;

  -- Keep the existing links, rewritten to each locale's shop path.
  UPDATE "homepage_locales" l
    SET "hero_cta_link" = h."hero_cta_link",
        "promotion_banner_link" = h."promotion_banner_link"
    FROM "homepage" h
    WHERE l."_parent_id" = h."id";
  UPDATE "homepage_locales"
    SET "hero_cta_link" = regexp_replace("hero_cta_link", '^/en/shop', '/fr/boutique'),
        "promotion_banner_link" = regexp_replace("promotion_banner_link", '^/en/shop', '/fr/boutique')
    WHERE "_locale" = 'fr';
  UPDATE "homepage_locales"
    SET "hero_cta_link" = regexp_replace("hero_cta_link", '^/fr/boutique', '/en/shop'),
        "promotion_banner_link" = regexp_replace("promotion_banner_link", '^/fr/boutique', '/en/shop')
    WHERE "_locale" = 'en';

  ALTER TABLE "homepage" DROP COLUMN "hero_cta_link";
  ALTER TABLE "homepage" DROP COLUMN "promotion_banner_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "hero_cta_link" varchar;
  ALTER TABLE "homepage" ADD COLUMN "promotion_banner_link" varchar;

  -- Restore the French links as the shared value.
  UPDATE "homepage" h
    SET "hero_cta_link" = l."hero_cta_link",
        "promotion_banner_link" = l."promotion_banner_link"
    FROM "homepage_locales" l
    WHERE l."_parent_id" = h."id" AND l."_locale" = 'fr';

  ALTER TABLE "homepage_locales" DROP COLUMN "hero_cta_link";
  ALTER TABLE "homepage_locales" DROP COLUMN "promotion_banner_link";`)
}
