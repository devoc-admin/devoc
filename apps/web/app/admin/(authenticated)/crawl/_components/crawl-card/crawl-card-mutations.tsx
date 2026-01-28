import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listCrawlsKey } from "../../crawl-keys";
import {
  type AddProspectForCrawlParams,
  addProspectForCrawl,
  assignProspectToCrawl,
} from "./crawl-card-actions";
import { availableProspectsKey } from "./crawl-card-keys";

// --------------------------------------
// 🔗 Assign a prospect to a crawl
export function useAssignProspectToCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      crawlId,
      prospectId,
    }: {
      crawlId: string;
      prospectId: number | null;
    }) => {
      const result = await assignProspectToCrawl(crawlId, prospectId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
      queryClient.invalidateQueries({
        queryKey: availableProspectsKey(variables.crawlId),
      });
    },
  });
}

// --------------------------------------
// ➕ Add prospect for a crawl
export function useAddProspectForCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AddProspectForCrawlParams) => {
      const result = await addProspectForCrawl(params);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
      queryClient.invalidateQueries({
        queryKey: availableProspectsKey(variables.crawlId),
      });
      queryClient.invalidateQueries({ queryKey: ["list-prospects"] });
    },
  });
}
