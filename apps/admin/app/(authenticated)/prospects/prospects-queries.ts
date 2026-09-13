import { queryOptions, useQuery } from "@tanstack/react-query";
import { listProspects } from "./prospects-actions";
import { prospectsKey } from "./prospects-keys";

export const prospectsQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await listProspects();
    if (!result.success) throw new Error(result.error);
    return result.response;
  },
  queryKey: prospectsKey(),
});

export function useListProspectsQuery() {
  return useQuery(prospectsQueryOptions);
}
