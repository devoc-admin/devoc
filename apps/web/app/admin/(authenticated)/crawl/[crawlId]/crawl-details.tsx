"use client";
import { AlertCircleIcon } from "lucide-react";
import { CrawlHeader } from "./_components/crawl-header";
import { CrawledPagesSection } from "./_components/crawled-pages-section";
import {
  CrawlDetailsProvider,
  useCrawlDetailsContext,
} from "./crawl-details-context";

export function CrawlDetailsContent({ crawlId }: CrawlDetailsContentProps) {
  return (
    <CrawlDetailsProvider crawlId={crawlId}>
      <CrawlDetailsInner />
    </CrawlDetailsProvider>
  );
}

interface CrawlDetailsContentProps {
  crawlId: string;
}

function CrawlDetailsInner() {
  const { isLoading, isError, error, selectedPages, otherPages } =
    useCrawlDetailsContext();

  // ⏳ Loading
  if (isLoading) return <CrawlDetailsSkeleton />;

  // 🚫 Error
  if (isError) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="flex h-full gap-x-6">
      <div className="max-w-[400px]">
        <CrawlHeader />
      </div>
      <div className="grow space-y-6 overflow-auto">
        <CrawledPagesSection
          emptyMessage="Aucune page sélectionnée pour l'audit"
          pages={selectedPages}
          title="Pages sélectionnées pour l'audit"
        />
        <CrawledPagesSection
          emptyMessage="Toutes les pages sont sélectionnées pour l'audit"
          pages={otherPages}
          title="Autres pages analysées"
        />
      </div>
    </div>
  );
}
// ---------------------------------------------
//💀 Skeleton
function CrawlDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-48 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-96 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-96 animate-pulse rounded-lg bg-sidebar" />
    </div>
  );
}
// ---------------------------------------------
// 🚫 Error
function ErrorMessage({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-sidebar p-12">
      <AlertCircleIcon className="size-12 text-destructive" />
      <div className="text-center">
        <h2 className="font-kanit font-semibold text-xl">
          Erreur lors du chargement
        </h2>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
