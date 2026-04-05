import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllCrawls,
  deleteCrawl,
  retryCrawl,
  upsertCrawl,
} from "./crawls-actions";
import { listCrawlsKey } from "./crawls-keys";
// --------------------------------------
// ➕ Upsert crawl
export function useUpsertCrawl() {
  return useMutation({
    mutationFn: async ({
      url,
      maxDepth,
      maxPages,
      useLocalScreenshots,
      concurrency,
      prospectId,
    }: {
      url: string;
      maxDepth: number;
      maxPages: number;
      useLocalScreenshots: boolean;
      concurrency: number;
      prospectId?: number;
    }) => {
      const result = await upsertCrawl({
        concurrency,
        maxDepth,
        maxPages,
        prospectId,
        url,
        useLocalScreenshots,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
  });
}

// --------------------------------------
// 🚮 Delete a crawl
export function useDeleteCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (crawlId: string) => {
      const result = await deleteCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
    },
  });
}

// --------------------------------------
// 🚮🚮🚮 Delete all crawls
export function useDeleteAllCrawls() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await deleteAllCrawls();
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
    },
  });
}

// --------------------------------------
// 🔄 Retry a crawl
export function useRetryCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (crawlId: string) => {
      const result = await retryCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
    },
  });
}
