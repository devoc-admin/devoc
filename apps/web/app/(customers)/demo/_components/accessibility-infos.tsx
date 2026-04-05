"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSlidesContext } from "../_context";
import { variantsAccessibilityBigNumber } from "../_step-animations";

const websitesNonCompliant = 96;

export function AccessiblityBigNumber() {
  const [value, setValue] = useState(0);

  const { animations } = useSlidesContext();

  useEffect(() => {
    function increaseValue() {
      setValue(websitesNonCompliant);
    }
    document.addEventListener("click", increaseValue);
  }, []);
  const { accessibilityNumber: accessibilityNumberAnimations } = animations;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-montserrat">
      <motion.div
        animate={accessibilityNumberAnimations}
        className="flex! flex-col items-center justify-center"
        initial={variantsAccessibilityBigNumber.initial}
        variants={variantsAccessibilityBigNumber}
      >
        <NumberFlow
          className="font-extrabold text-[260px] tabular-nums tracking-tighter"
          suffix="%"
          transformTiming={{ duration: 2000, easing: "ease-out" }}
          value={value}
        />
        <div className="mt04 z-10 flex w-full flex-col items-center">
          <a
            className="cursor-pointer font-light text-base"
            href="https://www.banquedesterritoires.fr/accessibilite-numerique-96-des-sites-communaux-sont-non-conformes"
            rel="noopener"
            target="_blank"
          >
            Source : Adullact et Déclic - 8 juillet 2025
          </a>
        </div>
      </motion.div>
    </div>
  );
}
