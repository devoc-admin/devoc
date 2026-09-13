import { useQuery } from "@tanstack/react-query";
import { listAvailableProspectsForCrawl } from "./crawl-card-actions";
import { availableProspectsKey } from "./crawl-card-keys";

// --------------------------------------
// 🏢 List available prospects for a crawl
export function useAvailableProspectsForCrawl(crawlId: string) {
  const { data: prospects, isLoading } = useQuery({
    queryFn: async () => {
      const result = await listAvailableProspectsForCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    queryKey: [availableProspectsKey(crawlId)],
  });

  return {
    availableProspects: prospects,
    availableProspectsAreLoading: isLoading,
  };
}
