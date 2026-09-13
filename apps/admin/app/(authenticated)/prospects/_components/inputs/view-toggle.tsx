"use client";

import { MapIcon, TableIcon } from "lucide-react";
import { Toggle, ToggleButton } from "@/components/ui/toggle";
import { useProspectsContext } from "../../prospects-context";

export function ViewToggle() {
  const { viewMode, setViewMode } = useProspectsContext();

  return (
    <Toggle>
      <ToggleButton
        active={viewMode === "table"}
        icon={<TableIcon size={16} />}
        label="Tableau"
        onClick={() => setViewMode("table")}
      />
      <ToggleButton
        active={viewMode === "map"}
        icon={<MapIcon size={16} />}
        label="Carte"
        onClick={() => setViewMode("map")}
      />
    </Toggle>
  );
}
