"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { getCrawlJob, listCrawls } from "./crawl-actions";

// --------------------------------------
// 👁️ See current crawl job
export function useCrawlJob() {
  const queryClient = useQueryClient();
  const [crawlJobId, setCrawlJobId] = useQueryState("crawlJobId");

  function handleCrawlJobId(id: string) {
    setCrawlJobId(id);
  }

  function removeCrawlJobId() {
    setCrawlJobId(null);
  }

  const { data } = useQuery({
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
      // 🥱 Stop polling when job is finished
      if (["completed", "failed", "cancelled"].includes(data.response.status)) {
        queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
        removeCrawlJobId();
        return false;
      }
      return 1000; // Poll every second
    },
    select: (data) => data?.response,
  });

  return {
    crawlJob: data,
    crawlJobId,
    handleCrawlJobId,
    removeCrawlJobId,
  };
}

// --------------------------------------
// 📝 List crawls

export function useCrawlsList() {
  const { data: crawls, isLoading } = useQuery({
    queryFn: async () => {
      const result = await listCrawls();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    queryKey: ["list-crawls"],
    select: (data) => data.response,
  });

  return {
    crawls,
    crawlsAreLoading: isLoading,
  };
}
