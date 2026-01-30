import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditsPageContent } from "./audits";

export default function AuditsPage() {
  return (
    <Suspense fallback={<AuditsPageSkeleton />}>
      <AuditsPageContent />
    </Suspense>
  );
}

// ================================
// 💀
function AuditsPageSkeleton() {
  return (
    <div className="flex h-full w-full gap-x-6">
      <Skeleton className="basis-1/5" />
      <Skeleton className="basis-4/5" />
    </div>
  );
}
