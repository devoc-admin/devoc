import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { ListItem } from "@/components/dev-oc/list-item";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../_components/section-title";
import { VariableFont } from "../_components/variable-font";
export function SectionValues() {
  return (
    <Container>
      <div className="space-y-12">
        <SectionTitle>
          Nos <br /> valeurs
        </SectionTitle>
        <Subtitle />
      </div>
      <Values />
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "mx-auto",
        // ↔️
        "space-y-12 lg:space-y-28"
      )}
    >
      {children}
    </section>
  );
}

// 🆎
function Subtitle() {
  return (
    <FadeUp delay={0.1} disableOnMobile>
      <SectionCatchline className="hidden sm:inline-block">
        Trois{" "}
        <VariableFont className="text-foreground-dark/60 italic">
          principes
        </VariableFont>{" "}
        derrière chaque décision
      </SectionCatchline>
    </FadeUp>
  );
}

const values = [
  {
    description:
      "Les meilleurs projets se construisent en face-à-face. Nous nous déplaçons volontiers dans vos locaux, vos mairies et vos bureaux à travers toute l'Occitanie pour comprendre vos réalités concrètes et vous former à vos outils.",
    id: "proximite",
    title: "Proximité géographique et humaine",
  },
  {
    description:
      "Vos données sont votre patrimoine. Nous privilégions les solutions open source et l'hébergement souverain pour garantir votre indépendance, en vous donnant les moyens de construire votre autonomie par la formation continue et la fourniture de guides d'utilisation de vos outils.",
    id: "autonomie",
    title: "Autonomie et protection des données",
  },
  {
    description:
      "Notre objectif : trouver les meilleures combinaisons technologiques adaptées à vos besoins, à un coût compétitif. Issus du monde professionnel et des grands groupes, nous en importons les méthodes et la rigueur, mises au service des TPE, PME et collectivités locales qui n'ont pas toujours les ressources internes pour faire face à leurs défis techniques.",
    id: "esprit-ingenieur",
    title: "L'esprit ingénieur à votre service",
  },
];

function Values() {
  return (
    <FadeUp amount={0.5} className="w-full" dir="down" disableOnMobile>
      {values.map(({ id, ...props }) => (
        <ListItem key={id} variant="dark" {...props} />
      ))}
    </FadeUp>
  );
}
