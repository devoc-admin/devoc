import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./lib/base-path";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  experimental: {
    viewTransition: true,
  },
  // sharp is externalized (via withPayload) and loads its native binary
  // dynamically, so Next's file tracer misses it on Vercel. Force the linux-x64
  // binary + libvips into the serverless function. Paths are app-relative thanks
  // to the explicit optionalDependencies in package.json.
  outputFileTracingIncludes: {
    "/**/*": [
      "node_modules/@img/sharp-linux-x64/**/*",
      "node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  // Root of the zone has no page (localePrefix: "always") → force the default
  // locale. basePath is applied to source/destination automatically, so this
  // maps /demo/saveurs-aude → /demo/saveurs-aude/fr.
  async redirects() {
    return [
      {
        destination: "/fr",
        permanent: false,
        source: "/",
      },
    ];
  },
  serverExternalPackages: ["resend"],
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

// biome-ignore lint/suspicious/noExplicitAny: withPayload/withNextIntl expect NextConfig from different next versions in the monorepo
export default withPayload(withNextIntl(nextConfig as any) as any);
