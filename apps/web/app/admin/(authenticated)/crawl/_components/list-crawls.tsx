"use client";
import {
  ApertureIcon,
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileCheckCornerIcon,
  FileCheckIcon,
  ImageOffIcon,
  LoaderIcon,
  Trash2Icon,
  UserRoundPenIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { CrawlResult } from "../crawl-actions";
import { useCrawlContext } from "../crawl-context";

export function ListCrawls() {
  return (
    <div className="rounded-md bg-sidebar p-8">
      <h2 className="mb-8 text-center font-kanit font-semibold text-4xl">
        Derniers crawls
      </h2>
      {<CrawlsCards />}
    </div>
  );
}

// -----------------------------------------------------------
function CrawlsCards() {
  const { crawls, crawlsAreLoading } = useCrawlContext();
  const noCrawls = crawls && crawls.length === 0;

  if (!(noCrawls || crawlsAreLoading)) return <NoCrawlFound />;

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-10">
      {crawlsAreLoading ? (
        <>
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
          <CrawlCardSkeleton />
        </>
      ) : (
        crawls?.map(CrawlCard)
      )}
    </ul>
  );
}

function CrawlCard(crawl: CrawlResult) {
  return (
    <li
      className="flex flex-col gap-y-6 rounded-md border border-border bg-sidebar-strong p-4"
      key={crawl.id}
    >
      <div>
        <h3 className="now max-w-full truncate font-kanit text-xl">
          {crawl.title}
        </h3>
        {/* 🌐 Website */}
        <a
          className="flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={crawl.url}
          target="_blank"
        >
          <span className="truncate">{crawl.url}</span>
          <ExternalLinkIcon className="shrink-0" size={16} />
        </a>
        {/* Details */}
        <div className="mt-2 space-y-0.5">
          {/* 🗓️ Started */}
          <div className="flex items-center gap-x-1 text-sm">
            <CalendarIcon size={14} />
            <span>{formatDate(crawl.createdAt)}</span>
          </div>
          {/* 🔢 Crawled */}
          <div className="flex items-center gap-x-1 text-sm">
            <FileCheckCornerIcon size={14} />
            <span>{crawl.pagesCrawled} pages crawlées</span>
          </div>
          {/* ⏳ Duration */}
          <div className="flex items-center gap-x-1 text-sm">
            <ClockIcon size={14} />
            <span>
              {formatDurationInMinutesAndSeconds(
                crawl.startedAt,
                crawl.completedAt
              )}
            </span>
          </div>
          {/*🙋 Author */}
          {(crawl.author || crawl.authorUrl) && (
            <div className="flex items-center gap-x-1 text-sm">
              <UserRoundPenIcon size={14} />
              <Tooltip>
                <TooltipTrigger className="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                  {crawl.author}
                </TooltipTrigger>
                <TooltipContent>{crawl.author}</TooltipContent>
              </Tooltip>
              {crawl.authorUrl && (
                <a
                  className="text-blue-500 underline dark:text-blue-500"
                  href={crawl.authorUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  (site)
                </a>
              )}
            </div>
          )}
          {/* 📸 Skip screenshots ? */}
          <div className="flex items-center gap-x-1 text-sm">
            {crawl.skipScreenshots ? (
              <XIcon className="text-red-500 dark:text-red-500" size={16} />
            ) : (
              <ApertureIcon size={15} />
            )}
            <span>
              {crawl.skipScreenshots
                ? "Pas de captures écran"
                : "Captures écran"}
            </span>
          </div>
          {/* 🖼️ Skip resources ? */}
          <div className="flex items-center gap-x-1 text-sm">
            {crawl.skipResources ? (
              <XIcon className="text-red-500 dark:text-red-500" size={16} />
            ) : (
              <FileCheckIcon size={16} />
            )}
            <span>
              {crawl.skipResources
                ? "Ressources ignorées"
                : "Ressources chargées"}
            </span>
          </div>
        </div>
      </div>
      {/* 🖼️ Cover */}
      <div className="group relative mt-auto w-fit">
        {crawl.screenshotUrl ? (
          <Image
            alt="Screenshot"
            className="rounded-md shadow-md"
            height={225}
            src={crawl.screenshotUrl}
            width={400}
          />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute right-2 bottom-2 flex gap-x-2">
          <SeeCrawlButton crawlId={crawl.id} />
          <DeleteCrawlButton crawlId={crawl.id} />
        </div>
      </div>
      {/* 🆕 Button */}
      <Link
        className="rounded-md bg-primary py-3 text-center font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        href={`/admin/crawl/${crawl.id}`}
      >
        Voir le crawl
      </Link>
    </li>
  );
}

function CrawlCardSkeleton() {
  return <Skeleton className="h-84.5 w-119 rounded-md" />;
}

function NoCrawlFound() {
  return (
    <p className="text-center text-muted-foreground">Aucun crawl trouvé</p>
  );
}

function ImagePlaceholder() {
  return (
    <div className="flex h-56.25 w-100 items-center justify-center rounded-md bg-muted shadow-md">
      <ImageOffIcon
        className="size-12 text-muted-foreground"
        strokeWidth={1.5}
      />
    </div>
  );
}

// ------------------------------------------------------------
// 🚮 Delete crawl
function DeleteCrawlButton({ crawlId }: { crawlId: number }) {
  const { crawlDeletionIsPending, deleteCrawlMutate, deletingCrawlId } =
    useCrawlContext();

  const isPending = crawlDeletionIsPending && deletingCrawlId === crawlId;
  const otherCrawlDeletionIsPending =
    crawlDeletionIsPending && deletingCrawlId !== crawlId;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "rounded-full p-2 opacity-0 transition-opacity",
            "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-50",
            !otherCrawlDeletionIsPending &&
              "group-hover:cursor-pointer group-hover:opacity-100",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isPending && "block"
          )}
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteCrawlMutate(crawlId);
          }}
          type="button"
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" size={16} strokeWidth={2} />
          ) : (
            <Trash2Icon size={16} strokeWidth={2} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>Supprimer ce crawl</TooltipContent>
    </Tooltip>
  );
}

