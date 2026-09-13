"use client";
import type { CrawledPage } from "@/lib/db/schema";
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
    <section className="rounded-lg bg-sidebar p-6">
      <div className="mb-6 flex items-center gap-x-3">
        <h2 className="font-kanit font-semibold text-2xl">{title}</h2>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 font-medium text-primary-foreground text-sm">
          {pages.length}
        </span>
      </div>

      {pages.length === 0 ? (
        <p className="text-center text-muted-foreground">
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
