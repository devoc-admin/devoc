export type Step = {
  title: string;
  description: string;
  image: string;
};

export const steps: Step[] = [
  {
    description:
      "Après un premier contact, nous nous rencontrons pour échanger sur vos besoins, vos délais et votre budget.",
    image: "/processus/meet.avif",
    title: "Rencontre",
  },
  {
    description:
      "Nous élaborons une solution sur-mesure à partir d'un cahier des charges.",
    image: "/processus/plan.avif",
    title: "Proposition",
  },
  {
    description:
      "Une fois le plan validé, nous lançons la réalisation de votre projet !",
    image: "/processus/handshake.avif",
    title: "Validation",
  },
  {
    description:
      "Durant le développement, vous restez informé de l'avancement de votre projet et vous recevez vos livrables selon le calendrier défini.",
    image: "/processus/machine.avif",
    title: "Production",
  },
  {
    description:
      "Nous vous formons pour vous approprier vos outils afin de devenir complètement autonomes.",
    image: "/processus/light_bulb.avif",
    title: "Formation",
  },
  {
    description:
      "Nous nous occupons de la maintenance pour que votre projet fonctionne sans interruption et en toute sécurité !",
    image: "/processus/deck_chair.avif",
    title: "Maintenance",
  },
];
