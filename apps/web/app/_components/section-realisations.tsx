/** biome-ignore-all lint/style/noMagicNumbers: special case */
"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { createContext, useContext, useRef, useState } from "react";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import flow1 from "@/assets/projects/flow/flow_1.png";
import flow2 from "@/assets/projects/flow/flow_2.png";
import flow3 from "@/assets/projects/flow/flow_3.png";
import OneparkFlowLogo from "@/assets/projects/flow/onepark_flow_logo.svg";
import frustrationCover from "@/assets/projects/frustration/frustration_cover.webp";
import InseeLogo from "@/assets/projects/statcraft/insee_logo.svg";
import statcraft1 from "@/assets/projects/statcraft/statcraft_1.png";
import statcraft2 from "@/assets/projects/statcraft/statcraft_2.png";
import statcraft3 from "@/assets/projects/statcraft/statcraft_3.png";
import statcraftCover from "@/assets/projects/statcraft/statcraft_cover.webp";
import { Safari } from "@/components/magicui/safari";
import Beams from "@/components/react-bits/beams";
import { cn } from "@/lib/utils";
import SectionTitle from "./section-title";

export default function Realisations() {
  const { ref } = useNavTheme({ sectionName: "realisations", theme: "dark" });
  return (
    <div
      className={cn(
        "bg-black",
        "relative flex min-h-screen w-full flex-col items-center justify-center gap-20 px-6 py-24"
      )}
      id="realisations"
      ref={ref}
    >
      <BackgroundWithBeams />
      <TopBar />
      <SectionTitle
        className="z-1"
        description="Nos derniers projets qui illustrent notre approche orientée résultats"
        title="Découvrez nos réalisations"
      />
      <Achievements />
    </div>
  );
}

// —————————————————————————————————
type Achievement = {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  companyLogo: React.ReactNode;
  companyLink: string;
  accomplishments?: string[];
  images: StaticImageData[];
};

const achievements: Achievement[] = [
  {
    accomplishments: [
      `${formatNumber(50_000)}€ de revenus mensuels`,
      "Déploiement en France, Espagne et Luxembourg",
      "+30 hôtels partenaires en 2025",
    ],
    companyLink: "https://oneparkflow.com",
    companyLogo: (
      <Image
        alt="Onepark Flow logo"
        className="h-8 w-auto translate-y-0.5 object-cover"
        height={30}
        src={OneparkFlowLogo}
        width={30}
      />
    ),
    description:
      "Réservation en ligne de places de parkings avec paiement depuis mobile, tablette ou ordinateur.",
    images: [flow1, flow2, flow3],
    slug: "dashboard-analytics",
    technologies: ["React", "Typescript", "Tailwind"],
    title: "Une plateforme de réservation",
  },
  {
    accomplishments: [
      `${formatNumber(120_000)} visiteurs uniques par mois`,
      `${formatNumber(10_000)} abonnés newsletter`,
      `${formatNumber(2000)} abonnés payants`,
    ],
    companyLink: "https://frustrationmagazine.fr",
    companyLogo: (
      <div className="flex flex-col text-center font-lobster text-white">
        <span className="text-3xl">Frustration</span>
        <span className="-mt-2 text-xl">Magazine</span>
      </div>
    ),
    description:
      "Refonte d'un média en ligne avec site, administration et newsletter.",
    images: [frustrationCover],
    slug: "media-en-ligne",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    title: "Un média en ligne",
  },
  {
    accomplishments: [
      "Profilage des visiteurs",
      "Détection des robots",
      "Amélioration des stratégies de promotion des contenus",
    ],
    companyLink: "https://insee.fr",
    companyLogo: (
      <Image
        alt="Insee logo"
        className="h-8 w-auto translate-y-0.5"
        height={30}
        src={InseeLogo}
        width={30}
      />
    ),
    description:
      "Tableau de bord pour analyser l'audience et les sources de trafic des sites Insee.",
    images: [statcraft1, statcraftCover, statcraft2, statcraft3],
    slug: "analyse-de-trafic",
    technologies: ["Next.js", "Tailwind"],
    title: "Outil de suivi d'audience",
  },
];

