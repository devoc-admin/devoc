import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { HighlightedText } from "../../highlighted-text";
import { StepCardDelivery } from "./step-cards/step-card-delivery";
import { StepCardMeet } from "./step-cards/step-card-meet";
import { StepCardOffer } from "./step-cards/step-card-offer";
import { StepCardProduction } from "./step-cards/step-card-production";
export function SectionSteps() {
  return (
    <section
      className={cn(
        //↔️
        "space-y-8",
        "xs:space-y-8",
        "xl:space-y-24",
        "2xl:space-y-24"
      )}
    >
      <div
        className={cn(
          "flex",
          // ↔️
          "flex-col gap-y-10",
          "xs:flex-col xs:gap-y-10",
          "sm:flex-col sm:gap-y-12",
          "md:flex-row md:gap-x-12",
          "2xl:flew-row 2xl:gap-x-18"
        )}
      >
        <div
          className={cn(
            // ↔️
            "w-full space-y-6",
            "xs:w-full xs:space-y-6",
            "xl:w-1/2 xl:space-y-10",
            "2xl:w-1/2 2xl:space-y-10"
          )}
        >
          <FadeUp disableOnMobile>
            <SupSection number={6} variant="light">
              Le processus
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Un processus simplifié, de la
              <HighlightedText>rencontre</HighlightedText>à la
              <HighlightedText>livraison</HighlightedText>
            </SectionCatchline>
          </FadeUp>
        </div>
      </div>
      <div
        className={cn(
          "grid items-stretch gap-4",
          //↔️
          "grid-cols-1",
          "xs:grid-cols-1",
          "xl:grid-cols-4",
          "2xl:grid-cols-4"
        )}
      >
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
