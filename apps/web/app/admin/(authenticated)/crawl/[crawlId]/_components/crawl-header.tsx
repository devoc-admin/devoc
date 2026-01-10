"use client";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  ExternalLinkIcon,
  FileCheckIcon,
  LayersIcon,
  ListChecksIcon,
  XIcon,
} from "lucide-react";
import { useMemo } from "react";
import type { PageCategory } from "../crawl-details-actions";
import { useCrawlDetailsContext } from "../crawl-details-context";

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

export function CrawlHeader() {
  const { crawlDetails, selectedPages, focusCrawledPage, hoverCrawledPage } =
    useCrawlDetailsContext();

  // Compute which categories have at least one selected page and map to first page ID
  const categoryToPageId = useMemo(() => {
    const mapping = new Map<PageCategory, string>();
    for (const page of selectedPages) {
      if (!mapping.has(page.category)) {
        mapping.set(page.category, page.id);
      }
    }
    return mapping;
  }, [selectedPages]);

  function handleCategoryClick(category: PageCategory) {
    const pageId = categoryToPageId.get(category);
    if (pageId) {
      focusCrawledPage(pageId);
    }
  }

  function handleCategoryHover(category: PageCategory | null) {
    if (category === null) {
      hoverCrawledPage(null);
    } else {
      const pageId = categoryToPageId.get(category);
      hoverCrawledPage(pageId ?? null);
    }
  }

  if (!crawlDetails) return null;

  const { crawl } = crawlDetails;

  return (
    <div className="rounded-lg bg-sidebar p-6">
      <div className="mb-6">
        <h1 className="font-kanit font-semibold text-3xl">Détails du crawl</h1>
        <a
          className="mt-1 flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={crawl.crawlUrl ?? ""}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="truncate">{crawl.crawlUrl}</span>
          <ExternalLinkIcon className="shrink-0" size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
          label="Pages crawlées"
          value={crawl.pagesCrawled ?? 0}
        />
        <StatCard
          icon={<ListChecksIcon size={18} />}
          label="Sélectionnées"
          value={selectedPages.length}
        />
        <StatCard
          icon={<LayersIcon size={18} />}
          label="Profondeur max"
          value={crawl.maxDepth ?? 0}
        />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-kanit font-medium text-lg">
          Catégories pour l'audit
        </h2>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => {
            const isCovered = categoryToPageId.has(category);
            return (
              <CategoryIndicator
                isCovered={isCovered}
                key={category}
                label={CATEGORY_LABELS[category]}
                onClick={
                  isCovered ? () => handleCategoryClick(category) : undefined
                }
                onMouseEnter={
                  isCovered ? () => handleCategoryHover(category) : undefined
                }
                onMouseLeave={
                  isCovered ? () => handleCategoryHover(null) : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --------------------------------
// ✅ Category indicator

interface CategoryIndicatorProps {
  label: string;
  isCovered: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function CategoryIndicator({
  label,
  isCovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CategoryIndicatorProps) {
  const baseClasses =
    "inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-sm transition-all";
  const colorClasses = isCovered
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-green-500/50 dark:hover:ring-green-400/50"
    : "";

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

  if (onClick) {
    return (
      <button
        className={`${baseClasses} ${colorClasses} ${interactiveClasses}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
      >
        {content}
      </button>
    );
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{content}</span>;
}

// --------------------------------
// 🃏 Stat card

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-md bg-sidebar-strong p-4">
      <div className="mb-2 flex items-center gap-x-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="font-kanit font-semibold text-2xl">{value}</p>
    </div>
  );
}

// --------------------------------
// Duration formatter

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
