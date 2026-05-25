"use client";
import {
  CrownIcon,
  type LucideIcon,
  MapPinIcon,
  ShieldCheckIcon,
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
      <SectionIntro />
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
    <motion.div
      animate={{
        width: "100%",
      }}
      className="mx-auto h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent"
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
