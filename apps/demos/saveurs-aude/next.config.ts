import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { SITE_INDEXABLE } from "./lib/seo";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Covers every response (admin, API, files), not only pages with a meta tag.
  async headers() {
    if (SITE_INDEXABLE) return [];
    return [
      {
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
        source: "/:path*",
      },
    ];
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
  outputFileTracingRoot: path.join(import.meta.dirname, "../../../"),
  // The root has no page (localePrefix: "always") → force the default locale.
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
    root: path.join(import.meta.dirname, "../../../"),
  },
};

// biome-ignore lint/suspicious/noExplicitAny: withPayload/withNextIntl expect NextConfig from different next versions in the monorepo
export default withPayload(withNextIntl(nextConfig as any) as any);
