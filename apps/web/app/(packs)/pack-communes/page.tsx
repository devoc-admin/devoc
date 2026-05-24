import {
  CrownIcon,
  type LucideIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import { Reserver1hGratuit, VoirLesPacks } from "../_components/pack-button";

export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-12 py-24"
      )}
    >
      <PackTitle />
      <div className="flex items-end justify-between gap-x-6">
        <PackDescription />
        <PackButtons />
      </div>
      <Separator />
      <Badges />
    </div>
  );
}

function Badges() {
  return (
    <div className="flex items-center justify-between">
      <BadgeSouverain />
      <BadgeReferentiels />
      <BadgeCarcassonne />
    </div>
  );
}

function BadgeSouverain() {
  return (
    <Badge
      Icon={CrownIcon}
      subtitle="Technologies françaises ou européennes"
      title="Souveraineté numérique"
    />
  );
}

function BadgeReferentiels() {
  return (
    <Badge
      Icon={ShieldCheckIcon}
      subtitle="Conformité réglementaire totale"
      title="RGPD • RGAA • RGESN • NIS2"
    />
  );
}

function BadgeCarcassonne() {
  return (
    <Badge
      Icon={MapPinIcon}
      subtitle="Déplacement sur tout le département"
      title="Basés à Carcassonne"
    />
  );
}

function Badge({
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

function PackTitle() {
  return (
    <h1
      className={cn(
        "font-fraunces font-medium! text-foreground",
        "leading-[0.9]!",
        // ↔️
        "text-[6.5rem]"
      )}
    >
      La transformation{" "}
      <span className="text-foreground/60 italic">numérique</span> de votre
      commune, <CustomGradientText>clé en main</CustomGradientText>
    </h1>
  );
}

function PackButtons() {
  return (
    <div className="mb-2 flex gap-x-4">
      <Reserver1hGratuit />
      <VoirLesPacks />
    </div>
  );
}

function PackDescription() {
  return (
    <p
      className={cn(
        "max-w-[40ch] font-fraunces font-medium",
        "leading-snug!",
        // ↔️
        "text-2xl"
      )}
    >
      Six briques modulaires, trois packs à tarifs encadrés — tous{" "}
      <CustomGradientText>sous le seuil MAPA</CustomGradientText> pour vous
      éviter la lourdeur d'un appel d'offres. Conçu pour les communes de l'Aude,
      avec le soutien du Réseau des Maisons de l'Innovation, du Numérique et de
      l'Entrepreunariat de Carcassonne Agglo.
    </p>
  );
}

function Separator() {
  return (
    <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
  );
}
