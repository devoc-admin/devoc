// biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception
// biome-ignore-all assist/source/useSortedKeys: context requires specific order
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Prospect } from "@/lib/db/schema";
import type { ProspectResult } from "./prospects-actions";
import {
  useAddProspectMutation,
  useDeleteProspectMutation,
  useEditProspectMutation,
  useLaunchCrawlMutation,
  useUpdateEstimatedOpportunityMutation,
  useUpdateHasAccessibilitySettingsMutation,
  useUpdateSiteEditorMutation,
  useUpdateSiteLaunchedAtMutation,
} from "./prospects-mutations";
import { useListProspectsQuery } from "./prospects-queries";

const ProspectsContext = createContext<ProspectsContext>({
  // ➕ Add prospect
  addProspectMutate: () => {},

  // 🗑️ Delete prospect
  deleteProspectMutate: () => {},
  deletingProspectId: undefined,
  editingProspectId: undefined,

  // ✏️ Edit prospect
  editProspectMutate: () => {},
  isAddedProspect: false,
  isAddingProspect: false,
  isDeletingProspect: false,
  isEditedProspect: false,
  isEditingProspect: false,
  isLaunchingCrawl: false,
  isProspectsLoading: false,
  isUpdatingEstimatedOpportunity: false,

  // 🕷️ Launch crawl
  launchCrawlMutate: () => {},
  launchingCrawlProspectId: undefined,

  // 👯 Prospects
  prospects: [],
  searchQuery: "",
  setSearchQuery: () => {},
  setTypeFilter: () => {},
  setViewMode: () => {},
  typeFilter: null,

  // 🔴 Estimated opportunity
  updateEstimatedOpportunityMutate: () => {},
  updatingEstimatedOpportunityProspectId: undefined,

  // 📅 Site launched date
  isUpdatingSiteLaunchedAt: false,
  updateSiteLaunchedAtMutate: () => {},
  updatingSiteLaunchedAtProspectId: undefined,

  // 🛠️ Site editor
  isUpdatingSiteEditor: false,
  updateSiteEditorMutate: () => {},
  updatingSiteEditorProspectId: undefined,

  // ♿ Accessibility settings
  isUpdatingHasAccessibilitySettings: false,
  updateHasAccessibilitySettingsMutate: () => {},
  updatingHasAccessibilitySettingsProspectId: undefined,

  // 🗺️ View mode
  viewMode: "table",
});

const viewModes: ViewMode[] = ["table", "map"] as const;

export function ProspectsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: prospects, isLoading: isProspectsLoading } =
    useListProspectsQuery();

  // 🔍 Search
  const [searchQuery, setSearchQuery] = useState("");

  // 🏷️ Type filter
  const [typeFilter, setTypeFilter] = useState<Prospect["type"] | null>(null);

  // 🗺️ View mode (synced with URL query param via nuqs)
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringLiteral(viewModes).withDefault("table")
  );

  const filteredProspects = useMemo(() => {
    let filtered = prospects ?? [];

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((prospect) => prospect.type === typeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((prospect) => {
        const name = prospect.name?.toLowerCase() ?? "";
        const type = prospect.type?.toLowerCase() ?? "";
        const website = prospect.website?.toLowerCase() ?? "";

        return (
          name.includes(query) ||
          type.includes(query) ||
          website.includes(query)
        );
      });
    }

    return filtered;
  }, [prospects, searchQuery, typeFilter]);

  // ➕ Add prospect
  const {
    mutate: addProspectMutate,
    isPending: isAddingProspect,
    isSuccess: isAddedProspect,
  } = useAddProspectMutation();

  // ✏️ Edit prospect
  const {
    mutate: editProspectMutate,
    isPending: isEditingProspect,
    isSuccess: isEditedProspect,
    variables: editingProspectVariables,
  } = useEditProspectMutation();
  const editingProspectId = editingProspectVariables?.id;

  // 🗑️ Delete prospect
  const {
    mutate: deleteProspectMutate,
    isPending: isDeletingProspect,
    variables: deletingProspectId,
  } = useDeleteProspectMutation();

  // 🎯 Update estimated opportunity
  const {
    mutate: updateEstimatedOpportunityMutate,
    isPending: isUpdatingEstimatedOpportunity,
    variables: updatingEstimatedOpportunityVariables,
  } = useUpdateEstimatedOpportunityMutation();

  const updatingEstimatedOpportunityProspectId =
    updatingEstimatedOpportunityVariables?.prospectId;

  // 📅 Update site launched date
  const {
    mutate: updateSiteLaunchedAtMutate,
    isPending: isUpdatingSiteLaunchedAt,
    variables: updatingSiteLaunchedAtVariables,
  } = useUpdateSiteLaunchedAtMutation();

  const updatingSiteLaunchedAtProspectId =
    updatingSiteLaunchedAtVariables?.prospectId;

  // 🛠️ Update site editor
  const {
    mutate: updateSiteEditorMutate,
    isPending: isUpdatingSiteEditor,
    variables: updatingSiteEditorVariables,
  } = useUpdateSiteEditorMutation();

  const updatingSiteEditorProspectId = updatingSiteEditorVariables?.prospectId;

  // ♿ Update accessibility settings flag
  const {
    mutate: updateHasAccessibilitySettingsMutate,
    isPending: isUpdatingHasAccessibilitySettings,
    variables: updatingHasAccessibilitySettingsVariables,
  } = useUpdateHasAccessibilitySettingsMutation();

  const updatingHasAccessibilitySettingsProspectId =
    updatingHasAccessibilitySettingsVariables?.prospectId;

  // 🕷️ Launch crawl
  const {
    mutate: launchCrawlMutate,
    isPending: isLaunchingCrawl,
    variables: launchingCrawlVariables,
  } = useLaunchCrawlMutation();

  const launchingCrawlProspectId = launchingCrawlVariables?.prospectId;

  return (
    <ProspectsContext.Provider
      value={{
        // ➕ Add prospect
        addProspectMutate,

        // 🗑️ Delete prospect
        deleteProspectMutate,
        deletingProspectId,
        editingProspectId,

        // ✏️ Edit prospect
        editProspectMutate,
        isAddedProspect,
        isAddingProspect,
        isDeletingProspect,
        isEditedProspect,
        isEditingProspect,
        isLaunchingCrawl,
        isProspectsLoading,
        isUpdatingEstimatedOpportunity,

        // 🕷️ Launch crawl
        launchCrawlMutate,
        launchingCrawlProspectId,

        // 👯  Prospects
        prospects: filteredProspects,
        searchQuery,
        setSearchQuery,
        setTypeFilter,
        setViewMode,
        typeFilter,

        // 🎯 Update estimated opportunity
        updateEstimatedOpportunityMutate,
        updatingEstimatedOpportunityProspectId,

        // 📅 Update site launched date
        isUpdatingSiteLaunchedAt,
        updateSiteLaunchedAtMutate,
        updatingSiteLaunchedAtProspectId,

        // 🛠️ Update site editor
        isUpdatingSiteEditor,
        updateSiteEditorMutate,
        updatingSiteEditorProspectId,

        // ♿ Update accessibility settings flag
        isUpdatingHasAccessibilitySettings,
        updateHasAccessibilitySettingsMutate,
        updatingHasAccessibilitySettingsProspectId,

        // 🗺️ View mode
        viewMode,
      }}
    >
      {children}
    </ProspectsContext.Provider>
  );
}

