"use client";
import { createContext, use } from "react";
import type { CrawlResult } from "../../crawl-actions";

const CrawlCardContext = createContext<{ crawl: CrawlResult | null }>({
  crawl: null,
});

export function CrawlCardContextProvider({
  crawl,
  children,
}: {
  crawl: CrawlResult;
  children: React.ReactNode;
}) {
  return (
    <CrawlCardContext.Provider value={{ crawl }}>
      {children}
    </CrawlCardContext.Provider>
  );
}

export function useCrawlCardContext() {
  const { crawl } = use(CrawlCardContext);
  return { crawl };
}
