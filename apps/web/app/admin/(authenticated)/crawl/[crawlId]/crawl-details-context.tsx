"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
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

  // 🔄 Track recently toggled page IDs (ephemeral, not persisted)
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
    // Auto-clear focus after animation
    setTimeout(() => setFocusedCrawledPageId(null), 5000);
  }, []);

  // 👆 Track hovered page ID for highlight preview (hover, no scroll)
  const [hoveredCrawledPageId, setHoveredCrawledPageId] = useState<
    string | null
  >(null);

  const hoverCrawledPage = useCallback((pageId: string | null) => {
    setHoveredCrawledPageId(pageId);
  }, []);

  // 📄 Filter and sort pages (recently toggled first)
  const { selectedPages, nonSelectedPages } = useMemo(() => {
    if (!crawlDetails?.crawledPages) {
      return { nonSelectedPages: [], selectedPages: [] };
    }

    const selectedPages: CrawledPage[] = [];
    const nonSelectedPages: CrawledPage[] = [];

    for (const page of crawlDetails.crawledPages) {
      if (page.selectedForAudit) {
        selectedPages.push(page);
      } else {
        nonSelectedPages.push(page);
      }
    }

    // Sort: recently toggled pages first
    const sortByRecentlyToggled = (a: CrawledPage, b: CrawledPage) => {
      const aRecent = recentlyToggledIds.has(a.id) ? 1 : 0;
      const bRecent = recentlyToggledIds.has(b.id) ? 1 : 0;
      return bRecent - aRecent;
    };

    selectedPages.sort(sortByRecentlyToggled);
    nonSelectedPages.sort(sortByRecentlyToggled);

    return { nonSelectedPages, selectedPages };
  }, [crawlDetails?.crawledPages, recentlyToggledIds]);

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

  return (
    <CrawlDetailsContext.Provider
      value={{
        // 📖 Crawl details
        crawlDetails,
        error: error?.message ?? "",
        focusCrawledPage,

        // 🎯 Focus page (click - scrolls)
        focusedCrawledPageId,
        hoverCrawledPage,

        // 👆 Hover page (hover - no scroll)
        hoveredCrawledPageId,
        isError,
        isLoading,

        // 🔄 Recently toggled tracking
        markAsRecentlyToggled,
        otherPages: nonSelectedPages,
        recentlyToggledIds,

        // 📄 Filtered pages
        selectedPages,

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
