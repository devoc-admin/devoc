"use client";
import { useEffect, useState } from "react";

export function useFontsReady(cssVariables: readonly string[]) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const root = getComputedStyle(document.documentElement);
    const families = cssVariables
      .map((variable) => root.getPropertyValue(variable).trim())
      .filter(Boolean);
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
  }, [cssVariables]);
  return ready;
}
