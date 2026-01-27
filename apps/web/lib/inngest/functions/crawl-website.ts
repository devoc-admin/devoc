import type { TechnologyDetectionResult } from "@dev-oc/crawler";
import { WebCrawler } from "@dev-oc/crawler";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  crawl,
  crawledPage,
  crawlTechnology,
  technology,
} from "@/lib/db/schema";
import { inngest } from "../client";

type CrawlRequestEvent = {
  data: {
    crawlId: string;
    url: string;
    config: {
      maxDepth: number;
      maxPages: number;
      delayBetweenRequests: number;
      respectRobotsTxt: boolean;
      skipResources?: boolean;
      skipScreenshots?: boolean;
      useLocalScreenshots?: boolean;
      concurrency?: number;
      includePaths?: string[];
      excludePaths?: string[];
    };
  };
};

export const crawlWebsite = inngest.createFunction(
  {
    cancelOn: [
      {
        event: "crawl/crawl.cancelled",
        match: "data.crawlId",
      },
    ],
    id: "crawl-website",
    name: "Crawl Website for audit",
    retries: 2,
  },
  { event: "crawl/crawl.requested" },
  async ({ event, step, logger }) => {
    const { crawlId, url, config } = event.data as CrawlRequestEvent["data"];

    // 1️⃣ 🏃 Mark as running
    await step.run("mark-crawl-running", async () => {
      logger.info("🚀 Starting crawl", { config, crawlId, url });
      const nowString = new Date().toISOString();
      await db
        .update(crawl)
        .set({
          startedAt: nowString,
          status: "running",
          updatedAt: nowString,
        })
        .where(eq(crawl.id, crawlId));
    });

    // 2️⃣ 🏃 Running
    // Note: Return only minimal data to avoid Inngest step output size limit (~4MB)
    const result = await step.run("execute-crawl", async () => {
      const crawler = new WebCrawler({
        baseUrl: url,
        config,
        crawlId,
      });

      logger.info("🕷️ Crawler initialized", {
        concurrency: config.concurrency,
        crawlId,
        maxDepth: config.maxDepth,
        maxPages: config.maxPages,
        url,
      });

      const errors: string[] = [];

      // ⏳ Update progress
      const crawlResult = await crawler.crawl({
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Progress callback handles multiple detection types
        onProgress: async (progress) => {
          logger.info("📄 Page crawled", {
            category: progress.crawledPage.category,
            crawled: progress.crawled,
            crawlId,
            depth: progress.crawledPage.depth,
            discovered: progress.discovered,
            title: progress.crawledPage.title,
            url: progress.crawledPage.url,
          });

          // 👁️📝 Logs
          const nowString = new Date().toISOString();

          // Update crawl
          await db
            .update(crawl)
            .set({
              pagesCrawled: progress.crawled,
              pagesDiscovered: progress.discovered,
              updatedAt: nowString,
            })
            .where(eq(crawl.id, crawlId));

          // ➕ Add result
          const pageToInsert = {
            category: progress.crawledPage.category,
            categoryConfidence: progress.crawledPage.categoryConfidence,
            contentType: progress.crawledPage.contentType,
            crawlId,
            depth: progress.crawledPage.depth,
            description: progress.crawledPage.description,
            hasAuthentication:
              progress.crawledPage.characteristics.hasAuthentication,
            hasDocuments: progress.crawledPage.characteristics.hasDocuments,
            hasForm: progress.crawledPage.characteristics.hasForm,
            hasMultimedia: progress.crawledPage.characteristics.hasMultimedia,
            hasTable: progress.crawledPage.characteristics.hasTable,
            httpStatus: progress.crawledPage.httpStatus,
            layoutSignature:
              progress.crawledPage.characteristics.layoutSignature,
            normalizedUrl: progress.crawledPage.normalizedUrl,
            responseTime: progress.crawledPage.responseTime,
            screenshotUrl: progress.crawledPage.screenshotUrl,
            selectedForAudit: false,
            title: progress.crawledPage.title,
            url: progress.crawledPage.url,
          };

          // Use onConflictDoNothing to silently skip duplicates (safety net for race conditions)
          try {
            await db
              .insert(crawledPage)
              .values(pageToInsert)
              .onConflictDoNothing({
                target: [crawledPage.crawlId, crawledPage.normalizedUrl],
              });
          } catch (error) {
            logger.error("❌ Failed to insert crawled page", {
              crawlId,
              error: error instanceof Error ? error.message : String(error),
              url: progress.crawledPage.url,
            });
          }

          // 🖼️ Save homepage screenshot URL (only for homepage / depth 0)
          if (
            progress.crawledPage.depth === 0 &&
            progress.crawledPage.screenshotUrl
          ) {
            logger.info("🏠 Homepage processed", {
              crawlId,
              screenshotUrl: progress.crawledPage.screenshotUrl,
            });
            await db
              .update(crawl)
              .set({
                homepageScreenshotUrl: progress.crawledPage.screenshotUrl,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 🔍 Save detected technologies (only for homepage / depth 0)
          if (progress.crawledPage.technologies?.technologies?.length) {
            logger.info("🔧 Technologies detected", {
              count: progress.crawledPage.technologies.technologies.length,
              crawlId,
            });
            await saveTechnologies(crawlId, progress.crawledPage.technologies);
          }

          // 🏢 Save detected author/signature (only for homepage / depth 0)
          if (progress.crawledPage.author) {
            await db
              .update(crawl)
              .set({
                author: progress.crawledPage.author.name,
                authorUrl: progress.crawledPage.author.url,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 📡 Save RSS feed detection (only for homepage / depth 0)
          if (progress.crawledPage.rssFeed?.hasRssFeed) {
            await db
              .update(crawl)
              .set({
                hasRssFeed: true,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 📰 Save newsletter detection (only for homepage / depth 0)
          if (progress.crawledPage.newsletter?.hasNewsletter) {
            await db
              .update(crawl)
              .set({
                hasNewsletter: true,
                newsletterProvider:
                  progress.crawledPage.newsletter.provider ?? null,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 🔗 Save social links (only for homepage / depth 0)
          if (
            progress.crawledPage.socialLinks &&
            Object.keys(progress.crawledPage.socialLinks).length > 0
          ) {
            await db
              .update(crawl)
              .set({
                socialLinks: progress.crawledPage.socialLinks,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 📞 Save contact info (only for homepage / depth 0)
          if (progress.crawledPage.contactInfo) {
            const { phones, emails, addresses } =
              progress.crawledPage.contactInfo;
            await db
              .update(crawl)
              .set({
                contactAddresses: addresses.length ? addresses : null,
                contactEmails: emails.length ? emails : null,
                contactPhones: phones.length ? phones : null,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 🔍 Save SEO/structured data (only for homepage / depth 0)
          if (progress.crawledPage.seo) {
            const {
              basicMeta,
              hasHreflang,
              hasStructuredData,
              hreflangCount,
              jsonLdSchemas,
              openGraph,
              twitterCard,
            } = progress.crawledPage.seo;
            await db
              .update(crawl)
              .set({
                hasHreflang,
                hasStructuredData,
                hreflangCount: hreflangCount ?? null,
                jsonLdSchemas: jsonLdSchemas.length ? jsonLdSchemas : null,
                ogDescription: openGraph.description ?? null,
                ogImage: openGraph.image ?? null,
                ogTitle: openGraph.title ?? null,
                ogType: openGraph.type ?? null,
                seoCanonicalUrl: basicMeta.canonicalUrl ?? null,
                seoDescription: basicMeta.description ?? null,
                seoRobotsMeta: basicMeta.robotsMeta ?? null,
                seoTitle: basicMeta.title ?? null,
                twitterCard: twitterCard.card ?? null,
                twitterImage: twitterCard.image ?? null,
                twitterTitle: twitterCard.title ?? null,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }

          // 🌐 Save language info (only for homepage / depth 0)
          if (progress.crawledPage.languageInfo) {
            const {
              availableLanguages,
              hasGoogleTranslate,
              hasMultipleLanguages,
              primaryLanguage,
            } = progress.crawledPage.languageInfo;
            await db
              .update(crawl)
              .set({
                availableLanguages: availableLanguages.length
                  ? availableLanguages
                  : null,
                hasGoogleTranslate,
                hasMultipleLanguages,
                primaryLanguage,
                updatedAt: nowString,
              })
              .where(eq(crawl.id, crawlId));
          }
        },
      });

      logger.info("✅ Crawl execution finished", {
        crawlId,
        errorsCount: crawlResult.errors?.length ?? 0,
        pagesCount: crawlResult.pages.length,
      });

      // Collect errors (just messages, not full objects)
      for (const error of crawlResult.errors ?? []) {
        errors.push(typeof error === "string" ? error : String(error));
      }

      // Return minimal data only to stay under Inngest's 4MB limit
      return {
        errors,
        pagesCount: crawlResult.pages.length,
      };
    });

    for (const error of result.errors) {
      logger.error("🚫 Error during crawl", {
        error,
      });
    }

    // 3️⃣ Select pages for RGAA audit
    await step.run("select-pages-for-audit", async () => {
      // Query pages from database instead of using result.pages (to avoid step output size limit)
      const pages = await db
        .select()
        .from(crawledPage)
        .where(eq(crawledPage.crawlId, crawlId));

      logger.info("🎯 Selecting pages for audit", {
        crawlId,
        totalPages: pages.length,
      });

      // Helper to check if page has successful HTTP status (2xx)
      const isSuccessfulPage = (page: { httpStatus: number | null }) =>
        page.httpStatus !== null &&
        page.httpStatus >= 200 &&
        page.httpStatus < 300;

      const mandatoryCategories = [
        "homepage",
        "contact",
        "legal_notices",
        "accessibility",
        "sitemap",
        "help",
        "authentication",
      ] as const;

      // Select first page for each mandatory category (only 2xx pages)
      const selectedMandatory: string[] = [];
      for (const mandatoryCategory of mandatoryCategories) {
        const selectedPage = pages.find(
          (page) =>
            page.category === mandatoryCategory && isSuccessfulPage(page)
        );
        if (selectedPage) {
          selectedMandatory.push(mandatoryCategory);
          await db
            .update(crawledPage)
            .set({ selectedForAudit: true })
            .where(eq(crawledPage.normalizedUrl, selectedPage.normalizedUrl));
        }
      }

      // ✨ Select pages with unique characteristics (only 2xx pages)
      const specialPages = pages.filter(
        (page) =>
          isSuccessfulPage(page) &&
          (page.hasMultimedia ||
            page.hasTable ||
            page.hasForm ||
            page.hasDocuments)
      );

      const maxSpecialPages = 15;
      const selectedSpecial = specialPages.slice(0, maxSpecialPages);

      for (const page of selectedSpecial) {
        await db
          .update(crawledPage)
          .set({ selectedForAudit: true })
          .where(eq(crawledPage.normalizedUrl, page.normalizedUrl));
      }

      logger.info("✅ Pages selected for audit", {
        crawlId,
        mandatoryCategories: selectedMandatory,
        specialPagesCount: selectedSpecial.length,
      });
    });

    //5️⃣ 🎉 Mark crawl as completed
    await step.run("mark-crawl-completed", async () => {
      const nowString = new Date().toISOString();
      try {
        await db
          .update(crawl)
          .set({
            completedAt: nowString,
            pagesCrawled: result.pagesCount,
            pagesDiscovered: result.pagesCount,
            status: "completed",
            updatedAt: nowString,
          })
          .where(eq(crawl.id, crawlId));

        logger.info("🎉 Crawl completed", {
          crawlId,
          errorsCount: result.errors.length,
          pagesCount: result.pagesCount,
        });
      } catch (error) {
        logger.error("❌ Failed to mark crawl as completed", {
          crawlId,
          error: error instanceof Error ? error.message : String(error),
        });
        throw error; // Re-throw to let Inngest handle retry
      }
    });

    return {
      errorsCount: result.errors.length,
      pagesDiscovered: result.pagesCount,
      success: true,
    };
  }
);

/**
 * Save detected technologies to database
 */
async function saveTechnologies(
  crawlId: string,
  detectionResult: TechnologyDetectionResult
) {
  const techs = detectionResult.technologies;
  if (!techs.length) return;

  // Track summary data
  let primaryCms: string | undefined;
  let primaryFramework: string | undefined;
  const analyticsToolsList: string[] = [];

  for (const tech of techs) {
    // 1. Upsert technology to master table
    const [insertedTech] = await db
      .insert(technology)
      .values({
        category: tech.category,
        icon: tech.icon,
        name: tech.name,
        slug: tech.slug,
        website: tech.website,
      })
      .onConflictDoUpdate({
        set: {
          category: tech.category,
          icon: tech.icon,
          name: tech.name,
          website: tech.website,
        },
        target: technology.slug,
      })
      .returning({ id: technology.id });

    if (!insertedTech) continue;

    // 2. Link to crawl via junction table
    await db
      .insert(crawlTechnology)
      .values({
        confidence: tech.confidence,
        crawlId,
        technologyId: insertedTech.id,
        version: tech.version,
      })
      .onConflictDoNothing({
        target: [crawlTechnology.crawlId, crawlTechnology.technologyId],
      });

    // 3. Track summary data
    const categoryLower = tech.category.toLowerCase();
    if (categoryLower === "cms" && !primaryCms) {
      primaryCms = tech.name;
    }
    if (
      (categoryLower.includes("framework") ||
        categoryLower.includes("javascript")) &&
      !primaryFramework
    ) {
      primaryFramework = tech.name;
    }
    if (categoryLower.includes("analytics")) {
      analyticsToolsList.push(tech.name);
    }
  }

  // 4. Update crawl summary columns (including French tech)
  const { frenchTech } = detectionResult;
  const nowString = new Date().toISOString();
  await db
    .update(crawl)
    .set({
      accessibilityTool: frenchTech.accessibilityTool ?? null,
      analyticsTools: analyticsToolsList.length ? analyticsToolsList : null,
      consentManager: frenchTech.consentManager ?? null,
      detectedTechCount: techs.length,
      hostingProvider: frenchTech.hostingProvider ?? null,
      primaryCms: primaryCms ?? null,
      primaryFramework: primaryFramework ?? null,
      updatedAt: nowString,
      usesDsfr: frenchTech.usesDsfr,
    })
    .where(eq(crawl.id, crawlId));
}
