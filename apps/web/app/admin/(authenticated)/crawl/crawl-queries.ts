"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import {
  getCrawl,
  getRunningCrawl,
  listAvailableProspectsForCrawl,
  listCrawls,
  listUncrawledProspects,
} from "./crawl-actions";

export const crawlsListQueryOptions = queryOptions({
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

export const runningCrawlQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await getRunningCrawl();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.response;
  },
  queryKey: ["running-crawl"],
});

export const uncrawledProspectsQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await listUncrawledProspects();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  },
  queryKey: ["uncrawled-prospects"],
  select: (data) => data.response,
});

// --------------------------------------
// 👁️ See current crawl
export function useCrawl() {
  const queryClient = useQueryClient();
  const [crawlId, setCrawlId] = useQueryState("crawlId");

  function handleCrawlId(id: string) {
    setCrawlId(id);
  }

  function removeCrawlId() {
    setCrawlId(null);
  }

  const { data } = useQuery({
    enabled: !!crawlId,
    queryFn: async () => {
      if (!crawlId) return null;
      const result = await getCrawl(crawlId);
      if (!result.success) {
        removeCrawlId();
        throw new Error(result.error);
      }
      return result;
    },
    queryKey: ["crawl-status", crawlId],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 2000;
      // 🥱 Stop polling when crawl is finished
      if (["completed", "failed", "cancelled"].includes(data.response.status)) {
        queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
        queryClient.invalidateQueries({ queryKey: ["uncrawled-prospects"] });
        removeCrawlId();
        return false;
      }
      return 1000; // Poll every second
    },
    select: (data) => data?.response,
  });

  return {
    crawl: data,
    crawlId,
    handleCrawlId,
    removeCrawlId,
  };
}

// --------------------------------------
// 📝 List crawls

export function useCrawlsList() {
  const { data: crawls, isLoading } = useQuery(crawlsListQueryOptions);

  return {
    crawls,
    crawlsAreLoading: isLoading,
  };
}

// --------------------------------------
// 🔍 Check for running crawl and auto-set crawlId

export function useRunningCrawl() {
  const [crawlId, setCrawlId] = useQueryState("crawlId");

  const { data: runningCrawl } = useQuery({
    ...runningCrawlQueryOptions,
    enabled: !crawlId,
  });

  useEffect(() => {
    if (runningCrawl && !crawlId) {
      setCrawlId(runningCrawl.crawlId);
    }
  }, [runningCrawl, crawlId, setCrawlId]);
}

// --------------------------------------
// 🏢 List prospects with websites not yet crawled

export function useUncrawledProspects() {
  const { data: prospects, isLoading } = useQuery(
    uncrawledProspectsQueryOptions
  );

  return {
    prospects,
    prospectsAreLoading: isLoading,
  };
}

// --------------------------------------
// 🏢 List available prospects for a crawl

export function useAvailableProspectsForCrawl(crawlId: string) {
  const { data: prospects, isLoading } = useQuery({
    queryFn: async () => {
      const result = await listAvailableProspectsForCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    queryKey: ["available-prospects", crawlId],
  });

  return {
    availableProspects: prospects,
    availableProspectsAreLoading: isLoading,
  };
}
