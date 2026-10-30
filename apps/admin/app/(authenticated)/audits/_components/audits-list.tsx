"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuditsContext } from "../audits-context";
import { AuditCard, AuditCardSkeleton } from "./audit-card/audit-card";

export function AuditsCards() {
  const { audits, auditsAreLoading } = useAuditsContext();

  const noAudits = audits && audits.length === 0;
  if (noAudits && !auditsAreLoading) return <NoAuditFound />;

  // 👀 No results
  const AuditCards =
    audits && audits.length === 0 ? (
      <p className="text-muted-foreground text-center">
        Aucun audit ne correspond à votre recherche
      </p>
    ) : (
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-4">
        {audits?.map((audit) => (
          <AuditCard {...audit} key={audit.id} />
        ))}
      </ul>
    );

  return (
    <div className="bg-sidebar space-y-6 rounded-md p-8">
      {/* 🔍 Search bar & filters */}
      <div className="flex flex-wrap items-center gap-4">
        <SearchAudits />
        <TypeFilter />
      </div>

      {/* 📝 Results */}
      {auditsAreLoading ? (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-4">
          <AuditCardSkeleton />
          <AuditCardSkeleton />
          <AuditCardSkeleton />
          <AuditCardSkeleton />
        </ul>
      ) : (
        AuditCards
      )}
    </div>
  );
}

// --------------------------------
// 🔍 Search audits
function SearchAudits() {
  const { searchAudit, handleSearchAudit } = useAuditsContext();

  return (
    <div className="relative max-w-125 grow">
      <SearchIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        size={18}
      />
      <input
        className={cn(
          "border-input bg-sidebar-strong h-10 w-full rounded-md border pr-10 pl-10",
          "placeholder:text-muted-foreground text-sm",
          "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none"
        )}
        onChange={(e) => handleSearchAudit(e.target.value)}
        placeholder="Rechercher par nom ou URL..."
        type="text"
        value={searchAudit}
      />
      {searchAudit && (
        <button
          aria-label="Effacer la recherche"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => handleSearchAudit("")}
          type="button"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>
  );
}

// --------------------------------
// 🏷️ Type filter
function TypeFilter() {
  const { selectedTypeProspect, handleTypeFilter } = useAuditsContext();

  return (
    <div className="flex gap-x-2">
      <TypeFilterButton
        active={selectedTypeProspect === null}
        onClick={() => handleTypeFilter(null)}
      >
        Tous
      </TypeFilterButton>
      <TypeFilterButton
        active={selectedTypeProspect === "rgaa"}
        onClick={() => handleTypeFilter("rgaa")}
      >
        RGAA
      </TypeFilterButton>
      <TypeFilterButton
        active={selectedTypeProspect === "wcag"}
        onClick={() => handleTypeFilter("wcag")}
      >
        WCAG
      </TypeFilterButton>
    </div>
  );
}

function TypeFilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "rounded-md px-3 py-1.5",
        "text-sm font-medium",
        "transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-sidebar-strong text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

// --------------------------------
// 🧌 No audit found
function NoAuditFound() {
  return (
    <div className="bg-sidebar flex h-full items-center justify-center rounded-md p-8">
      <p className="text-muted-foreground text-center">
        Aucun audit trouvé. Créez votre premier audit !
      </p>
    </div>
  );
}
