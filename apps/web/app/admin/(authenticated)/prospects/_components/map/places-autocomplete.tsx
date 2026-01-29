"use client";

import { Autocomplete } from "@react-google-maps/api";
import { MapPinIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useGoogleMaps } from "./google-maps-provider";

export type PlaceResult = {
  address: string;
  latitude: number;
  longitude: number;
  name: string;
  placeTypes: string[];
  placeUrl: string;
};

type PlacesAutocompleteProps = {
  onPlaceSelect: (place: PlaceResult) => void;
  placeholder?: string;
  defaultValue?: string;
};

export function PlacesAutocomplete({
  onPlaceSelect,
  placeholder = "Rechercher une adresse...",
  defaultValue = "",
}: PlacesAutocompleteProps) {
  const { isLoaded } = useGoogleMaps();
  const [inputValue, setInputValue] = useState(defaultValue);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    },
    []
  );

  const onPlaceChanged = useCallback(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const address = place.formatted_address ?? place.name ?? "";
    const name = place.name ?? "";
    const placeTypes = place.types ?? [];

    // Generate Google Maps URL
    const placeUrl = place.place_id
      ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
      : `https://www.google.com/maps?q=${lat},${lng}`;

    setInputValue(address);
    onPlaceSelect({
      address,
      latitude: lat,
      longitude: lng,
      name,
      placeTypes,
      placeUrl,
    });
  }, [onPlaceSelect]);

  if (!isLoaded) {
    return (
      <div className="relative">
        <Input
          className="h-10 pl-9"
          disabled
          placeholder="Chargement de Google Maps..."
        />
        <MapPinIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        componentRestrictions: { country: "fr" },
        fields: ["formatted_address", "geometry", "name", "place_id", "types"],
        types: ["establishment", "geocode"],
      }}
    >
      <div className="relative">
        <Input
          className="h-10 pl-9"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          value={inputValue}
        />
        <MapPinIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </Autocomplete>
  );
}
