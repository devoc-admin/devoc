"use client";
import { GlobeIcon } from "lucide-react";
import { useCrawlCardContext } from "../../crawl-card-context";

export function LanguageSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Langues
      </h4>
      <div className="space-y-1">
        {/* 🌐 Primary Language */}
        {
          <div className="flex items-center gap-x-2 text-sm">
            <GlobeIcon className="shrink-0 text-muted-foreground" size={14} />
            <span className="text-muted-foreground">Langue principale:</span>
            <span>
              {crawl.primaryLanguage
                ? getLanguageName(crawl.primaryLanguage)
                : "—"}
            </span>
          </div>
        }
        {/* 🌍 Available Languages */}
        <div className="flex items-start gap-x-2 text-sm">
          <GlobeIcon
            className="mt-0.5 shrink-0 text-muted-foreground"
            size={14}
          />
          <span className="text-muted-foreground">Multilingue:</span>
          <span className="flex flex-wrap gap-1">
            {crawl.availableLanguages && crawl.availableLanguages.length > 1
              ? crawl.availableLanguages.map((lang) => (
                  <span
                    className="rounded bg-muted px-1.5 py-0.5 text-xs"
                    key={lang}
                  >
                    {getLanguageName(lang)}
                  </span>
                ))
              : "—"}
          </span>
        </div>
      </div>
    </div>
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
