"use client";
import {
  AppWindowIcon,
  ExternalLinkIcon,
  UserRoundPenIcon,
} from "lucide-react";
import { useState } from "react";
import { useCrawlCardContext } from "../../crawl-card-context";
import { useUpdateCrawlAuthorMutation } from "../../crawl-card-mutations";
import {
  Section,
  SectionContent,
  SectionInformation,
  SectionInformationIcon,
  SectionInformationName,
  SectionTitle,
} from "./section";
export function AuthorSection() {
  const { crawl } = useCrawlCardContext();
  const { mutate: updateAuthor, isPending } = useUpdateCrawlAuthorMutation();

  const [author, setAuthor] = useState(crawl?.author ?? "");
  const [authorUrl, setAuthorUrl] = useState(crawl?.authorUrl ?? "");

  if (!crawl) return null;

  // 💾 Save
  function handleSaveAuthor() {
    const newAuthor = author.trim() || null;
    const newAuthorUrl = authorUrl.trim() || null;

    // 💾 Only save if something changed
    if (
      crawl &&
      (newAuthor !== (crawl.author ?? null) ||
        newAuthorUrl !== (crawl.authorUrl ?? null))
    ) {
      updateAuthor({
        author: newAuthor,
        authorUrl: newAuthorUrl,
        crawlId: crawl.id,
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <Section>
      <SectionTitle>Prestataire</SectionTitle>
      <SectionContent>
        {/*🙋 Author */}
        <SectionInformation>
          <SectionInformationIcon Icon={UserRoundPenIcon} />
          <SectionInformationName>Nom</SectionInformationName>
          <input
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            disabled={isPending}
            onBlur={handleSaveAuthor}
            onChange={(e) => setAuthor(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="—"
            title={author ?? undefined}
            type="text"
            value={author ?? ""}
          />
        </SectionInformation>
        {/* 🌐 Website */}
        <SectionInformation>
          <SectionInformationIcon Icon={AppWindowIcon} />
          <SectionInformationName>Site</SectionInformationName>
          <div className="flex items-center gap-x-1">
            <input
              disabled={isPending}
              onBlur={handleSaveAuthor}
              onChange={(e) => setAuthorUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="—"
              title={authorUrl ?? undefined}
              type="text"
              value={authorUrl ?? ""}
            />
            {authorUrl ? (
              <a href={authorUrl} rel="noopener noreferrer" target="_blank">
                <ExternalLinkIcon className="shrink-0" size={13} />
              </a>
            ) : null}
          </div>
        </SectionInformation>
      </SectionContent>
    </Section>
  );
}
