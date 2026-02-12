"use client";
// biome-ignore assist/source/organizeImports: exception
import { scan } from "react-scan";
import { type JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);
  // biome-ignore lint/complexity/noUselessFragments: exception
  return <></>;
}
