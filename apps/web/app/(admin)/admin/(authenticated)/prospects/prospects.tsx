"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ProspectTypesButtons } from "./_components/buttons/prospect-type-button";
import { ProspectAddDialog } from "./_components/dialogs/prospect-add-dialog";
import { SearchProspectsInput } from "./_components/inputs/search-prospects-input";
import { ViewToggle } from "./_components/inputs/view-toggle";
import { ProspectsMap } from "./_components/prospects-map";
import { ProspectsTable } from "./_components/prospects-table";
import { useProspectsContext } from "./prospects-context";
export function ProspectsPageContent() {
  const { viewMode, typeFilter, setTypeFilter, isProspectsLoading } =
    useProspectsContext();

  let ProspectsView: React.ReactNode = null;
  if (viewMode === "map") ProspectsView = <ProspectsMap />;
  if (viewMode === "table") ProspectsView = <ProspectsTable />;

  // ⏳ Loading state for view
  if (isProspectsLoading) {
    ProspectsView = <Skeleton className="w-full grow" />;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-y-8",
        "min-h-full",
        "p-8",
        "rounded-md",
        "bg-sidebar"
      )}
    >
      {/* 🆎 Header */}
      <ProspectsHeader />
      {/* 🔍 Filters/Actions */}
      <div className="flex items-center gap-x-4">
        <SearchProspectsInput />
        <ProspectAddDialog />
      </div>
      {/* 🔛 View */}
      <ViewToggle />
      {/* 🟡 Badges */}
      <ProspectTypesButtons
        onSelectType={setTypeFilter}
        selectedType={typeFilter}
      />
      {/* 🧮 | 🗺️ */}
      {ProspectsView}
    </div>
  );
}

// ------------------------------------------
// 🆎 Header
function ProspectsHeader() {
  return <h2 className="font-kanit font-semibold text-4xl">Prospects</h2>;
}
