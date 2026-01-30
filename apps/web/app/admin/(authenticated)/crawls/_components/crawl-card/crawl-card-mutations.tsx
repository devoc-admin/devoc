import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { listCrawlsKey } from "../../crawls-keys";
import {
  type AddProspectForCrawlParams,
  addProspectForCrawl,
  assignProspectToCrawl,
  updateCrawlAuthor,
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

// --------------------------------------
// ✏️ Update crawl author
export function useUpdateCrawlAuthorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      crawlId,
      author,
      authorUrl,
    }: {
      crawlId: string;
      author: string | null;
      authorUrl: string | null;
    }) => {
      const result = await updateCrawlAuthor(crawlId, author, authorUrl);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du prestataire.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listCrawlsKey() });
      toast.success("Prestataire mis à jour avec succès !");
    },
  });
}
