"use client";
import { useEffect, useState } from "react";

const HERO_FONT_VARIABLES = [
  "--font-geist-sans",
  "--font-geist-mono",
  "--font-fraunces",
  "--font-style-script",
] as const;

export function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const root = getComputedStyle(document.documentElement);
    const families = HERO_FONT_VARIABLES.map((variable) =>
      root.getPropertyValue(variable).trim()
    ).filter(Boolean);
    Promise.allSettled(
      families.map((family) => document.fonts.load(`1em ${family}`))
    ).then(() => {
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
