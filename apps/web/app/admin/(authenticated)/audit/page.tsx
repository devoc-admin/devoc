import { Suspense } from "react";
import { AuditPageContent } from "./audit-page-content";

export default function AuditPage() {
  return (
    <Suspense fallback={<AuditPageSkeleton />}>
      <AuditPageContent />
    </Suspense>
  );
}

function AuditPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 animate-pulse rounded-lg bg-sidebar" />
      <div className="h-64 animate-pulse rounded-lg bg-sidebar" />
    </div>
  );
}
