"use client";
import { Suspense } from "react";
import { SlidesContextProvider, useSlidesContext } from "../_context";
import { steps } from "../_step-animations";
import { AccessibilityCards } from "./accessibility-cards";
import { AccessiblityBigNumber } from "./accessibility-infos";
import { DevOc } from "./dev-oc";
import { DevOcLogo } from "./dev-oc-logo";
import {
  PillarAccessibility,
  PillarSecurity,
  PillarSovereignty,
} from "./pillar";

function SlidesContent() {
  return (
    <div>
      {/* Intro / Key indicators */}
      <AccessiblityBigNumber />
      <AccessibilityCards />

      {/* Identity */}
      <DevOc />
      <DevOcLogo className="size-[200px]" />

      {/* 3 Pillars */}
      <PillarAccessibility />
      <PillarSecurity />
      <PillarSovereignty />
      <Controls />
    </div>
  );
}

// ------------------------------

const Controls = () => {
  const { currentStep, goNextStep, goPrevStep } = useSlidesContext();
  return (
    <div className="fixed right-3 bottom-3">
      <p>
        Slides number {currentStep} / {steps.length - 1}
      </p>
      <div className="space-x-3">
        <button onClick={goPrevStep} type="button">
          Previous
        </button>
        <button onClick={goNextStep} type="button">
          Next
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------

export default function Slides() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SlidesContextProvider>
        <SlidesContent />
      </SlidesContextProvider>
    </Suspense>
  );
}
