import { cn } from "@/lib/utils.ts";
export function HeroSubtitle() {
  return (
    <p
      className={cn("font-fraunces font-medium text-3xl")}
      style={
        {
          "--position": 4,
        } as React.CSSProperties
      }
    >
      Sites, infrastructures et automatisations sur-mesure pour les entreprises,
      artisans et collectivités d'
      <Occitanie />.
    </p>
  );
}

function Occitanie() {
  return (
    <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-semibold text-transparent">
      Occitanie
    </span>
  );
}
