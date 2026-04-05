"use client";
import { LoaderIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrawlsContext } from "../../../../crawls-context";
import { useCrawlCardContext } from "../../crawl-card-context";

export function RetryCrawlButton() {
  const {
    retryCrawlIsPending,
    retryCrawlMutate,
    retryingCrawlId,
    lockActions,
  } = useCrawlsContext();
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  const isPending = retryCrawlIsPending && retryingCrawlId === crawl.id;

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-x-2",
        "basis-1/3",
        "py-3",
        "rounded-md",
        "h-11",
        "bg-slate-600 hover:bg-slate-500 dark:bg-slate-600/60",
        "cursor-pointer",
        "text-center font-semibold text-sm",
        "text-primary-foreground dark:text-white",
        "transition-colors",
        lockActions && "cursor-not-allowed opacity-50"
      )}
      disabled={lockActions}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        retryCrawlMutate(crawl.id);
      }}
      type="button"
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" size={16} strokeWidth={2} />
      ) : (
        <RotateCcwIcon size={16} strokeWidth={2} />
      )}
      <span>Relancer</span>
    </button>
  );
}
