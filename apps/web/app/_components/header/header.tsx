"use client";
import { useFontsReady } from "../../_hooks/use-font-ready";

export function Header() {
  const fontsReady = useFontsReady();
  if (!fontsReady) return null;
  return null;
}
