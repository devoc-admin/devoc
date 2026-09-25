import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { cn } from "@/lib/utils";
import { PContent } from "../_components/p-content";
import { PIntro } from "../_components/p-intro";
import { SectionSeparator } from "../_components/section-separator";
import { SectionTitle } from "../_components/section-title";
import { VariableFont } from "../_components/variable-font";
import { CustomCube } from "./_components/cube";

export function SectionCollectif() {
  return (
    <Container>
      <HeaderContainer>
        <div>
          <div className="space-y-6 2xl:space-y-10">
            <SectionTitle>
              Le <br /> collectif
            </SectionTitle>
            <Subtitle />
          </div>
          <CustomCube />
        </div>
        <Description />
      </HeaderContainer>
      <SectionSeparator />
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "mx-auto",
        "scroll-mt-12",
        // ↔️
        "space-y-14 sm:space-y-20 md:space-y-24 lg:space-y-28"
      )}
      id="collectif"
    >
      {children}
    </section>
  );
}

// 📦
function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex w-full",
        // ↔️
        "flex-col xl:flex-row",
        "gap-y-12 xl:gap-x-16 2xl:gap-x-20"
      )}
    >
      {children}
    </div>
  );
}

// 🔠
function Subtitle() {
  return (
    <FadeUp delay={0.1} disableOnMobile>
      <SectionCatchline className="hidden sm:inline">
        Remettre la transmission et l'autonomie au{" "}
        <VariableFont className="text-foreground-dark/60 italic">
          centre
        </VariableFont>
      </SectionCatchline>
    </FadeUp>
  );
}

// 🔤
function Description() {
  return (
    <FadeUp amount={0.24} dir="down" disableOnMobile>
      <div
        className={cn(
          "mx-auto max-w-[60ch]",
          "2xl:grow",
          "space-y-4 md:space-y-5 lg:space-y-6 2xl:space-y-10"
        )}
      >
        <PIntro>
          Dev'Oc est né d'un constat : trop d'artisans, de commerçants et de
          communes d'Occitanie naviguent seuls dans leur transformation
          numérique, faute d'un interlocuteur de confiance à leur échelle.
        </PIntro>
        <PContent>
          Or nous sommes convaincus que l'exigence technique et la proximité
          humaine ne sont pas des luxes réservés aux grandes structures mais
          qu'elles peuvent, et doivent, être accessibles à tous les budgets.
        </PContent>

        <PContent>
          Nous accompagnons ainsi les PME et collectivités sur l'ensemble de
          leur transformation numérique : création de sites web, mise en
          conformité RGPD, cybersécurité, automatisation des processus ou
          déploiement de solutions souveraines.
        </PContent>
      </div>
    </FadeUp>
  );
}
