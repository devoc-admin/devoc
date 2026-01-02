/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: context case */
"use client";
import { useQueryState } from "nuqs";
import { createContext, useContext } from "react";

type AuditContextType = {
  crawlJobId: string | null;
  handleCrawlJobId: (id: string) => void;
};

const AuditContext = createContext<AuditContextType>({
  crawlJobId: null,
  handleCrawlJobId: () => {},
});

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const { crawlJobId, handleCrawlJobId } = useCrawlJob();

  return (
    <AuditContext.Provider value={{ crawlJobId, handleCrawlJobId }}>
      {children}
    </AuditContext.Provider>
  );
}

// --------------------------------------
function useCrawlJob() {
  const [crawlJobId, setCrawlJobId] = useQueryState("crawlJobId");

  function handleCrawlJobId(id: string) {
    setCrawlJobId(id);
  }

  return {
    crawlJobId,
    handleCrawlJobId,
  };
}

// --------------------------------------
export function useAuditContext() {
  const context = useContext(AuditContext);

  if (!context) {
    throw new Error("useAuditContext must be used within an AuditProvider");
  }

  return context;
}
