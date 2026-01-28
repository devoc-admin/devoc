import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CrawlPageContent } from "./crawl";
export default function CrawlPage() {
  return (
    <Suspense fallback={<CrawlPageSkeleton />}>
      <CrawlPageContent />
    </Suspense>
  );
}

// ================================
//💀

function CrawlPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32" />
      <Skeleton className="h-64" />
    </div>
  );
}
