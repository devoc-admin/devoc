import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

// biome-ignore assist/source/useSortedKeys: layout order
export const PROSPECT_TYPES: Record<Exclude<Prospect["type"], null>, string> = {
  administration: "Administration",
  city: "Ville",
  cultural_establishment: "Établissement culturel",
  epci: "EPCI",
  sme: "PME/TPE",
  territorial_collectivity: "Collectivité territoriale",
  other: "Autre",
};

export const PROSPECT_TYPES_COLORS: Record<
  Prospect["type"],
  { active: string; inactive: string }
> = {
  administration: {
    active: "bg-purple-500 text-white",
    inactive: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/15",
  },
  city: {
    active: "bg-blue-500 text-white",
    inactive: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/15",
  },
  cultural_establishment: {
    active: "bg-pink-500 text-white",
    inactive: "bg-pink-500/10 text-pink-400 hover:bg-pink-500/15",
  },
  epci: {
    active: "bg-green-500 text-white",
    inactive: "bg-green-500/10 text-green-400 hover:bg-green-500/15",
  },
  other: {
    active: "bg-zinc-500 text-white",
    inactive: "bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/15",
  },
  sme: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-500/10 text-red-400 hover:bg-red-500/15",
  },
  territorial_collectivity: {
    active: "bg-orange-500 text-white",
    inactive: "bg-orange-500/10 text-orange-400 hover:bg-orange-500/15",
  },
};

export function ProspectTypeBadge({ type }: { type: Prospect["type"] }) {
  return (
    <span
      className={cn(
        "cursor-auto",
        "rounded-full",
        "px-3 py-1",
        "font-medium text-xs",
        PROSPECT_TYPES_COLORS[type].inactive
      )}
    >
      {PROSPECT_TYPES[type]}
    </span>
  );
}

export function ProspectTypeButton({
  type,
  isActive,
  onSelectType,
}: {
  type: Prospect["type"];
  isActive: boolean;
  onSelectType: (type: Prospect["type"] | null) => void;
}) {
  return (
    <button
      className={cn(
        "cursor-pointer",
        "rounded-full",
        "px-3 py-1",
        "font-medium text-xs",
        "transition-colors",
        isActive
          ? PROSPECT_TYPES_COLORS[type].active
          : PROSPECT_TYPES_COLORS[type].inactive
      )}
      key={type}
      onClick={() => onSelectType(isActive ? null : type)}
      type="button"
    >
      {PROSPECT_TYPES[type]}
    </button>
  );
}

export function ProspectTypesButtons({
  selectedType,
  onSelectType,
}: {
  selectedType: Prospect["type"] | null;
  onSelectType: (type: Prospect["type"] | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.keys(PROSPECT_TYPES) as Prospect["type"][]).map((type) => {
        const isActive = selectedType === type;
        return (
          <ProspectTypeButton
            isActive={isActive}
            key={type}
            onSelectType={onSelectType}
            type={type}
          />
        );
      })}
    </div>
  );
}
