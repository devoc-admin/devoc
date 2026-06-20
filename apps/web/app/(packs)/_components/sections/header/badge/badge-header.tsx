"use client";
import {
  CrownIcon,
  type LucideIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BadgeSouverain() {
  return (
    <Badge
      Icon={CrownIcon}
      subtitle="Technologies françaises"
      title="Souveraineté numérique"
    />
  );
}

export function BadgeReferentiels() {
  return (
    <Badge
      Icon={ShieldCheckIcon}
      subtitle="Conformité réglementaire totale"
      title="RGPD • RGAA • RGESN • NIS2"
    />
  );
}

export function BadgeCarcassonne() {
  return (
    <Badge
      Icon={MapPinIcon}
      subtitle="Intervention sur tout le département"
      title="Basés à Carcassonne"
    />
  );
}

export function Badge({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: LucideIcon | React.FC;
}) {
  return (
    <div
      className={cn(
        "group flex items-center",
        /* ↔️ */
        "gap-x-3",
        "xs:gap-x-3",
        "xl:gap-x-4",
        "2xl:gap-x-4"
      )}
    >
      {/* ⚪ */}
      <div
        className={cn(
          "rounded-full",
          "border border-foreground/5 group-hover:border-orange-red/80",
          "text-foreground/60 group-hover:text-orange-red",
          "bg-foreground/5 group-hover:bg-orange-red/5",
          "transition",
          /* ↔️ */
          "p-2",
          "xs:p-2",
          "xl:p-2.5",
          "2xl:p-2.5"
        )}
      >
        <Icon
          className={cn(
            /* ↔️ */
            "size-3.5",
            "xs:size-3.5",
            "xl:size-4.5",
            "2xl:size-4.5"
          )}
        />
      </div>
      {/* 🔤 */}
      <div className="flex select-none flex-col">
        <span
          className={cn(
            "font-geist-mono font-medium text-foreground/40 uppercase tracking-wider",
            "group-hover:text-orange-red",
            "transition",
            /* ↔️ */
            "text-[0.7rem]",
            "xs:text-[0.7rem]",
            "xl:text-[0.8rem]",
            "2xl:text-[0.8rem]"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "font-geist text-foreground leading-tight",
            /* ↔️ */
            "text-sm",
            "xs:text-sm",
            "xl:text-base",
            "2xl:text-base"
          )}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
