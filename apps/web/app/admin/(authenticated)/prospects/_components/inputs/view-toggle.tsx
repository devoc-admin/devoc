"use client";

import { MapIcon, TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";

export function ViewToggle() {
  const { viewMode, setViewMode } = useProspectsContext();

  return (
    <div className="flex items-center gap-x-1 rounded-md border bg-muted p-1">
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
    </div>
  );
}

type ToggleButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function ToggleButton({ active, icon, label, onClick }: ToggleButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 rounded px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-sidebar-strong text-foreground shadow-sm"
          : "cursor-pointer text-muted-foreground hover:text-foreground"
      )}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
