import { ArrowUpRight } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button/custom-button";
import { cn } from "@/lib/utils.ts";

export function DemarrerUnProjetButton() {
  return (
    <CustomButton
      className={cn("group", "rounded-full!", "font-semibold", "gap-x-5!")}
      style={
        {
          "--accent": "var(--primary-lighter)",
          "--accent-secondary": "var(--primary-strong)",
          "--degree": "200deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-4">Démarrer un projet</span>
      <ArrowRightUpAnimated className="text-primary" />
    </CustomButton>
  );
}

export function DecouvrirLeCollectifButton() {
  return (
    <div
      className={cn(
        "group",
        "flex items-center gap-x-5",
        "cursor-pointer",
        "rounded-full",
        "border border-zinc-100 bg-zinc-50",
        "p-2",
        "font-medium text-base text-zinc-900 leading-none"
      )}
    >
      <span className="ml-4">Découvrir le collectif</span>
      <ArrowRightUpAnimated className="text-zinc-900" />
    </div>
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
