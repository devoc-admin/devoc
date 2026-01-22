"use client";

import type { DivIcon } from "leaflet";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../prospects-context";

// Color map for marker colors matching TypeBadge
const markerColors: Record<Prospect["type"], string> = {
  administration: "#c084fc",
  city: "#60a5fa",
  epci: "#4ade80",
  other: "#a1a1aa",
};

// Dynamic imports to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Create custom colored marker icon
function useColoredMarkerIcon(color: string): DivIcon | null {
  const [icon, setIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const svgIcon = `
        <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" stroke="#ffffff" stroke-width="1" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `;
      const markerIcon = L.divIcon({
        className: "custom-marker-icon",
        html: svgIcon,
        iconAnchor: [16, 32],
        iconSize: [32, 32],
        popupAnchor: [0, -32],
      });
      setIcon(markerIcon);
    })();
  }, [color]);

  return icon;
}

export function ProspectsMap() {
  const { prospects, searchQuery } = useProspectsContext();

  const prospectsWithCoords = useMemo(() => {
    if (!prospects) return [];

    let filtered = prospects.filter((p) => p.latitude && p.longitude);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((prospect) => {
        const name = prospect.name?.toLowerCase() ?? "";
        const type = prospect.type?.toLowerCase() ?? "";
        return name.includes(query) || type.includes(query);
      });
    }

    return filtered;
  }, [prospects, searchQuery]);

  // 🎯 Default center: Carcassonne
  const defaultCenter: [number, number] = [43.212_161, 2.353_663];
  const defaultZoom = 12;

  // 🫙 No prospects
  if (prospectsWithCoords.length === 0) {
    return <NoProspectsFound />;
  }

  return (
    <div className="h-37.5 w-full grow overflow-hidden rounded-md">
      <MapContainer
        center={defaultCenter}
        className="h-full w-full"
        zoom={defaultZoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {prospectsWithCoords.map((prospect) => (
          <ProspectMarker key={prospect.id} prospect={prospect} />
        ))}
      </MapContainer>
    </div>
  );
}

function ProspectMarker({ prospect }: { prospect: Prospect }) {
  const position: [number, number] = [
    Number.parseFloat(prospect.latitude ?? "0"),
    Number.parseFloat(prospect.longitude ?? "0"),
  ];
  const color = markerColors[prospect.type];
  const icon = useColoredMarkerIcon(color);

  if (!icon) return null;

  return (
    <Marker icon={icon} position={position}>
      <Popup>
        <ProspectPopupContent prospect={prospect} />
      </Popup>
    </Marker>
  );
}

function ProspectPopupContent({ prospect }: { prospect: Prospect }) {
  return (
    <div className="min-w-48 space-y-2 p-1">
      <div className="flex items-center gap-x-2">
        <span className="font-semibold">{prospect.name}</span>
        <TypeBadge type={prospect.type} />
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
    epci: "EPCI",
    other: "Autre",
  };

  const colors: Record<Prospect["type"], string> = {
    administration: "bg-purple-500/20 text-purple-400",
    city: "bg-blue-500/20 text-blue-400",
    epci: "bg-green-500/20 text-green-400",
    other: "bg-zinc-500/20 text-zinc-400",
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
