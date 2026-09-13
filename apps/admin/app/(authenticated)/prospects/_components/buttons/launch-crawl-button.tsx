"use client";
import { LoaderIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Crawl } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";
export function LaunchCrawlButton({
  crawlId,
  crawlStatus,
  prospectId,
  website,
}: {
  crawlId: string | null;
  crawlStatus: Crawl["status"] | null;
  prospectId: number;
  website: string | null;
}) {
  const { launchCrawlMutate, isLaunchingCrawl, launchingCrawlProspectId } =
    useProspectsContext();
  const isLaunchingThisProspect =
    isLaunchingCrawl && launchingCrawlProspectId === prospectId;

  function handleLaunchCrawl() {
    if (!website) return;
    launchCrawlMutate({ prospectId, website });
  }

  const canReplay =
    crawlStatus === "completed" ||
    crawlStatus === "failed" ||
    crawlStatus === "cancelled";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "cursor-pointer rounded-full bg-transparent p-2",
            crawlId
              ? "text-amber-600 hover:bg-amber-50"
              : "text-green-600 hover:bg-green-50"
          )}
          disabled={isLaunchingThisProspect}
          onClick={handleLaunchCrawl}
          type="button"
        >
          <ActionButtonIcon
            canReplay={canReplay}
            isLoading={isLaunchingThisProspect}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {canReplay ? "Rejouer l'exploration" : "Lancer une exploration"}
      </TooltipContent>
    </Tooltip>
  );
}

function ActionButtonIcon({
  isLoading,
  canReplay,
}: {
  isLoading: boolean;
  canReplay: boolean;
}) {
  if (isLoading) {
    return <LoaderIcon className="size-4 animate-spin" />;
  }
  if (canReplay) {
    return <RotateCcwIcon className="size-4" />;
  }
  return <PlayIcon className="size-4" />;
}
