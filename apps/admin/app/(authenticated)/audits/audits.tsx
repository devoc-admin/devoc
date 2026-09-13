"use client";
import { AuditForm } from "./_components/audit-form";
import { AuditsCards } from "./_components/audits-list";
import { AuditsProvider } from "./audits-context";

export function AuditsPageContent() {
  return (
    <AuditsProvider>
      <div className="flex h-full gap-x-6">
        <AuditForm />
        <div className="grow space-y-6 overflow-auto">
          <AuditsCards />
        </div>
      </div>
    </AuditsProvider>
  );
}
