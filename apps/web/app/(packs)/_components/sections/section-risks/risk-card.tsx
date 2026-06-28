"use client";
import {
  BanknoteIcon,
  BugIcon,
  EyeOffIcon,
  FileExclamationPointIcon,
  FishingRod,
  FrownIcon,
  HammerIcon,
  type LucideIcon,
  UserCheckIcon,
} from "lucide-react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { cn } from "@/lib/utils";

const sharedRiskContainerClasses = cn(
  //↔️
  "space-y-8",
  "xs:space-y-8",
  "xl:col-span-2 xl:grid xl:grid-cols-subgrid",
  "xl:grid 2xl:col-span-2 2xl:grid-cols-subgrid"
);

const sharedRiskCardsContainerClasses = cn(
  //↔️
  "space-y-4",
  "xl:col-span-1 xl:grid xl:gap-x-4",
  "2xl:col-span-1 2xl:grid 2xl:gap-x-4"
);

export function RiskReglementaire() {
  return (
    <div
      className={sharedRiskContainerClasses}
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
        Réglementaire
      </h3>
      <div
        className={sharedRiskCardsContainerClasses}
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <RiskCardRGPD />
        </FadeUp>
        <FadeUp delay={0.2} disableOnMobile>
          <RiskCardRGAA />
        </FadeUp>
        <FadeUp delay={0.3} disableOnMobile>
          <RiskCardDPO />
        </FadeUp>
      </div>
    </div>
  );
}
export function RiskEconomic() {
  return (
    <div
      className={sharedRiskContainerClasses}
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
        Économique
      </h3>
      <div
        className={sharedRiskCardsContainerClasses}
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <RiskCardOverbilling />
        </FadeUp>
        <FadeUp delay={0.2} disableOnMobile>
          <RiskCardUnsuitableTools />
        </FadeUp>
        <FadeUp delay={0.3} disableOnMobile>
          <RiskCardUnhappyCitizen />
        </FadeUp>
      </div>
    </div>
  );
}
export function RiskCybersecurity() {
  return (
    <div
      className={sharedRiskContainerClasses}
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
        Cybersécurité
      </h3>
      <div
        className={sharedRiskCardsContainerClasses}
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <RiskCardMalware />
        </FadeUp>
        <FadeUp delay={0.2} disableOnMobile>
          <RiskCardPhishing />
        </FadeUp>
      </div>
    </div>
  );
}
export function RiskCardRGPD() {
  return (
    <RiskCard
      description="Mise en demeure publique de la CNIL et amendes financières"
      Icon={FileExclamationPointIcon}
      title="Non-conformité RGPD"
    />
  );
}
export function RiskCardRGAA() {
  return (
    <RiskCard
      description="Signalements au Défenseur des droits, jusqu'à 25 000 € d'amende."
      Icon={EyeOffIcon}
      title="Non-conformité RGAA"
    />
  );
}
export function RiskCardDPO() {
  return (
    <RiskCard
      description="Infraction constatée dès le premier contrôle CNIL."
      Icon={UserCheckIcon}
      title="Absence de DPO"
    />
  );
}
export function RiskCardOverbilling() {
  return (
    <RiskCard
      description="Services chers et datés imposés par des prestataires qui profitent de votre méconnaissance technique."
      Icon={BanknoteIcon}
      title="Surfacturation"
    />
  );
}
export function RiskCardUnsuitableTools() {
  return (
    <RiskCard
      description="Logiciels complexes et pénibles qui découragent vos agents et vous ralentissent au lieu d'aider."
      Icon={HammerIcon}
      title="Outils inadaptés"
    />
  );
}
export function RiskCardUnhappyCitizen() {
  return (
    <RiskCard
      description="Difficulté d'accès à l'information sur la vie locale, pas de services en ligne pour les démarches."
      Icon={FrownIcon}
      title="Désintérêt citoyen"
    />
  );
}
export function RiskCardPhishing() {
  return (
    <RiskCard
      description="Vols d'identifiants confidentiels en hausse, fuites de données sensibles."
      Icon={FishingRod}
      title="Phishing"
    />
  );
}
export function RiskCardMalware() {
  return (
    <RiskCard
      description="Virus paralysant vos services pendant des semaines en exigeant une rançon."
      Icon={BugIcon}
      title="Rançongiciels"
    />
  );
}

export function RiskCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border-[1.5px] border-foreground/20 p-4 hover:border-orange-red/60",
        // ↔️
        "space-y-3",
        "xs:space-y-3",
        "xl:space-y-5",
        "2xl:space-y-5"
      )}
    >
      {/* 🖼️ */}
      <div
        className={cn(
          "w-fit rounded-full border bg-foreground/5 p-2 text-foreground/60",
          "transition",
          "group-hover:border-orange-red/60 group-hover:bg-orange-red/10"
        )}
      >
        <Icon className="transition group-hover:text-orange-red" size={18} />
      </div>
      {/* 🔠 */}
      <div className="flex flex-col gap-y-1">
        <h4
          className={cn(
            "font-medium text-foreground",
            //↔️
            "text-base",
            "xs:text-base",
            "xl:text-lg",
            "2xl:text-lg"
          )}
        >
          {title}
        </h4>
        <p className="text-foreground/60 text-sm">{description}</p>
      </div>
    </div>
  );
}
