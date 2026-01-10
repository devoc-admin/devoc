// biome-ignore-all assist/source/useSortedKeys: exception
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import type { CrawledPage } from "@/lib/db/schema";
import type { CrawlDetailsResult, PageCategory } from "./crawl-details-actions";
import {
  useToggleAuditSelectionMutation,
  useUpdatePageCategoryMutation,
} from "./crawl-details-mutations";
import { useCrawlDetailsQuery } from "./crawl-details-queries";

export function CrawlDetailsProvider({
  crawlId,
  children,
}: CrawlDetailsProviderProps) {
  // 📖 Fetch crawl details
  const {
    data: crawlDetails,
    isLoading,
    isError,
    error,
  } = useCrawlDetailsQuery({ crawlId });

  // 🔄 Track recently toggled page IDs
  const [recentlyToggledIds, setRecentlyToggledIds] = useState<Set<string>>(
    new Set()
  );

  const markAsRecentlyToggled = useCallback((pageId: string) => {
    setRecentlyToggledIds((prev) => new Set(prev).add(pageId));
  }, []);

  // 🎯 Track focused page ID for scroll-to-card feature (click)
  const [focusedCrawledPageId, setFocusedCrawledPageId] = useState<
    string | null
  >(null);

  const focusCrawledPage = useCallback((pageId: string) => {
    setFocusedCrawledPageId(pageId);
    setTimeout(() => setFocusedCrawledPageId(null), 5000);
  }, []);

  // 👆 Track hovered page ID for highlight preview
  const [hoveredCrawledPageId, setHoveredCrawledPageId] = useState<
    string | null
  >(null);

  const hoverCrawledPage = useCallback((pageId: string | null) => {
    setHoveredCrawledPageId(pageId);
  }, []);

  // 🔍 Search state
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // 🏷️ Category filter state
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<PageCategory | null>(null);

  // 🌐 Filter by HTTP status range
  const [selectedHttpStatusFilter, setSelectedHttpStatusFilter] =
    useState<HttpStatusRange | null>(null);

  const [hoveredHttpStatusRange, setHoveredHttpStatusRange] =
    useState<HttpStatusRange | null>(null);

  // 📄 Filter and sort pages (recently toggled first, then search filter)
  const { selectedPages, nonSelectedPages } = useMemo(() => {
    if (!crawlDetails?.crawledPages) {
      return { nonSelectedPages: [], selectedPages: [] };
    }

    const selectedPages: CrawledPage[] = [];
    const nonSelectedPages: CrawledPage[] = [];

    // 🔍 Filter by search query
    const normalizedQuery = deferredSearchQuery.toLowerCase().trim();

    for (const page of crawlDetails.crawledPages) {
      if (!matchesSearch(page, normalizedQuery)) continue;
      if (!matchesCategory(page, selectedCategoryFilter)) continue;
      if (!matchesHttpStatus(page, selectedHttpStatusFilter)) continue;
      if (page.selectedForAudit) {
        selectedPages.push(page);
      } else {
        nonSelectedPages.push(page);
      }
    }

    // ↕️ Sort: recently toggled pages first
    const sortByRecentlyToggled = (a: CrawledPage, b: CrawledPage) => {
      const aRecent = recentlyToggledIds.has(a.id) ? 1 : 0;
      const bRecent = recentlyToggledIds.has(b.id) ? 1 : 0;
      return bRecent - aRecent;
    };

    selectedPages.sort(sortByRecentlyToggled);
    nonSelectedPages.sort(sortByRecentlyToggled);

    return { nonSelectedPages, selectedPages };
  }, [
    crawlDetails?.crawledPages,
    recentlyToggledIds,
    deferredSearchQuery,
    selectedCategoryFilter,
    selectedHttpStatusFilter,
  ]);

  // 🏷️ Update category mutation
  const {
    mutate: updateCategoryMutate,
    variables: categoryVariables,
    isPending: isCategoryPending,
  } = useUpdatePageCategoryMutation({ crawlId });

  // 🔛 Toggle audit selection mutation
  const {
    mutate: toggleAuditMutate,
    variables: auditVariables,
    isPending: isAuditPending,
  } = useToggleAuditSelectionMutation({ crawlId });

  //  🟡 Compute which categories have at least one selected-for-audit page (from raw data, not filtered)
  const coveredCategories = useMemo(() => {
    const categories = new Set<PageCategory>();
    if (!crawlDetails?.crawledPages) return categories;
    for (const page of crawlDetails.crawledPages) {
      if (page.selectedForAudit) {
        categories.add(page.category);
      }
    }
    return categories;
  }, [crawlDetails?.crawledPages]);

  // 🛜 Compute HTTP status range counts
  const httpStatusCounts = useMemo(() => {
    const counts: Record<HttpStatusRange, number> = {
      "1xx": 0,
      "2xx": 0,
      "3xx": 0,
      "4xx": 0,
      "5xx": 0,
    };
    if (!crawlDetails?.crawledPages) return counts;
    for (const page of crawlDetails.crawledPages) {
      const range = getHttpStatusRange(page.httpStatus);
      if (range) {
        counts[range]++;
      }
    }
    return counts;
  }, [crawlDetails?.crawledPages]);

  function handleCategoryClick(category: PageCategory) {
    // 🔛 Toggle: click again to clear the filter
    if (selectedCategoryFilter === category) {
      setSelectedCategoryFilter(null);
    } else {
      setSelectedCategoryFilter(category);
    }
  }

  function handleHttpStatusClick(range: HttpStatusRange) {
    // Toggle: click again to clear the filter
    if (selectedHttpStatusFilter === range) {
      setSelectedHttpStatusFilter(null);
    } else {
      setSelectedHttpStatusFilter(range);
    }
  }

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategoryFilter(null);
    setSelectedHttpStatusFilter(null);
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategoryFilter !== null ||
    selectedHttpStatusFilter !== null;

  return (
    <CrawlDetailsContext.Provider
      value={{
        // 📖 Crawl details
        crawlDetails,
        error: error?.message ?? "",
        focusCrawledPage,

        // 🎯 Focus page (click - scrolls)
        focusedCrawledPageId,
        getHttpStatusRange,
        hoverCrawledPage,

        // 👆 Hover page (hover - no scroll)
        hoveredCrawledPageId,
        hoveredHttpStatusRange,
        isError,
        isLoading,

        // 🔄 Recently toggled tracking
        markAsRecentlyToggled,
        otherPages: nonSelectedPages,
        recentlyToggledIds,

        // 🔍 Search
        searchQuery,

        // 🟡🏷️ Category filter
        selectedCategoryFilter,
        coveredCategories,

        // 🌐 HTTP status filter
        selectedHttpStatusFilter,
        httpStatusCounts,

        // 📄 Filtered pages
        selectedPages,
        setHoveredHttpStatusRange,
        setSearchQuery,
        setSelectedCategoryFilter,
        setSelectedHttpStatusFilter,

        handleCategoryClick,
        handleHttpStatusClick,
        handleResetFilters,
        hasActiveFilters,

        // 🔛 Toggle audit selection
        toggleAuditMutate,
        togglingAuditPageId: isAuditPending
          ? auditVariables?.crawledPageId
          : undefined,

        // 🏷️ Update category
        updateCategoryMutate,
        updatingCategoryPageId: isCategoryPending
          ? categoryVariables?.crawledPageId
          : undefined,
      }}
    >
      {children}
    </CrawlDetailsContext.Provider>
  );
}

