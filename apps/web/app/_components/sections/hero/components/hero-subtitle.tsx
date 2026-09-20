import { cn } from "@/lib/utils.ts";
import { CSSEntryAnimation } from "./css-entry-animation";
export function HeroSubtitle() {
  return (
    <CSSEntryAnimation className="max-w-[60ch]" position={2}>
      <P>
        Nous réalisons la transformation numérique des PME et collectivités d'
        <Occitanie />.
      </P>
    </CSSEntryAnimation>
  );
}

// 📦
// ==================
function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "select-none text-balance font-fraunces font-medium",
        // ↔️
        "text-center lg:text-left",
        "mx-auto lg:mx-0",
        "text-lg xs:text-xl lg:text-2xl 2xl:text-3xl",
        "leading-snug lg:leading-tight"
      )}
    >
      {children}
    </p>
  );
}

// 🔠
// ==================
function Occitanie() {
  return (
    <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-semibold text-transparent">
      Occitanie
    </span>
  );
}
