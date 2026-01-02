"use client";
import { CrawlStatusPanel } from "./_components/crawl-status-panel";
import { DeleteAuditsButton } from "./_components/delete-audits-button";
import { SearchForm } from "./_components/search-form";
import { AuditProvider } from "./audit-context";

export function AuditPageContent() {
  return (
    <AuditProvider>
      <div className="space-y-6">
        <SearchForm />
        <CrawlStatusPanel />
        <DeleteAuditsButton />
      </div>
    </AuditProvider>
  );
}
