"use client";
import { BanIcon, LoaderIcon } from "lucide-react";
import type { Crawl } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

type CrawlStatusCellProps = {
  crawlStatus: Crawl["status"] | null;
  website: string | null;
};

const CRAWL_STATUS_CONFIG: Record<
  Crawl["status"],
  { label: string; className: string }
> = {
  cancelled: {
    className: "bg-red-100 text-red-700",
    label: "Annul\u00e9",
  },
  completed: {
    className: "bg-green-100 text-green-700",
    label: "Termin\u00e9",
  },
  failed: {
    className: "bg-red-100 text-red-700",
    label: "\u00c9chou\u00e9",
  },
  pending: {
    className: "bg-blue-100 text-blue-700",
    label: "En attente",
  },
  running: {
    className: "bg-blue-100 text-blue-700",
    label: "En cours",
  },
};

export function CrawlStatusCell({
  crawlStatus,
  website,
}: CrawlStatusCellProps) {
  const isRunning = crawlStatus === "running" || crawlStatus === "pending";

  if (!website) return <ImpossibleCrawlIcon />;

  return (
    <div className="flex items-center gap-x-2">
      {/* 🟡 Status */}
      {crawlStatus ? (
        <StatusBadge isRunning={isRunning} status={crawlStatus} />
      ) : (
        <NoCrawledYet />
      )}
    </div>
  );
}

// ==============================
// 🟡 Badge
function StatusBadge({
  status,
  isRunning,
}: {
  status: Crawl["status"];
  isRunning: boolean;
}) {
  const config = CRAWL_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "flex items-center gap-x-1",
        "rounded-full px-3 py-1",
        "text-xs",
        config.className
      )}
    >
      {isRunning && <LoaderIcon className="size-3 animate-spin" />}
      {config.label}
    </span>
  );
}

// ===========================================
// 🚫 Impossible crawl
function ImpossibleCrawlIcon() {
  return <BanIcon className="ml-6 text-red-600" size={20} strokeWidth={2.5} />;
}

// ===========================================
//👶 No crawl
function NoCrawledYet() {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1",
        "bg-gray-100 text-gray-600",
        "text-xs"
      )}
    >
      Non crawl{"\u00e9"}
    </span>
  );
}
