import Image, { type StaticImageData } from "next/image";
import SectionTitle from "@/app/components/section-title";
import appMockup1 from "@/assets/app-mockup-1.png";
import appMockup2 from "@/assets/app-mockup-2.png";
import appMockup3 from "@/assets/app-mockup-3.png";
import Beams from "@/components/react-bits/beams";
import { Button } from "@/components/ui/button";
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
  type: string;
  technologies: string[];
  image: StaticImageData;
};

const projects: Project[] = [
  {
    title: "Dashboard Analytics",
    slug: "dashboard-analytics",
    description:
      "Plateforme de business intelligence avec visualisations en temps réel et tableaux de bord personnalisables.",
    type: "Application web",
    technologies: ["React", "Typescript", "D3.js", "Node.js"],
    image: appMockup1,
  },
  {
    title: "E-commerce Premium",
    slug: "e-commerce-premium",
    description:
      "Site e-commerce haute performance avec gestion des stocks, paiements sécurisés et interface mobile-first.",
    type: "Site e-commerce",
    technologies: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: appMockup2,
  },
  {
    title: "Application SaaS",
    slug: "application-saas",
    description:
      "Solution SaaS complète avec authentification, abonnements et API intégrée pour la gestion de projets.",
    type: "Application mobile",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    image: appMockup3,
  },
];

export default function Realisations() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-black px-6 py-24"
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
        description="Découvrez quelques-uns de nos projets récents qui illustrent notre expertise et notre approche orientée résultats."
        title="Découvrez nos dernières réalisations"
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
      <Button className="z-1 rounded-full border-2 border-primary bg-secondary px-8 py-5.5 font-bold text-lg text-secondary-foreground duration-400 hover:cursor-pointer">
        <div className="flex items-center gap-3">
          <span>Voir nos réalisations</span>
        </div>
      </Button>
    </div>
  );
}

// ----------------------------------

function CardProject({
  type,
  image,
  title,
  description,
  technologies,
}: Project) {
  return (
    <Card className="relative overflow-hidden pt-0">
      {/* 🔡 Type */}
      <div className="absolute top-3 left-3 z-1 rounded-full bg-primary/80 px-3 py-1 font-semibold text-white text-xs">
        {type}
      </div>

      {/* 🖼️ Image */}
      <div className="relative h-[200px] overflow-hidden">
        <div className="group relative h-full w-full">
          <Image
            alt="Realisation"
            className="-translate-y-1/2 absolute top-1/2 w-full"
            height={300}
            src={image}
            width={300}
          />
          {/* 🥷 Shadow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* 🔡 Description */}
      <CardContent className="gap-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      {/* ⚙️ Technologies */}
      <CardFooter className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <div
            className="rounded-full bg-primary/15 px-3 py-1 font-regular text-primary text-xs"
            key={technology}
          >
            {technology}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
