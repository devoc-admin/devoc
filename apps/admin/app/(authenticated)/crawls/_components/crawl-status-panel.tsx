"use client";
import {
  CheckCircle2Icon,
  LoaderIcon,
  StopCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCrawlsContext } from "../crawls-context";

export function CrawlStatusPanel() {
  const { crawl, crawlId, deleteCrawlMutate, crawlDeletionIsPending } =
    useCrawlsContext();
  if (!crawl) return null;

  const isRunning = crawl.status === "running" || crawl.status === "pending";
  const isCompleted = crawl.status === "completed";
  const isFailed = crawl.status === "failed" || crawl.status === "cancelled";

  return (
    <div className="bg-sidebar rounded-md p-6">
      <div className="flex flex-col gap-y-4">
        {/* 🆎 Header with status */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-kanit text-2xl font-semibold">
              Exploration en cours
            </h2>
            {crawl.crawlUrl && (
              <a
                className="text-sm underline"
                href={crawl.crawlUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {crawl.crawlUrl}
              </a>
            )}
          </div>
          <StatusBadge
            isCompleted={isCompleted}
            isFailed={isFailed}
            isRunning={isRunning}
            status={crawl.status}
          />
        </div>

        {/* 📊 Progress stats */}
        <div className="flex items-center gap-x-6 text-sm">
          <span>
            Pages visitées :{" "}
            <strong>
              {crawl.pagesCrawled} / {crawl.maxPages}
            </strong>
          </span>
        </div>

        {/* ✋ Stop crawl */}
        {isRunning && (
          <StopCrawlButton
            onClick={() => crawlId && deleteCrawlMutate(crawlId)}
            pending={crawlDeletionIsPending}
          />
        )}
        {/* ❌ Error message if failed */}
        {isFailed && crawl.errorMessage && (
          <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {crawl.errorMessage}
          </div>
        )}

        {/* 💻 Latest crawled page */}
        {crawl.latestPage && (
          <div className="border-border bg-sidebar-strong rounded-md border p-4">
            <div className="flex flex-col gap-y-1">
              <a
                className="space-y-4"
                href={crawl.latestPage.url}
                rel="noopener"
                target="_blank"
              >
                <div>
                  {/* 🔠 Title */}
                  <div className="text-sm font-medium">
                    {crawl.latestPage.title ?? "Sans titre"}
                  </div>
                  {/* 🔗 URL */}
                  <div className="text-muted-foreground truncate text-xs underline">
                    {crawl.latestPage.url}
                  </div>
                </div>
                {/* 🖼️ Homepage screenshot */}
                {crawl.homepageScreenshotUrl && (
                  <Image
                    alt="Page d'accueil"
                    className="border-border w-100 rounded-md border shadow-md"
                    height={400}
                    src={crawl.homepageScreenshotUrl}
                    width={400}
                  />
                )}
              </a>
              {/* 🟨 Additional information */}
              <div className="mt-2 flex items-center gap-x-3 text-xs">
                {/* 🟨 Category */}
                <span className="bg-primary/10 text-primary rounded px-2 py-0.5">
                  {formatCategory(crawl.latestPage.category)}
                </span>
                {/* 🕳️ Depth */}
                <span className="text-muted-foreground">
                  Profondeur: {crawl.latestPage.depth}
                </span>
                {/* 🔢 HTTP code */}
                {crawl.latestPage.httpStatus && (
                  <span className="text-muted-foreground">
                    HTTP {crawl.latestPage.httpStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------
function StopCrawlButton({
  onClick,
  pending,
}: {
  onClick: () => void;
  pending: boolean;
}) {
  return (
    <Button
      className="w-fit"
      disabled={pending}
      onClick={onClick}
      size="sm"
      variant="destructive"
    >
      {pending ? (
        <LoaderIcon className="animate-spin" size={14} />
      ) : (
        <StopCircleIcon size={14} />
      )}
      Interrompre
    </Button>
  );
}
// --------------------------------------------
function StatusBadge({
  isRunning,
  isCompleted,
  isFailed,
  status,
}: {
  isRunning: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  status: string;
}) {
  if (isRunning) {
    return (
      <span className="flex items-center gap-x-1 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
        <LoaderIcon className="animate-spin" size={14} />
        {status === "pending" ? "En attente" : "En cours"}
      </span>
    );
  }
  if (isCompleted) {
    return (
      <span className="flex items-center gap-x-1 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
        <CheckCircle2Icon size={14} />
        Terminé
      </span>
    );
  }
  if (isFailed) {
    return (
      <span className="flex items-center gap-x-1 rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-500">
        <XCircleIcon size={14} />
        Échoué
      </span>
    );
  }
  return null;
}

// --------------------------------------------
function formatCategory(category: string): string {
  const categoryLabels: Record<string, string> = {
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
  return categoryLabels[category] ?? category;
}
