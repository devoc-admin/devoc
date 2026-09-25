import { cn } from "@/lib/utils";
import { CSSEntryAnimation } from "./css-entry-animation";

const HERO_KEYWORDS = ["Sécurité", "Accessibilité", "Protection des données"];

export function HeroKeywords() {
  return (
    <CSSEntryAnimation
      className={cn(
        // ↔️
        "mt-4",
        "xs:mt-4",
        "sm:mt-2",
        "md:mt-2",
        "lg:mt-3",
        "xl:mt-3"
      )}
      position={3}
    >
      <div
        className={cn(
          "font-geist-mono",
          "select-none",
          "text-zinc-400",
          "font-light",
          "flex-wrap items-center",
          "hidden sm:flex",
          // ↔️
          "justify-center gap-x-2 gap-y-1",
          "xs:justify-center xs:gap-x-2 xs:gap-y-1",
          "sm:justify-center sm:gap-x-2 sm:gap-y-1",
          "lg:justify-start lg:gap-x-2 lg:gap-y-1",
          // ↔️
          "text-[0.7rem] tracking-[0.08rem]",
          "xs:text-[0.7rem] xs:tracking-[0.08rem]",
          "sm:text-[0.75rem] sm:tracking-[0.10rem]",
          "md:text-[0.75rem] md:tracking-[0.10rem]",
          "lg:text-[0.85rem] lg:tracking-[0.17rem]"
        )}
      >
        {HERO_KEYWORDS.map((word, idx) => (
          <div className="flex items-center gap-x-[inherit]" key={word}>
            <span className="uppercase">{word}</span>
            {idx < HERO_KEYWORDS.length - 1 && <span>•</span>}
          </div>
        ))}
      </div>
    </CSSEntryAnimation>
  );
}
