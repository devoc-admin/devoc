"use client";
import { CalendarIcon, FileCheckIcon } from "lucide-react";
import { useCrawlCardContext } from "../crawl-card-context";

export function CrawlCardDetails() {
  const { crawl } = useCrawlCardContext();

  if (!crawl) return null;
  return (
    <div className="mt-4 grid grid-cols-2 space-y-1">
      {/* 🗓️ Started */}
      <div className="flex items-center gap-x-1 text-sm">
        <CalendarIcon size={14} />
        <span>{formatDate(crawl.createdAt)}</span>
      </div>
      {/* 🔢 Crawled */}
      <div className="flex items-center gap-x-1 text-sm">
        <FileCheckIcon size={14} />
        <span>{crawl.pagesCrawled} pages analysées</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 🖊️ Formatters
function formatDate(date: string | null) {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
