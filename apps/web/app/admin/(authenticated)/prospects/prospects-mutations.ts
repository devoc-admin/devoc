import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProspect,
  deleteProspect,
  editProspect,
  updateEstimatedOpportunity,
} from "./prospects-actions";
import type { EstimatedOpportunity, ProspectType } from "./prospects-types";

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
    }: {
      name: string;
      website: string;
      location: string;
      type: ProspectType;
      latitude?: string;
      longitude?: string;
    }) => {
      const result = await addProspect({
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
      type: ProspectType;
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
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
      estimatedOpportunity: EstimatedOpportunity;
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
    },
  });
}
