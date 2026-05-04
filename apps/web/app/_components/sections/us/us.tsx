"use client";
import { motion } from "motion/react";
// import { SparklesText } from "@/components/magicui/sparkles-text";
import DitheredImage from "@/components/motion-core/dithered-image/dithered-image";
// import RubiksCube from "@/components/motion-core/rubiks-cube/rubiks-cube";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
// import Ornament from "./assets/ornament";
import { PContent } from "./components/p-content";
import { PIntro } from "./components/p-intro";
import { SectionCatchline } from "./components/section-catchline";
import { SectionSeparator } from "./components/section-separator";
import { SupSection } from "./components/sup-section";
export default function SectionUs() {
  return (
    <div className={cn("relative bg-background-dark text-white", "min-h-400")}>
      <div className={cn("max-w-430", "mx-auto", "p-46", "space-y-36")}>
        <TopLine />
        <SectionCollectif />
        <SectionSeparator />
        <Portraits />
      </div>
    </div>
  );
}

function TopLine() {
  return <GlowLine color="orange" orientation="horizontal" position="0px" />;
}

// 1️⃣
function SectionCollectif() {
  return (
    <section className="mx-auto flex gap-x-42">
      <div className="space-y-10">
        <FadeUp>
          <SupSection number={1}>Le collectif</SupSection>
        </FadeUp>
        <FadeUp delay={0.1}>
          <SectionCatchline>
            Remettre la transmission et l'autonomie au centre de la{" "}
            <span className="font-extralight text-foreground-dark/60 italic">
              tech
            </span>
            .
          </SectionCatchline>
        </FadeUp>
      </div>

      <div className="grow space-y-10">
        <FadeUp delay={0.1}>
          <PIntro>
            Dev'Oc est né d'une conviction simple : la proximité, la clarté et
            l'exigence d'ingénieurs sont compatibles avec les budgets des TPE,
            PME et collectivités locales.
          </PIntro>
        </FadeUp>

        <FadeUp delay={0.2}>
          <PContent>
            Nous accompagnons les acteurs d'Occitanie dans leur transformation
            numérique — création de sites web, mise en conformité réglementaire,
            automatisation de processus, sécurisation des infrastructures — avec
            la proximité et l'exigence comme boussole.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.3}>
          <PContent>
            À la transformation, nous joignons la transmission. Nous animons des
            formations à destination des entrepreneurs et des élus pour
            démystifier ces sujets, révéler des pistes d'action et diffuser
            largement les bonnes pratiques, dans un langage clair et accessible.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.4}>
          <PContent>
            Notre conviction : améliorer l'empreinte numérique d'un territoire,
            c'est l'une des meilleures façons de le faire grandir.
          </PContent>
        </FadeUp>
      </div>
    </section>
  );
}

// 2️⃣
function Portraits() {
  return (
    <FadeUp>
      <div className="-mt-16 flex gap-x-18">
        <Portrait
          color="#F56E0F"
          description="L'architecte de l'invisible. Bases de données, interconnexions de systèmes, automatisation des tâches répétitives, infrastructure et déploiement : il conçoit les fondations sur lesquelles reposent vos outils numériques. Avec toujours comme maîtres mots l'efficacité et la résilience."
          name="Clément"
          src="./clement-portrait.webp"
        />
        <Portrait
          color="#FFC731"
          description="L'interface entre vous et vos utilisateurs. Il traduit vos besoins en expériences numériques claires, accessibles et efficaces. Expert en développement web, conformité RGPD et accessibilité, il s'assure que vos interfaces restent modernes, conformes et durables."
          name="Thibaut"
          src="./thibaut-portrait.webp"
        />
      </div>
    </FadeUp>
  );
}

function Portrait({
  color,
  name,
  description,
  src,
}: {
  color: string;
  name: string;
  description: string;
  src: string;
}) {
  return (
    <div
      className={cn(
        "group",
        "grow",
        "relative",
        "rounded-4xl",
        "flex flex-col gap-y-6",
        "p-9",
        "min-h-240",
        "border",
        "border-foreground-dark/10",
        "hover:border-foreground-dark/15",
        "transition-colors"
      )}
    >
      <PortraitImage color={color} name={name} src={src} />
      <p className="text-base text-foreground-dark/50">{description}</p>
    </div>
  );
}

