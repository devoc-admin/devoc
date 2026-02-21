import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

// biome-ignore lint/suspicious/noExplicitAny: withPayload expects NextConfig from its own bundled next version
export default withPayload(withNextIntl(nextConfig) as any);
