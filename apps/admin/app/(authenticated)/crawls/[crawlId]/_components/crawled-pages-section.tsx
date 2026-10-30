"use client";
import type { CrawledPage } from "@dev-oc/data/db/schema";
import { CrawledPageCard } from "./crawled-page-card";

type PagesSectionProps = {
  title: string;
  pages: CrawledPage[];
  emptyMessage?: string;
};

export function CrawledPagesSection({
  title,
  pages,
  emptyMessage,
}: PagesSectionProps) {
  return (
    <section className="bg-sidebar rounded-lg p-6">
      <div className="mb-6 flex items-center gap-x-3">
        <h2 className="font-kanit text-2xl font-semibold">{title}</h2>
        <span className="bg-primary text-primary-foreground inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-sm font-medium">
          {pages.length}
        </span>
      </div>

      {pages.length === 0 ? (
        <p className="text-muted-foreground text-center">
          {emptyMessage ?? "Aucune page"}
        </p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
          {pages.map((page) => (
            <CrawledPageCard key={page.id} page={page} />
          ))}
        </ul>
      )}
    </section>
  );
}
