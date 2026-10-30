"use client";
import { GlobeIcon } from "lucide-react";
import { useCrawlCardContext } from "../../crawl-card-context";
import {
  Section,
  SectionContent,
  SectionInformation,
  SectionInformationIcon,
  SectionInformationName,
  SectionTitle,
} from "./section";
export function LanguageSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  return (
    <Section>
      <SectionTitle>Langues</SectionTitle>
      <SectionContent>
        {/* 🌐 Primary Language */}
        <SectionInformation>
          <SectionInformationIcon Icon={GlobeIcon} />
          <SectionInformationName>Langue principale</SectionInformationName>
          <span>
            {crawl.primaryLanguage
              ? getLanguageName(crawl.primaryLanguage)
              : "—"}
          </span>
        </SectionInformation>
        {/* 🌍 Available Languages */}
        <SectionInformation>
          <SectionInformationIcon Icon={GlobeIcon} />
          <SectionInformationName>Multilingue</SectionInformationName>
          <span className="flex flex-wrap gap-1">
            {crawl.availableLanguages && crawl.availableLanguages.length > 1
              ? crawl.availableLanguages.map((lang) => (
                  <span
                    className="bg-muted rounded px-1.5 py-0.5 text-xs"
                    key={lang}
                  >
                    {getLanguageName(lang)}
                  </span>
                ))
              : "—"}
          </span>
        </SectionInformation>
      </SectionContent>
    </Section>
  );
}

// ———————————————————————————————————
// 🇫🇷 🇪🇸
const languageNames: Record<string, string> = {
  ar: "Arabe",
  br: "Breton",
  ca: "Catalan",
  de: "Allemand",
  en: "Anglais",
  es: "Espagnol",
  eu: "Basque",
  fr: "Français",
  gl: "Galicien",
  it: "Italien",
  nl: "Néerlandais",
  oc: "Occitan",
  pl: "Polonais",
  pt: "Portugais",
  ru: "Russe",
  zh: "Chinois",
};

function getLanguageName(code: string) {
  return languageNames[code] ?? code.toUpperCase();
}
