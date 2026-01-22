"use client";
import { GoogleMapsProvider } from "./_components/google-maps-provider";
import { ProspectsList } from "./_components/prospects-list";
import { ProspectsContextProvider } from "./prospects-context";

export function Prospects() {
  return (
    <GoogleMapsProvider>
      <ProspectsContextProvider>
        <ProspectsList />
      </ProspectsContextProvider>
    </GoogleMapsProvider>
  );
}
