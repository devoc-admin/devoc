"use client";
import {
  ExternalLinkIcon,
  EyeIcon,
  LoaderIcon,
  Trash2Icon,
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
  if (!(crawls || crawlsAreLoading)) return <NoCrawlFound />;

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-10 space-y-8">
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
    <li className="space-y-6" key={crawl.id}>
      <div>
        <h3 className="font-kanit text-xl">{crawl.title}</h3>
        <a
          className="flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={crawl.url}
          target="_blank"
        >
          <span>{crawl.url}</span>
          <ExternalLinkIcon size={16} />
        </a>
      </div>
      {crawl.screenshotUrl && (
        <div className="group relative w-fit">
          <Image
            alt="Screenshot"
            className="rounded-md shadow-md"
            height={200}
            src={crawl.screenshotUrl}
            width={300}
          />
          <div className="absolute right-2 bottom-2 flex gap-x-2">
            <SeeCrawlButton crawlId={crawl.id} />
            <DeleteCrawlButton crawlId={crawl.id} />
          </div>
        </div>
      )}
    </li>
  );
}

function CrawlCardSkeleton() {
  return <Skeleton className="h-[250px] w-[350px] rounded-md" />;
}

function NoCrawlFound() {
  return (
    <p className="text-center text-muted-foreground">Aucun crawl trouvé</p>
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
            "hidden cursor-pointer rounded-full p-2 transition-opacity",
            "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-50",
            !otherCrawlDeletionIsPending && "group-hover:block",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isPending && "block"
          )}
          disabled={isPending}
          onClick={() => deleteCrawlMutate(crawlId)}
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
            "hidden cursor-pointer rounded-full p-2 transition-opacity",
            "bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-50",
            "group-hover:block",
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
