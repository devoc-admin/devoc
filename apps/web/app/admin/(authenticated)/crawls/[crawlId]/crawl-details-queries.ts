import { useQuery } from "@tanstack/react-query";
import { getCrawlDetails } from "./crawl-details-actions";

// --------------------------------------
// 📖 Fetch crawl details
export function useCrawlDetailsQuery({ crawlId }: { crawlId: string }) {
  return useQuery({
    queryFn: async () => {
      const result = await getCrawlDetails(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
    queryKey: ["crawl-details", crawlId],
  });
}
