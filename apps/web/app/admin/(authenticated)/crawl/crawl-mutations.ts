import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllCrawls,
  deleteCrawl,
  deleteCrawlJob,
  upsertCrawl,
} from "./crawl-actions";

// --------------------------------------
// ➕ Upsert crawl

export function useUpsertCrawl() {
  return useMutation({
    mutationFn: async ({
      url,
      maxDepth,
      maxPages,
      skipResources,
      skipScreenshots,
      useLocalScreenshots,
      concurrency,
    }: {
      url: string;
      maxDepth: number;
      maxPages: number;
      skipResources: boolean;
      skipScreenshots: boolean;
      useLocalScreenshots: boolean;
      concurrency: number;
    }) => {
      const result = await upsertCrawl({
        concurrency,
        maxDepth,
        maxPages,
        skipResources,
        skipScreenshots,
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
// 🚮 Delete a crawl job

export function useDeleteCrawlJob() {
  return useMutation({
    mutationFn: async (crawlJobId: string) => {
      const result = await deleteCrawlJob(crawlJobId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
  });
}

// --------------------------------------
// 🚮 Delete a crawl

export function useDeleteCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (crawlId: number) => {
      const result = await deleteCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
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
      queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
    },
  });
}
