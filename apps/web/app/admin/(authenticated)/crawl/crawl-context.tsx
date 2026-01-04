/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: context case */
/** biome-ignore-all assist/source/useSortedKeys: needs specific order here */
"use client";
import {
  type UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { createContext, useContext, useEffect, useEffectEvent } from "react";
import {
  type CrawlJobQueryResult,
  deleteAllCrawls,
  deleteCrawl,
  deleteCrawlJob,
  getCrawlJob,
  type ListCrawlsResult,
  listCrawls,
  type UpsertCrawlResult,
  upsertCrawl,
} from "./crawl-actions";

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

const CrawlContext = createContext<CrawlContextType>({
  // 👁️ See current crawl job
  crawlJob: undefined,
  crawlJobId: null,
  handleCrawlJobId: () => {},
  removeCrawlJobId: () => {},

  //➕ Upsert crawl
  upsertCrawlResult: undefined,
  upsertCrawlMutate: () => {},
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
  deleteCrawlMutate: () => {},

  // 🚮🚮🚮 Delete alls crawls
  deleteAllCrawlsMutate: () => {},
  allCrawlsDeletionIsPending: false,
  allCrawlsDeletionIsError: false,
  allCrawlsDeletionIsSuccess: false,

  // 🚮 Delete a crawl job
  deleteCrawlJobMutate: () => {},
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
// 🪝 Hook
export function useCrawlContext() {
  const context = useContext(CrawlContext);

  if (!context) {
    throw new Error("useCrawlContext must be used within an CrawlProvider");
  }

  return context;
}

// --------------------------------------
// ➕ Upsert crawl

//🪝
function useUpsertCrawl() {
  return useMutation({
    mutationFn: async ({
      url,
      maxDepth,
      maxPages,
      skipResources,
      concurrency,
    }: {
      url: string;
      maxDepth: number;
      maxPages: number;
      skipResources: boolean;
      concurrency: number;
    }) => {
      const result = await upsertCrawl({
        url,
        maxDepth,
        maxPages,
        skipResources,
        concurrency,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
  });
}

// --------------------------------------
// 👁️ See current crawl job
function useCrawlJob() {
  const queryClient = useQueryClient();
  const [crawlJobId, setCrawlJobId] = useQueryState("crawlJobId");

  function handleCrawlJobId(id: string) {
    setCrawlJobId(id);
  }

  function removeCrawlJobId() {
    setCrawlJobId(null);
  }

  const { data } = useQuery({
    enabled: !!crawlJobId,
    queryFn: async () => {
      if (!crawlJobId) return null;
      const result = await getCrawlJob(crawlJobId);
      if (!result.success) {
        removeCrawlJobId();
        throw new Error(result.error);
      }
      return result;
    },
    queryKey: ["crawl-status", crawlJobId],
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 2000;
      // 🥱 Stop polling when job is finished
      if (["completed", "failed", "cancelled"].includes(data.response.status)) {
        queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
        removeCrawlJobId();
        return false;
      }
      return 1000; // Poll every second
    },
    select: (data) => data?.response,
  });

  return {
    crawlJob: data,
    crawlJobId,
    handleCrawlJobId,
    removeCrawlJobId,
  };
}

// --------------------------------------
// 📝 List crawls

function useCrawlsList() {
  const { data: crawls, isLoading } = useQuery({
    queryKey: ["list-crawls"],
    queryFn: async () => {
      const result = await listCrawls();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    select: (data) => data.response,
  });

  return {
    crawls,
    crawlsAreLoading: isLoading,
  };
}

// --------------------------------------
// 🚮 Delete a crawl job

// 🪝
function useDeleteCrawlJob() {
  return useMutation({
    mutationFn: async (crawlJobId: string) => {
      const result = await deleteCrawlJob(crawlJobId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
  });
}

// --------------------------------------
// 🚮 Delete a crawl

// 🪝
function useDeleteCrawl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (crawlId: number) => {
      const result = await deleteCrawl(crawlId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
    },
  });
}

// --------------------------------------
// 🚮🚮🚮 Delete all crawls

// 🪝
function useDeleteAllCrawls() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await deleteAllCrawls();
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-crawls"] });
    },
  });
}
