"use client";

import { ExternalLinkIcon, MapPinIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../prospects-context";

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

// Fix Leaflet default marker icon issue with webpack
function useLeafletIconFix() {
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);
}

export function ProspectsMap() {
  const { prospects, searchQuery } = useProspectsContext();
  useLeafletIconFix();

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

  // Default center: France
  const defaultCenter: [number, number] = [46.603_354, 1.888_334];
  const defaultZoom = 6;

  if (prospectsWithCoords.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
        <div className="text-center text-muted-foreground">
          <MapPinIcon className="mx-auto mb-2 size-8" />
          <p>Aucun prospect avec des coordonnées.</p>
          <p className="text-sm">
            Ajoutez la latitude et longitude pour voir les prospects sur la
            carte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-150 w-full overflow-hidden rounded-md">
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

  return (
    <Marker position={position}>
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
