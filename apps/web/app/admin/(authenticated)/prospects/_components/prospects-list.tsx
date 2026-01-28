"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { useProspectsContext } from "../prospects-context";
import { ProspectTypesButtons } from "./buttons/prospect-type-button";
import { ProspectAddDialog } from "./dialogs/prospect-add-dialog";
import { ProspectsMap } from "./prospects-map";
import { ProspectsTable } from "./prospects-table";
import { ViewToggle } from "./view-toggle";

export function ProspectsList() {
  const { viewMode, typeFilter, setTypeFilter, isProspectsLoading } =
    useProspectsContext();

  let ProspectsContent: React.ReactNode = null;
  if (viewMode === "map") ProspectsContent = <ProspectsMap />;
  if (viewMode === "table") ProspectsContent = <ProspectsTable />;
  if (isProspectsLoading) {
    ProspectsContent = <div>Chargement...</div>;
  }

  return (
    <div className="flex min-h-full flex-col gap-y-8 rounded-md bg-sidebar p-8">
      <div className="flex items-center gap-x-8">
        <h2 className="font-kanit font-semibold text-3xl">Prospects</h2>
      </div>
      <div className="flex items-center gap-x-6">
        <SearchProspects />
        <ProspectAddDialog />
      </div>
      <div className="w-fit">
        <ViewToggle />
      </div>
      {/* 🟡 Badges */}
      <ProspectTypesButtons
        onSelectType={setTypeFilter}
        selectedType={typeFilter}
      />
      {/* 🧮 | 🗺️ */}
      {ProspectsContent}
    </div>
  );
}

// -------------------------------------------
// 🔍 Search bar
function SearchProspects() {
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
