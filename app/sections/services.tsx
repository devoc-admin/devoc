"use client";

import {
  CodeIcon,
  LifeBuoy,
  PaletteIcon,
  PhoneIcon,
  SearchIcon,
  ServerIcon,
} from "lucide-react";
import ServiceCard from "@/app/components/service-card";
import Lamp from "@/components/aceternity/lamp";

const services = [
  {
    title: "Développement Web",
    description:
      "Sites web modernes et performants avec les dernières technologies (React, Vue, Angular).",
    features: ["Responsive Design", "Performance optimisée", "SEO intégré"],
    Icon: CodeIcon,
  },
  {
    title: "Applications Mobiles",
    description:
      "Applications web progressives et applications natives pour iOS et Android.",
    features: ["PWA", "React Native", "Interface intuitive"],
    Icon: PhoneIcon,
  },
  {
    title: "Référencement SEO",
    description:
      "Optimisation pour les moteurs de recherche et amélioration de votre visibilité.",
    features: ["Audit SEO", "Optimisation technique", "Suivi des performances"],
    Icon: SearchIcon,
  },
  {
    title: "Design UX/UI",
    description:
      "Conception d'interfaces utilisateur modernes et expériences optimisées.",
    features: ["Wireframes", "Prototypage", "Design system"],
    Icon: PaletteIcon,
  },
  {
    title: "Développement Backend",
    description:
      "API robustes, bases de données et architecture serveur sécurisée.",
    features: ["API REST/GraphQL", "Base de données", "Architecture sécurisée"],
    Icon: ServerIcon,
  },
  {
    title: "Support & Maintenance",
    description:
      "Maintenance continue, mises à jour et support technique 24/7.",
    features: ["Maintenance", "Support réactif", "Mise à jour"],
    Icon: LifeBuoy,
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 px-8 pt-88 pb-12 flex flex-col justify-between items-center gap-32">
      <Lamp />
      <div className="flex flex-col gap-4 mx-auto text-center">
        <h2 className="text-white text-6xl font-bold">Nos Services</h2>
        <div className="text-gray-400 text-xl max-w-2xl mx-auto">
          Une gamme complète de services pour accompagner votre transformation
          digitale, de la conception à la mise en ligne et au-delà.
        </div>
      </div>

      <div className="grid px-12 grid-cols-[repeat(3,400px)] items-center gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            features={service.features}
            Icon={service.Icon}
          />
        ))}
      </div>
      <div />
    </div>
  );
}
