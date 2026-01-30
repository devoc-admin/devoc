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
      <p className="text-center text-muted-foreground">
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
    <div className="space-y-6 rounded-md bg-sidebar p-8">
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
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <input
        className={cn(
          "h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10",
          "text-sm placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        onChange={(e) => handleSearchAudit(e.target.value)}
        placeholder="Rechercher par nom ou URL..."
        type="text"
        value={searchAudit}
      />
      {searchAudit && (
        <button
          aria-label="Effacer la recherche"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
  const { typeFilter, handleTypeFilter } = useAuditsContext();

  return (
    <div className="flex gap-x-2">
      <TypeFilterButton
        active={typeFilter === null}
        onClick={() => handleTypeFilter(null)}
      >
        Tous
      </TypeFilterButton>
      <TypeFilterButton
        active={typeFilter === "rgaa"}
        onClick={() => handleTypeFilter("rgaa")}
      >
        RGAA
      </TypeFilterButton>
      <TypeFilterButton
        active={typeFilter === "wcag"}
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
        "font-medium text-sm",
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
    <div className="flex h-full items-center justify-center rounded-md bg-sidebar p-8">
      <p className="text-center text-muted-foreground">
        Aucun audit trouvé. Créez votre premier audit !
      </p>
    </div>
  );
}
