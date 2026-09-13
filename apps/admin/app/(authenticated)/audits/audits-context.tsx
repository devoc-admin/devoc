/** biome-ignore-all assist/source/useSortedKeys: needs specific order here */
"use client";
import type { UseMutateFunction } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateAuditResult, ListAuditsResult } from "./audits-actions";
import { useCreateAudit, useDeleteAudit } from "./audits-mutations";
import { useAuditsList } from "./audits-queries";

/** biome-ignore lint/suspicious/noEmptyBlockStatements: special case */
function emptyFn() {}

const AuditsContext = createContext<AuditsContextType>({
  // ➕ Create audit
  createAuditResult: undefined,
  createAuditMutate: emptyFn,
  createAuditIsPending: false,
  createAuditIsError: false,
  createAuditIsSuccess: false,
  createAuditError: "",

  // 📝 Audits
  audits: [],
  auditsAreLoading: false,

  // 🔍 Filter
  searchAudit: "",
  selectedTypeProspect: null,
  handleSearchAudit: emptyFn,
  handleTypeFilter: emptyFn,

  // 🚮 Delete an audit
  deletingAuditId: undefined,
  auditDeletionIsPending: false,
  deleteAuditMutate: emptyFn,

  // 🔒 Lock actions
  lockActions: false,
});

export function AuditsProvider({ children }: { children: React.ReactNode }) {
  // ➕ Create audit
  const {
    mutate: createAuditMutate,
    data: createAuditResult,
    isPending: createAuditIsPending,
    isError: createAuditIsError,
    isSuccess: createAuditIsSuccess,
    error: createAuditError,
  } = useCreateAudit();

  // 📝 List audits
  const { audits, auditsAreLoading } = useAuditsList();

  // 🔍 Search audits
  const [searchAudit, setSearchAuditQuery] = useState("");
  const [selectedTypeProspect, setTypeFilter] = useState<
    "rgaa" | "wcag" | null
  >(null);

  const handleSearchAudit = (query: string) => {
    setSearchAuditQuery(query);
  };

  const handleTypeFilter = (type: "rgaa" | "wcag" | null) => {
    setTypeFilter(type);
  };

  const filteredAudits = audits
    ? audits.filter((audit) => {
        // Filter by type
        if (selectedTypeProspect && audit.type !== selectedTypeProspect)
          return false;

        // Filter by search query
        if (!searchAudit.trim()) return true;
        const query = searchAudit.toLowerCase();
        return (
          audit.name?.toLowerCase().includes(query) ||
          audit.url?.toLowerCase().includes(query)
        );
      })
    : undefined;

  // 🚮 Delete an audit
  const {
    mutate: deleteAuditMutate,
    isPending: auditDeletionIsPending,
    variables: deletingAuditId,
  } = useDeleteAudit();

  // 🔒 Lock action
  const lockActions = createAuditIsPending || auditDeletionIsPending;

  // ✅🍞 Toast success on create
  useEffect(() => {
    if (createAuditIsSuccess) {
      toast("Audit créé avec succès !", {
        icon: "✅",
        position: "bottom-right",
      });
    }
  }, [createAuditIsSuccess]);

  // ⛔🍞 Toast error on create
  useEffect(() => {
    if (createAuditIsError) {
      toast("Une erreur est survenue lors de la création de l'audit", {
        description: createAuditError?.message,
        icon: "❌",
        position: "bottom-right",
      });
    }
  }, [createAuditIsError, createAuditError]);

  return (
    <AuditsContext.Provider
      value={{
        // ➕ Create audit
        createAuditMutate,
        createAuditResult,
        createAuditIsPending,
        createAuditIsError,
        createAuditIsSuccess,
        createAuditError: createAuditError?.message ?? "",

        // 📝 Audits
        audits: filteredAudits,
        auditsAreLoading,

        // 🔍 Filter
        searchAudit,
        selectedTypeProspect,
        handleSearchAudit,
        handleTypeFilter,

        // 🚮 Delete an audit
        deletingAuditId,
        deleteAuditMutate,
        auditDeletionIsPending,

        // 🔒 Lock actions
        lockActions,
      }}
    >
      {children}
    </AuditsContext.Provider>
  );
}

// --------------------------------------
// 🔠 Types
type AuditsContextType = {
  // ➕ Create audit
  createAuditResult: CreateAuditResult | undefined;
  createAuditMutate: UseMutateFunction<
    CreateAuditResult,
    Error,
    {
      url: string;
      name?: string;
      type: "rgaa" | "wcag";
    },
    unknown
  >;
  createAuditIsPending: boolean;
  createAuditIsError: boolean;
  createAuditIsSuccess: boolean;
  createAuditError: string;

  // 📝 Audits
  audits?: ListAuditsResult;
  auditsAreLoading: boolean;

  // 🔍 Filter
  searchAudit: string;
  selectedTypeProspect: "rgaa" | "wcag" | null;
  handleSearchAudit: (query: string) => void;
  handleTypeFilter: (type: "rgaa" | "wcag" | null) => void;

  // 🚮 Delete an audit
  deletingAuditId: string | undefined;
  auditDeletionIsPending: boolean;
  deleteAuditMutate: UseMutateFunction<boolean, Error, string, unknown>;

  // 🔒 Lock actions
  lockActions: boolean;
};

// --------------------------------------
// 🪝 Hook
export function useAuditsContext() {
  const context = useContext(AuditsContext);

  if (!context) {
    throw new Error("useAuditsContext must be used within an AuditsProvider");
  }

  return context;
}
