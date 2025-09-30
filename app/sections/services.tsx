import SectionTitle from "@/app/components/section-title";
import ServiceCard from "@/app/components/service-card";
import Lamp from "@/components/aceternity/lamp";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: string;
};

const services: Service[] = [
  {
    title: "Développement Web",
    description:
      "Sites web modernes et performants avec les dernières technologies (React, Vue, Angular).",
    features: ["Responsive Design", "Performance optimisée", "SEO intégré"],
    icon: "Code",
  },
  {
    title: "Applications Mobiles",
    description:
      "Applications web progressives et applications natives pour iOS et Android.",
    features: ["PWA", "React Native", "Interface intuitive"],
    icon: "Phone",
  },
  {
    title: "Référencement SEO",
    description:
      "Optimisation pour les moteurs de recherche et amélioration de votre visibilité.",
    features: ["Audit SEO", "Optimisation technique", "Suivi des performances"],
    icon: "Search",
  },
  {
    title: "Design UX/UI",
    description:
      "Conception d'interfaces utilisateur modernes et expériences optimisées.",
    features: ["Wireframes", "Prototypage", "Design system"],
    icon: "Palette",
  },
  {
    title: "Développement Backend",
    description:
      "API robustes, bases de données et architecture serveur sécurisée.",
    features: ["API REST/GraphQL", "Base de données", "Architecture sécurisée"],
    icon: "Server",
  },
  {
    title: "Support & Maintenance",
    description:
      "Maintenance continue, mises à jour et support technique 24/7.",
    features: ["Maintenance", "Support réactif", "Mise à jour"],
    icon: "LifeBuoy",
  },
];

export default function Services() {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-between gap-32 bg-zinc-950",
        // Pour scroller en dessous du faisceau
        "-scroll-m-[300px]",
        "px-6 pt-36 pb-12",
        "xs:pt-88 xs:pb-48"
      )}
      id="services"
    >
      <Lamp className={cn("hidden", "xs:flex")} />
      {/* 🆎 Title */}
      <SectionTitle
        description="Une gamme complète de services pour accompagner votre transformation digitale, de la conception à la mise en ligne et au-delà 🚀"
        title="Nos Services"
      />

      {/* 🃏 Cards */}
      <div
        className={cn(
          "w-full max-w-[1300px] gap-8",
          "flex flex-col",
          "sm:grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
        )}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
