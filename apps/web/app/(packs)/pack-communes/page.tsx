"use client";

import { cn } from "@/lib/utils";
import { ContactCard } from "../_components/sections/contact-card/contact-card";
import { Header } from "../_components/sections/header/header";
import { SectionBricks } from "../_components/sections/section-bricks/section-bricks";
import { SectionIntro } from "../_components/sections/section-intro/section-intro";
import { SectionPricing } from "../_components/sections/section-pricing/section-pricing";
import { SectionReasons } from "../_components/sections/section-reasons/section-reasons";
import { SectionRisks } from "../_components/sections/section-risks/section-risks";
import { SectionSteps } from "../_components/sections/section-steps/section-steps";
export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-20"
      )}
    >
      <Header />
      <div
        className={cn(
          "flex flex-col",
          //↔️
          "gap-y-20",
          "xs:gap-y-24",
          "xl:gap-y-50",
          "2xl:gap-y-50"
        )}
      >
        <SectionIntro />
        <SectionRisks />
        <SectionReasons />
        <SectionBricks />
        <SectionPricing />
        <SectionSteps />
        <ContactCard />
      </div>
    </div>
  );
}
