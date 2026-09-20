import { motion } from "motion/react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import RubiksCube from "@/components/motion-core/rubiks-cube/rubiks-cube";
import { cn } from "@/lib/utils";
import { PContent } from "../_components/p-content";
import { PIntro } from "../_components/p-intro";
import { SectionSeparator } from "../_components/section-separator";

export function SectionCollectif() {
  return (
    <SECTION>
      <div
        className={cn(
          "flex",
          // ↔️
          "flex-col md:flex-row",
          "gap-12 md:gap-0 2xl:gap-42"
        )}
      >
        {/* ⬅️ LEFT PART */}
        <div>
          <div className="space-y-6 2xl:space-y-10">
            <LeCollectif />
            <RemettreLaTransmission />
          </div>
          <CustomCube />
        </div>

        {/* ➡️ RIGHT PART */}
        <div className="space-y-8 2xl:grow 2xl:space-y-10">
          <FadeUp delay={0.1} disableOnMobile>
            <PIntro>
              Dev'Oc est né d'un constat : trop d'artisans, de commerçants et de
              communes d'Occitanie naviguent seuls dans leur transformation
              numérique, faute d'un interlocuteur de confiance à leur échelle.
            </PIntro>
          </FadeUp>
          <FadeUp delay={0.2} disableOnMobile>
            <PContent>
              Or nous sommes convaincus que l'exigence technique et la proximité
              humaine ne sont pas des luxes réservés aux grandes structures mais
              qu'elles peuvent, et doivent, être accessibles à tous les budgets.
            </PContent>
          </FadeUp>

          <FadeUp delay={0.3} disableOnMobile>
            <PContent>
              Nous accompagnons ainsi les TPE, PME et collectivités d'Occitanie
              sur l'ensemble de leur transformation numérique : création de
              sites web, mise en conformité RGPD, cybersécurité, automatisation
              des processus ou déploiement de solutions souveraines.
            </PContent>
          </FadeUp>
        </div>
      </div>
      <SectionSeparator />
    </SECTION>
  );
}

// 📦
function SECTION({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "mx-auto",
        "scroll-mt-12",
        // ↔️
        "space-y-14 sm:space-y-20 md:space-y-24 lg:space-y-28 xl:space-y-34"
      )}
      id="collectif"
    >
      {children}
    </section>
  );
}

function LeCollectif() {
  return (
    <FadeUp disableOnMobile>
      <SupSection number={1}>Le collectif</SupSection>
    </FadeUp>
  );
}

function RemettreLaTransmission() {
  return (
    <FadeUp delay={0.1} disableOnMobile>
      <SectionCatchline>
        Remettre la transmission et l'autonomie au{" "}
        <span className="font-light text-foreground-dark/60 italic">
          centre
        </span>
        .
      </SectionCatchline>
    </FadeUp>
  );
}

// 🧊
function CustomCube() {
  return (
    <motion.div
      className={cn(
        "mx-auto",
        "max-md:hidden",
        "md:mt-42 md:size-60",
        "lg:mt-28 lg:size-70",
        "xl:mt-28 xl:size-80",
        "2xl:mt-14 2xl:size-100"
      )}
      initial={{
        opacity: 0.3,
      }}
      transition={{
        duration: 10,
      }}
      viewport={{ margin: "-100px", once: true }}
      whileInView={{ opacity: 1 }}
    >
      <RubiksCube />
    </motion.div>
  );
}
