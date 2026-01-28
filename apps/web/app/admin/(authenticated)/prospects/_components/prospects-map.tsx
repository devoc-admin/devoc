"use client";

import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { ExternalLinkIcon, LoaderCircleIcon, MapPinIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { Prospect } from "@/lib/db/schema";
import { useProspectsContext } from "../prospects-context";
import { EstimatedOpportunityBadge } from "./buttons/estimated-opportunity-button";
import { ProspectTypeBadge } from "./buttons/prospect-type-button";
import { useGoogleMaps } from "./google-maps-provider";

// ↕️ Container style
const containerStyle = {
  height: "100%",
  width: "100%",
};

// ⏺️ Options
const mapOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
};

export function ProspectsMap() {
  const { prospects } = useProspectsContext();
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(
    null
  );

  const { isLoaded, loadError } = useGoogleMaps();

  const prospectsWithCoords =
    prospects?.filter((p) => p.latitude && p.longitude) ?? [];

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

  // ⏳ Loading state
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

  // 🚫 Error state
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
  if (prospectsWithCoords.length === 0) return <NoProspectsFound />;

  return (
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
            options={{
              headerDisabled: true,
            }}
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
  );
}

function ProspectPopupContent({ prospect }: { prospect: Prospect }) {
  return (
    <div className="min-w-48 space-y-2 p-1">
      {/* 🆎 Name */}
      <div className="flex items-center gap-x-2">
        <span className="font-semibold text-lg">{prospect.name}</span>
        <ProspectTypeBadge type={prospect.type} />
      </div>
      {/* 🔴 Estimated opportunity */}
      {prospect.estimatedOpportunity && (
        <div className="flex items-center gap-x-2">
          <span className="text-muted-foreground text-xs">Urgence :</span>
          <EstimatedOpportunityBadge value={prospect.estimatedOpportunity} />
        </div>
      )}
      <div className="space-y-1">
        {/* 🌐 Website */}
        {prospect.website && (
          <a
            className="flex items-center gap-x-1 text-blue-500 text-xs hover:underline"
            href={prospect.website}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Site web</span>
            <ExternalLinkIcon size={11} />
          </a>
        )}
        {/* 📍 Location */}
        {prospect.location && (
          <a
            className="flex items-center gap-x-1 text-blue-500 text-xs hover:underline"
            href={prospect.location}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Voir sur Google Maps</span>
            <ExternalLinkIcon size={11} />
          </a>
        )}
      </div>
      <p className="text-muted-foreground text-xs">
        Ajouté le {formatDate(prospect.createdAt)}
      </p>
    </div>
  );
}

// -------------------------------------------
// 🧌 No prospects
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

// ------------------------------------
// 📍 Marker
const markerColors: Record<Prospect["type"], string> = {
  administration: "#c084fc",
  city: "#60a5fa",
  cultural_establishment: "#f472b6",
  epci: "#4ade80",
  other: "#a1a1aa",
  sme: "#fbbf24",
  territorial_collectivity: "#f97316",
};

// 📍 Marker
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
