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
// 💀

function CrawlPageSkeleton() {
  return (
    <div className="flex h-full w-full gap-x-6">
      <Skeleton className="basis-1/5" />
      <Skeleton className="basis-4/5" />
    </div>
  );
}