function PortraitImage({
  color,
  name,
  src,
}: {
  color: string;
  name: string;
  src: string;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="grow overflow-hidden rounded-3xl bg-black">
        <DitheredImage
          backgroundColor="#000" // background-dark
          className={cn(
            "group-hover:scale-105",
            "ease-out",
            "mask-b-from-70% mask-b-to-100%",
            "duration-500",
            "transition-transform"
          )}
          color={color}
          ditherMap="bayer4x4"
          pixelSize={1}
          src={src}
          threshold={0.05}
        />
      </div>
      <span className="absolute bottom-4 left-6 flex flex-col gap-y-1.5">
        <span className="font-geist-mono text-[0.7rem] text-foreground-dark/50 uppercase">
          Co-fondateur • Backend & infrastructure
        </span>
        <span
          className="bg-clip-text! font-fraunces text-4xl text-transparent"
          style={{
            background: `linear-gradient(to right, ${color}, ${color}20`,
          }}
        >
          {name}
        </span>
      </span>
    </div>
  );
}

// 🎬
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

// ==============================
// 2️⃣ Founders
// function Founders() {
//   return (
//     <div className="relative">
//       <H3>Les fondateurs</H3>
//       <div
//         className={cn(
//           "grid justify-items-center gap-4",
//           // 📱
//           "grid-cols-1",
//           // 💻
//           "xl:grid-cols-[1fr_1fr]"
//         )}
//       >
//         <div className="relative">
//           <DeveloperName className="from-primary-strong to-primary">
//             Clément
//           </DeveloperName>
//           <P>
//             L'architecte de l'invisible. Bases de données, interconnexions entre
//             systèmes, automatisation des tâches répétitives, infrastructure et
//             déploiement : il conçoit les fondations sur lesquelles reposent vos
//             outils numériques. Avec toujours comme maîtres mots l'efficacité et
//             la résilience.
//           </P>{" "}
//           {/*<Portrait
//             className={cn(
//               // 📱
//               "mx-auto my-10",
//               // 🖥️
//               "xl:top-0 xl:left-0 xl:my-0 xl:-translate-x-[calc(100%+40px)]",
//               "scale-x-[1]"
//             )}
//             color="#F56E0F"
//             src="./clement-portrait.webp"
//           />*/}
//         </div>
//         <div className="relative">
//           <DeveloperName
//             className={cn("from-primary to-primary-lighter", "xl:ml-auto")}
//           >
//             Thibaut
//           </DeveloperName>
//           <P className="xl:text-right">
//             L'interface entre vous et vos utilisateurs. Il traduit vos besoins
//             en expériences numériques claires, accessibles et efficaces. Expert
//             en développement web, conformité RGPD, accessibilité, il s'assure
//             que vos interfaces restent modernes avec une identité forte mais
//             également conformes et durables.
//           </P>{" "}
//           {/*<Portrait
//             className={cn(
//               "scale-x-[-1]",
//               // 📱
//               "mx-auto my-10",
//               // 🖥️
//               "xl:top-0 xl:right-0 xl:my-0 xl:translate-x-full"
//             )}
//             color="#FFC731"
//             src="./thibaut-portrait.webp"
//           />*/}
//         </div>
//       </div>
//       <div className={cn("mt-24 mb-0", "md:mt-24 md:mb-16")}>
//         <div className="h-px w-full bg-linear-to-r from-primary-strong to-primary-lighter" />
//         <P className="mt-8 text-pretty text-center font-medium text-2xl">
//           Ensemble, ils forment un binôme complémentaire : là où l'un construit
//           la mécanique, l'autre soigne l'expérience. Deux regards, une même
//           exigence.
//         </P>
//         <Ornament
//           className="mx-auto mt-14 rotate-180"
//           gradient={["var(--primary-lighter)", "var(--primary-strong)"]}
//         />
//         <CustomRubiksCube />
//       </div>
//     </div>
//   );
// }

//🧊
// function CustomRubiksCube() {
//   return (
//     <RubiksCube
//       className={cn(
//         "hidden",
//         "md:block",
//         "-my-20",
//         "h-96 w-full",
//         "translate-y-[15%]",
//         "opacity-70"
//       )}
//       fresnelConfig={{
//         color: "#09090B",
//         rimColor: "#FC6B08",
//       }}
//       size={1.6}
//     />
//   );
// }

