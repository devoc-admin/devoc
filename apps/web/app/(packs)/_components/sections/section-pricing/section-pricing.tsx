"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../../p-content";
import { PriceCardAdvanced } from "./price-cards/price-card-advanced";
import { PriceCardEssential } from "./price-cards/price-card-essential";
import { PriceCardPremium } from "./price-cards/price-card-premium";

export function SectionPricing() {
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
            <SupSection number={5} variant="light">
              Tarification
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Trois{" "}
              <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
                formules
              </span>{" "}
              qui s'adaptent à vos moyens et vos priorités
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Tarifs encadrés et progressifs, alignés selon le périmètre que vous
            choisissez et qui couvrent la majorité des besoins constatés sur les
            communes que nous accompagnons.
          </PContent>
        </FadeUp>
      </div>
      <div className="grid grid-cols-3 grid-rows-[auto,1fr] gap-x-4">
        <PriceCardEssential />
        <PriceCardAdvanced />
        <PriceCardPremium />
      </div>
    </section>
  );
}
