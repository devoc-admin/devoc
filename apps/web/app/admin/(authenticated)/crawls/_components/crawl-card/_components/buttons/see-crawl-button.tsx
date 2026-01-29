"use client";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCrawlCardContext } from "../../crawl-card-context";

export function SeeCrawlButton() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  return (
    <Link
      className={cn(
        "flex basis-1/3 items-center justify-center gap-x-2",
        "h-11",
        "py-3",
        "bg-primary hover:bg-primary/90",
        "transition-colors",
        "rounded-md",
        "text-center font-semibold text-primary-foreground text-sm"
      )}
      href={`/admin/crawl/${crawl.id}`}
    >
      <EyeIcon size={18} strokeWidth={2} />
      <span>Voir</span>
    </Link>
  );
}
