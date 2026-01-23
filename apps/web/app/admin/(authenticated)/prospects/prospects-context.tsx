// biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception
// biome-ignore-all assist/source/useSortedKeys: context requires specific order
import type { UseMutateFunction } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { createContext, type ReactNode, useContext, useState } from "react";
import type { ProspectResult } from "./prospects-actions";
import {
  useAddProspectMutation,
  useDeleteProspectMutation,
  useEditProspectMutation,
  useUpdateEstimatedOpportunityMutation,
} from "./prospects-mutations";
import { useListProspectsQuery } from "./prospects-queries";
import type { EstimatedOpportunity, ProspectType } from "./prospects-types";

const ProspectsContext = createContext<ProspectsContext>({
  addProspectMutate: () => {},
  deleteProspectMutate: () => {},
  deletingProspectId: undefined,
  editProspectMutate: () => {},
  editingProspectId: undefined,
  isAddedProspect: false,
  isAddingProspect: false,
  isDeletingProspect: false,
  isEditedProspect: false,
  isEditingProspect: false,
  isUpdatingEstimatedOpportunity: false,
  prospects: [],
  searchQuery: "",
  setSearchQuery: () => {},
  setViewMode: () => {},
  updateEstimatedOpportunityMutate: () => {},
  updatingEstimatedOpportunityProspectId: undefined,
  viewMode: "list",
});

const viewModes = ["list", "map"] as const;

export function ProspectsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: prospects } = useListProspectsQuery();

  // 🔍 Search
  const [searchQuery, setSearchQuery] = useState("");

  // 🗺️ View mode (synced with URL query param via nuqs)
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringLiteral(viewModes).withDefault("list")
  );

  // ➕ Add prospect
  const {
    mutate: addProspectMutate,
    isPending: isAddingProspect,
    isSuccess: isAddedProspect,
  } = useAddProspectMutation();

  // 🗑️ Delete prospect
  const {
    mutate: deleteProspectMutate,
    isPending: isDeletingProspect,
    variables: deletingProspectId,
  } = useDeleteProspectMutation();

  // ✏️ Edit prospect
  const {
    mutate: editProspectMutate,
    isPending: isEditingProspect,
    isSuccess: isEditedProspect,
    variables: editingProspectVariables,
  } = useEditProspectMutation();

  const editingProspectId = editingProspectVariables?.id;

  // 🎯 Update estimated opportunity
  const {
    mutate: updateEstimatedOpportunityMutate,
    isPending: isUpdatingEstimatedOpportunity,
    variables: updatingEstimatedOpportunityVariables,
  } = useUpdateEstimatedOpportunityMutation();

  const updatingEstimatedOpportunityProspectId =
    updatingEstimatedOpportunityVariables?.prospectId;

  return (
    <ProspectsContext.Provider
      value={{
        // ➕ Add prospect
        addProspectMutate,
        isAddedProspect,
        isAddingProspect,

        // ✏️ Edit prospect
        editProspectMutate,
        editingProspectId,
        isEditedProspect,
        isEditingProspect,

        // 🗑️ Delete prospect
        deleteProspectMutate,
        deletingProspectId,
        isDeletingProspect,

        // 🎯 Update estimated opportunity
        isUpdatingEstimatedOpportunity,
        updateEstimatedOpportunityMutate,
        updatingEstimatedOpportunityProspectId,

        // 📋 Prospects
        prospects,

        //🔍 Search prospects
        searchQuery,
        setSearchQuery,

        // 🗺️ View mode
        setViewMode,
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
  type: ProspectType;
  latitude?: string;
  longitude?: string;
};

type ProspectEditData = ProspectAddData & { id: number };

type ProspectsContext = {
  prospects: ProspectResult[] | undefined;
  addProspectMutate: UseMutateFunction<
    boolean,
    Error,
    ProspectAddData,
    unknown
  >;
  isAddingProspect: boolean;
  isAddedProspect: boolean;
  editProspectMutate: UseMutateFunction<
    boolean,
    Error,
    ProspectEditData,
    unknown
  >;
  editingProspectId: number | undefined;
  isEditingProspect: boolean;
  isEditedProspect: boolean;
  deleteProspectMutate: UseMutateFunction<boolean, Error, number, unknown>;
  deletingProspectId: number | undefined;
  isDeletingProspect: boolean;
  updateEstimatedOpportunityMutate: UseMutateFunction<
    boolean,
    Error,
    { prospectId: number; estimatedOpportunity: EstimatedOpportunity },
    unknown
  >;
  updatingEstimatedOpportunityProspectId: number | undefined;
  isUpdatingEstimatedOpportunity: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
};

// -------------------------
//🪝 Hooks
export const useProspectsContext = () => {
  const context = useContext(ProspectsContext);
  if (!context) {
    throw new Error(
      "useProspectsContext must be used within a ProspectsContextProvider"
    );
  }
  return context;
};
