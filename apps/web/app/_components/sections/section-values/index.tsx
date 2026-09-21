import { ListItem } from "@/components/dev-oc/list-item";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";

export function SectionValues() {
  return (
    <Container>
      {/* 🆎 */}
      <Title />
      {/* 🪗🪗🪗 */}
      <div>
        {values.map(({ id, ...props }) => (
          <ListItem key={id} variant="dark" {...props} />
        ))}
      </div>
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
function Title() {
  return (
    <div className="space-y-6 2xl:space-y-10">
      <SupSection number={3}>Nos engagements</SupSection>
      <SectionCatchline>
        Trois{" "}
        <span className="font-light text-foreground-dark/60 italic">
          principes
        </span>{" "}
        qui guident chaque décision
      </SectionCatchline>
    </div>
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
