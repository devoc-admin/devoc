"use client";
import { AppWindowIcon, UserRoundPenIcon } from "lucide-react";
import { useCrawlCardContext } from "../../crawl-card-context";

export function AuthorSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Prestataire
      </h4>
      <div className="space-y-1">
        {/*🙋 Author */}
        <div className="flex items-center gap-x-2 text-sm">
          <UserRoundPenIcon
            className="shrink-0 text-muted-foreground"
            size={14}
          />
          <span className="text-muted-foreground">Nom:</span>
          <span
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            title={crawl?.author ?? undefined}
          >
            {crawl?.author ?? "—"}
          </span>
        </div>
        {/* 🌐 Website */}
        <div className="flex items-center gap-x-2 text-sm">
          <AppWindowIcon className="shrink-0 text-muted-foreground" size={14} />
          <span className="text-muted-foreground">Site:</span>
          <a
            href={crawl?.authorUrl ?? undefined}
            rel="noopener noreferrer"
            target="_blank"
          >
            {crawl?.authorUrl ?? "—"}
          </a>
        </div>
      </div>
    </div>
  );
}
