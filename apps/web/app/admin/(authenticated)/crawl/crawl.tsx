"use client";
import { CrawlForm } from "./_components/crawl-form";
import { CrawlStatusPanel } from "./_components/crawl-status-panel";
import { DeleteCrawlsButton } from "./_components/delete-crawls-button";
import { ListCrawls } from "./_components/list-crawls";
import { CrawlProvider } from "./crawl-context";
import { useRunningCrawl } from "./crawl-queries";

export function CrawlPageContent() {
  // Auto-set crawlId if there's a running crawl
  useRunningCrawl();

  return (
    <CrawlProvider>
      <div className="flex h-full gap-x-6">
        <CrawlForm />
        <div className="grow space-y-6 overflow-auto">
          <CrawlStatusPanel />
          <ListCrawls />
        </div>
        <DeleteCrawlsButton />
      </div>
    </CrawlProvider>
  );
}
