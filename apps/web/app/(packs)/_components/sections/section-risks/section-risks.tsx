import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { Separator } from "../../separator";
import {
  RiskCybersecurity,
  RiskEconomic,
  RiskReglementaire,
} from "./risk-card";

export function SectionRisks() {
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
            <SupSection number={2} variant="light">
              Le coût de l'inaction
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Les risques que vous prenez{" "}
              <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-medium text-transparent italic">
                aujourd'hui
              </span>
            </SectionCatchline>
          </FadeUp>
        </div>
      </div>
      <div
        className={cn(
          //↔️
          "flex flex-col gap-y-8",
          "xs:flex xs:flex-col gap-y-8",
          "xl:grid xl:grid-cols-[1fr_auto] xl:gap-y-12",
          "2xl:grid 2xl:grid-cols-[1fr_auto] 2xl:gap-y-12"
        )}
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
