/**
 * Path prefix under which this app is served (Next.js Multi-Zones).
 * The app is proxied by `apps/web` (dev-oc.fr) at `dev-oc.fr/demo/saveurs-aude`.
 *
 * Single source of truth: used by `next.config.ts` (basePath) and to prefix
 * hard-coded asset paths that Next.js does NOT auto-prefix (plain <video>,
 * manifest icons, Payload admin meta). next/link, next/image and next/font
 * already apply the basePath automatically — do not prefix those.
 */
export const BASE_PATH = "/demo/saveurs-aude";