// --------------------------------------
// 🔠 Types

type CrawlDetailsContextType = {
  // 📖 Crawl details
  crawlDetails: CrawlDetailsResult | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string;

  // 📄 Filtered pages
  selectedPages: CrawledPage[];
  otherPages: CrawledPage[];

  // 🔍 Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // 🟡🏷️ Category filter
  selectedCategoryFilter: PageCategory | null;
  setSelectedCategoryFilter: (category: PageCategory | null) => void;
  coveredCategories: Set<PageCategory>;

  // 🌐 HTTP status filter
  selectedHttpStatusFilter: HttpStatusRange | null;
  setSelectedHttpStatusFilter: (range: HttpStatusRange | null) => void;
  hoveredHttpStatusRange: HttpStatusRange | null;
  setHoveredHttpStatusRange: (range: HttpStatusRange | null) => void;
  getHttpStatusRange: (status: number | null) => HttpStatusRange | null;
  httpStatusCounts: Record<HttpStatusRange, number>;

  // 🔄 Recently toggled tracking
  recentlyToggledIds: Set<string>;
  markAsRecentlyToggled: (pageId: string) => void;

  // 🎯 Focus page (click - scrolls)
  focusedCrawledPageId: string | null;
  focusCrawledPage: (pageId: string) => void;

  // 👆 Hover page (hover - no scroll)
  hoveredCrawledPageId: string | null;
  hoverCrawledPage: (pageId: string | null) => void;

  // 🏷️ Update category
  updateCategoryMutate: UseMutateFunction<
    void,
    Error,
    { crawledPageId: string; category: PageCategory },
    { previousData: CrawlDetailsResult | undefined }
  >;
  updatingCategoryPageId: string | undefined;

  // ✅ Toggle audit selection
  toggleAuditMutate: UseMutateFunction<
    void,
    Error,
    { crawledPageId: string; selected: boolean },
    { previousData: CrawlDetailsResult | undefined }
  >;
  togglingAuditPageId: string | undefined;

  // 🏷️ Handle category click
  handleCategoryClick: (category: PageCategory) => void;

  // 🏷️ Handle HTTP status click
  handleHttpStatusClick: (range: HttpStatusRange) => void;

  // 🏷️ Handle reset filters
  handleResetFilters: () => void;

  // 🏷️ Check if filters are active
  hasActiveFilters: boolean;
};

