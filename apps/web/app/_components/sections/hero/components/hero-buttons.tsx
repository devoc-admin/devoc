import { ArrowUpRight } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button/custom-button";
import { cn } from "@/lib/utils.ts";

const sharedClasses = cn(
  "group",
  "rounded-full!",
  "font-semibold",
  "justify-between!"
);

const responsiveClasses = cn(
  // ↔️
  "w-fit gap-x-4! px-1! py-1! text-base",
  "xs:w-auto! xs:gap-x-4! xs:px-1! xs:py-1! xs:text-base",
  "sm:w-auto! sm:gap-x-4! sm:px-1! sm:py-1! sm:text-base",
  "md:w-auto! md:gap-x-4! md:px-1! md:py-1! md:text-base",
  "lg:w-auto! lg:gap-x-4! lg:px-1! lg:py-1! lg:text-base",
  "xl:w-auto! xl:gap-x-6! xl:px-3! xl:py-2! xl:text-lg"
);

export function DemarrerUnProjetButton() {
  return (
    <CustomButton
      className={cn(sharedClasses, responsiveClasses)}
      style={
        {
          "--accent": "var(--primary-lighter)",
          "--accent-secondary": "var(--primary-strong)",
          "--degree": "200deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-5">Démarrer un projet</span>
      <ArrowRightUpAnimated className="text-primary" />
    </CustomButton>
  );
}

export function DecouvrirLeCollectifButton() {
  return (
    <CustomButton
      className={cn(
        "text-zinc-900!",
        "font-medium!",
        "hover:brightness-102!",
        sharedClasses,
        responsiveClasses
      )}
      style={
        {
          "--accent": "var(--color-zinc-50)",
          "--accent-secondary": "var(--color-zinc-200)",
          "--degree": "190deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-4">Découvrir le collectif</span>
      <ArrowRightUpAnimated className="text-zinc-900" />
    </CustomButton>
  );
}

function ArrowRightUpAnimated({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative size-11 rounded-full bg-white",
        "overflow-hidden",
        className
      )}
    >
      <ArrowUpRight
        className={cn(
          "text-inherit",
          "duration-300",
          "absolute",
          "transition-all",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100",
          "group-hover:top-0 group-hover:left-full group-hover:-translate-x-1/2 group-hover:-translate-y-full group-hover:opacity-0"
        )}
        size={21}
        strokeWidth={2}
      />
      {/* Back arrow */}
      <ArrowUpRight
        className={cn(
          "text-inherit",
          "duration-300",
          "transition-all",
          "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 opacity-0",
          "group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100"
        )}
        size={21}
        strokeWidth={2.5}
      />
    </div>
  );
}