// ------------------------------------------------------------
// 👁️ See crawl
function SeeCrawlButton({ crawlId }: { crawlId: number }) {
  const { crawlDeletionIsPending, deletingCrawlId } = useCrawlContext();

  const actionPending = crawlDeletionIsPending && deletingCrawlId === crawlId;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            "rounded-full p-2 opacity-0 transition-opacity",
            "bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-50",
            "group-hover:cursor-pointer group-hover:opacity-100",
            actionPending && "pointer-events-none opacity-50"
          )}
          href={`/admin/crawl/${crawlId}`}
          type="button"
        >
          <EyeIcon size={17} strokeWidth={2} />
        </Link>
      </TooltipTrigger>
      <TooltipContent>Voir ce crawl</TooltipContent>
    </Tooltip>
  );
}

// ------------------------------------------------------------
function formatDate(date: string | null) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}

// ------------------------------------------------------------
function formatDurationInMinutesAndSeconds(
  startedAtString: string | null,
  completedAtString: string | null
) {
  if (!(startedAtString && completedAtString)) return "N/A";

  const startedAt = new Date(startedAtString);
  const completedAt = new Date(completedAtString);

  const duration = completedAt.getTime() - startedAt.getTime();
  const minutes = Math.floor(duration / (60 * 1000));
  const seconds = Math.floor((duration % (60 * 1000)) / 1000);

  let minutesPart = `${minutes}m`;
  if (minutes === 0) minutesPart = "";

  let secondsPart = `${seconds}s`;
  if (seconds === 0 && minutes >= 1) secondsPart = "";

  if (minutesPart && secondsPart) return minutesPart + secondsPart;
  if (minutesPart && !secondsPart) return minutesPart;
  if (!minutesPart && secondsPart) return secondsPart;
}
