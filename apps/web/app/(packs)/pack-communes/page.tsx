"use client";
import {
  BanknoteIcon,
  BugIcon,
  CrownIcon,
  EyeOffIcon,
  FileExclamationPointIcon,
  FishingRod,
  FrownIcon,
  HammerIcon,
  type LucideIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserCheckIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import { PContent } from "../_components/p-content";
import { PIntro } from "../_components/p-intro";
import { Reserver1hGratuit, VoirLesPacks } from "../_components/pack-button";
import { Quote } from "../_components/quote";
export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-20"
      )}
    >
      <Header />
      <div className="flex flex-col gap-y-80">
        <SectionIntro />
        <SectionRisques />
      </div>
    </div>
  );
}

// ============================================

function Header() {
  return (
    <div
      className={cn(
        "min-h-screen",
        // ↔️
        "space-y-12 py-24"
      )}
    >
      <FadeUp dir="down">
        <PackTitle />
      </FadeUp>
      <FadeUp delay={0.1} dir="down">
        <div className="flex items-end justify-between gap-x-6">
          <PackDescription />
          <PackButtons />
        </div>
      </FadeUp>
      <Separator />
      <div className="flex items-center justify-between">
        <FadeUp delay={0.2} dir="down">
          <BadgeSouverain />
        </FadeUp>
        <FadeUp delay={0.2} dir="down">
          <BadgeReferentiels />
        </FadeUp>
        <FadeUp delay={0.2} dir="down">
          <BadgeCarcassonne />
        </FadeUp>
      </div>
    </div>
  );
}

// 0️⃣
function SectionIntro() {
  return (
    <section
      className={cn(
        "flex",
        // ↔️
        "flex-col gap-y-12",
        "xs:flex-col xs:gap-y-12",
        "sm:flex-col sm:gap-y-12",
        "md:flex-row md:gap-x-12",
        "2xl:flew-row 2xl:gap-x-18"
      )}
    >
      <div
        className={cn(
          // ↔️
          "space-y-6",
          "2xl:space-y-10"
        )}
      >
        <FadeUp disableOnMobile>
          <SupSection number={1} variant="light">
            Contexte
          </SupSection>
        </FadeUp>
        <FadeUp delay={0.1} disableOnMobile>
          <SectionCatchline className="font-normal!">
            Un guichet unique pour votre{" "}
            <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
              offre numérique
            </span>
          </SectionCatchline>
        </FadeUp>
      </div>

      <div
        className={cn(
          // ↔️
          "space-y-8",
          "2xl:grow 2xl:space-y-10"
        )}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <PIntro>
            Vous venez d'être élu ou reconduit et beaucoup de dossiers vont
            solliciter votre énergie ! Parmi eux, la modernisation numérique de
            vos services devrait tenir une place majeure.
          </PIntro>
        </FadeUp>

        <FadeUp delay={0.2} disableOnMobile>
          <PContent>
            Site internet conforme, dématérialisation des procédures, archivage
            numérique, sécurité du système informatique, formation des agents,
            communication efficace : les chantiers sont nombreux, et requièrent
            des compétences techniques fortes dont ne disposent pas la plupart
            des communes.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.3} disableOnMobile>
          <Quote
            author="David Amiel"
            source="Ministre de l'Action et des Comptes publics"
          >
            La souveraineté numérique n'est plus une option.
          </Quote>
        </FadeUp>

        <FadeUp delay={0.4} disableOnMobile>
          <PContent>
            Avec le Réseau des Maisons de l'Innovation, du Numérique et de
            l'Entrepreneuriat de Carcassonne Agglo, nous avons élaboré une offre
            globale et clé en main pour aider les communes de l'Aude et du reste
            de l'Occitanie à réaliser cette transformation numérique exigée par
            les cadres réglementaires français et européens.
          </PContent>
        </FadeUp>
      </div>
    </section>
  );
}

// 1️⃣
function SectionRisques() {
  return (
    <section className="space-y-24">
      <div
        className={cn(
          "flex",
          // ↔️
          "flex-col gap-y-12",
          "xs:flex-col xs:gap-y-12",
          "sm:flex-col sm:gap-y-12",
          "md:flex-row md:gap-x-12",
          "2xl:flew-row 2xl:gap-x-18"
        )}
      >
        <div
          className={cn(
            // ↔️
            "space-y-6",
            "2xl:space-y-10"
          )}
        >
          <FadeUp disableOnMobile>
            <SupSection number={2} variant="light">
              Le coût de l'inaction
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Les risques que vous prenez{" "}
              <span className="font-medium text-foreground/60 italic">
                aujourd'hui
              </span>
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Trois familles de risques s'accumulent quand la dette technologique
            des communes n'est pas traitée : sanctions financières, attaques
            cyber, défiance des administrés. Sans traitement immédiat, la
            fenêtre d'action se referme plus vite qu'on ne le pense.
          </PContent>
        </FadeUp>
      </div>
      <div
        className="grid grid-cols-[1fr_auto] gap-y-12"
        style={{ columnGap: "64px" }}
      >
        <Separator className="col-span-2" />
        <RiskReglementaire />
        <Separator className="col-span-2" />
        <RiskEconomic />
        <Separator className="col-span-2" />
        <RiskCybersecurity />
      </div>
    </section>
  );
}

