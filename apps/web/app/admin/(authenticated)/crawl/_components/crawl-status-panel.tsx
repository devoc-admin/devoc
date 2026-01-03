"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, LoaderIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { getCrawlJob } from "../crawl-actions";
import { useCrawlContext } from "../crawl-context";

export function CrawlStatusPanel() {
  const { crawlJobId } = useCrawlContext();
  const { data: crawlJob } = useCrawlJob(crawlJobId);
  if (!crawlJob) return null;

  const isRunning =
    crawlJob.status === "running" || crawlJob.status === "pending";
  const isCompleted = crawlJob.status === "completed";
  const isFailed =
    crawlJob.status === "failed" || crawlJob.status === "cancelled";

  return (
    <div className="rounded-md bg-sidebar p-6">
      <div className="flex flex-col gap-y-4">
        {/* 🆎 Header with status */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-kanit font-semibold text-2xl">
              Progression du crawl
            </h2>
            {crawlJob.crawlUrl && (
              <a
                className="text-sm underline"
                href={crawlJob.crawlUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {crawlJob.crawlUrl}
              </a>
            )}
          </div>
          <StatusBadge
            isCompleted={isCompleted}
            isFailed={isFailed}
            isRunning={isRunning}
            status={crawlJob.status}
          />
        </div>

        {/* 📊 Progress stats */}
        <div className="flex items-center gap-x-6 text-sm">
          <span>
            Pages crawlées :{" "}
            <strong>
              {crawlJob.pagesCrawled} / {crawlJob.pagesDiscovered}
            </strong>
          </span>
          {isRunning && (
            <span className="flex items-center gap-x-1 text-muted-foreground">
              <LoaderIcon className="animate-spin" size={14} />
              Polling actif...
            </span>
          )}
        </div>

        {/* ❌ Error message if failed */}
        {isFailed && crawlJob.errorMessage && (
          <div className="rounded-md bg-red-500/10 p-3 text-red-500 text-sm">
            {crawlJob.errorMessage}
          </div>
        )}

        {/* 💻 Latest crawled page */}
        {crawlJob.latestPage && (
          <div className="rounded-md border border-border bg-sidebar-strong p-4">
            <h4 className="mb-2 text-muted-foreground text-xs uppercase tracking-wide">
              Dernière page crawlée
            </h4>
            <div className="flex flex-col gap-y-1">
              <a
                className="space-y-2"
                href={crawlJob.latestPage.url}
                target="_blank"
              >
                {/* 🔠 Title */}
                <div className="font-medium text-sm">
                  {crawlJob.latestPage.title ?? "Sans titre"}
                </div>
                {/* 🔗 URL */}
                <div className="truncate text-muted-foreground text-xs underline">
                  {crawlJob.latestPage.url}
                </div>
                {/* 🖼️ Image */}
                {crawlJob.latestPage.screenshotUrl && (
                  <Image
                    alt={crawlJob.latestPage.title ?? "Sans titre"}
                    className="w-[400px] rounded-md border border-border"
                    height={400}
                    src={crawlJob.latestPage.screenshotUrl}
                    width={400}
                  />
                )}
              </a>
              {/* 🟨 Additional information */}
              <div className="mt-2 flex items-center gap-x-3 text-xs">
                {/* 🟨 Category */}
                <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">
                  {formatCategory(crawlJob.latestPage.category)}
                </span>
                {/* 🕳️ Depth */}
                <span className="text-muted-foreground">
                  Profondeur: {crawlJob.latestPage.depth}
                </span>
                {/* 🔢 HTTP code */}
                {crawlJob.latestPage.httpStatus && (
                  <span className="text-muted-foreground">
                    HTTP {crawlJob.latestPage.httpStatus}
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

// -------------------------------------------
function useCrawlJob(crawlJobId: string | null) {
  const { removeCrawlJobId } = useCrawlContext();

  return useQuery({
    enabled: !!crawlJobId,
    queryFn: async () => {
      if (!crawlJobId) return null;
      const result = await getCrawlJob(crawlJobId);
      if (!result.success) {
        removeCrawlJobId();
        throw new Error(result.error);
      }
      return result;
    },
    queryKey: ["crawl-status", crawlJobId],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 2000;
      // Stop polling when job is finished
      if (["completed", "failed", "cancelled"].includes(data.status)) {
        return false;
      }
      return 2000; // Poll every second
    },
  });
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
      <span className="flex items-center gap-x-1 rounded-full bg-blue-500/10 px-3 py-1 text-blue-500 text-sm">
        <LoaderIcon className="animate-spin" size={14} />
        {status === "pending" ? "En attente" : "En cours"}
      </span>
    );
  }
  if (isCompleted) {
    return (
      <span className="flex items-center gap-x-1 rounded-full bg-green-500/10 px-3 py-1 text-green-500 text-sm">
        <CheckCircle2Icon size={14} />
        Terminé
      </span>
    );
  }
  if (isFailed) {
    return (
      <span className="flex items-center gap-x-1 rounded-full bg-red-500/10 px-3 py-1 text-red-500 text-sm">
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
