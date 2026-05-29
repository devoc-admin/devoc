import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../../p-content";
import { Separator } from "../../separator";
import {
  RiskCybersecurity,
  RiskEconomic,
  RiskReglementaire,
} from "./risk-card";

export function SectionRisks() {
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
            <SupSection number={2} variant="light">
              Le coût de l'inaction
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Les risques que vous prenez{" "}
              <span className="font-medium text-foreground/60 italic">
                aujourd'hui
              </span>
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Trois familles de risques s'accumulent quand la dette technologique
            des communes n'est pas traitée : sanctions financières, attaques
            cyber, défiance des administrés.
          </PContent>
        </FadeUp>
      </div>
      <div
        className="grid grid-cols-[1fr_auto] gap-y-12"
        style={{ columnGap: "64px" }}
      >
        <Separator className="col-span-2" />
        <RiskReglementaire />
        <Separator className="col-span-2" />
        <RiskEconomic />
        <Separator className="col-span-2" />
        <RiskCybersecurity />
      </div>
    </section>
  );
}
