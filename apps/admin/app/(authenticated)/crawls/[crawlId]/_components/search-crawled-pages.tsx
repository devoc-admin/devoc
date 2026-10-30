"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { useCrawlDetailsContext } from "../crawl-details-context";

export function SearchCrawledPages() {
  const { searchQuery, setSearchQuery } = useCrawlDetailsContext();
  return (
    <div className="relative max-w-175 grow">
      <SearchIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        size={18}
      />
      <input
        className="border-input bg-sidebar-strong placeholder:text-muted-foreground focus:ring-ring h-10 w-full rounded-md border pr-10 pl-10 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher par titre, URL, catégorie ou statut HTTP..."
        type="text"
        value={searchQuery}
      />
      {searchQuery && (
        <button
          aria-label="Effacer la recherche"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => setSearchQuery("")}
          type="button"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>
  );
}
