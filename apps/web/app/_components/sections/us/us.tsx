"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import DitheredImage from "@/components/motion-core/dithered-image/dithered-image";
import GlowLine from "@/components/sera-ui/glow-line";
import { OPEN_CARCA_WINNER_URL } from "@/constants";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";

export default function SectionUs() {
  return (
    <Section className="overflow-hidden pb-0!" id="us" theme="dark">
      <GlowLine color="orange" orientation="horizontal" position="0px" />
      <SectionTitle title="Qui sommes-nous ?" />
      <div
        className={cn(
          //⬆️ Margin top
          "mt-0",
          "lg:mt-8",
          "xl:mt-12",
          "2xl:mt-16",
          // ↔️ Width
          "w-full",
          "max-w-[60ch]",
          // ↕️ Spacing
          "space-y-12",
          "lg:space-y-14",
          "2xl:space-y-20"
        )}
      >
        <Intro />
        <Founders />
        <Values />
        <BannerImage />
        <WhyUs />
      </div>
    </Section>
  );
}

// ==============================
// 1️⃣ Intro
function Intro() {
  return (
    <div className="space-y-4">
      <P className="mb-12 text-center font-medium text-2xl">
        Le collectif Dev'Oc est né d'une conviction simple : remettre l'humain
        et la proximité au centre des projets technologiques.
      </P>
      <P className="font-medium text-xl">
        <a
          className="underline"
          href={OPEN_CARCA_WINNER_URL}
          rel="noopener"
          target="_blank"
        >
          Lauréat 2025 du concours entrepreneurial de Carcassonne Agglo
        </a>
        , Dev'Oc accompagne les entreprises, artisans et collectivités
        d'Occitanie dans leur transformation numérique (création de sites web,
        mise en conformité règlementaire, automatisation des processus,
        sécurisation des infrastructures) avec la proximité et l'exigence comme
        boussole.
      </P>
      <P className="font-medium text-xl">
        À la transformation nous joignons toujours la transmission en animant
        des formations à destination des entrepreneurs et des élus pour
        démystifier ces sujets, révéler des pistes d'action et diffuser le plus
        largement possible les bonnes pratiques, le tout dans un langage clair
        et accessible.
      </P>
      <P className="font-medium text-xl">
        En un mot, nous avons choisi de mettre toute notre expertise au service
        du tissu économique local, persuadés que l'un des meilleurs moyens de
        développer un territoire est d'améliorer son empreinte numérique.
      </P>
    </div>
  );
}

// ==============================
// 2️⃣ Founders
function Founders() {
  return (
    <>
      <H3>Les fondateurs</H3>
      <div
        className={cn(
          "grid justify-items-center gap-4",
          // 📱
          "grid-cols-1",
          // 💻
          "xl:grid-cols-[50%_50%]"
        )}
      >
        <div className="relative">
          <DeveloperName className="from-primary-strong to-primary">
            Clément
          </DeveloperName>
          <P>
            L'architecte de l'invisible. Bases de données, interconnexions entre
            systèmes, automatisation des tâches répétitives, infrastructure et
            déploiement : il conçoit les fondations sur lesquelles repose vos
            outils numériques. Avec toujours comme maîtres mots l'efficacité et
            la résilience.
          </P>{" "}
          <Portrait
            className={cn(
              // 📱
              "mx-auto my-10",
              // 🖥️
              "xl:top-0 xl:left-0 xl:my-0 xl:-translate-x-[calc(100%+40px)]",
              "scale-x-[1]"
            )}
            color="#F56E0F"
            src="./clement-portrait.webp"
          />
        </div>
        <div className="relative">
          <DeveloperName
            className={cn("from-primary to-primary-lighter", "xl:ml-auto")}
          >
            Thibaut
          </DeveloperName>
          <P className="xl:text-right">
            L'interface entre vous et vos utilisateurs. Il traduit vos besoins
            en expériences numériques claires, accessibles et efficaces. Expert
            en développement web, conformité RGPD, accessibilité, il s'assure
            que vos interfaces restent modernes avec une identité forte mais
            également conformes et durables.
          </P>{" "}
          <Portrait
            className={cn(
              // 📱
              "mx-auto my-10",
              // 🖥️
              "xl:top-0 xl:right-0 xl:my-0 xl:translate-x-full",
              "scale-x-[-1]"
            )}
            color="#FFC731"
            src="./thibaut-portrait.webp"
          />
        </div>
      </div>
      <P className="text-center font-medium text-2xl">
        Ensemble, ils forment un binôme complémentaire : là où l'un construit la
        mécanique, l'autre soigne l'expérience. Deux regards, une même exigence.
      </P>{" "}
    </>
  );
}

