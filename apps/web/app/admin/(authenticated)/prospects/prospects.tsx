"use client";
import { ProspectsList } from "./_components/prospects-list";
import { ProspectsContextProvider } from "./prospects-context";

export function Prospects() {
  return (
    <ProspectsContextProvider>
      <ProspectsList />
    </ProspectsContextProvider>
  );
}
