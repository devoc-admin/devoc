"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { Prospect } from "@/lib/db/schema";
import { ProspectTypesButtons } from "../../prospects/_components/buttons/prospect-type-button";
import { useCrawlsContext } from "../crawls-context";
import { CrawlCard, CrawlCardSkeleton } from "./crawl-card/crawl-card";

export function CrawlsCards() {
  const { crawls, crawlsAreLoading } = useCrawlsContext();
  const [typeFilter, setTypeFilter] = useState<Prospect["type"] | null>(null);

  const noCrawls = crawls && crawls.length === 0;
  if (noCrawls && !crawlsAreLoading) return <NoCrawlFound />;

  // 👀 No results
  const CrawlCards =
    crawls && crawls.length === 0 ? (
      <p className="text-center text-muted-foreground">
        Aucun crawl ne correspond à votre recherche
      </p>
    ) : (
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-4">
        {crawls?.map((crawl) => (
          <CrawlCard {...crawl} key={crawl.id} />
        ))}
      </ul>
    );

  return (
    <div className="space-y-6 rounded-md bg-sidebar p-8">
      {/* 🔍 Search bar */}
      <SearchCrawls />

      {/* 🏷️ Prospect type filter */}
      <ProspectTypesButtons
        onSelectType={setTypeFilter}
        selectedType={typeFilter}
      />

      {/* 📝 Results */}
      {crawlsAreLoading ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
        </ul>
      ) : (
        CrawlCards
      )}
    </div>
  );
}

// --------------------------------
// 🔍 Search crawls
function SearchCrawls() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative max-w-125">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <input
        className="h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher par titre, URL ou prestataire..."
        type="text"
        value={searchQuery}
      />
      {searchQuery && (
        <button
          aria-label="Effacer la recherche"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setSearchQuery("")}
          type="button"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>
  );
}
// --------------------------------
// 🧌 No crawl found
function NoCrawlFound() {
  return (
    <p className="text-center text-muted-foreground">Aucun crawl trouvé</p>
  );
}
