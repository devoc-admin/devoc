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
      <RatingBadge
        className={cn(
          "hidden [@media(height>=600px)]:flex",
          // "mt-24",
          "mx-auto",
          "text-amber-400"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-y-1.5",
            "mt-4",
            "max-w-50",
            "text-center font-bold",
            "bg-linear-to-br from-primary-strong via-primary-lighter to-primary bg-clip-text",
            "text-transparent"
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
    <span className="text-base leading-none lg:text-lg lg:leading-tight">
      Lauréats concours Open Carca 2025
    </span>
  );
}

function CategorieEmergence() {
  return (
    <span className="text-[0.65rem] uppercase lg:text-[0.7rem]">
      Catégorie émergence
    </span>
  );
}
