import Image from "next/image";
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

const projects = [
  {
    title: "Dashboard Analytics",
    key: "dashboard-analytics",
    description:
      "Plateforme de business intelligence avec visualisations en temps réel et tableaux de bord personnalisables.",
    type: "Application web",
    technologies: ["React", "Typescript", "D3.js", "Node.js"],
    image: appMockup1,
  },
  {
    title: "E-commerce Premium",
    key: "e-commerce-premium",
    description:
      "Site e-commerce haute performance avec gestion des stocks, paiements sécurisés et interface mobile-first.",
    type: "Site e-commerce",
    technologies: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: appMockup2,
  },
  {
    title: "Application SaaS",
    key: "application-saas",
    description:
      "Solution SaaS complète avec authentification, abonnements et API intégrée pour la gestion de projets.",
    type: "Application mobile",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    image: appMockup3,
  },
];

function TopBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white font-semibold text-xs z-1 absolute top-3 left-3 bg-purple-800/80 rounded-full px-3 py-1">
      {children}
    </div>
  );
}

function BottomBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs text-purple-600/80 bg-purple-900/20 rounded-full px-3 py-1">
      {children}
    </div>
  );
}

export default function Showcase() {
  return (
    <div className="h-screen w-full bg-black relative flex flex-col justify-center items-center gap-12">
      <div className="absolute top-0 w-full h-full">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#a855f7"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="flex flex-col z-1 gap-4 mx-auto text-center">
        <h2 className="text-white text-6xl font-bold">
          Découvrez nos réalisations
        </h2>
        <div className="text-gray-400 text-xl max-w-2xl mx-auto">
          Découvrez quelques-uns de nos projets récents qui illustrent notre
          expertise et notre approche orientée résultats.
        </div>
      </div>

      <div className="grid px-12 grid-cols-[repeat(3,400px)] items-center gap-8">
        {projects.map(
          ({ title, key, description, type, technologies, image }) => (
            <Card key={key} className="relative pt-0 overflow-hidden">
              <TopBadge>{type}</TopBadge>
              <div className="overflow-hidden h-[200px] relative">
                <div className="group relative w-full h-full">
                  <Image
                    src={image}
                    className="w-full absolute -translate-y-1/2 top-1/2"
                    alt="Realisation"
                    width={300}
                    height={300}
                  />
                  <div className="pointer-events-none absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
              <CardContent className="gap-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardContent>

              <CardFooter className="flex gap-2">
                {technologies.map((technology) => (
                  <BottomBadge key={technology}>{technology}</BottomBadge>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>

      <Button className="z-1 rounded-full bg-black border-2 hover:cursor-pointer border-purple-600 px-8 py-5.5 text-lg font-bold">
        <div className="flex gap-3 items-center">
          <span>Voir toutes nos réalisations</span>
        </div>
      </Button>
    </div>
  );
}
