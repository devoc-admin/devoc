import Image, { type StaticImageData } from "next/image";
import SectionTitle from "@/app/components/section-title";
import flow1 from "@/assets/projects/flow/flow_1.png";
import flow2 from "@/assets/projects/flow/flow_2.png";
import flow3 from "@/assets/projects/flow/flow_3.png";
import flowMockup from "@/assets/projects/flow/flow_mockup.avif";
import OneparkFlowLogo from "@/assets/projects/flow/onepark_flow_logo.svg";
import frustrationCover from "@/assets/projects/frustration/frustration_cover.webp";
import InseeLogo from "@/assets/projects/statcraft/insee_logo.svg";
import statcraft1 from "@/assets/projects/statcraft/statcraft_1.png";
import statcraft2 from "@/assets/projects/statcraft/statcraft_2.png";
import statcraft3 from "@/assets/projects/statcraft/statcraft_3.png";
import statcraftCover from "@/assets/projects/statcraft/statcraft_cover.webp";
import Beams from "@/components/react-bits/beams";
// import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  companyLogo: React.ReactNode;
  companyLink: string;
  images: StaticImageData[];
};

const projects: Project[] = [
  {
    title: "Une plateforme de réservation",
    slug: "dashboard-analytics",
    description:
      "Plateforme de réservation en ligne de places de parking chez les hôtels partenaires permettant au client de réserver en avance son emplacement depuis son téléphone ou son ordinateur ou de régler en ligne un accès-sur-demande.",
    images: [flowMockup, flow2, flow1, flow3],
    companyLogo: (
      <Image
        alt="Onepark Flow logo"
        className="h-6.5 w-auto translate-y-0.5 object-cover"
        height={30}
        src={OneparkFlowLogo}
        width={30}
      />
    ),
    companyLink: "https://oneparkflow.com",
    technologies: ["React", "Typescript", "Tailwind"],
  },
  {
    title: "Outil d'analytiques des visites",
    slug: "analyse-de-trafic",
    description:
      "Outil interne pour mesurer les courbes d'audience des publications de l'Insee et analyser les différentes sources de trafic sur ses différents sites web.",
    images: [statcraftCover, statcraft1, statcraft2, statcraft3],
    technologies: ["Next.js", "Tailwind"],
    companyLogo: (
      <Image
        alt="Insee logo"
        className="h-6.5 w-auto translate-y-0.5"
        height={30}
        src={InseeLogo}
        width={30}
      />
    ),
    companyLink: "https://insee.fr",
  },
  {
    title: "Un média en ligne",
    slug: "media-en-ligne",
    description:
      "Redesign d'un média en ligne avec de nouveaux outils de gestion pour la rédaction. La solution complète comprenait un site web et un panel d'administration pour la gestion des articles et des contributeurs, un module d'abonnement et la mise en place d'une newsletter.",
    images: [frustrationCover],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    companyLink: "https://frustrationmagazine.fr",
    companyLogo: (
      <div className="flex flex-col text-center font-lobster">
        <span className="text-xl">Frustration</span>
        <span className="-mt-2 text-base">Magazine</span>
      </div>
    ),
  },
];

export default function Realisations() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-20 bg-black px-6 py-24"
      id="realisations"
    >
      {/* ✨ Beams */}
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
      {/* 🌈 Top bar */}
      <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      {/* 🆎 Title */}
      <SectionTitle
        className="z-1"
        description="Quelques exemples de projets récents de nos développeurs qui illustrent notre expertise et notre approche orientée résultats 👇"
        title="Découvrez nos réalisations"
      />

      {/* 🃏 Cards */}
      <div
        className={cn(
          "w-full max-w-[1300px] gap-8",
          "flex flex-col",
          "sm:grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
        )}
      >
        {projects.map((project) => (
          <CardProject key={project.slug} {...project} />
        ))}
      </div>

      {/* ⏹️ Voir nos réalisations */}
      {/* <Button className="z-1 rounded-full border-2 border-primary bg-secondary px-8 py-5.5 font-bold text-lg text-secondary-foreground duration-400 hover:cursor-pointer">
        <div className="flex items-center gap-3">
          <span>Voir nos réalisations</span>
        </div>
      </Button> */}
    </div>
  );
}

// ----------------------------------

function CardProject({
  images,
  title,
  description,
  companyLogo,
  companyLink,
}: Project) {
  return (
    <Card className="relative cursor-auto overflow-hidden pt-0">
      {/* 🖼️ Image */}
      <div className="relative h-[250px] overflow-hidden">
        <div className="group relative grid h-full w-full place-items-center">
          <Image
            alt="Realisation"
            className="h-full object-cover"
            height={1200}
            src={images[0]}
            width={1200}
          />
          {/* 🥷 Shadow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* 🔡 Description */}
      <CardContent className="mb-4">
        <CardTitle className="mb-1">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      {/* ⚙️ Technologies */}
      <CardFooter className="mt-auto mr-4 ml-auto flex items-center gap-3">
        <span className="text-sm italic">Réalisé pour</span>
        <a
          className="cursor-pointer"
          href={companyLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {companyLogo}
        </a>
      </CardFooter>
    </Card>
  );
}
