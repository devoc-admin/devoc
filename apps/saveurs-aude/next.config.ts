import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

// biome-ignore lint/suspicious/noExplicitAny: withPayload expects NextConfig from its own bundled next version
export default withPayload(nextConfig as any);
