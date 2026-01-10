import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type CrawlDetailsResult,
  type PageCategory,
  updatePageAuditSelection,
  updatePageCategory,
} from "./crawl-details-actions";

// ---------------------------------
// 🏷️ Update page category mutation
export function useUpdatePageCategoryMutation({
  crawlId,
}: {
  crawlId: number;
}) {
  const crawlDetailsQueryKey = ["crawl-details", crawlId];
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { crawledPageId: string; category: PageCategory },
    { previousData: CrawlDetailsResult | undefined }
  >({
    mutationFn: async ({ crawledPageId, category }) => {
      const result = await updatePageCategory(crawledPageId, category);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(crawlDetailsQueryKey, context.previousData);
      }
    },
    onMutate: async ({ crawledPageId, category }) => {
      await queryClient.cancelQueries({ queryKey: crawlDetailsQueryKey });
      const previousData =
        queryClient.getQueryData<CrawlDetailsResult>(crawlDetailsQueryKey);

      queryClient.setQueryData<CrawlDetailsResult>(
        crawlDetailsQueryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.crawledPages.map((crawledPage) =>
              crawledPage.id === crawledPageId
                ? { ...crawledPage, category }
                : crawledPage
            ),
          };
        }
      );

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: crawlDetailsQueryKey });
    },
  });
}

// -----------------------------------------------
//🔛 Toggle audit selection

export function useToggleAuditSelectionMutation({
  crawlId,
}: {
  crawlId: number;
}) {
  const crawlDetailsQueryKey = ["crawl-details", crawlId];
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { crawledPageId: string; selected: boolean },
    { previousData: CrawlDetailsResult | undefined }
  >({
    mutationFn: async ({ crawledPageId: pageId, selected }) => {
      const result = await updatePageAuditSelection(pageId, selected);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(crawlDetailsQueryKey, context.previousData);
      }
    },
    onMutate: async ({ crawledPageId: pageId, selected }) => {
      await queryClient.cancelQueries({ queryKey: crawlDetailsQueryKey });
      const previousData =
        queryClient.getQueryData<CrawlDetailsResult>(crawlDetailsQueryKey);

      queryClient.setQueryData<CrawlDetailsResult>(
        crawlDetailsQueryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.crawledPages.map((crawledPage) =>
              crawledPage.id === pageId
                ? { ...crawledPage, selectedForAudit: selected }
                : crawledPage
            ),
          };
        }
      );

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: crawlDetailsQueryKey });
    },
  });
}