const CrawlDetailsContext = createContext<CrawlDetailsContextType | null>(null);

type CrawlDetailsProviderProps = {
  crawlId: number;
  children: React.ReactNode;
};

// --------------------------------------
// 🪝 Hook
export function useCrawlDetailsContext() {
  const context = useContext(CrawlDetailsContext);

  if (!context) {
    throw new Error(
      "useCrawlDetailsContext must be used within a CrawlDetailsProvider"
    );
  }

  return context;
}

// --------------------------------------
// 🛜 HTTP Status
export type HttpStatusRange = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

function getHttpStatusRange(status: number | null): HttpStatusRange | null {
  if (status === null) return null;
  if (status >= 100 && status < 200) return "1xx";
  if (status >= 200 && status < 300) return "2xx";
  if (status >= 300 && status < 400) return "3xx";
  if (status >= 400 && status < 500) return "4xx";
  if (status >= 500 && status < 600) return "5xx";
  return null;
}

// --------------------------------------
// 🔍 Search

// 🔠 Search
function matchesSearch(page: CrawledPage, query: string) {
  if (!query) return true;
  const searchableFields = [
    page.title,
    page.url,
    page.category,
    page.httpStatus?.toString(),
  ];
  return searchableFields.some((field) => field?.toLowerCase().includes(query));
}

// 🏷️ Filter by category
const matchesCategory = (page: CrawledPage, category: string | null) => {
  if (!category) return true;
  return page.category === category;
};

// 🌐 Filter by HTTP status range
const matchesHttpStatus = (
  page: CrawledPage,
  httpStatus: HttpStatusRange | null
) => {
  if (!httpStatus) return true;
  return getHttpStatusRange(page.httpStatus) === httpStatus;
};
