"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { useProspectsContext } from "../../prospects-context";

export function SearchProspectsInput() {
  const { searchQuery, setSearchQuery } = useProspectsContext();

  return (
    <div className="relative w-125">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <input
        className="h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher par nom, type ou site web..."
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
