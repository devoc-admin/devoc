"use client";
import { GoogleMapsProvider } from "../prospects/_components/map/google-maps-provider";
import { CrawlForm } from "./_components/crawl-form";
import { CrawlStatusPanel } from "./_components/crawl-status-panel";
import { CrawlsCards } from "./_components/crawls-list";
import { CrawlsProvider } from "./crawls-context";
import { useRunningCrawl } from "./crawls-queries";

export function CrawlsPageContent() {
  // 🔁 Auto-set a crawlId in URL if there's a running crawl
  useRunningCrawl();

  return (
    <GoogleMapsProvider>
      <CrawlsProvider>
        <div className="flex h-full gap-x-6">
          <CrawlForm />
          <div className="grow space-y-6 overflow-auto">
            <CrawlStatusPanel />
            <CrawlsCards />
          </div>
        </div>
      </CrawlsProvider>
    </GoogleMapsProvider>
  );
}
