import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export function DemarrerUnProjetButton() {
  return (
    <div
      className={cn(
        "flex items-center gap-x-4",
        "cursor-pointer",
        "rounded-full",
        "border border-zinc-50",
        "bg-linear-to-r from-primary-lighter to-primary-strong",
        "p-2",
        "font-medium text-base text-white leading-none"
      )}
    >
      <span className="ml-4">Démarrer un projet</span>
      <div className="grid place-items-center rounded-full bg-white p-3">
        <ArrowUpRight className="text-primary" size={19} strokeWidth={2.5} />
      </div>
    </div>
  );
}

export function DecouvrirLeCollectifButton() {
  return (
    <div
      className={cn(
        "flex items-center gap-x-4",
        "cursor-pointer",
        "rounded-full",
        "border border-zinc-100 bg-zinc-50",
        "p-2",
        "font-medium text-base text-zinc-900 leading-none"
      )}
    >
      <span className="ml-4">Découvrir le collectif</span>
      <div className="grid place-items-center rounded-full bg-white p-3">
        <ArrowUpRight className="text-zinc-900" size={19} strokeWidth={2.5} />
      </div>
    </div>
  );
}
