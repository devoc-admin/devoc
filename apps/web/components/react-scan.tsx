"use client";
// biome-ignore assist/source/organizeImports: exception
import { scan } from "react-scan";
import { type JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === "development",
    });
    // Silence THREE.Clock deprecation from @react-three/fiber 9.x — it still uses
    // Clock internally; Timer migration lands in R3F 10.
    if (process.env.NODE_ENV === "development") {
      const originalWarn = console.warn;
      console.warn = (...args: unknown[]) => {
        const first = args[0];
        if (typeof first === "string" && first.includes("THREE.Clock")) return;
        originalWarn(...args);
      };
    }
  }, []);
  // biome-ignore lint/complexity/noUselessFragments: exception
  return <></>;
}
