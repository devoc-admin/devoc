"use client";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FormInputIcon,
  KeyIcon,
  LoaderIcon,
  PlayCircleIcon,
  TableIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type CrawledPage, pageCategoryEnum } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import type { PageCategory } from "../crawl-details-actions";
import { useCrawlDetailsContext } from "../crawl-details-context";

type CrawledPageCardProps = {
  page: CrawledPage;
};

export function CrawledPageCard({ page }: CrawledPageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);
  const {
    updateCategoryMutate,
    updatingCategoryPageId,
    toggleAuditMutate,
    togglingAuditPageId,
    recentlyToggledIds,
    markAsRecentlyToggled,
    focusedCrawledPageId,
    hoveredCrawledPageId,
  } = useCrawlDetailsContext();

  const isCategoryUpdating = updatingCategoryPageId === page.id;
  const isAuditToggling = togglingAuditPageId === page.id;
  const isRecentlyToggled = recentlyToggledIds.has(page.id);
  const isFocused = focusedCrawledPageId === page.id;
  const isHovered = hoveredCrawledPageId === page.id;
  const isHighlighted = isFocused || isHovered;

  // Scroll into view when focused
  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isFocused]);

  function handleCategoryChange(category: string) {
    updateCategoryMutate({
      category: category as PageCategory,
      crawledPageId: page.id,
    });
  }

  function handleAuditToggle() {
    markAsRecentlyToggled(page.id);
    toggleAuditMutate({
      crawledPageId: page.id,
      selected: !page.selectedForAudit,
    });
  }

  return (
    <li
      className={cn(
        "flex flex-col gap-y-4 rounded-lg border bg-sidebar-strong p-4 transition-shadow duration-300",
        isRecentlyToggled
          ? "border-2 border-amber-500 dark:border-amber-400"
          : "border-border",
        isHighlighted &&
          "shadow-[0_0_20px_4px_oklch(0.7363_0.1697_61.12_/_0.4)]"
      )}
      ref={cardRef}
    >
      {page.screenshotUrl && (
        <LazyImage alt={page.title ?? "Screenshot"} src={page.screenshotUrl} />
      )}

      <div className="flex flex-col gap-y-3">
        <div className="flex items-start justify-between gap-x-4">
          <div className="min-w-0 flex-1">
            <TruncatableTitle title={page.title || "Sans titre"} />
            <a
              className="flex items-center gap-x-1 text-muted-foreground text-sm hover:underline"
              href={page.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="truncate">{page.url}</span>
              <ExternalLinkIcon className="shrink-0" size={12} />
            </a>
          </div>

          <ToggleSwitch
            checked={page.selectedForAudit ?? false}
            disabled={isAuditToggling}
            loading={isAuditToggling}
            onChange={handleAuditToggle}
          />
        </div>

        <div className="flex items-center gap-x-3">
          <CategoryDropdown
            category={page.category}
            disabled={isCategoryUpdating}
            loading={isCategoryUpdating}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <button
          className="flex items-center gap-x-1 text-muted-foreground text-sm hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          <ChevronDownIcon
            className={cn("transition-transform", isExpanded && "rotate-180")}
            size={16}
          />
          <span>{isExpanded ? "Masquer" : "Voir"} les détails</span>
        </button>

        {isExpanded && (
          <div className="rounded-md bg-sidebar p-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">
                Profondeur:{" "}
                <span className="text-foreground">{page.depth}</span>
              </span>
              <span className="text-muted-foreground">
                HTTP: <HttpStatusBadge status={page.httpStatus} />
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {page.hasForm && (
                <ContentIndicator
                  icon={<FormInputIcon size={14} />}
                  label="Formulaire"
                />
              )}
              {page.hasTable && (
                <ContentIndicator
                  icon={<TableIcon size={14} />}
                  label="Tableau"
                />
              )}
              {page.hasMultimedia && (
                <ContentIndicator
                  icon={<PlayCircleIcon size={14} />}
                  label="Multimédia"
                />
              )}
              {page.hasDocuments && (
                <ContentIndicator
                  icon={<FileTextIcon size={14} />}
                  label="Documents"
                />
              )}
              {page.hasAuthentication && (
                <ContentIndicator icon={<KeyIcon size={14} />} label="Auth" />
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange: () => void;
}

function ToggleSwitch({
  checked,
  disabled,
  loading,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input"
      )}
      disabled={disabled}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span
        className={cn(
          "pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      >
        {loading && (
          <LoaderIcon className="size-3 animate-spin text-muted-foreground" />
        )}
      </span>
    </button>
  );
}

type CategoryDropdownProps = {
  category: PageCategory;
  disabled?: boolean;
  loading?: boolean;
  onCategoryChange: (category: string) => void;
};

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

const PAGE_CATEGORIES = pageCategoryEnum.enumValues;

function CategoryDropdown({
  category,
  disabled,
  loading,
  onCategoryChange,
}: CategoryDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 gap-x-2"
          disabled={disabled}
          size="sm"
          variant="outline"
        >
          {loading && <LoaderIcon className="size-3 animate-spin" />}
          <span>{CATEGORY_LABELS[category]}</span>
          <ChevronDownIcon size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-64">
        <DropdownMenuRadioGroup
          onValueChange={onCategoryChange}
          value={category}
        >
          {PAGE_CATEGORIES.map((cat) => (
            <DropdownMenuRadioItem key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ContentIndicatorProps = {
  icon: React.ReactNode;
  label: string;
};

function ContentIndicator({ icon, label }: ContentIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-accent px-2 py-0.5 text-accent-foreground text-xs">
      {icon}
      {label}
    </span>
  );
}

type HttpStatusBadgeProps = {
  status: number | null;
};

function HttpStatusBadge({ status }: HttpStatusBadgeProps) {
  if (status === null)
    return <span className="text-muted-foreground">N/A</span>;

  const isSuccess = status >= 200 && status < 300;
  const isRedirect = status >= 300 && status < 400;
  const isError = status >= 400;

  return (
    <span
      className={cn(
        "font-medium",
        isSuccess && "text-green-600 dark:text-green-400",
        isRedirect && "text-yellow-600 dark:text-yellow-400",
        isError && "text-red-600 dark:text-red-400"
      )}
    >
      {status}
    </span>
  );
}

// --------------------------------
// Truncatable title with tooltip

type TruncatableTitleProps = {
  title: string;
};

function TruncatableTitle({ title }: TruncatableTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      const element = titleRef.current;
      if (element) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();

    // Re-check on resize
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  const titleElement = (
    <h3 className="truncate font-kanit font-medium text-lg" ref={titleRef}>
      {title}
    </h3>
  );

  if (!isTruncated) {
    return titleElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{titleElement}</TooltipTrigger>
      <TooltipContent className="max-w-sm">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// --------------------------------
// Lazy image with intersection observer

type LazyImageProps = {
  alt: string;
  src: string;
};

function LazyImage({ alt, src }: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading slightly before entering viewport
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-md bg-sidebar"
      ref={containerRef}
    >
      {isInView ? (
        <Image
          alt={alt}
          className="object-cover object-top"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          src={src}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="size-8 animate-pulse rounded-full bg-muted" />
        </div>
      )}
    </div>
  );
}
