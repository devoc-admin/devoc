/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: context case */
"use client";
import { useQueryState } from "nuqs";
import { createContext, useContext } from "react";

type CrawlContextType = {
  crawlJobId: string | null;
  handleCrawlJobId: (id: string) => void;
  removeCrawlJobId: () => void;
};

const CrawlContext = createContext<CrawlContextType>({
  crawlJobId: null,
  handleCrawlJobId: () => {},
  removeCrawlJobId: () => {},
});

export function CrawlProvider({ children }: { children: React.ReactNode }) {
  const { crawlJobId, handleCrawlJobId, removeCrawlJobId } = useCrawlJob();

  return (
    <CrawlContext.Provider
      value={{ crawlJobId, handleCrawlJobId, removeCrawlJobId }}
    >
      {children}
    </CrawlContext.Provider>
  );
}

// --------------------------------------
function useCrawlJob() {
  const [crawlJobId, setCrawlJobId] = useQueryState("crawlJobId");

  function handleCrawlJobId(id: string) {
    setCrawlJobId(id);
  }

  function removeCrawlJobId() {
    setCrawlJobId(null);
  }

  return {
    crawlJobId,
    handleCrawlJobId,
    removeCrawlJobId,
  };
}

// --------------------------------------
export function useCrawlContext() {
  const context = useContext(CrawlContext);

  if (!context) {
    throw new Error("useCrawlContext must be used within an CrawlProvider");
  }

  return context;
}
