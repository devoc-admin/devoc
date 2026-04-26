import {
  Megaphone01Icon as ActualitesIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section, SectionTitle } from "../section";
import FeteVendangesImage from "./assets/fete-vendanges.jpeg";
import MediathequeImage from "./assets/mediatheque.jpeg";
import PontCagneImage from "./assets/pont-cagne.jpeg";
export function Actualites() {
  return (
    <Section>
      <SectionTitle Icon={ActualitesIcon}>Actualités</SectionTitle>
      <div className="mt-12 grid grid-cols-3 gap-x-6">
        {actualites.map(ActualiteCard)}
      </div>
    </Section>
  );
}

// 🗞️ Actualite
function ActualiteCard({ img, slug, title, excerpt, category }: Actualite) {
  return (
    <Link href={`/${slug}`}>
      <Card className="group pt-0" key={slug}>
        <div className="overflow-hidden">
          <Image
            alt=""
            className="w-full transition-transform duration-[0.5s] group-hover:scale-105"
            src={img}
            width="400"
          />
        </div>
        <CardHeader>
          <div
            className="font-medium uppercase"
            style={{
              color: category.color,
            }}
          >
            {category.label}
          </div>
          <CardTitle className="text-balance font-bold font-montserrat text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-ellipsis">
            {excerpt}
          </CardDescription>
        </CardHeader>
        <CardFooter className="font-medium text-emerald-700">
          <div className="flex items-center gap-x-1">
            <span>Lire la suite</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              strokeWidth={1.5}
            />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
const actualites: Actualite[] = [
  {
    category: {
      color: "var(--color-red-900)",
      label: "Événements",
    },
    date: "2026-04-26",
    excerpt:
      "Rejoignez les bénévoles ce samedi pour préparer la grande place avant notre traditionnelle fête annuelle. Appel à tous les habitants et amis de la communauté ! Votre aide est précieuse pour rendre cet événement mémorable.",
    img: FeteVendangesImage,
    slug: "fete-vendanges",
    title: "Préparation de la Fête des Vendanges",
  },
  {
    category: {
      color: "var(--color-purple-900)",
      label: "Travaux",
    },
    date: "2026-04-23",
    excerpt:
      "Après huit mois de travaux minutieux menés par des artisans locaux, le pont historique en pierre qui enjambe l'Orbiel est de nouveau ouvert aux piétons, redonnant à notre village son charme d'antan tout en assurant la sécurité des usagers. Cette restauration a permis de préserver l'architecture traditionnelle tout en intégrant des éléments modernes pour améliorer l'accessibilité. Les habitants et les visiteurs peuvent désormais profiter d'une promenade agréable le long de la rivière, renforçant ainsi le lien entre la nature et notre patrimoine. De plus, des panneaux d'information ont été installés pour raconter l'histoire du pont et son importance pour la communauté. Ce projet témoigne de l'engagement de notre village à valoriser son héritage tout en se tournant vers l'avenir.",
    img: PontCagneImage,
    slug: "travaux-pont-cagne",
    title: "Rénovation du pont de le Cagne",
  },
  {
    category: {
      color: "var(--color-yellow-900)",
      label: "Culture et loisirs",
    },
    date: "2026-04-12",
    excerpt:
      "Découvrez les nouvelles collections et les espaces de lecture aménagés pour une expérience enrichissante. Plongez dans une variété de livres, magazines et ressources numériques, allant des classiques aux dernières parutions. Profitez d'espaces de lecture confortables, équipés de fauteuils et de tables, pour vous immerger pleinement dans vos lectures. Participez à des activités culturelles telles que des ateliers et des rencontres avec des auteurs, tout en ayant accès à des ordinateurs et des ressources en ligne pour vos recherches. Les enfants pourront également s'amuser dans un coin dédié, rempli de livres et d'animations ludiques. Venez explorer la magie des mots dans notre médiathèque !",
    img: MediathequeImage,
    slug: "mediatheque",
    title: "Inauguration du nouvel espace lecture de la médiathèque",
  },
];

interface Actualite {
  category: {
    color: string;
    label: string;
  };
  date: string;
  excerpt: string;
  img: StaticImageData;
  slug: string;
  title: string;
}
