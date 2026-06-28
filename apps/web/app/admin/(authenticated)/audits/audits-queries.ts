"use client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { listAudits } from "./audits-actions";

export const auditsListQueryOptions = queryOptions({
  queryFn: async () => {
    const result = await listAudits();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  },
  queryKey: ["list-audits"],
  select: (data) => data.response,
  staleTime: 30_000,
});

// --------------------------------------
// 📝 List audits

export function useAuditsList() {
  const { data: audits, isLoading } = useQuery(auditsListQueryOptions);

  return {
    audits,
    auditsAreLoading: isLoading,
  };
}