type AchievementContext = {
  bye: boolean;
  changeAchievement: () => void;
  triggerExitAnimation: (delta: number) => void;
  currentAchievement: Achievement;
};

const AchievementsContext = createContext<AchievementContext>(null);

function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [bye, setBye] = useState(false);
  const nextDirection = useRef(1);
  const [achievementIndex, setAchievementIndex] = useState(0);

  const currentAchievement = achievements[achievementIndex];

  const triggerExitAnimation = (delta: number) => {
    setBye((v) => !v);
    nextDirection.current = delta;
  };
  const changeAchievement = () => {
    setAchievementIndex(
      (prevIndex) => (prevIndex + nextDirection.current) % achievements.length
    );
  };

  return (
    <AchievementsContext.Provider
      value={{
        bye,
        changeAchievement,
        currentAchievement,
        triggerExitAnimation,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

function Achievements() {
  return (
    <AchievementsProvider>
      <div className="z-1 mx-auto flex w-full max-w-[1400px] gap-x-12">
        <AchievementsPanel />
        <Achievement />
      </div>
    </AchievementsProvider>
  );
}

function AchievementsPanel() {
  const { currentAchievement } = useContext(AchievementsContext);
  return (
    <div className="perspective-midrange flex flex-col gap-y-2">
      {/* 📝 Description */}
      <div className="flex h-[300px] max-w-[550px] rotate-y-8 flex-col justify-between gap-y-6 rounded-xl p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-y-4">
          <h3 className="font-bold font-kanit text-5xl text-white">
            {currentAchievement.title}
          </h3>
          <p className="text-lg text-white leading-tight">
            {currentAchievement.description}
          </p>
        </div>
        <a
          className="flex justify-center"
          href={currentAchievement.companyLink}
          target="_blank"
        >
          {currentAchievement.companyLogo}
        </a>
      </div>
      {/* ⬅️➡️ Buttons */}
      <div className="flex rotate-y-8 justify-center gap-x-12">
        <AchievementButton delta={-1}>
          <ArrowLeftIcon size={37} />
        </AchievementButton>
        <AchievementButton delta={1}>
          <ArrowRightIcon size={37} />
        </AchievementButton>
      </div>
    </div>
  );
}

function AchievementButton({
  delta,
  children,
}: {
  delta: number;
  children: React.ReactNode;
}) {
  const { triggerExitAnimation } = useContext(AchievementsContext);
  return (
    <button
      className="cursor-pointer rounded-full bg-zinc-900/20 p-5 text-white backdrop-blur-xl"
      onClick={() => triggerExitAnimation(delta)}
      type="button"
    >
      {children}
    </button>
  );
}

function Achievement() {
  const { currentAchievement } = useContext(AchievementsContext);

  const image = currentAchievement.images[0];
  return (
    <div className="perspective-midrange w-[40vw] max-w-[700px] grow px-12">
      {/* ⬇️ Back */}
      <Rotate3dAndFloat>
        <ExitAnimationBack>
          <Safari
            image={image}
            invisibleMode
            url={currentAchievement.companyLink}
          />
        </ExitAnimationBack>
      </Rotate3dAndFloat>
      {/* ⬆️ Front */}
      <Rotate3dAndFloat>
        <ExitAnimationFront>
          <Safari image={image} url={currentAchievement.companyLink} />
        </ExitAnimationFront>
      </Rotate3dAndFloat>
    </div>
  );
}

const rotationY = -15;
const amplitude = -15;

function Rotate3dAndFloat({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        rotateY: [rotationY, rotationY, rotationY], // Rotate around the Y-axis
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY, // Repeat the animation indefinitely
          repeatType: "loop", // Loop the animation
        },
        y: [0, amplitude, 0], // Move up and down
      }}
      className="transform-3d absolute! pointer-events-none aspect-auto h-auto w-full"
      initial={{
        left: 0,
        rotateY: rotationY,
        top: 0,
        y: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function ExitAnimationFront({ children }: { children: React.ReactNode }) {
  const { bye } = useContext(AchievementsContext);

  return (
    <motion.div
      animate={{
        opacity: bye ? 0 : 1,
        transition: {
          duration: 1,
        },
        translateX: bye ? -40 : 0,
        translateY: bye ? 40 : 0,
        translateZ: bye ? 0 : -40,
      }}
      initial={{
        opacity: 0,
        translateX: 40,
        translateY: -40,
        translateZ: -80,
      }}
    >
      {children}
    </motion.div>
  );
}

function ExitAnimationBack({ children }: { children: React.ReactNode }) {
  const { bye } = useContext(AchievementsContext);

  return (
    <motion.div
      animate={{
        opacity: bye ? 0 : 1,
        translateX: bye ? 0 : 40,
        translateY: bye ? 0 : -40,
        translateZ: bye ? -40 : -80,
      }}
      initial={{
        opacity: 0,
        translateX: 80,
        translateY: -80,
        translateZ: -160,
      }}
      transition={{
        opacity: {
          delay: 0.2,
          duration: 1.2,
        },
        translateX: {
          delay: 0.2,
          duration: 1.2,
        },
        translateY: {
          delay: 0.2,
          duration: 1.2,
        },
        translateZ: {
          delay: 0.2,
          duration: 1.2,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------
function BackgroundWithBeams() {
  return (
    <div className="absolute top-0 h-full w-full">
      <Beams
        beamHeight={15}
        beamNumber={12}
        beamWidth={2}
        lightColor="#f59e0b"
        noiseIntensity={1.75}
        rotation={30}
        scale={0.2}
        speed={2}
      />
    </div>
  );
}

// ----------------------------------
function TopBar() {
  return (
    <div className="absolute top-0 h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent" />
  );
}

// ----------------------------------

// function CardProjects() {
//   return (
//     <div
//       className={cn(
//         "w-full max-w-[1400px] gap-6",
//         "flex flex-col",
//         "sm:grid sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
//       )}
//     >
//       {projects.map((project) => (
//         <CardProject key={project.slug} {...project} />
//       ))}
//     </div>
//   );
// }
// function CardProject({
//   images,
//   title,
//   description,
//   accomplishments,
//   companyLogo,
//   companyLink,
// }: Project) {
//   return (
//     <Card className="relative cursor-auto overflow-hidden pt-0">
//       {/* 🖼️ Image */}
//       <div className="relative h-[250px] overflow-hidden">
//         <div className="group relative grid h-full w-full place-items-center">
//           <Image
//             alt="Realisation"
//             className="h-full object-cover"
//             height={1200}
//             src={images[0]}
//             width={1200}
//           />
//           {/* 🥷 Shadow */}
//           <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
//             <div className="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-primary/20 to-transparent" />
//           </div>
//         </div>
//       </div>

//       {/* 🔡 Description */}
//       <CardContent className="mb-4">
//         <CardTitle className="mb-1 font-kanit font-semibold text-2xl">
//           {title}
//         </CardTitle>
//         <CardDescription className="text-base leading-tight">
//           {description}
//         </CardDescription>
//         {/* 🏆 Accomplishments */}
//         {accomplishments && accomplishments.length > 0 && (
//           <div className="mt-4 flex flex-col gap-y-2">
//             <div className="font-bold text-sm text-white/80">
//               ✨ Les résultats
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {accomplishments.map((accomplishment) => (
//                 <Accomplishment key={accomplishment}>
//                   {accomplishment}
//                 </Accomplishment>
//               ))}
//             </div>
//           </div>
//         )}
//       </CardContent>

//       {/* ⚙️ Technologies */}
//       <CardFooter className="mt-auto mr-4 ml-auto flex items-center gap-3">
//         <span className="text-sm italic">Réalisé pour</span>
//         <a
//           className="cursor-pointer"
//           href={companyLink}
//           rel="noopener noreferrer"
//           target="_blank"
//         >
//           {companyLogo}
//         </a>
//       </CardFooter>
//     </Card>
//   );
// }

// ----------------------------------
// function Accomplishment({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/30 px-3 py-1 text-primary">
//       <TrophyIcon size={12} />
//       <span className="text-xs">{children}</span>
//     </div>
//   );
// }

// ----------------------------------
function formatNumber(number: number) {
  // Use the user's browser locale, default to "fr-FR" if not available
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    const locale =
      window.navigator.languages?.[0] || window.navigator.language || "fr-FR";
    return number.toLocaleString(locale);
  }
  return number.toLocaleString("fr-FR");
}
