import SectionTitle from "@/app/components/section-title";
import ServiceCard from "@/app/components/service-card";
import Lamp from "@/components/aceternity/lamp";
import { cn } from "@/lib/utils";

const services: Service[] = [
  {
    description:
      "Offrez-vous un site web moderne et fluide ! Suivez votre audience avec nos outils et proposez facilement de nouveaux contenus pour vos visiteurs.",
    features: [
      "Versions mobile et tablette comprises",
      "Référencement optimisé",
      "Amélioration du taux de conversion",
    ],
    icon: "Laptop",
    title: "Sites et applications web",
  },
  {
    description:
      "Créez une expérience inédite au plus proche de vos utilisateurs, donnez-leur accès à tous vos services dans le creux de leurs mains.",
    features: [
      "Compatible Android et iOS",
      "Expérience fluide et personnalisée",
      "Notifications push et accès hors-ligne",
    ],
    icon: "Smartphone",
    title: "Applications Mobiles",
  },
  {
    description:
      "Besoin d'améliorer le référencement, la performance ou l'accessibilité de votre site web ? Nous vous livrons un audit complet et une optimisation adaptée à vos besoins.",
    features: [
      "Audit SEO complet",
      "Optimisation et suivi des performances",
      "Amélioration de l'accessibilité",
    ],
    icon: "WandSparkles",
    title: "Audit personnalisé",
  },
  {
    description:
      "Nous vous accompagnons dans la création de votre identité visuelle et la confection de vos supports de communication.",
    features: [
      "Logo sur mesure",
      "Votre propre charte graphique",
      "Supports print et web",
    ],
    icon: "Brush",
    title: "Design",
  },
  {
    description:
      "Besoin d'automatiser des tâches répétitives ? Nous vous aidons à créer des automatisations IA pour booster votre productivité.",
    features: [
      "Intégration de l'IA dans vos processus",
      "Amélioration de la productivité",
      "Réduction des coûts",
    ],
    icon: "Bot",
    title: "Automatisations IA",
  },
  {
    description:
      "Nous vous permettons de vous approprier vos outils et de devenir complètement autonomes. Nous nous occupons de la maintenance et des mises à jour.",
    features: [
      "Formation en présentiel",
      "Support réactif",
      "Maintenance continue",
    ],
    icon: "Handshake",
    title: "Formation et support",
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
        description="Une gamme complète de services pour booster votre présence numérique, de la conception à la mise en ligne et au-delà 🚀"
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

// ----------------------------------

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: string;
};
