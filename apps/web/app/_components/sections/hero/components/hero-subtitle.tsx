import { cn } from "@/lib/utils.ts";
export function HeroSubtitle() {
  return (
    <p
      className={cn(
        "text-balance font-fraunces font-medium",
        // ↔️
        "text-left text-lg leading-snug",
        "xs:text-center xs:text-lg xs:leading-snug",
        "sm:text-center sm:text-lg sm:leading-snug",
        "md:text-center md:text-xl md:leading-snug",
        "lg:text-left lg:text-2xl lg:leading-snug",
        "xl:text-left xl:text-2xl xl:leading-snug",
        "2xl:text-left 2xl:text-3xl 2xl:leading-tight"
      )}
      style={
        {
          "--position": 4,
        } as React.CSSProperties
      }
    >
      Nous réalisons la transformation numérique des PME/TPE et collectivités d'
      <Occitanie />.
    </p>
  );
}

function Occitanie() {
  return (
    <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-semibold text-transparent">
      Occitanie
    </span>
  );
}
