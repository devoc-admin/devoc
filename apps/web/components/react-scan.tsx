"use client";
// biome-ignore assist/source/organizeImports: exception
import { scan } from "react-scan";
import { type JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === "development",
    });
  }, []);
  // biome-ignore lint/complexity/noUselessFragments: exception
  return <></>;
}
