"use client";
import {
  CrownIcon,
  type LucideIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react";

export function BadgeSouverain() {
  return (
    <Badge
      Icon={CrownIcon}
      subtitle="Technologies françaises ou européennes"
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
      subtitle="Déplacement sur tout le département"
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
    <div className="flex items-center gap-x-4">
      {/* ⚪ */}
      <div className="rounded-full border border-foreground/5 bg-foreground/5 p-2.5 text-foreground/60">
        <Icon size={20} />
      </div>
      {/* 🔤 */}
      <div className="flex flex-col">
        <span className="font-geist-mono font-medium text-[0.8rem] text-foreground/40 uppercase tracking-wider">
          {title}
        </span>
        <span className="font-geist text-foreground">{subtitle}</span>
      </div>
    </div>
  );
}
