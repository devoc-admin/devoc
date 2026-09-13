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
  updateHasAccessibilitySettings,
  updateSiteEditor,
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
      inhabitants,
      distanceFrom,
      siteLaunchYear,
      siteEditor,
      siteEditorUrl,
      hasAccessibilitySettings,
      usesPanneauPocket,
      hasDpo,
      dpoName,
      dpoUrl,
      referentName,
      referentEmail,
      referentPhone,
      referentLinkedin,
    }: {
      name: string;
      website: string;
      location: string;
      type: Prospect["type"];
      latitude?: string;
      longitude?: string;
      hasSite?: boolean;
      estimatedOpportunity?: Prospect["estimatedOpportunity"];
      inhabitants?: number | null;
      distanceFrom?: number | null;
      siteLaunchYear?: number | null;
      siteEditor?: string | null;
      siteEditorUrl?: string | null;
      hasAccessibilitySettings?: boolean | null;
      usesPanneauPocket?: boolean | null;
      hasDpo?: boolean | null;
      dpoName?: string | null;
      dpoUrl?: string | null;
      referentName?: string | null;
      referentEmail?: string | null;
      referentPhone?: string | null;
      referentLinkedin?: string | null;
    }) => {
      const result = await addProspect({
        distanceFrom,
        dpoName,
        dpoUrl,
        estimatedOpportunity,
        hasAccessibilitySettings,
        hasDpo,
        hasSite,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        referentEmail,
        referentLinkedin,
        referentName,
        referentPhone,
        siteEditor,
        siteEditorUrl,
        siteLaunchYear,
        type,
        usesPanneauPocket,
        website,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      queryClient.invalidateQueries({ queryKey: ["dpos"] });
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
      inhabitants,
      distanceFrom,
      siteLaunchYear,
      siteEditor,
      siteEditorUrl,
      hasAccessibilitySettings,
      usesPanneauPocket,
      hasDpo,
      dpoName,
      dpoUrl,
      referentName,
      referentEmail,
      referentPhone,
      referentLinkedin,
    }: {
      id: number;
      name: string;
      website: string;
      location: string;
      type: Prospect["type"];
      latitude?: string;
      longitude?: string;
      inhabitants?: number | null;
      distanceFrom?: number | null;
      siteLaunchYear?: number | null;
      siteEditor?: string | null;
      siteEditorUrl?: string | null;
      hasAccessibilitySettings?: boolean | null;
      usesPanneauPocket?: boolean | null;
      hasDpo?: boolean | null;
      dpoName?: string | null;
      dpoUrl?: string | null;
      referentName?: string | null;
      referentEmail?: string | null;
      referentPhone?: string | null;
      referentLinkedin?: string | null;
    }) => {
      const result = await editProspect({
        distanceFrom,
        dpoName,
        dpoUrl,
        hasAccessibilitySettings,
        hasDpo,
        id,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        referentEmail,
        referentLinkedin,
        referentName,
        referentPhone,
        siteEditor,
        siteEditorUrl,
        siteLaunchYear,
        type,
        usesPanneauPocket,
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
      queryClient.invalidateQueries({ queryKey: ["dpos"] });
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
// 🛠️ Update site editor

export function useUpdateSiteEditorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prospectId,
      siteEditor,
    }: {
      prospectId: number;
      siteEditor: string | null;
    }) => {
      const result = await updateSiteEditor({ prospectId, siteEditor });
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'éditeur.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
    },
  });
}

// --------------------------------------
// ♿ Update accessibility settings flag

export function useUpdateHasAccessibilitySettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prospectId,
      hasAccessibilitySettings,
    }: {
      prospectId: number;
      hasAccessibilitySettings: boolean | null;
    }) => {
      const result = await updateHasAccessibilitySettings({
        hasAccessibilitySettings,
        prospectId,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'accessibilité.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
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
