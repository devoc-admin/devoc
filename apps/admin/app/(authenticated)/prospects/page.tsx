"use client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleMapsProvider } from "./_components/map/google-maps-provider";
import { ProspectsPageContent } from "./prospects";
import { ProspectsContextProvider } from "./prospects-context";

export default function ProspectsPage() {
  return (
    <Suspense fallback={<ProspectsPageSkeleton />}>
      <GoogleMapsProvider>
        <ProspectsContextProvider>
          <ProspectsPageContent />
        </ProspectsContextProvider>
      </GoogleMapsProvider>
    </Suspense>
  );
}

// ---------------------------
// 💀 Skeleton
function ProspectsPageSkeleton() {
  return <Skeleton className="h-full w-full" />;
}
