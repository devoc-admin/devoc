"use client";

import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { ExternalLinkIcon, LoaderCircleIcon, MapPinIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../prospects-context";
import {
  ESTIMATED_OPPORTUNITY,
  type EstimatedOpportunity,
  PROSPECT_TYPES,
  type ProspectType,
} from "../prospects-types";
import { useGoogleMaps } from "./google-maps-provider";

// Color map for marker colors matching TypeBadge
const markerColors: Record<Prospect["type"], string> = {
  administration: "#c084fc",
  city: "#60a5fa",
  cultural_establishment: "#f472b6",
  epci: "#4ade80",
  other: "#a1a1aa",
  sme: "#fbbf24",
  territorial_collectivity: "#f97316",
};

// Create SVG marker icon as data URL
function createMarkerIcon(color: string): google.maps.Icon {
  const svg = `
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" stroke="#ffffff" stroke-width="1" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return {
    // biome-ignore lint/correctness/noUndeclaredVariables: google is a global provided by Google Maps API
    anchor: new google.maps.Point(16, 32),
    // biome-ignore lint/correctness/noUndeclaredVariables: google is a global provided by Google Maps API
    scaledSize: new google.maps.Size(32, 32),
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
  };
}

// Map container style
const containerStyle = {
  height: "100%",
  width: "100%",
};

// Map options
const mapOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
};

export function ProspectsMap() {
  const { prospects, searchQuery, typeFilter, setTypeFilter } =
    useProspectsContext();
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(
    null
  );

  const { isLoaded, loadError } = useGoogleMaps();

  const prospectsWithCoords = useMemo(() => {
    if (!prospects) return [];

    let filtered = prospects.filter((p) => p.latitude && p.longitude);

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((prospect) => prospect.type === typeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((prospect) => {
        const name = prospect.name?.toLowerCase() ?? "";
        const type = prospect.type?.toLowerCase() ?? "";
        return name.includes(query) || type.includes(query);
      });
    }

    return filtered;
  }, [prospects, searchQuery, typeFilter]);

  // 🎯 Default center: Carcassonne
  const defaultCenter = useMemo(
    () => ({
      lat: 43.212_161,
      lng: 2.353_663,
    }),
    []
  );

  const handleMarkerClick = useCallback((prospect: Prospect) => {
    setSelectedProspect(prospect);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedProspect(null);
  }, []);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
        <div className="text-center text-muted-foreground">
          <LoaderCircleIcon className="mx-auto mb-2 size-8 animate-spin" />
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
        <div className="text-center text-muted-foreground">
          <MapPinIcon className="mx-auto mb-2 size-8" />
          <p>Erreur lors du chargement de la carte.</p>
          <p className="text-sm">
            Veuillez vérifier votre clé API Google Maps.
          </p>
        </div>
      </div>
    );
  }

  // 🫙 No prospects
  if (prospectsWithCoords.length === 0) {
    return (
      <div className="flex flex-col gap-y-4">
        <TypeFilterBadges
          onSelectType={setTypeFilter}
          selectedType={typeFilter}
        />
        <NoProspectsFound />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <TypeFilterBadges
        onSelectType={setTypeFilter}
        selectedType={typeFilter}
      />
      <div className="h-96 w-full grow overflow-hidden rounded-md">
        <GoogleMap
          center={defaultCenter}
          mapContainerStyle={containerStyle}
          options={mapOptions}
          zoom={12}
        >
          {prospectsWithCoords.map((prospect) => {
            const position = {
              lat: Number.parseFloat(prospect.latitude ?? "0"),
              lng: Number.parseFloat(prospect.longitude ?? "0"),
            };
            const color = markerColors[prospect.type];

            return (
              <MarkerF
                icon={createMarkerIcon(color)}
                key={prospect.id}
                onClick={() => handleMarkerClick(prospect)}
                position={position}
              />
            );
          })}

          {selectedProspect && (
            <InfoWindowF
              onCloseClick={handleInfoWindowClose}
              position={{
                lat: Number.parseFloat(selectedProspect.latitude ?? "0"),
                lng: Number.parseFloat(selectedProspect.longitude ?? "0"),
              }}
            >
              <ProspectPopupContent prospect={selectedProspect} />
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

function ProspectPopupContent({ prospect }: { prospect: Prospect }) {
  return (
    <div className="min-w-48 space-y-2 p-1">
      <div className="flex items-center gap-x-2">
        <span className="font-semibold">{prospect.name}</span>
        <TypeBadge type={prospect.type} />
      </div>
      <div className="flex items-center gap-x-2">
        <span className="text-muted-foreground text-xs">Urgence:</span>
        <EstimatedOpportunityBadge
          value={prospect.estimatedOpportunity ?? "medium"}
        />
      </div>
      {prospect.website && (
        <a
          className="flex items-center gap-x-1 text-blue-500 text-sm hover:underline"
          href={prospect.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>Site web</span>
          <ExternalLinkIcon size={14} />
        </a>
      )}
      {prospect.location && (
        <a
          className="flex items-center gap-x-1 text-blue-500 text-sm hover:underline"
          href={prospect.location}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>Voir sur Google Maps</span>
          <ExternalLinkIcon size={14} />
        </a>
      )}
      <p className="text-muted-foreground text-xs">
        Ajouté le {formatDate(prospect.createdAt)}
      </p>
    </div>
  );
}

// -------------------------------------------
// 🫙 No prospects
function NoProspectsFound() {
  return (
    <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
      <div className="text-center text-muted-foreground">
        <MapPinIcon className="mx-auto mb-2 size-8" />
        <p>Aucun prospect avec des coordonnées.</p>
        <p className="text-sm">
          Ajoutez la latitude et longitude pour voir les prospects sur la carte.
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------
// 🟡 Type badge (city, EPCI, administration)

function TypeBadge({ type }: { type: Prospect["type"] }) {
  const labels: Record<Prospect["type"], string> = {
    administration: "Administration",
    city: "Ville",
    cultural_establishment: "Établissement culturel",
    epci: "EPCI",
    other: "Autre",
    sme: "PME",
    territorial_collectivity: "Collectivité territoriale",
  };

  const colors: Record<Prospect["type"], string> = {
    administration: "bg-purple-500/20 text-purple-400",
    city: "bg-blue-500/20 text-blue-400",
    cultural_establishment: "bg-pink-500/20 text-pink-400",
    epci: "bg-green-500/20 text-green-400",
    other: "bg-zinc-500/20 text-zinc-400",
    sme: "bg-amber-500/20 text-amber-400",
    territorial_collectivity: "bg-orange-500/20 text-orange-400",
  };

  return (
    <span
      className={cn(
        "rounded-full",
        "px-2 py-1",
        "font-medium text-xs",
        colors[type]
      )}
    >
      {labels[type]}
    </span>
  );
}

// -------------------------------------------
// 🎯 Estimated opportunity badge (static)

const OPPORTUNITY_COLORS: Record<EstimatedOpportunity, string> = {
  medium: "bg-yellow-500/20 text-yellow-400",
  strong: "bg-red-500/20 text-red-400",
  weak: "bg-green-500/20 text-green-400",
};

function EstimatedOpportunityBadge({ value }: { value: EstimatedOpportunity }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 font-medium text-xs",
        OPPORTUNITY_COLORS[value]
      )}
    >
      {ESTIMATED_OPPORTUNITY[value]}
    </span>
  );
}

// ------------------------------------
// 🗓️ Format date

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

// -------------------------------------------
// 🏷️ Type filter badges

const TYPE_FILTER_COLORS: Record<
  ProspectType,
  { active: string; inactive: string }
> = {
  administration: {
    active: "bg-purple-500 text-white",
    inactive: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
  },
  city: {
    active: "bg-blue-500 text-white",
    inactive: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  },
  cultural_establishment: {
    active: "bg-pink-500 text-white",
    inactive: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30",
  },
  epci: {
    active: "bg-green-500 text-white",
    inactive: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
  },
  other: {
    active: "bg-zinc-500 text-white",
    inactive: "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30",
  },
  sme: {
    active: "bg-amber-500 text-white",
    inactive: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
  },
  territorial_collectivity: {
    active: "bg-orange-500 text-white",
    inactive: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30",
  },
};

function TypeFilterBadges({
  selectedType,
  onSelectType,
}: {
  selectedType: ProspectType | null;
  onSelectType: (type: ProspectType | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.entries(PROSPECT_TYPES) as [ProspectType, string][]).map(
        ([type, label]) => {
          const isActive = selectedType === type;
          return (
            <button
              className={cn(
                "cursor-pointer rounded-full px-3 py-1",
                "font-medium text-xs",
                "transition-colors",
                isActive
                  ? TYPE_FILTER_COLORS[type].active
                  : TYPE_FILTER_COLORS[type].inactive
              )}
              key={type}
              onClick={() => onSelectType(isActive ? null : type)}
              type="button"
            >
              {label}
            </button>
          );
        }
      )}
    </div>
  );
}
