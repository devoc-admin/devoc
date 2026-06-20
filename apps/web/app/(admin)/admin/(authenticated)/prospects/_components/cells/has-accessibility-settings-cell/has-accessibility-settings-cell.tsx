"use client";
import { ChevronDownIcon, LoaderIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../../prospects-context";

type AccessibilityValue = "unknown" | "yes" | "no";

const LABELS: Record<AccessibilityValue, string> = {
  no: "Non",
  unknown: "N.r.",
  yes: "Oui",
};

const COLORS: Record<AccessibilityValue, string> = {
  no: "bg-red-500/10 text-red-400 hover:bg-red-500/15",
  unknown: "bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/15",
  yes: "bg-green-500/10 text-green-400 hover:bg-green-500/15",
};

function toFormValue(value: boolean | null): AccessibilityValue {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "unknown";
}

function toDbValue(value: AccessibilityValue): boolean | null {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
}

export function HasAccessibilitySettingsCell({
  prospectId,
  value,
}: {
  prospectId: number;
  value: boolean | null;
}) {
  const {
    updateHasAccessibilitySettingsMutate,
    updatingHasAccessibilitySettingsProspectId,
    isUpdatingHasAccessibilitySettings,
  } = useProspectsContext();

  const current = toFormValue(value);
  const isPending =
    isUpdatingHasAccessibilitySettings &&
    updatingHasAccessibilitySettingsProspectId === prospectId;

  function handleChange(newValue: string) {
    const next = toDbValue(newValue as AccessibilityValue);
    if (next === value) return;
    updateHasAccessibilitySettingsMutate({
      hasAccessibilitySettings: next,
      prospectId,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1 font-medium text-xs transition-colors",
            COLORS[current]
          )}
          disabled={isPending}
          type="button"
        >
          {isPending && <LoaderIcon className="size-3 animate-spin" />}
          <span>{LABELS[current]}</span>
          <ChevronDownIcon className="ml-auto" size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup onValueChange={handleChange} value={current}>
          <DropdownMenuRadioItem value="unknown">N.r.</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="yes">Oui</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="no">Non</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
