--> statement-breakpoint
ALTER TABLE "crawl"
    ADD "perfTtfb" integer,
    ADD "perfFcp" integer,
    ADD "perfLcp" integer,
    ADD "perfDomContentLoaded" integer,
    ADD "perfPageLoadTime" integer,
    ADD "perfPageSizeKb" integer,
    ADD "perfRequestCount" integer,
    ADD "perfResourceBreakdown" jsonb;
