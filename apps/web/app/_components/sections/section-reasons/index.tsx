import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../_components/section-title";
import { VariableFont } from "../_components/variable-font";
import { ReasonCard } from "./reason-card";
export function SectionReasons() {
  return (
    /* 📦 */
    <Container>
      {/* 🆎 */}
      <HeaderContainer>
        <SectionTitle>
          Nos <br /> forces
        </SectionTitle>
        <Subtitle />
      </HeaderContainer>
      {/* 👆👆👆👆 */}
      <Reasons />
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

// 📦
function HeaderContainer({ children }: { children: React.ReactNode }) {
  return <div className="space-y-12">{children}</div>;
}

// 🆎
function Subtitle() {
  return (
    <FadeUp disableOnMobile>
      <SectionCatchline className="hidden sm:inline-block">
        Les{" "}
        <VariableFont className="text-foreground-dark/60 italic">
          raisons
        </VariableFont>
        <br />
        de nous confier
        <br />
        votre projet
      </SectionCatchline>
    </FadeUp>
  );
}

// 📦
function Reasons() {
  return (
    <FadeUp amount={0.4} disableOnMobile>
      <ReasonsContainer>
        {reasons.map(({ id, ...props }) => (
          <ReasonCard key={id} {...props} />
        ))}
      </ReasonsContainer>
    </FadeUp>
  );
}
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
