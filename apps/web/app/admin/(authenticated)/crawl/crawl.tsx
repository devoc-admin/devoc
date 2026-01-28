"use client";
import { GoogleMapsProvider } from "../prospects/_components/google-maps-provider";
import { CrawlForm } from "./_components/crawl-form";
import { CrawlStatusPanel } from "./_components/crawl-status-panel";
import { CrawlsCards } from "./_components/crawls-list";
import { CrawlProvider } from "./crawl-context";
import { useRunningCrawl } from "./crawl-queries";

export function CrawlPageContent() {
  // Auto-set crawlId if there's a running crawl
  useRunningCrawl();

  return (
    <GoogleMapsProvider>
      <CrawlProvider>
        <div className="flex h-full gap-x-6">
          <CrawlForm />
          <div className="grow space-y-6 overflow-auto">
            <CrawlStatusPanel />
            <CrawlsCards />
          </div>
        </div>
      </CrawlProvider>
    </GoogleMapsProvider>
  );
}
