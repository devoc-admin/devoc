"use client";

import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PriceCardAdvanced } from "./price-cards/price-card-advanced";
import { PriceCardEssential } from "./price-cards/price-card-essential";
import { PriceCardPremium } from "./price-cards/price-card-premium";

export function SectionPricing() {
  return (
    <section
      className={cn(
        "scroll-mt-12",
        //↔️
        "space-y-8",
        "xs:space-y-8",
        "xl:space-y-24",
        "2xl:space-y-24"
      )}
      id="packs"
    >
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
            "w-full space-y-6",
            "xs:w-full xs:space-y-6",
            "xl:w-1/2 xl:space-y-10",
            "2xl:w-1/2 2xl:space-y-10"
          )}
        >
          <SupSection number={5} variant="light">
            Tarification
          </SupSection>
          <SectionCatchline className="font-normal!">
            Des{" "}
            <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-medium text-transparent italic">
              formules
            </span>{" "}
            adaptées à votre budget et vos priorités
          </SectionCatchline>
        </div>
      </div>
      <div
        className={cn(
          "grid",
          "grid-rows-[auto,1fr]",
          //↔️
          "grid-cols-1 grid-rows-[auto,1fr] gap-4",
          "xs:grid-cols-1 xs:grid-rows-[auto,1fr] xs:gap-4",
          "xl:grid-cols-3 xl:grid-rows-[auto,1fr] xl:gap-4",
          "2xl:grid-cols-3 2xl:grid-rows-[auto,1fr] 2xl:gap-4"
        )}
      >
        <PriceCardEssential />
        <PriceCardAdvanced />
        <PriceCardPremium />
      </div>
    </section>
  );
}
