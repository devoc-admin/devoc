"use client";
import { useEffect, useState } from "react";

const HERO_FONT_VARIABLES = [
  "--font-geist-sans",
  "--font-geist-mono",
  "--font-fraunces",
  "--font-style-script",
] as const;
const FONT_TIMEOUT_MS = 3000;

let fontsReadyPromise: Promise<void> | null = null;

function loadHeroFonts(): Promise<void> {
  if (fontsReadyPromise) {
    return fontsReadyPromise;
  }
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const root = getComputedStyle(document.documentElement);
  const families = HERO_FONT_VARIABLES.map((variable) =>
    root.getPropertyValue(variable).trim()
  ).filter(Boolean);

  const loadAll = Promise.allSettled(
    families.map((family) => document.fonts.load(`1em ${family}`))
  ).then(() => {
    // resolves once all font loads have settled
  });
  const timeout = new Promise<void>((resolve) =>
    setTimeout(resolve, FONT_TIMEOUT_MS)
  );

  fontsReadyPromise = Promise.race([loadAll, timeout]).then(() => {
    document.documentElement.dataset.fontsReady = "true";
  });

  return fontsReadyPromise;
}

export function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadHeroFonts().then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}