// ==============================
// 3️⃣ Values
// function Values() {
//   return (
//     <div>
//       <H3>Nos valeurs</H3>
//       <ul className="mb-0! space-y-6">
//         <li>
//           <H4>#1 La proximité géographique et humaine</H4>
//           <P>
//             Les meilleurs projets se construisent en face-à-face. Nous nous
//             déplaçons volontiers dans vos locaux, vos mairies et vos bureaux à
//             travers toute l'Occitanie pour comprendre vos réalités concrètes et
//             vous former à vos outils, sans chercher à appliquer mécaniquement la
//             même recette de client en client.
//           </P>
//         </li>
//         <li>
//           <H4>#2 L'autonomie des utilisateurs et la protection des données</H4>
//           <P>
//             Vos données sont votre patrimoine. Nous privilégions les solutions{" "}
//             <i>open source</i> et l'hébergement souverain pour garantir votre
//             indépendance tout en vous donnant les moyens de construire votre
//             autonomie par la formation continue et la fourniture de guides
//             d'utilisation de vos outils.
//           </P>
//         </li>
//         <li>
//           <H4>#3 L'esprit ingénieur à votre service</H4>
//           <P>
//             Notre objectif est de trouver les meilleures solutions avec des
//             combinaisons technologiques adaptées à vos besoins et à un coût
//             compétitif. Issus du monde professionnel et des grands groupes, nous
//             en importons les méthodes et la rigueur pour les mettre au service
//             des TPE, PME et collectivités locales qui n'ont pas toujours les
//             ressources internes nécessaires pour faire face à certains défis
//             techniques.
//           </P>
//         </li>
//       </ul>
//     </div>
//   );
// }

// ==============================
// 🖼️
// function BannerImage() {
//   return (
//     <div
//       className={cn(
//         "ml-[calc(-50vw+50%)] w-screen",
//         "overflow-hidden",
//         "h-30 md:h-50"
//       )}
//     >
//       <DitheredImage
//         backgroundColor="#09090b"
//         className="h-full w-full"
//         color="#F56E0F"
//         ditherMap="voidAndCluster"
//         pixelSize={1}
//         src="./photo-groupe.webp"
//         threshold={0.05}
//       />
//     </div>
//   );
// }

// ==============================
// 4️⃣ Why us
// function WhyUs() {
//   return (
//     <div>
//       <H3>Pourquoi choisir Dev'Oc ?</H3>
//       <ul className="space-y-6">
//         <li>
//           <H4>Un interlocuteur unique, pas une agence anonyme</H4>
//           <P>
//             Vous parlez directement aux personnes qui effectuent le travail
//             commandé et qui apprennent ainsi à vous connaître pour construire
//             une relation de confiance au fil du temps, pas à un commercial qui
//             transmet à une équipe <i>offshore</i> ou à un service d'assistance
//             en ligne.
//           </P>
//         </li>
//         <li>
//           <H4>Une expertise réglementaire intégrée</H4>
//           <P>
//             RGPD, RGAA, NIS2, facturation électronique : nous anticipons les
//             obligations qui s'imposent à vous dans le cadre français ou européen
//             en vous évitant de vous embarquer avec des outils inadaptés qui
//             finissent par vous coûter cher et dont il devient ensuite difficile
//             de se séparer. En nous confiant vos besoins, vos produits numériques
//             sont conformes dès leur conception et passent tous les caps
//             réglementaires afin de vous assurer une totale sérénité et vous
//             garantir contre tout risque juridique.
//           </P>
//         </li>
//         <li>
//           <H4>L'impact territorial</H4>
//           <P>
//             Travailler avec Dev'Oc, c'est choisir de réinjecter de la valeur
//             dans l'économie de votre territoire pour en faire rayonner les
//             acteurs et participer de la montée en puissance numérique de la
//             région.
//           </P>
//         </li>
//         <li>
//           <H4>Une reconnaissance indépendante</H4>
//           <P>
//             Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo,
//             notre approche a été reconnue par les acteurs économiques du
//             territoire que nous servons.
//           </P>
//         </li>
//       </ul>
//     </div>
//   );
// }
