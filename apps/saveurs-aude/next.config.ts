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

// biome-ignore lint/suspicious/noExplicitAny: withPayload/withNextIntl expect NextConfig from different next versions in the monorepo
export default withPayload(withNextIntl(nextConfig as any) as any);
