"use client";

import { useFontsReady } from "../_hooks/use-font-ready";

/**
 * Sets the `data-fonts-ready` attribute on `<html>` for every route.
 *
 * globals.css gates `html` overflow on that attribute (hidden until fonts
 * load, then auto). Without this, routes that render neither the Hero nor the
 * Header — e.g. the legal pages — never set the attribute and stay unscrollable.
 */
export function FontsReadyGate() {
  useFontsReady();
  return null;
}
