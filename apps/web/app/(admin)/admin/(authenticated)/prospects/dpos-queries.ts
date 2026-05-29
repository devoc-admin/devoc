import { queryOptions, useQuery } from "@tanstack/react-query";
import { listDpos } from "./dpos-actions";

export const dposKey = () => ["dpos"];

export const dposQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await listDpos();
    if (!result.success) throw new Error(result.error);
    return result.response;
  },
  queryKey: dposKey(),
});

export function useListDposQuery() {
  return useQuery(dposQueryOptions);
}
