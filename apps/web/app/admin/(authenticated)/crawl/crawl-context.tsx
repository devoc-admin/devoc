/** biome-ignore-all assist/source/useSortedKeys: needs specific order here */
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useEffectEvent } from "react";
import type {
  CrawlJobQueryResult,
  ListCrawlsResult,
  UpsertCrawlResult,
} from "./crawl-actions";
import {
  useDeleteAllCrawls,
  useDeleteCrawl,
  useDeleteCrawlJob,
  useUpsertCrawl,
} from "./crawl-mutations";
import { useCrawlJob, useCrawlsList } from "./crawl-queries";

/** biome-ignore lint/suspicious/noEmptyBlockStatements: special case */
function emptyFn() {}

const CrawlContext = createContext<CrawlContextType>({
  // 👁️ See current crawl job
  crawlJob: undefined,
  crawlJobId: null,
  handleCrawlJobId: emptyFn,
  removeCrawlJobId: emptyFn,

  //➕ Upsert crawl
  upsertCrawlResult: undefined,
  upsertCrawlMutate: emptyFn,
  upsertCrawlIsPending: false,
  upsertCrawlIsError: false,
  upsertCrawlIsSuccess: false,
  upsertCrawlError: "",

  //📝 Crawls
  crawls: [],
  crawlsAreLoading: false,

  // 🚮 Delete a crawl
  deletingCrawlId: undefined,
  crawlDeletionIsPending: false,
  deleteCrawlMutate: emptyFn,

  // 🚮🚮🚮 Delete alls crawls
  deleteAllCrawlsMutate: emptyFn,
  allCrawlsDeletionIsPending: false,
  allCrawlsDeletionIsError: false,
  allCrawlsDeletionIsSuccess: false,

  // 🚮 Delete a crawl job
  deleteCrawlJobMutate: emptyFn,
  deleteCrawlJobIsPending: false,
});

export function CrawlProvider({ children }: { children: React.ReactNode }) {
  //👁️ See current crawl job
  const { crawlJob, crawlJobId, handleCrawlJobId, removeCrawlJobId } =
    useCrawlJob();

  //➕ Upsert crawl
  const {
    mutate: upsertCrawlMutate,
    data: upsertCrawlResult,
    isPending: upsertCrawlIsPending,
    isError: upsertCrawlIsError,
    isSuccess: upsertCrawlIsSuccess,
    error: upsertCrawlError,
  } = useUpsertCrawl();

  //📝 List crawls
  const { crawls, crawlsAreLoading } = useCrawlsList();

  // 🚮 Delete a crawl job
  const { mutate: deleteCrawlJobMutate, isPending: deleteCrawlJobIsPending } =
    useDeleteCrawlJob();

  // 🚮 Delete a crawl
  const {
    mutate: deleteCrawlMutate,
    isPending: crawlDeletionIsPending,
    variables: deletingCrawlId,
  } = useDeleteCrawl();

  // 🚮🚮🚮 Delete all crawls
  const {
    mutate: deleteAllCrawlsMutate,
    isPending: allCrawlsDeletionIsPending,
    isError: allCrawlsDeletionIsError,
    isSuccess: allCrawlsDeletionIsSuccess,
  } = useDeleteAllCrawls();

  // 🔄 INTERDEPEND ACTIONS
  const insertedCrawlJobId = upsertCrawlResult?.crawlJobId;

  // # Insert new crawl job id in URL
  const onInsertCrawlJobId = useEffectEvent((insertedCrawlJobId: string) => {
    if (insertedCrawlJobId !== crawlJobId) {
      handleCrawlJobId(insertedCrawlJobId);
    }
  });
  useEffect(() => {
    if (insertedCrawlJobId) {
      onInsertCrawlJobId(insertedCrawlJobId);
    }
  }, [insertedCrawlJobId]);

  return (
    <CrawlContext.Provider
      value={{
        // 👁️ See current crawl job
        crawlJob,
        crawlJobId,
        handleCrawlJobId,
        removeCrawlJobId,

        //➕ Upsert crawl
        upsertCrawlMutate,
        upsertCrawlResult,
        upsertCrawlIsPending,
        upsertCrawlIsError,
        upsertCrawlIsSuccess,
        upsertCrawlError: upsertCrawlError?.message ?? "",

        //📝 Crawls
        crawls,
        crawlsAreLoading,

        // 🚮 Delete a crawl
        deletingCrawlId,
        deleteCrawlMutate,
        crawlDeletionIsPending,

        // 🚮🚮🚮 Delete all crawls
        deleteAllCrawlsMutate,
        allCrawlsDeletionIsPending,
        allCrawlsDeletionIsError,
        allCrawlsDeletionIsSuccess,

        // 🛑 Interrupt crawl
        deleteCrawlJobMutate,
        deleteCrawlJobIsPending,
      }}
    >
      {children}
    </CrawlContext.Provider>
  );
}

// --------------------------------------
// 🔠 Types
type CrawlContextType = {
  // 👁️ See current crawl job
  crawlJob: CrawlJobQueryResult | undefined;
  crawlJobId: string | null;
  handleCrawlJobId: (id: string) => void;
  removeCrawlJobId: () => void;

  //➕ Upsert crawl
  upsertCrawlResult: UpsertCrawlResult | undefined;
  upsertCrawlMutate: UseMutateFunction<
    UpsertCrawlResult,
    Error,
    {
      url: string;
      maxDepth: number;
      maxPages: number;
      skipResources: boolean;
      skipScreenshots: boolean;
      concurrency: number;
    },
    unknown
  >;
  upsertCrawlIsPending: boolean;
  upsertCrawlIsError: boolean;
  upsertCrawlIsSuccess: boolean;
  upsertCrawlError: string;

  //📝 Crawls
  crawls?: ListCrawlsResult;
  crawlsAreLoading: boolean;

  // 🚮 Delete a crawl
  deletingCrawlId: number | undefined;
  crawlDeletionIsPending: boolean;
  deleteCrawlMutate: UseMutateFunction<boolean, Error, number, unknown>;

  //  🚮 Delete a crawl job
  deleteCrawlJobMutate: UseMutateFunction<boolean, Error, string, unknown>;
  deleteCrawlJobIsPending: boolean;

  // 🚮🚮🚮 Delete alls crawls
  deleteAllCrawlsMutate: UseMutateFunction<boolean, Error, void, unknown>;
  allCrawlsDeletionIsPending: boolean;
  allCrawlsDeletionIsError: boolean;
  allCrawlsDeletionIsSuccess: boolean;
};

// --------------------------------------
// 🪝 Hook
export function useCrawlContext() {
  const context = useContext(CrawlContext);

  if (!context) {
    throw new Error("useCrawlContext must be used within an CrawlProvider");
  }

  return context;
}
