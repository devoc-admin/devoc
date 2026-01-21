import { Suspense } from "react";
import { CrawlDetailsContent } from "./crawl-details";

type CrawlDetailsPageProps = {
  params: Promise<{ crawlId: string }>;
};

export default async function CrawlDetailsPage({
  params,
}: CrawlDetailsPageProps) {
  const { crawlId } = await params;

  if (!crawlId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          Le crawl que vous cherchez n'existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<CrawlDetailsPageSkeleton />}>
      <CrawlDetailsContent crawlId={crawlId} />
    </Suspense>
  );
}

function CrawlDetailsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-48 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-96 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-96 animate-pulse rounded-lg bg-sidebar" />
    </div>
  );
}
