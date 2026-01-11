// biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception

import type { UseMutateFunction } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext, useEffect } from "react";
import { toast } from "sonner";
import type { ProspectResult } from "./prospects-actions";
import { useAddProspectMutation } from "./prospects-mutations";
import { useListProspectsQuery } from "./prospects-queries";
import type { ProspectType } from "./prospects-types";

const ProspectsContext = createContext<ProspectsContext>({
  addProspectMutate: () => {},
  isAddedProspect: false,
  isAddingProspect: false,
  prospects: [],
});

export function ProspectsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: prospects } = useListProspectsQuery();

  // ➕ Add prospect
  const {
    mutate: addProspectMutate,
    isPending: isAddingProspect,
    isSuccess: isAddedProspect,
  } = useAddProspectMutation();

  // ✅🍞 Toast success
  useEffect(() => {
    if (isAddedProspect) {
      toast("Prospect ajouté avec succès !", {
        icon: "✅",
        position: "bottom-right",
      });
    }
  }, [isAddedProspect]);

  return (
    <ProspectsContext.Provider
      value={{
        addProspectMutate,
        isAddedProspect,
        isAddingProspect,
        prospects,
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
    },
    unknown
  >;
  isAddingProspect: boolean;
  isAddedProspect: boolean;
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
