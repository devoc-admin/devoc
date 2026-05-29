"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../../p-content";
import { Brick1Website } from "./bricks/brick-1-website";
import { Brick2BilanRGPDetDPO } from "./bricks/brick-2-rgpd-dpo";
import { Brick3Cybersecurity } from "./bricks/brick-3-cybersecurity";
import { Brick4Sovereignty } from "./bricks/brick-4-sovereignty";
import { Brick5OnlineServices } from "./bricks/brick-5-online-services";
import { Brick6Communication } from "./bricks/brick-6-communication";

export function SectionBricks() {
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
            <SupSection number={4} variant="light">
              Couvrir votre chaîne numérique
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Six briques{" "}
              <span className="font-medium text-foreground/60 italic">
                complémentaires
              </span>{" "}
              à composer selon vos besoins
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Chaque brique est conçue pour vous rendre{" "}
            <span className="text-foreground">autonome</span>,{" "}
            <span className="text-foreground">conforme</span> et{" "}
            <span className="text-foreground">efficace</span> — sans enfermement
            technologique, sans dépendance, sans surcoût caché.
          </PContent>
        </FadeUp>
      </div>
      <div>
        <FadeUp>
          <Brick1Website />
        </FadeUp>
        <FadeUp>
          <Brick2BilanRGPDetDPO />
        </FadeUp>
        <FadeUp>
          <Brick3Cybersecurity />
        </FadeUp>
        <FadeUp>
          <Brick4Sovereignty />
        </FadeUp>
        <FadeUp>
          <Brick5OnlineServices />
        </FadeUp>
        <FadeUp>
          <Brick6Communication />
        </FadeUp>
      </div>
    </section>
  );
}
