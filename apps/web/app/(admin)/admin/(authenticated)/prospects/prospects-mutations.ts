import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Prospect } from "@/lib/db/schema";
import { upsertCrawl } from "../crawls/crawls-actions";
import {
  addProspect,
  deleteProspect,
  editProspect,
  toggleHasSite,
  updateEstimatedOpportunity,
} from "./prospects-actions";

export function useAddProspectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      website,
      location,
      type,
      latitude,
      longitude,
      hasSite,
      estimatedOpportunity,
    }: {
      name: string;
      website: string;
      location: string;
      type: Prospect["type"];
      latitude?: string;
      longitude?: string;
      hasSite?: boolean;
      estimatedOpportunity?: Prospect["estimatedOpportunity"];
    }) => {
      const result = await addProspect({
        estimatedOpportunity,
        hasSite,
        latitude,
        location,
        longitude,
        name,
        type,
        website,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast("Prospect ajouté avec succès !", {
        icon: "✅",
        position: "bottom-right",
      });
    },
  });
}

// --------------------------------------
// ✏️ Edit prospect

export function useEditProspectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      website,
      location,
      type,
      latitude,
      longitude,
    }: {
      id: number;
      name: string;
      website: string;
      location: string;
      type: Prospect["type"];
      latitude?: string;
      longitude?: string;
    }) => {
      const result = await editProspect({
        id,
        latitude,
        location,
        longitude,
        name,
        type,
        website,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la modification du prospect.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast.success("Prospect modifié avec succès !");
    },
  });
}

// --------------------------------------
// 🗑️ Delete prospect

export function useDeleteProspectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prospectId: number) => {
      const result = await deleteProspect(prospectId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du prospect.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast.success("Prospect supprimé avec succès !");
    },
  });
}

// --------------------------------------
// 🚨 Update estimated opportunity

export function useUpdateEstimatedOpportunityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prospectId,
      estimatedOpportunity,
    }: {
      prospectId: number;
      estimatedOpportunity: Prospect["estimatedOpportunity"];
    }) => {
      const result = await updateEstimatedOpportunity({
        estimatedOpportunity,
        prospectId,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'urgence.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast.success("Urgence mise à jour avec succès !");
    },
  });
}

// --------------------------------------
// 🌐 Toggle hasSite

export function useToggleHasSiteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prospectId,
      hasSite,
    }: {
      prospectId: number;
      hasSite: boolean;
    }) => {
      const result = await toggleHasSite({
        hasSite,
        prospectId,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
    },
  });
}

// --------------------------------------
// 🕷️ Launch crawl

export function useLaunchCrawlMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prospectId,
      website,
    }: {
      prospectId: number;
      website: string;
    }) => {
      const result = await upsertCrawl({
        concurrency: 10,
        maxDepth: 3,
        maxPages: 100,
        prospectId,
        url: website,
        useLocalScreenshots: false,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    onError: () => {
      toast.error("Erreur lors du lancement du crawl.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast.success("Crawl lancé avec succès !");
    },
  });
}
