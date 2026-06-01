"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { Brick1Website } from "./bricks/brick-1-website";
import { Brick2BilanRGPDetDPO } from "./bricks/brick-2-rgpd-dpo";
import { Brick3Cybersecurity } from "./bricks/brick-3-cybersecurity";
import { Brick4Sovereignty } from "./bricks/brick-4-sovereignty";
import { Brick5OnlineServices } from "./bricks/brick-5-online-services";
import { Brick6Communication } from "./bricks/brick-6-communication";

export function SectionBricks() {
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
            <SupSection number={4} variant="light">
              Couvrir votre chaîne numérique
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Six briques{" "}
              <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
                indispensables
              </span>{" "}
              à composer selon vos besoins
            </SectionCatchline>
          </FadeUp>
        </div>
      </div>
      <div>
        <FadeUp disableOnMobile>
          <Brick1Website />
        </FadeUp>
        <FadeUp disableOnMobile>
          <Brick2BilanRGPDetDPO />
        </FadeUp>
        <FadeUp disableOnMobile>
          <Brick3Cybersecurity />
        </FadeUp>
        <FadeUp disableOnMobile>
          <Brick4Sovereignty />
        </FadeUp>
        <FadeUp disableOnMobile>
          <Brick5OnlineServices />
        </FadeUp>
        <FadeUp disableOnMobile>
          <Brick6Communication />
        </FadeUp>
      </div>
    </section>
  );
}
