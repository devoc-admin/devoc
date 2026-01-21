/** biome-ignore-all assist/source/useSortedKeys: needs specific order here */
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useEffectEvent } from "react";
import type {
  CrawlQueryResult,
  ListCrawlsResult,
  UpsertCrawlResult,
} from "./crawl-actions";
import {
  useDeleteAllCrawls,
  useDeleteCrawl,
  useRetryCrawl,
  useUpsertCrawl,
} from "./crawl-mutations";
import { useCrawl, useCrawlsList } from "./crawl-queries";

/** biome-ignore lint/suspicious/noEmptyBlockStatements: special case */
function emptyFn() {}

const CrawlContext = createContext<CrawlContextType>({
  // 👁️ See current crawl
  crawl: undefined,
  crawlId: null,
  handleCrawlId: emptyFn,
  removeCrawlId: emptyFn,

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

  // 🔄 Retry a crawl
  retryCrawlMutate: emptyFn,
  retryCrawlIsPending: false,
  retryingCrawlId: undefined,
});

export function CrawlProvider({ children }: { children: React.ReactNode }) {
  //👁️ See current crawl
  const { crawl, crawlId, handleCrawlId, removeCrawlId } = useCrawl();

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

  // 🔄 Retry a crawl
  const {
    mutate: retryCrawlMutate,
    isPending: retryCrawlIsPending,
    variables: retryingCrawlId,
    data: retryCrawlResult,
  } = useRetryCrawl();

  // 🔄 INTERDEPEND ACTIONS
  const insertedCrawlId = upsertCrawlResult?.crawlId;
  const retriedCrawlId = retryCrawlResult?.crawlId;

  // # Insert new crawl id in URL
  const onInsertCrawlId = useEffectEvent((newCrawlId: string) => {
    if (newCrawlId !== crawlId) {
      handleCrawlId(newCrawlId);
    }
  });
  useEffect(() => {
    if (insertedCrawlId) {
      onInsertCrawlId(insertedCrawlId);
    }
  }, [insertedCrawlId]);

  useEffect(() => {
    if (retriedCrawlId) {
      onInsertCrawlId(retriedCrawlId);
    }
  }, [retriedCrawlId]);

  return (
    <CrawlContext.Provider
      value={{
        // 👁️ See current crawl
        crawl,
        crawlId,
        handleCrawlId,
        removeCrawlId,

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

        // 🔄 Retry a crawl
        retryCrawlMutate,
        retryCrawlIsPending,
        retryingCrawlId,
      }}
    >
      {children}
    </CrawlContext.Provider>
  );
}

// --------------------------------------
// 🔠 Types
type CrawlContextType = {
  // 👁️ See current crawl
  crawl: CrawlQueryResult | undefined;
  crawlId: string | null;
  handleCrawlId: (id: string) => void;
  removeCrawlId: () => void;

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
      useLocalScreenshots: boolean;
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
  deletingCrawlId: string | undefined;
  crawlDeletionIsPending: boolean;
  deleteCrawlMutate: UseMutateFunction<boolean, Error, string, unknown>;

  // 🚮🚮🚮 Delete alls crawls
  deleteAllCrawlsMutate: UseMutateFunction<boolean, Error, void, unknown>;
  allCrawlsDeletionIsPending: boolean;
  allCrawlsDeletionIsError: boolean;
  allCrawlsDeletionIsSuccess: boolean;

  // 🔄 Retry a crawl
  retryCrawlMutate: UseMutateFunction<
    UpsertCrawlResult,
    Error,
    string,
    unknown
  >;
  retryCrawlIsPending: boolean;
  retryingCrawlId: string | undefined;
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
