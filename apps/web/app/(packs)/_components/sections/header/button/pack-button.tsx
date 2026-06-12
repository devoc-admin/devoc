import { ArrowUpRight } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button/custom-button";
import { CAL_COMMUNES_LINK } from "@/constants";
import { cn } from "@/lib/utils";

const sharedClasses = cn(
  "group",
  "self-start",
  "rounded-full!",
  "font-semibold",
  "justify-between!"
);

const responsiveClasses = cn(
  // ↔️
  "w-fit gap-x-4! px-1! py-1! pl-2! text-sm",
  "xs:gap-x-4! xs:px-1! xs:py-1! pl-2! xs:text-sm",
  "sm:gap-x-4! sm:px-1! sm:py-1! sm:text-base",
  "md:gap-x-4! md:px-1! md:py-1! md:text-base",
  "lg:gap-x-4! lg:px-1! lg:py-1! lg:text-base",
  "xl:gap-x-6! xl:px-3! xl:py-2! xl:text-base"
);

export function VoirLesPacks() {
  return (
    <CustomButton
      className={cn(sharedClasses, responsiveClasses)}
      href="#packs"
      style={
        {
          "--accent": "var(--primary-lighter)",
          "--accent-secondary": "var(--primary-strong)",
          "--degree": "200deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-4">Voir les packs</span>
      <ArrowRightUpAnimated className="text-primary" />
    </CustomButton>
  );
}

export function AgirMaintenant({ className }: { className?: string }) {
  return (
    <CustomButton
      className={cn(
        "text-zinc-900!",
        "font-medium!",
        "hover:brightness-102!",
        sharedClasses,
        responsiveClasses,
        className
      )}
      href={CAL_COMMUNES_LINK}
      style={
        {
          "--accent": "var(--color-zinc-50)",
          "--accent-secondary": "var(--color-zinc-200)",
          "--degree": "190deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-4 text-[1.05rem] text-foreground">
        Faire un bilan
      </span>
      <ArrowRightUpAnimated className="text-foreground" />
    </CustomButton>
  );
}

function ArrowRightUpAnimated({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-full bg-white",
        "overflow-hidden",
        /* ↔️ */
        "size-10",
        "xs:size-10",
        "xl:size-11",
        "2xl:size-11",
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
          "group-hover:top-0 group-hover:left-full group-hover:-translate-x-1/2 group-hover:-translate-y-full group-hover:opacity-0",
          /*↔️ */
          "w-5"
        )}
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
