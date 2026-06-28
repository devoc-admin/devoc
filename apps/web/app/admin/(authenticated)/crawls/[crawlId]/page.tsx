import { CrawlDetailsContent } from "./crawl-details";
import { CrawlDetailsProvider } from "./crawl-details-context";

type CrawlDetailsPageProps = {
  params: Promise<{ crawlId: string }>;
};

export default async function CrawlDetailsPage({
  params,
}: CrawlDetailsPageProps) {
  const { crawlId } = await params;
  if (!crawlId) return <NoCrawlFound />;

  return (
    <CrawlDetailsProvider crawlId={crawlId}>
      <CrawlDetailsContent />
    </CrawlDetailsProvider>
  );
}

// ----------------------------------
// 👀 No crawl
function NoCrawlFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-muted-foreground">
        Le crawl que vous cherchez n'existe pas ou a été supprimé.
      </p>
    </div>
  );
}
