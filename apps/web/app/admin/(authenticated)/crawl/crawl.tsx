"use client";
import { CrawlForm } from "./_components/crawl-form";
import { CrawlStatusPanel } from "./_components/crawl-status-panel";
import { DeleteCrawlsButton } from "./_components/delete-crawls-button";
import { ListCrawls } from "./_components/list-crawls";
import { CrawlProvider } from "./crawl-context";
import { useRunningCrawlJob } from "./crawl-queries";

export function CrawlPageContent() {
  // Auto-set crawlJobId if there's a running job
  useRunningCrawlJob();

  return (
    <CrawlProvider>
      <div className="h-full space-y-6 overflow-auto">
        <CrawlForm />
        <CrawlStatusPanel />
        <ListCrawls />
        <DeleteCrawlsButton />
      </div>
    </CrawlProvider>
  );
}
