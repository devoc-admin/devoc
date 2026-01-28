"use client";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import type { CrawlResult } from "../../crawl-actions";
import { DeleteCrawlButton } from "./_components/buttons/delete-crawl-button";
import { RetryCrawlButton } from "./_components/buttons/retry-crawl-button";
import { SeeCrawlButton } from "./_components/buttons/see-crawl-button";
import { CrawlCardDetails } from "./_components/crawl-card-details";
import { ProspectSelector } from "./_components/prospect-selector";
import { AuthorSection } from "./_components/sections/author-section";
import { ContactInfoSection } from "./_components/sections/contact-info-section";
import { LanguageSection } from "./_components/sections/language-section";
import { TechnologiesSection } from "./_components/sections/technologies-section";
import { SocialLinks } from "./_components/social-links";
import {
  CrawlCardContextProvider,
  useCrawlCardContext,
} from "./crawl-card-context";
export function CrawlCard(crawl: CrawlResult) {
  const showScreenshot =
    crawl.screenshotUrl && process.env.NODE_ENV === "development";
  return (
    <CrawlCardContextProvider crawl={crawl}>
      <li
        className="flex max-w-100 flex-col gap-y-6 self-start rounded-md border border-border bg-sidebar-strong p-4"
        key={crawl.id}
      >
        <div>
          {/* ⬆️ Header */}
          <CrawlCardHeader />
          <Website />
          <SocialLinks />
          <ProspectSelector />
          <CrawlCardDetails />
        </div>
        {/* 🖼️ Screenshot */}
        {showScreenshot && (
          <div className="group relative mx-auto w-fit">
            <Image
              alt="Screenshot"
              className="rounded-md shadow-md"
              height={225}
              src={crawl.screenshotUrl ?? ""}
              width={400}
            />
          </div>
        )}
        {/* 🆕 Buttons */}
        <div className="flex w-full gap-x-2">
          <SeeCrawlButton />
          <RetryCrawlButton />
          <DeleteCrawlButton />
        </div>
        {/* 🙎📞🤖🌐 Sections info */}
        <ContactInfoSection />
        <AuthorSection />
        <TechnologiesSection />
        <LanguageSection />
      </li>
    </CrawlCardContextProvider>
  );
}

// -------------------------------------------------
// 💀
export function CrawlCardSkeleton() {
  return <Skeleton className="h-84.5 w-119 rounded-md" />;
}

// -------------------------------------------------
// 🆎 Header
function CrawlCardHeader() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  const crawlName = crawl.prospectName ?? crawl.title;
  if (!crawlName) return null;

  return (
    <h3
      className="max-w-full truncate font-kanit text-xl"
      title={crawl.prospectName ?? crawl.title ?? undefined}
    >
      {crawlName}
    </h3>
  );
}

// -------------------------------------------------
//🌐 Website
function Website() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;
  const url = crawl.url;
  return (
    <a
      className="flex items-center gap-x-2 text-muted-foreground hover:underline"
      href={url}
      target="_blank"
    >
      <span className="truncate">{url ?? "—"}</span>
      <ExternalLinkIcon className="shrink-0" size={16} />
    </a>
  );
}
