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
    hoveredHttpStatusRange,
    getHttpStatusRange,
  } = useCrawlDetailsContext();

  const isCategoryUpdating = updatingCategoryPageId === page.id;
  const isAuditToggling = togglingAuditPageId === page.id;
  const isRecentlyToggled = recentlyToggledIds.has(page.id);
  const isFocused = focusedCrawledPageId === page.id;
  const isHovered = hoveredCrawledPageId === page.id;
  const pageHttpStatusRange = getHttpStatusRange(page.httpStatus);
  const isHttpStatusHighlighted =
    hoveredHttpStatusRange !== null &&
    pageHttpStatusRange === hoveredHttpStatusRange;
  const isHighlighted = isFocused || isHovered || isHttpStatusHighlighted;

  // 🔆 Scroll into view when focused
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
        "relative",
        "flex flex-col gap-y-4",
        "rounded-lg",
        "p-4 pb-10",
        "border border-border",
        "bg-sidebar-strong",
        "transition-shadow duration-300",
        isRecentlyToggled && "border-2 border-amber-500 dark:border-amber-400",
        isHighlighted &&
          "shadow-[0_0_20px_4px_oklch(0.7363_0.1697_61.12/0.4)] dark:shadow-3xl dark:shadow-white/10"
      )}
      ref={cardRef}
    >
      {/* 🖼️ Image */}
      {page.screenshotUrl && (
        <LazyImage alt={page.title ?? "Screenshot"} src={page.screenshotUrl} />
      )}

      <div className="flex flex-col gap-y-3">
        <div className="flex items-start justify-between gap-x-4">
          {/* 🔠 Title and link */}
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

          {/* ✅ Select for audit */}
          <ToggleSwitch
            checked={page.selectedForAudit ?? false}
            disabled={isAuditToggling}
            loading={isAuditToggling}
            onChange={handleAuditToggle}
          />
        </div>

        {/* 🔛🟡 Toggle category */}
        <div className="flex items-center gap-x-3">
          <CategoryDropdown
            category={page.category}
            disabled={isCategoryUpdating}
            loading={isCategoryUpdating}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* 📄 Specificities */}
        <div className="mt-2 flex flex-wrap gap-2">
          {page.hasForm && (
            <ContentIndicator
              icon={<FormInputIcon size={14} />}
              label="Formulaire"
            />
          )}
          {page.hasTable && (
            <ContentIndicator icon={<TableIcon size={14} />} label="Tableau" />
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

      {/* 🌐 HTTP Status */}
      <HttpStatusBadge status={page.httpStatus} />
    </li>
  );
}

/* ✅ Select for audit */

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

/* 🔛🟡 Select category */
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

// --------------------------------
// 🌐 HTTP Status Badge

type HttpStatusBadgeProps = {
  status: number | null;
};

function HttpStatusBadge({ status }: HttpStatusBadgeProps) {
  if (status === null) return null;

  const isInfo = status >= 100 && status < 200;
  const isSuccess = status >= 200 && status < 300;
  const isRedirect = status >= 300 && status < 400;
  const isClientError = status >= 400 && status < 500;
  const isServerError = status >= 500;

  return (
    <span
      className={cn(
        "absolute right-3 bottom-3 inline-flex items-center rounded-md px-2 py-0.5 font-medium text-xs",
        isInfo &&
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        isSuccess &&
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        isRedirect &&
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        isClientError &&
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        isServerError &&
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      )}
    >
      {status}
    </span>
  );
}

// --------------------------------
// 🔠 Truncatable title with tooltip

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

// --------------------------------—————————
// 🖼️ Lazy image w/ intersection observer

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
