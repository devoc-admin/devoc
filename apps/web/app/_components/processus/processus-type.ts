import type { StaticImageData } from "next/image";
import DeckChair from "@/assets/processus/deck_chair.avif";
import Handshake from "@/assets/processus/handshake.avif";
import LightBulb from "@/assets/processus/light_bulb.avif";
import Machine from "@/assets/processus/machine.avif";
import Meet from "@/assets/processus/meet.avif";
import Plan from "@/assets/processus/plan.avif";

export type Step = {
  title: string;
  description: string;
  image: StaticImageData;
};

export const steps: Step[] = [
  {
    description:
      "Après un premier contact, nous nous rencontrons pour échanger sur vos besoins, vos délais et votre budget.",
    image: Meet,
    title: "Rencontre",
  },
  {
    description:
      "Nous élaborons une solution sur-mesure à partir d'un cahier des charges.",
    image: Plan,
    title: "Proposition",
  },
  {
    description:
      "Une fois le plan validé, nous lançons la réalisation de votre projet !",
    image: Handshake,
    title: "Validation",
  },
  {
    description:
      "Durant le développement, vous restez informé de l'avancement de votre projet et vous recevez vos livrables selon le calendrier défini.",
    image: Machine,
    title: "Production",
  },
  {
    description:
      "Nous vous formons pour vous approprier vos outils afin de devenir complètement autonomes.",
    image: LightBulb,
    title: "Formation",
  },
  {
    description:
      "Nous nous occupons de la maintenance pour que votre projet fonctionne sans interruption et en toute sécurité !",
    image: DeckChair,
    title: "Maintenance",
  },
];
