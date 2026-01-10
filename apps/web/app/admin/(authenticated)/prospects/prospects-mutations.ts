import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProspect } from "./prospects-actions";
import type { ProspectType } from "./prospects-types";
export function useAddProspectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      website,
      location,
      type,
    }: {
      name: string;
      website: string;
      location: string;
      type: ProspectType;
    }) => {
      const result = await addProspect({ location, name, type, website });

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
