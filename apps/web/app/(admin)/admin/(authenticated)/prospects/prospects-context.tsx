// biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception
// biome-ignore-all assist/source/useSortedKeys: context requires specific order
"use client";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Prospect } from "@/lib/db/schema";
import {
  defaultProspectsContext,
  type ProspectsContext,
  type ViewMode,
} from "./prospect-types";
import {
  useAddProspectMutation,
  useDeleteProspectMutation,
  useEditProspectMutation,
  useLaunchCrawlMutation,
  useUpdateEstimatedOpportunityMutation,
  useUpdateHasAccessibilitySettingsMutation,
  useUpdateSiteEditorMutation,
} from "./prospects-mutations";
import { useListProspectsQuery } from "./prospects-queries";

const ProspectsReactContext = createContext<ProspectsContext>(
  defaultProspectsContext
);

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
  const [selectedTypeProspect, setTypeFilter] = useState<
    Prospect["type"] | null
  >(null);

  // 🗺️ View mode (synced with URL query param via nuqs)
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringLiteral(viewModes).withDefault("table")
  );

  const filteredProspects = useMemo(() => {
    let filtered = prospects ?? [];

    // Filter by type
    if (selectedTypeProspect) {
      filtered = filtered.filter(
        (prospect) => prospect.type === selectedTypeProspect
      );
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
  }, [prospects, searchQuery, selectedTypeProspect]);

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
    <ProspectsReactContext.Provider
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
        prospects,
        filteredProspects,
        searchQuery,
        setSearchQuery,
        setTypeFilter,
        setViewMode,
        selectedTypeProspect,

        // 🎯 Update estimated opportunity
        updateEstimatedOpportunityMutate,
        updatingEstimatedOpportunityProspectId,

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
    </ProspectsReactContext.Provider>
  );
}

// -------------------------
// 🪝 Hooks
export const useProspectsContext = () => {
  const context = useContext(ProspectsReactContext);
  if (!context) {
    throw new Error(
      "useProspectsContext must be used within a ProspectsContextProvider"
    );
  }
  return context;
};