// ==============================
// 3️⃣ Values
function Values() {
  return (
    <>
      <H3>Nos valeurs</H3>
      <ul className="mb-36 space-y-14">
        <li>
          <H4>#1 La proximité géographique et humaine</H4>
          <P>
            Les meilleurs projets se construisent en face-à-face. Nous nous
            déplaçons volontiers dans vos locaux, vos mairies et vos bureaux à
            travers toute l'Occitanie pour comprendre vos réalités concrètes et
            vous former à vos outils, sans chercher à appliquer mécaniquement la
            même recette de client en client.
          </P>
        </li>
        <li>
          <H4>#2 L'autonomie des utilisateurs et la protection des données</H4>
          <P>
            Vos données sont votre patrimoine. Nous privilégions les solutions{" "}
            <i>open source</i> et l'hébergement souverain pour garantir votre
            indépendance tout en vous donnant les moyens de construire votre
            autonomie par la formation continue et la fourniture de guides
            d'utilisation de vos outils.
          </P>
        </li>
        <li>
          <H4>#3 L'esprit ingénieur à votre service</H4>
          <P>
            Notre objectif est de trouver les meilleures solutions avec des
            combinaisons technologiques adaptées à vos besoins et à un coût
            compétitif. Issus du monde professionnel et des grands groupes, nous
            en importons les méthodes et la rigueur pour les mettre au service
            des TPE, PME et collectivités locales qui n'ont pas toujours les
            ressources internes nécessaires pour faire face à certains défis
            techniques.
          </P>
        </li>
      </ul>
    </>
  );
}

// ==============================
// 🖼️
function BannerImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: ref,
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div
      className={cn("ml-[calc(-50vw+50%)] h-50 w-screen", "overflow-hidden")}
      ref={ref}
    >
      <motion.div className="h-[150%] w-full lg:h-[250%]" style={{ y }}>
        <DitheredImage
          backgroundColor="#09090b"
          className="h-full w-full"
          color="#F56E0F"
          ditherMap="voidAndCluster"
          pixelSize={1}
          src="./photo-groupe.webp"
          threshold={0.05}
        />
      </motion.div>
    </div>
  );
}

// ==============================
// 4️⃣ Why us
function WhyUs() {
  return (
    <>
      <H3 className="mt-36">Pourquoi choisir Dev'Oc ?</H3>
      <ul className="space-y-6">
        <li>
          <H4>Un interlocuteur unique, pas une agence anonyme</H4>
          <P>
            Vous parlez directement aux personnes qui effectuent le travail
            commandé et qui apprennent ainsi à vous connaître pour construire
            une relation de confiance au fil du temps, pas à un commercial qui
            transmet à une équipe <i>offshore</i> ou à un service d'assistance
            en ligne.
          </P>
        </li>
        <li>
          <H4>Une expertise réglementaire intégrée</H4>
          <P>
            RGPD, RGAA, NIS2, facturation électronique : nous anticipons les
            obligations qui s'imposent à vous dans le cadre français ou européen
            en vous évitant de vous embarquer avec des outils inadaptés qui
            finissent par vous coûter cher et dont il devient ensuite difficile
            de se séparer. En nous confiant vos besoins, vos produits numériques
            sont conformes dès leur conception et passent tous les caps
            réglementaires afin de vous assurer une totale sérénité et vous
            garantir contre tout risque juridique.
          </P>
        </li>
        <li>
          <H4>L'impact territorial</H4>
          <P>
            Travailler avec Dev'Oc, c'est choisir de réinjecter de la valeur
            dans l'économie de votre territoire pour en faire rayonner les
            acteurs et participer de la montée en puissance numérique de la
            région.
          </P>
        </li>
        <li>
          <H4>Une reconnaissance indépendante</H4>
          <P>
            Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo,
            notre approche a été reconnue par les acteurs économiques du
            territoire que nous servons.
          </P>
        </li>
      </ul>
    </>
  );
}

// ==============================
// 🔠 Typography

function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-200",
        "text-lg",
        "leading-snug",
        "font-medium",
        "empty:hidden",
        className
      )}
    >
      {children}
    </p>
  );
}

function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "w-fit",
        "bg-linear-to-br from-primary-strong via-primary to-primary-lighter bg-clip-text text-transparent",
        "my-6",
        "font-kanit font-semibold text-5xl",
        className
      )}
    >
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "w-fit",
        "bg-linear-to-tl from-primary to-primary-lighter bg-clip-text text-transparent",
        "font-bold text-xl"
      )}
    >
      {children}
    </h4>
  );
}

function DeveloperName({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "w-fit",
        "relative",
        "font-bold font-fira-code",
        "bg-linear-to-tr from-primary to-primary-lighter bg-clip-text text-transparent uppercase",
        "font-bold text-2xl",
        className
      )}
    >
      <SparklesText
        colors={{
          first: "var(--primary)",
          second: "var(--primary-lighter)",
        }}
        sparklesCount={7}
      >
        {children}
      </SparklesText>
    </h4>
  );
}

// ====================================
// 🖼️ Portrait
function Portrait({
  className,
  color,
  src,
}: {
  className: string;
  color: string;
  src: string;
}) {
  return (
    <DitheredImage
      backgroundColor="#09090b" // zinc-9500
      className={cn("size-100 xl:absolute", className)}
      color={color}
      ditherMap="bayer8x8"
      pixelSize={1}
      src={src}
      threshold={0.05}
    />
  );
}
