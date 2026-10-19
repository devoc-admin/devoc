import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.*"],
  experimental: {
    // Inline CSS in the HTML to remove render-blocking stylesheet requests
    inlineCss: true,
  },
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

export default nextConfig;
