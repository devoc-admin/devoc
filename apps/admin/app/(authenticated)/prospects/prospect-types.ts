import type { UseMutateFunction } from "@tanstack/react-query";
import type { Prospect } from "@/lib/db/schema";
import type { ProspectResult } from "./prospects-actions";

// biome-ignore lint/suspicious/noEmptyBlockStatements: no-op default for context
const noop = () => {};

export const defaultProspectsContext = {
  // ➕ Add prospect
  addProspectMutate: noop,

  // 🗑️ Delete prospect
  deleteProspectMutate: noop,
  deletingProspectId: undefined,
  editingProspectId: undefined,

  // ✏️ Edit prospect
  editProspectMutate: noop,
  filteredProspects: [],
  isAddedProspect: false,
  isAddingProspect: false,
  isDeletingProspect: false,
  isEditedProspect: false,
  isEditingProspect: false,
  isLaunchingCrawl: false,
  isProspectsLoading: false,
  isUpdatingEstimatedOpportunity: false,

  // ♿ Accessibility settings
  isUpdatingHasAccessibilitySettings: false,

  // 🛠️ Site editor
  isUpdatingSiteEditor: false,

  // 🕷️ Launch crawl
  launchCrawlMutate: noop,
  launchingCrawlProspectId: undefined,

  // 👯 Prospects
  prospects: [],
  searchQuery: "",
  selectedTypeProspect: null,
  setSearchQuery: noop,
  setTypeFilter: noop,
  setViewMode: noop,

  // 🔴 Estimated opportunity
  updateEstimatedOpportunityMutate: noop,
  updateHasAccessibilitySettingsMutate: noop,
  updateSiteEditorMutate: noop,
  updatingEstimatedOpportunityProspectId: undefined,
  updatingHasAccessibilitySettingsProspectId: undefined,
  updatingSiteEditorProspectId: undefined,

  // 🗺️ View mode
  viewMode: "table" as ViewMode,
};

export type ProspectsContext = {
  // 👯 Prospects
  prospects: ProspectResult[] | undefined;
  filteredProspects: ProspectResult[] | undefined;
  isProspectsLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTypeProspect: Prospect["type"] | null;
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

export type ViewMode = "table" | "map";

export type ProspectAddData = {
  name: string;
  website: string;
  location: string;
  type: Prospect["type"];
  latitude?: string;
  longitude?: string;
  inhabitants?: number | null;
  distanceFrom?: number | null;
  siteLaunchYear?: number | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
  usesPanneauPocket?: boolean | null;
  hasDpo?: boolean | null;
  dpoName?: string | null;
  dpoUrl?: string | null;
  referentName?: string | null;
  referentEmail?: string | null;
  referentPhone?: string | null;
  referentLinkedin?: string | null;
};

type ProspectEditData = ProspectAddData & { id: number };
