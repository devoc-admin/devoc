"use client";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CrawlDetailsSidebar } from "./_components/crawl-details-sidebar";
import { CrawledPagesSection } from "./_components/crawled-pages-section";
import { SearchCrawledPages } from "./_components/search-crawled-pages";
import { useCrawlDetailsContext } from "./crawl-details-context";
export function CrawlDetailsContent() {
  const { isError, error, selectedPages, isLoading, otherPages } =
    useCrawlDetailsContext();

  // ⏳ Loading
  if (isLoading) return <CrawlDetailsSkeleton />;

  // 🚫 Error
  if (isError) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="flex h-full gap-x-6">
      <div className="basis-1/6">
        <CrawlDetailsSidebar />
      </div>
      <div className="basis-5/6 space-y-6">
        <div className="flex items-center gap-x-4 rounded-lg bg-sidebar p-6">
          <BackCrawlListButton />
          <SearchCrawledPages />
        </div>
        <div className="h-full space-y-6 overflow-auto">
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
    </div>
  );
}
// ---------------------------------------------
//💀 Skeleton
function CrawlDetailsSkeleton() {
  return (
    <div className="flex h-full w-full gap-x-6">
      <Skeleton className="basis-1/6" />
      <Skeleton className="basis-5/6" />
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

// --------------------------------
// 🔙 Back to crawl list
function BackCrawlListButton() {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-x-2",
        "rounded-full",
        "bg-zinc-100 hover:bg-zinc-200/40",
        "transition-colors",
        "text-foreground",
        "px-6 py-3",
        "text-sm",
        "transition-colors"
      )}
      href="/admin/crawls"
    >
      <ArrowLeftIcon size={16} />
      Retour
    </Link>
  );
}
