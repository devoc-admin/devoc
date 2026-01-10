import { Suspense } from "react";
import { CrawlPageContent } from "./crawl";

export default function CrawlPage() {
  return (
    <Suspense fallback={<CrawlPageSkeleton />}>
      <CrawlPageContent />
    </Suspense>
  );
}

function CrawlPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-64 animate-pulse rounded-lg bg-sidebar" />
    </div>
  );
}
