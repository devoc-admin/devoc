/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: exception */

import { parseAsInteger, useQueryState } from "nuqs";
import { createContext, useCallback, useContext, useEffect } from "react";
import { type Step, steps } from "./_step-animations";

const numberRegex = /^\d+$/;

type SlidesContext = {
  currentStep: number;
  goNextStep: () => void;
  goPrevStep: () => void;
  animations: Step;
};

export const slidesContext = createContext<SlidesContext>({
  animations: steps[0],
  currentStep: 0,
  goNextStep: () => {},
  goPrevStep: () => {},
});

export function SlidesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { goNextStep, goPrevStep, currentStep, setCurrentStep } = useSteps();
  useKeyboardNavigation({
    goNextStep,
    goPrevStep,
    setCurrentStep,
  });

  const animations = steps[currentStep];

  return (
    <slidesContext.Provider
      value={{ animations, currentStep, goNextStep, goPrevStep }}
    >
      {children}
    </slidesContext.Provider>
  );
}

export function useSlidesContext() {
  return useContext(slidesContext);
}

// ------------------------------------------
function useSteps() {
  const [currentStep, setCurrentStep] = useQueryState<number>(
    "step",
    parseAsInteger.withDefault(0)
  );

  const goNextStep = useCallback(() => {
    setCurrentStep((c) => Math.min(steps.length - 1, c + 1));
  }, [setCurrentStep]);

  const goPrevStep = useCallback(() => {
    setCurrentStep((c) => Math.max(0, c - 1));
  }, [setCurrentStep]);

  return {
    currentStep,
    goNextStep,
    goPrevStep,
    setCurrentStep,
  };
}

// ------------------------------------------
function useKeyboardNavigation({
  goNextStep,
  goPrevStep,
  setCurrentStep,
}: {
  goNextStep: () => void;
  goPrevStep: () => void;
  setCurrentStep: (step: number) => void;
}) {
  useEffect(() => {
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: exception
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        goNextStep();
      } else if (event.key === "ArrowLeft") {
        goPrevStep();
      } else if (
        event.key === "r" ||
        event.key === "R" ||
        event.key === "ArrowDown"
      ) {
        setCurrentStep(0);
      } else if (event.key === "ArrowUp") {
        setCurrentStep(steps.length - 1);
      } else if (numberRegex.test(event.key)) {
        const step = Number.parseInt(event.key, 10);
        if (!Number.isNaN(step)) {
          const nextStep = Math.max(0, Math.min(step, steps.length - 1));
          setCurrentStep(nextStep);
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [goNextStep, goPrevStep, setCurrentStep]);
}
