"use client";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  ExternalLinkIcon,
  FileCheckIcon,
  LayersIcon,
  ListChecksIcon,
  RotateCcwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PageCategory } from "../crawl-details-actions";
import {
  type HttpStatusRange,
  useCrawlDetailsContext,
} from "../crawl-details-context";

const CATEGORY_LABELS: Record<PageCategory, string> = {
  accessibility: "Accessibilité",
  authentication: "Authentification",
  contact: "Contact",
  distinct_layout: "Mise en page distincte",
  document: "Document",
  form: "Formulaire",
  help: "Aide",
  homepage: "Page d'accueil",
  legal_notices: "Mentions légales",
  multi_step_process: "Processus multi-étapes",
  multimedia: "Multimédia",
  other: "Autre",
  sitemap: "Plan du site",
  table: "Tableau",
};

const ALL_CATEGORIES: PageCategory[] = [
  "homepage",
  "contact",
  "legal_notices",
  "accessibility",
  "sitemap",
  "help",
  "authentication",
  "form",
  "table",
  "multimedia",
  "document",
  "multi_step_process",
  "distinct_layout",
  "other",
];

const ALL_HTTP_STATUS_RANGES: HttpStatusRange[] = [
  "1xx",
  "2xx",
  "3xx",
  "4xx",
  "5xx",
];

const HTTP_STATUS_LABELS: Record<HttpStatusRange, string> = {
  "1xx": "1xx Info",
  "2xx": "2xx Succès",
  "3xx": "3xx Redirect",
  "4xx": "4xx Erreur client",
  "5xx": "5xx Erreur serveur",
};

