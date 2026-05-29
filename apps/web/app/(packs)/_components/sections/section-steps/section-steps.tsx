import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../../p-content";
import { StepCardDelivery } from "./step-cards/step-card-delivery";
import { StepCardMeet } from "./step-cards/step-card-meet";
import { StepCardOffer } from "./step-cards/step-card-offer";
import { StepCardProduction } from "./step-cards/step-card-production";
export function SectionSteps() {
  return (
    <section className="space-y-24">
      <div
        className={cn(
          "flex",
          // ↔️
          "flex-col gap-y-12",
          "xs:flex-col xs:gap-y-12",
          "sm:flex-col sm:gap-y-12",
          "md:flex-row md:gap-x-12",
          "2xl:flew-row 2xl:gap-x-18"
        )}
      >
        <div
          className={cn(
            // ↔️
            "space-y-6",
            "2xl:space-y-10"
          )}
        >
          <FadeUp disableOnMobile>
            <SupSection number={6} variant="light">
              Le processus
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Quatre étapes,{" "}
              <span className="overflow-visible bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
                de la rencontre
              </span>{" "}
              à la livraison
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Une démarche claire, sans surprise et sans engagement. Vous gardez
            la main à chaque étape avec accès en temps réel à l'état
            d'avancement de votre projet.
          </PContent>
        </FadeUp>
      </div>
      <div className="grid grid-cols-4 items-stretch gap-x-4">
        <FadeUp disableOnMobile>
          <StepCardMeet />
        </FadeUp>
        <FadeUp delay={0.1} disableOnMobile>
          <StepCardOffer />
        </FadeUp>
        <FadeUp delay={0.2} disableOnMobile>
          <StepCardProduction />
        </FadeUp>
        <FadeUp delay={0.3} disableOnMobile>
          <StepCardDelivery />
        </FadeUp>
      </div>
    </section>
  );
}
