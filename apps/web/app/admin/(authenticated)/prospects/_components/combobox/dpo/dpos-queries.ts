import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

export function useSortedDpos() {
  const { data: dpos } = useListDposQuery();
  return useMemo(() => {
    const set = new Set<string>();
    for (const d of dpos ?? []) {
      const trimmed = d.name.trim();
      if (trimmed) set.add(trimmed);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [dpos]);
}
