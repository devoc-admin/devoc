import { useMemo } from "react";
import { useListProspectsQuery } from "../../../prospects-queries";

export function useExistingEditors() {
  const { data: allProspects } = useListProspectsQuery();
  return useMemo(() => {
    const set = new Set<string>();
    for (const p of allProspects ?? []) {
      const trimmed = p.siteEditor?.trim();
      if (trimmed) set.add(trimmed);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [allProspects]);
}
