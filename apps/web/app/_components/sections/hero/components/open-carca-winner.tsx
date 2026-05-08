import { RatingBadge } from "@/components/untitledui/rating-badge.tsx";
import { OPEN_CARCA_WINNER_URL } from "@/constants";
import { cn } from "@/lib/utils.ts";

export function OpenCarcaWinner() {
  return (
    <a
      href={OPEN_CARCA_WINNER_URL}
      rel="noopener"
      target="_blank"
      title="Lien vers la page d'annnonce des résultats du concours OpenCarca 2025"
    >
      <RatingBadge className={cn("flex", "text-amber-400")}>
        <div
          className={cn(
            "flex flex-col",
            "mt-4",
            "max-w-50",
            "text-center font-bold",
            "bg-linear-to-br from-primary-strong via-primary-lighter to-primary bg-clip-text",
            "text-transparent",
            // ↔️
            "gap-y-1",
            "xs:gap-y-1.5"
          )}
        >
          <LaureatsConcours />
          <CategorieEmergence />
        </div>
      </RatingBadge>
    </a>
  );
}

function LaureatsConcours() {
  return (
    <span
      className={cn(
        // ↔️
        "text-sm leading-[110%]",
        "xs:text-base xs:leading-[110%]",
        "sm:text-base",
        "lg:text-lg lg:leading-tight"
      )}
    >
      Lauréats concours Open Carca 2025
    </span>
  );
}

function CategorieEmergence() {
  return (
    <span
      className={cn(
        "uppercase",
        // ↔️
        "text-[0.65rem]",
        "xs:text-[0.7rem]",
        "lg:text-[0.7rem]"
      )}
    >
      Catégorie émergence
    </span>
  );
}
