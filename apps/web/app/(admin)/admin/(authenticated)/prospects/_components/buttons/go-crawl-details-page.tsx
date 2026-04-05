"use client";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function GoCrawlDetailsPageButton({
  crawlId,
}: {
  crawlId: string | null;
}) {
  if (!crawlId) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className="rounded-full bg-transparent p-2 hover:bg-gray-100"
          href={`/admin/crawls/${crawlId}`}
        >
          <ExternalLinkIcon className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>Voir les pages</TooltipContent>
    </Tooltip>
  );
}