function RiskReglementaire() {
  return (
    <div
      className="col-span-2 grid grid-cols-subgrid"
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <FadeUp>
        <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
          Réglementaire
        </h3>
      </FadeUp>
      <div
        className="col-span-1 grid gap-x-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1}>
          <RiskCardRGPD />
        </FadeUp>
        <FadeUp delay={0.2}>
          <RiskCardRGAA />
        </FadeUp>
        <FadeUp delay={0.3}>
          <RiskCardDPO />
        </FadeUp>
      </div>
    </div>
  );
}
function RiskEconomic() {
  return (
    <div
      className="col-span-2 grid grid-cols-subgrid"
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <FadeUp>
        <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
          Économique
        </h3>
      </FadeUp>
      <div
        className="col-span-1 grid gap-x-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1}>
          <RiskCardOverbilling />
        </FadeUp>
        <FadeUp delay={0.2}>
          <RiskCardUnsuitableTools />
        </FadeUp>
        <FadeUp delay={0.3}>
          <RiskCardUnhappyCitizen />
        </FadeUp>
      </div>
    </div>
  );
}
function RiskCybersecurity() {
  return (
    <div
      className="col-span-2 grid grid-cols-subgrid"
      style={{ gridTemplateColumns: "subgrid" }}
    >
      <FadeUp>
        <h3 className="col-span-1 font-fraunces text-3xl text-foreground">
          Cybersécurité
        </h3>
      </FadeUp>
      <div
        className="col-span-1 grid gap-x-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <FadeUp delay={0.1}>
          <RiskCardMalware />
        </FadeUp>
        <FadeUp delay={0.2}>
          <RiskCardPhishing />
        </FadeUp>
      </div>
    </div>
  );
}

function RiskCardRGPD() {
  return (
    <RiskCard
      description="Mise en demeure publique de la CNIL et amendes financières"
      Icon={FileExclamationPointIcon}
      title="Non-conformité RGPD"
    />
  );
}
function RiskCardRGAA() {
  return (
    <RiskCard
      description="Signalements au Défenseur des droits, jusqu'à 25 000 € d'amende."
      Icon={EyeOffIcon}
      title="Non-conformité RGAA"
    />
  );
}
function RiskCardDPO() {
  return (
    <RiskCard
      description="Infraction constatée dès le premier contrôle CNIL."
      Icon={UserCheckIcon}
      title="Absence de DPO"
    />
  );
}
function RiskCardOverbilling() {
  return (
    <RiskCard
      description="Services chers et datés imposés par des prestataires qui profitent de votre méconnaissance technique."
      Icon={BanknoteIcon}
      title="Surfacturation"
    />
  );
}
function RiskCardUnsuitableTools() {
  return (
    <RiskCard
      description="Logiciels complexes et pénibles qui découragent vos agents et vous ralentissent au lieu d'aider."
      Icon={HammerIcon}
      title="Outils inadaptés"
    />
  );
}
function RiskCardUnhappyCitizen() {
  return (
    <RiskCard
      description="Difficulté d'accès à l'information sur la vie locale, pas de services en ligne pour les démarches."
      Icon={FrownIcon}
      title="Désintérêt citoyen"
    />
  );
}
function RiskCardPhishing() {
  return (
    <RiskCard
      description="Vols d'identifiants confidentiels en hausse, fuites de données sensibles."
      Icon={FishingRod}
      title="Phishing"
    />
  );
}
function RiskCardMalware() {
  return (
    <RiskCard
      description="Virus paralysant vos services pendant des semaines en exigeant une rançon."
      Icon={BugIcon}
      title="Rançongiciels"
    />
  );
}

function RiskCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="group space-y-5 rounded-2xl border-[1.5px] border-foreground/20 p-4 hover:border-primary/60">
      <div
        className={cn(
          "w-fit rounded-full border bg-foreground/5 p-2 text-foreground/60",
          "transition",
          "group-hover:border-primary/60 group-hover:bg-primary/10"
        )}
      >
        <Icon className="transition group-hover:text-primary" size={18} />
      </div>
      <div className="flex flex-col">
        <h4 className="font-medium text-foreground text-lg">{title}</h4>
        <p className="text-foreground/60 text-sm">{description}</p>
      </div>
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

function Separator({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        width: "100%",
      }}
      className={cn(
        "mx-auto h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent",
        className
      )}
      initial={{
        width: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 2,
      }}
    />
  );
}
