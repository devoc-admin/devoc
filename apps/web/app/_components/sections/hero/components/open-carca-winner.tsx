import { RatingBadge } from "@/components/untitledui/rating-badge.tsx";
import { OPEN_CARCA_WINNER_URL } from "@/constants";
import { cn } from "@/lib/utils.ts";

export function OpenCarcaWinner() {
  return (
    <a
      className={cn(
        "mb-3 -translate-x-5",
        //↔️
        "hidden",
        "2xl:inline-block"
      )}
      href={OPEN_CARCA_WINNER_URL}
      rel="noopener"
      target="_blank"
      title="Lien vers la page d'annnonce des résultats du concours OpenCarca 2025"
    >
      <RatingBadge className={cn("flex", "text-amber-400")}>
        <div
          className={cn(
            "flex flex-col",
            "mt-2",
            "max-w-50",
            "text-center font-bold",
            "bg-linear-to-br from-orange-red via-primary-lighter to-primary bg-clip-text text-transparent",
            // ↔️
            "gap-y-1"
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
        "2xl:text-[0.95rem] 2xl:leading-tight"
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
        "font-geist",
        // ↔️
        "2xl:text-[0.7rem]"
      )}
    >
      Catégorie émergence
    </span>
  );
}