type ProspectAddData = {
  name: string;
  website: string;
  location: string;
  type: Prospect["type"];
  latitude?: string;
  longitude?: string;
  inhabitants?: number | null;
  distanceFrom?: number | null;
  siteLaunchedAt?: string | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
};

type ProspectEditData = ProspectAddData & { id: number };

type ProspectsContext = {
  // 👯 Prospects
  prospects: ProspectResult[] | undefined;
  isProspectsLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: Prospect["type"] | null;
  setTypeFilter: (type: Prospect["type"] | null) => void;

  // ➕ Add prospect
  addProspectMutate: UseMutateFunction<
    boolean,
    Error,
    ProspectAddData,
    unknown
  >;
  isAddingProspect: boolean;
  isAddedProspect: boolean;

  // ✏️ Edit prospect
  editProspectMutate: UseMutateFunction<
    boolean,
    Error,
    ProspectEditData,
    unknown
  >;
  editingProspectId: number | undefined;
  isEditingProspect: boolean;
  isEditedProspect: boolean;

  // 🗑️ Delete prospect
  deleteProspectMutate: UseMutateFunction<boolean, Error, number, unknown>;
  deletingProspectId: number | undefined;
  isDeletingProspect: boolean;

  // 🔴 Estimated opportunity
  updateEstimatedOpportunityMutate: UseMutateFunction<
    boolean,
    Error,
    {
      prospectId: number;
      estimatedOpportunity: Prospect["estimatedOpportunity"];
    },
    unknown
  >;
  updatingEstimatedOpportunityProspectId: number | undefined;
  isUpdatingEstimatedOpportunity: boolean;

  // 📅 Site launched date
  updateSiteLaunchedAtMutate: UseMutateFunction<
    boolean,
    Error,
    { prospectId: number; siteLaunchedAt: string | null },
    unknown
  >;
  updatingSiteLaunchedAtProspectId: number | undefined;
  isUpdatingSiteLaunchedAt: boolean;

  // 🛠️ Site editor
  updateSiteEditorMutate: UseMutateFunction<
    boolean,
    Error,
    { prospectId: number; siteEditor: string | null },
    unknown
  >;
  updatingSiteEditorProspectId: number | undefined;
  isUpdatingSiteEditor: boolean;

  // ♿ Accessibility settings flag
  updateHasAccessibilitySettingsMutate: UseMutateFunction<
    boolean,
    Error,
    { prospectId: number; hasAccessibilitySettings: boolean | null },
    unknown
  >;
  updatingHasAccessibilitySettingsProspectId: number | undefined;
  isUpdatingHasAccessibilitySettings: boolean;

  // 🕷️ Launch crawl
  launchCrawlMutate: UseMutateFunction<
    { crawlId: string },
    Error,
    { prospectId: number; website: string },
    unknown
  >;
  launchingCrawlProspectId: number | undefined;
  isLaunchingCrawl: boolean;

  // 🗺️ View mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

type ViewMode = "table" | "map";

// -------------------------
// 🪝 Hooks
export const useProspectsContext = () => {
  const context = useContext(ProspectsContext);
  if (!context) {
    throw new Error(
      "useProspectsContext must be used within a ProspectsContextProvider"
    );
  }
  return context;
};

// Distinct list of editor names already used across prospects (unfiltered).
// Used by the EditorCombobox to suggest values that are already saved.
export const useExistingEditors = () => {
  const { data: allProspects } = useListProspectsQuery();
  return useMemo(() => {
    const set = new Set<string>();
    for (const p of allProspects ?? []) {
      const trimmed = p.siteEditor?.trim();
      if (trimmed) set.add(trimmed);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [allProspects]);
};
