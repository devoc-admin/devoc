import { queryOptions, useQuery } from "@tanstack/react-query";
import { listProspects } from "./prospects-actions";

export const prospectsQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await listProspects();
    if (!result.success) throw new Error(result.error);
    return result.response;
  },
  queryKey: ["prospects"],
});

export function useListProspectsQuery() {
  return useQuery(prospectsQueryOptions);
}
