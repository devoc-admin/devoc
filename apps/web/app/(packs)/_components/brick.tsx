import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brick1Website() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <div className="col-span-5 space-y-12">
        <BrickNumber>1</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Site internet conforme et accessible</BrickTitle>
          <BrickDescription>
            Pour remplir votre mission d'accessibilité en vous conformant au
            RGAA, avec une interface d'administration adaptée à vos agents.
          </BrickDescription>
        </div>
      </div>
      {/* 📝 */}
      <div className="col-span-7">
        <div className="space-y-5">
          <GuaranteesTitle />
          <ul className="space-y-3">
            <GuaranteeItem>
              Conformité RGAA (accessibilité niveau AA), RGPD et RGESN intégrée
              dès la conception.
            </GuaranteeItem>
            <GuaranteeItem>
              Hébergement sur cloud souverain français, nom de domaine en .fr.
            </GuaranteeItem>
            <GuaranteeItem>
              Formation des agents à la gestion autonome des contenus, sans
              dépendance prestataire.
            </GuaranteeItem>
            <GuaranteeItem>
              Technologies ouvertes et non-propriétaires : vous restez
              propriétaire du site et des données.
            </GuaranteeItem>
          </ul>
        </div>
      </div>
    </Brick>
  );
}

function Brick({
  variant,
  children,
}: {
  variant: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-t group-last-of-type:border-b",
        "transition-colors",
        "grid grid-cols-12 gap-x-24",
        // ↔️
        "px-2 py-6",
        "md:px-6 md:py-12",
        // 🌙☀️
        variant === "dark" && "hover:via-foreground-dark/5",
        variant === "light" && "hover:via-foreground/2"
      )}
      style={{
        borderImage:
          variant === "dark"
            ? // 🌙
              "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1"
            : // ☀️
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 10%, transparent) 20%,  color-mix(in oklab, var(--foreground) 10%, transparent) 80%, transparent) 1",
      }}
    >
      {children}
    </div>
  );
}

function BrickNumber({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid size-12 place-items-center rounded-full border-2 border-primary/80 bg-primary/10 font-fraunces font-semibold text-2xl text-primary/80">
      {children}
    </div>
  );
}
function BrickDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-geist text-base text-foreground/50 leading-tight">
      {children}
    </p>
  );
}

function BrickTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-fraunces font-semibold text-4xl text-foreground leading-none!">
      {children}
    </h3>
  );
}

function GuaranteesTitle() {
  return (
    <h4 className="font-geist-mono font-semibold text-[0.65rem] text-foreground/40 text-xs uppercase tracking-[0.15rem]">
      Vos garanties
    </h4>
  );
}

function GuaranteeItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-x-4">
      {/* ✅ */}
      <div className="grid place-items-center rounded-full bg-primary-strong p-1">
        <CheckIcon className="text-white" size={12} strokeWidth={3} />
      </div>
      {/* 🔤 */}
      <span className="text-[0.9rem]">{children}</span>
    </li>
  );
}
