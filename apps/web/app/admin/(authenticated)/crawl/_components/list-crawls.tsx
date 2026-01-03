"use client";
import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { type CrawlResult, listCrawls } from "../_actions/list-crawls";

export function ListCrawls() {
  const { data: crawls } = useListCrawls();
  console.log("crawls", crawls);
  if (!crawls || (Array.isArray(crawls) && crawls.length === 0)) {
    return null;
  }

  return (
    <div className="rounded-md bg-sidebar p-8">
      <h2 className="mb-8 text-center font-kanit font-semibold text-4xl">
        Derniers crawls
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] space-y-8">
        {crawls.map(CrawlCard)}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------
function CrawlCard(crawl: CrawlResult) {
  if (!crawl) return null;
  return (
    <li className="space-y-6" key={crawl.id}>
      <div>
        <h3 className="font-kanit text-xl">{crawl.title}</h3>
        <a
          className="flex items-center gap-x-2 text-muted-foreground hover:underline"
          href={crawl.url}
          target="_blank"
        >
          <span>{crawl.url}</span>
          <ExternalLinkIcon size={16} />
        </a>
      </div>
      {crawl.screenshotUrl && (
        <Image
          alt="Screenshot"
          className="rounded-md"
          height={200}
          src={crawl.screenshotUrl}
          width={300}
        />
      )}
    </li>
  );
}

// ------------------------------------------------------------
function useListCrawls() {
  return useQuery({
    queryFn: async () => {
      const result = await listCrawls();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.crawls;
    },
    queryKey: ["list-crawls"],
  });
}