export function CrawlDetailsSidebar() {
  const {
    crawlDetails,
    selectedPages,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    selectedHttpStatusFilter,
    hoveredHttpStatusRange,
    setHoveredHttpStatusRange,
    coveredCategories,
    handleHttpStatusClick,
    handleCategoryClick,
    httpStatusCounts,
    hasActiveFilters,
    handleResetFilters,
  } = useCrawlDetailsContext();

  if (!crawlDetails) return null;

  const { crawl } = crawlDetails;

  return (
    <div className="rounded-lg bg-sidebar p-6">
      <div className="mb-6">
        <h1 className="font-kanit font-semibold text-3xl">Détail du crawl</h1>
        <a
          className="mt-1 flex items-center gap-x-2 text-muted-foreground underline hover:underline"
          href={crawl.crawlUrl ?? ""}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="truncate">{crawl.crawlUrl}</span>
          <ExternalLinkIcon className="shrink-0" size={16} />
        </a>
      </div>

      <div className="relative mb-6 max-w-[700px]">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          className="h-10 w-full rounded-md border border-input bg-sidebar-strong pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par titre, URL, catégorie ou statut HTTP..."
          type="text"
          value={searchQuery}
        />
        {searchQuery && (
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
            type="button"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        <StatCard
          icon={<CalendarIcon size={18} />}
          label="Date"
          value={formatDate(crawl.crawlCreatedAt)}
        />
        <StatCard
          icon={<ClockIcon size={18} />}
          label="Durée"
          value={formatDuration(crawl.startedAt, crawl.completedAt)}
        />
        <StatCard
          icon={<FileCheckIcon size={18} />}
          label="Pages analysées"
          value={crawl.pagesCrawled ?? 0}
        />
        <StatCard
          icon={<ListChecksIcon size={18} />}
          label="Sélectionnées"
          value={selectedPages.length}
        />
        <StatCard
          icon={<LayersIcon size={18} />}
          label="Max. profondeur"
          value={crawl.maxDepth ?? 0}
        />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-kanit font-medium text-lg">
          Catégories pour l'audit
        </h2>
        <div className="flex flex-wrap gap-3">
          {ALL_CATEGORIES.map((category) => {
            const isCovered = coveredCategories.has(category);
            const isActive = selectedCategoryFilter === category;
            return (
              <CategoryIndicator
                isActive={isActive}
                isCovered={isCovered}
                key={category}
                label={CATEGORY_LABELS[category]}
                onClick={
                  isCovered ? () => handleCategoryClick(category) : undefined
                }
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-kanit font-medium text-lg">Statuts HTTP</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_HTTP_STATUS_RANGES.map((range) => {
            const count = httpStatusCounts[range];
            const hasPages = count > 0;
            const isActive = selectedHttpStatusFilter === range;
            const isHovered = hoveredHttpStatusRange === range;
            return (
              <HttpStatusIndicator
                count={count}
                isActive={isActive}
                isHovered={isHovered}
                key={range}
                label={HTTP_STATUS_LABELS[range]}
                onClick={
                  hasPages ? () => handleHttpStatusClick(range) : undefined
                }
                onMouseEnter={
                  hasPages ? () => setHoveredHttpStatusRange(range) : undefined
                }
                onMouseLeave={() => setHoveredHttpStatusRange(null)}
                range={range}
              />
            );
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-6">
          <button
            className={cn(
              "inline-flex items-center gap-x-2",
              "rounded-md",
              "bg-muted",
              "text-foreground",
              "px-3 py-2",
              "cursor-pointer",
              "text-sm"
            )}
            onClick={handleResetFilters}
            type="button"
          >
            <RotateCcwIcon size={16} />
            Réinitialiser les filtres
          </button>
        </div>
      )}

      <BackCrawlListButton />
    </div>
  );
}

// --------------------------------
// 🟡 Category

function CategoryIndicator({
  label,
  isCovered,
  isActive,
  onClick,
}: CategoryIndicatorProps) {
  const content = (
    <>
      {isCovered ? (
        <CheckIcon className="shrink-0" size={14} />
      ) : (
        <XIcon className="shrink-0" size={14} />
      )}
      {label}
    </>
  );

  // ✅
  if (onClick) {
    return (
      <button
        className={cn(
          "inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-sm transition-all",
          "cursor-pointer",
          "hover:ring-2 hover:ring-green-500/50 hover:ring-offset-2 dark:hover:ring-green-400/50",
          "focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-green-400/50",
          "focus-visible:outline-none",
          !isCovered &&
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          isCovered &&
            isActive &&
            "bg-primary text-primary-foreground hover:ring-primary",
          isCovered &&
            !isActive &&
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
        )}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  // 🚫
  return (
    <span
      className={cn(
        "inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-sm transition-all",
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      )}
    >
      {content}
    </span>
  );
}

type CategoryIndicatorProps = {
  label: string;
  isCovered: boolean;
  isActive: boolean;
  onClick?: () => void;
};

// --------------------------------
// 🌐 HTTP Status indicator

type HttpStatusIndicatorProps = {
  range: HttpStatusRange;
  label: string;
  count: number;
  isActive: boolean;
  isHovered: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const HTTP_STATUS_COLORS: Record<
  HttpStatusRange,
  { base: string; active: string }
> = {
  "1xx": {
    active: "bg-blue-500 text-white ring-blue-500",
    base: "bg-blue-100 text-blue-700 ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "2xx": {
    active: "bg-green-500 text-white ring-green-500",
    base: "bg-green-100 text-green-700 dark:bg-green-900/30 ring-green-500 dark:text-green-400",
  },
  "3xx": {
    active: "bg-yellow-500 text-white ring-yellow-500",
    base: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  "4xx": {
    active: "bg-orange-500 text-white  ring-orange-500",
    base: "bg-orange-100 text-orange-700 ring-orange-500 dark:bg-orange-900/30 dark:text-orange-400",
  },
  "5xx": {
    active: "bg-red-500 text-white ring-red-500",
    base: "bg-red-100 text-red-700 ring-red-500 dark:bg-red-900/30 dark:text-red-400",
  },
};

function HttpStatusIndicator({
  range,
  label,
  count,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: HttpStatusIndicatorProps) {
  const hasPages = count > 0;
  const colors = HTTP_STATUS_COLORS[range];

  const isDisabled = !(isActive || hasPages);
  const isClickable = !!onClick;
  return (
    <button
      className={cn(
        "inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-sm transition-all",
        isDisabled && "bg-muted text-muted-foreground opacity-50",
        isActive && hasPages && colors.active,
        isActive && hasPages && "ring-2 ring-offset-2",
        !isActive && hasPages && colors.base,
        isClickable && "cursor-pointer",
        isClickable && "hover:ring-2 hover:ring-offset-2",
        isClickable && "focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:outline-none"
      )}
      disabled={!hasPages}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      {/* 🔤 2XX */}
      <span>{label}</span>
      {/* 🔢 Count */}
      <span
        className={cn(
          "ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs",
          isActive && !hasPages && "bg-white/20 text-inherit",
          isActive && hasPages && "bg-black/10 dark:bg-white/10",
          !(isActive || hasPages) && "hidden"
        )}
      >
        {count}
      </span>
    </button>
  );
}

// --------------------------------
// 🃏 Stat card

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-md bg-sidebar-strong p-4">
      <div className="mb-2 flex items-center gap-x-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="font-kanit font-semibold text-xl">{value}</p>
    </div>
  );
}

// --------------------------------
// 🔙 Back to crawl list
function BackCrawlListButton() {
  return (
    <div className="mt-12">
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
        href="/admin/crawl"
      >
        <ArrowLeftIcon size={16} />
        Retour
      </Link>
    </div>
  );
}

// --------------------------------
// ⏳ Duration formatter

function formatDuration(
  startedAt: string | null,
  completedAt: string | null
): string {
  if (!(startedAt && completedAt)) return "N/A";

  const start = new Date(startedAt);
  const end = new Date(completedAt);
  const duration = end.getTime() - start.getTime();

  const minutes = Math.floor(duration / (60 * 1000));
  const seconds = Math.floor((duration % (60 * 1000)) / 1000);

  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

function formatDate(date: string | null): string {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
