// biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception
// biome-ignore-all assist/source/useSortedKeys: context requires specific order
import type { UseMutateFunction } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
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

  // ✅🍞 Toast success (add)
  useEffect(() => {
    if (isAddedProspect) {
      toast("Prospect ajouté avec succès !", {
        icon: "✅",
        position: "bottom-right",
      });
    }
  }, [isAddedProspect]);

  // 🗑️ Delete prospect
  const [deletingProspectId, setDeletingProspectId] = useState<
    number | undefined
  >(undefined);
  const {
    mutate: deleteProspectMutateOriginal,
    isPending: isDeletingProspect,
    isSuccess: isDeletedProspect,
    isError: isDeleteProspectError,
  } = useDeleteProspectMutation();

  const deleteProspectMutate = (prospectId: number) => {
    setDeletingProspectId(prospectId);
    deleteProspectMutateOriginal(prospectId);
  };

  // ✅🍞 Toast success/error (delete)
  useEffect(() => {
    if (isDeletedProspect) {
      toast.success("Prospect supprimé avec succès !");
    }
    if (isDeleteProspectError) {
      toast.error("Erreur lors de la suppression du prospect.");
    }
  }, [isDeletedProspect, isDeleteProspectError]);

  // ✏️ Edit prospect
  const [editingProspectId, setEditingProspectId] = useState<
    number | undefined
  >(undefined);
  const {
    mutate: editProspectMutateOriginal,
    isPending: isEditingProspect,
    isSuccess: isEditedProspect,
    isError: isEditProspectError,
  } = useEditProspectMutation();

  const editProspectMutate = (data: {
    id: number;
    name: string;
    website: string;
    location: string;
    type: ProspectType;
    latitude?: string;
    longitude?: string;
  }) => {
    setEditingProspectId(data.id);
    editProspectMutateOriginal(data);
  };

  // ✅🍞 Toast success/error (edit)
  useEffect(() => {
    if (isEditedProspect) {
      toast.success("Prospect modifié avec succès !");
    }
    if (isEditProspectError) {
      toast.error("Erreur lors de la modification du prospect.");
    }
  }, [isEditedProspect, isEditProspectError]);

  // 🎯 Update estimated opportunity
  const [
    updatingEstimatedOpportunityProspectId,
    setUpdatingEstimatedOpportunityProspectId,
  ] = useState<number | undefined>(undefined);
  const {
    mutate: updateEstimatedOpportunityMutateOriginal,
    isPending: isUpdatingEstimatedOpportunity,
    isSuccess: isUpdatedEstimatedOpportunity,
    isError: isUpdateEstimatedOpportunityError,
  } = useUpdateEstimatedOpportunityMutation();

  const updateEstimatedOpportunityMutate = (data: {
    prospectId: number;
    estimatedOpportunity: EstimatedOpportunity;
  }) => {
    setUpdatingEstimatedOpportunityProspectId(data.prospectId);
    updateEstimatedOpportunityMutateOriginal(data);
  };

  // ✅🍞 Toast success/error (update estimated opportunity)
  useEffect(() => {
    if (isUpdatedEstimatedOpportunity) {
      toast.success("Urgence mise à jour avec succès !");
    }
    if (isUpdateEstimatedOpportunityError) {
      toast.error("Erreur lors de la mise à jour de l'urgence.");
    }
  }, [isUpdatedEstimatedOpportunity, isUpdateEstimatedOpportunityError]);

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

type ProspectsContext = {
  prospects: ProspectResult[] | undefined;
  addProspectMutate: UseMutateFunction<
    boolean,
    Error,
    {
      name: string;
      website: string;
      location: string;
      type: ProspectType;
      latitude?: string;
      longitude?: string;
    },
    unknown
  >;
  isAddingProspect: boolean;
  isAddedProspect: boolean;
  editProspectMutate: (data: {
    id: number;
    name: string;
    website: string;
    location: string;
    type: ProspectType;
    latitude?: string;
    longitude?: string;
  }) => void;
  editingProspectId: number | undefined;
  isEditingProspect: boolean;
  isEditedProspect: boolean;
  deleteProspectMutate: (prospectId: number) => void;
  deletingProspectId: number | undefined;
  isDeletingProspect: boolean;
  updateEstimatedOpportunityMutate: (data: {
    prospectId: number;
    estimatedOpportunity: EstimatedOpportunity;
  }) => void;
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
