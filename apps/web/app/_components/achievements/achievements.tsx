import Image from "next/image";
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
import type { Achievement } from "./type";
import { formatNumber } from "./utils";

const Onepark = {
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
    "Site de réservation en ligne de places de parking avec possibilité de paiement depuis mobile, tablette ou ordinateur et fourniture d'équipements embarqués pour la détection de plaque et le contrôle de barrières d'accès.",
  id: "onepark",
  showcase: flowMockup,
  slug: "dashboard-analytics",
  snapshots: [flow1, flow2, flow3],
  technologies: ["React", "Typescript", "Tailwind"],
  title: "Une plateforme de réservation",
};

const Frustration = {
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
    "Refonte d'un média en ligne avec redesign du site, création d'une interface d'administration, configuration d'unsystème de paiement sécurisé pour des dons et mise en place d'une newsletter très suivie.",
  id: "frustration",
  showcase: frustrationCover,
  slug: "media-en-ligne",
  snapshots: [frustrationCover],
  technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
  title: "Un média en ligne",
};

const Statcraft = {
  accomplishments: [
    "Amélioration des stratégies de promotion des contenus",
    "Profilage des visiteurs",
    "Détection des robots",
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
    "Tableau de bord comprenant de nombreux indicateurs statistiques pour analyser l'audience et les sources de trafic des sites Insee à partir des logs de consultation.",
  id: "insee",
  showcase: statcraftCover,
  slug: "analyse-de-trafic",
  snapshots: [statcraft1, statcraft2, statcraft3],
  technologies: ["Next.js", "Tailwind"],
  title: "Outil de suivi d'audience",
};

export const achievements: Achievement[] = [Onepark, Statcraft, Frustration];
