import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.*"],
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ].concat(
      process.env.VERCEL_BLOB_URL
        ? [new URL(`${process.env.VERCEL_BLOB_URL}/screenshots/**`)]
        : []
    ),
  },
  outputFileTracingExcludes: {
    "/api/screenshots": ["./screenshots/**"],
  },
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  serverExternalPackages: ["resend", "pg"],
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

export default nextConfig;
