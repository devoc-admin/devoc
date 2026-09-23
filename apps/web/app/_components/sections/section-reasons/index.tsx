import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { VariableFont } from "../_components/variable-font";
import { ReasonCard } from "./reason-card";

export function SectionReasons() {
  return (
    <Container>
      {/* 🆎 */}
      <Title />
      {/* 👆👆👆👆 */}
      <ReasonsContainer>
        {reasons.map(({ id, ...props }, index) => (
          <ReasonCard key={id} {...props} index={index} />
        ))}
      </ReasonsContainer>
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
    <div className="space-y-10">
      <SupSection number={4}>Pourquoi Dev'Oc ?</SupSection>
      <SectionCatchline className="max-w-[10ch]">
        Les{" "}
        <VariableFont className="text-foreground-dark/60 italic">
          raisons
        </VariableFont>{" "}
        de nous confier votre projet
      </SectionCatchline>
    </div>
  );
}

// 📦
function ReasonsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-6", "grid-cols-1 sm:grid-cols-2")}>
      {children}
    </div>
  );
}

const reasons = [
  {
    description:
      "Vous parlez directement aux personnes qui réalisent le travail. Pas à un commercial qui transmet à une équipe offshore ou à un service d'assistance en ligne anonyme.",
    id: "interlocuteur-unique",
    title: "Un interlocuteur unique, pas une agence anonyme",
  },
  {
    description:
      "RGPD, RGAA, NIS2, facturation électronique : nous anticipons les obligations françaises et européennes qui s'imposent à vous. Vos produits numériques sont conformes dès leur conception, avec une totale sérénité juridique.",
    id: "expertise-reglementaire",
    title: "Une expertise réglementaire intégrée",
  },
  {
    description:
      "Travailler avec Dev'Oc, c'est réinjecter de la valeur dans l'économie de votre territoire, faire rayonner ses acteurs et participer à la montée en puissance numérique de la région.",
    id: "impact-territorial",
    title: "L'impact territorial",
  },
  {
    description:
      "Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo, notre approche a été reconnue par les acteurs économiques du territoire que nous servons.",
    id: "reconnaissance",
    title: "Une reconnaissance indépendante",
  },
];
