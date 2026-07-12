/** biome-ignore-all assist/source/useSortedKeys: needs specific order here */
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import type { Prospect } from "@/lib/db/schema";
import type {
  CrawlQueryResult,
  ListCrawlsResult,
  UpsertCrawlResult,
} from "./crawls-actions";
import {
  useDeleteAllCrawls,
  useDeleteCrawl,
  useRetryCrawl,
  useUpsertCrawl,
} from "./crawls-mutations";
import { useCrawlsList, useCurrentCrawl } from "./crawls-queries";

/** biome-ignore lint/suspicious/noEmptyBlockStatements: special case */
function emptyFn() {}

const CrawlsContext = createContext<CrawlsContextType>({
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

  // 🔍 Filter
  searchCrawl: "",
  prospectTypeFilter: null,
  handleSearchCrawl: emptyFn,
  handleProspectTypeFilter: emptyFn,

  // 👾 View mode
  cardViewMode: "simple",
  handleCardViewMode: emptyFn,

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

  //🔒 Lock actions
  lockActions: false,
});

export function CrawlsProvider({ children }: { children: React.ReactNode }) {
  //👁️ See current crawl
  const { crawl, crawlId, handleCrawlId, removeCrawlId } = useCurrentCrawl();

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

  //🔍 Search crawls
  const [searchCrawl, setSearchCrawlQuery] = useState("");
  const [prospectTypeFilter, setProspectTypeFilter] = useState<
    Prospect["type"] | null
  >(null);

  const handleSearchCrawl = (query: string) => {
    setSearchCrawlQuery(query);
  };

  const handleProspectTypeFilter = (type: Prospect["type"] | null) => {
    setProspectTypeFilter(type);
  };

  const filteredCrawls = crawls
    ? crawls.filter((crawlItem) => {
        // Filter by type
        if (prospectTypeFilter && crawlItem.prospectType !== prospectTypeFilter)
          return false;

        // Filter by search query
        if (!searchCrawl.trim()) return true;
        const query = searchCrawl.toLowerCase();
        return (
          crawlItem.title?.toLowerCase().includes(query) ||
          crawlItem.prospectName?.toLowerCase().includes(query) ||
          crawlItem.url?.toLowerCase().includes(query) ||
          crawlItem.author?.toLowerCase().includes(query)
        );
      })
    : undefined;

  // 👾 View mode
  const [cardViewMode, setCardViewMode] = useState<"simple" | "dense">(
    "simple"
  );
  const handleCardViewMode = (mode: "simple" | "dense") => {
    setCardViewMode(mode);
  };

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

  //🔒 Lock action
  const lockActions =
    upsertCrawlIsPending ||
    crawlDeletionIsPending ||
    allCrawlsDeletionIsPending ||
    retryCrawlIsPending;

  // 🔄 INTERDEPEND ACTIONS
  const insertedCrawlId = upsertCrawlResult?.crawlId;
  const retriedCrawlId = retryCrawlResult?.crawlId;

  // ➕🌐 Insert new crawl id in URL
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
    <CrawlsContext.Provider
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
        crawls: filteredCrawls,
        crawlsAreLoading,

        // 🔍 Filter
        searchCrawl,
        prospectTypeFilter,
        handleSearchCrawl,
        handleProspectTypeFilter,

        // 👾 View mode
        cardViewMode,
        handleCardViewMode,

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

        //🔒 Lock actions
        lockActions,
      }}
    >
      {children}
    </CrawlsContext.Provider>
  );
}

// --------------------------------------
// 🔠 Types
type CrawlsContextType = {
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
      useLocalScreenshots: boolean;
      concurrency: number;
      prospectId?: number;
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

  // 🔍 Filter
  searchCrawl: string;
  prospectTypeFilter: Prospect["type"] | null;
  handleSearchCrawl: (query: string) => void;
  handleProspectTypeFilter: (type: Prospect["type"] | null) => void;

  // 👾 View mode
  cardViewMode: "simple" | "dense";
  handleCardViewMode: (mode: "simple" | "dense") => void;

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

  //🔒 Lock actions
  lockActions: boolean;
};

// --------------------------------------
// 🪝 Hook
export function useCrawlsContext() {
  const context = useContext(CrawlsContext);

  if (!context) {
    throw new Error("useCrawlContext must be used within an CrawlProvider");
  }

  return context;
}
