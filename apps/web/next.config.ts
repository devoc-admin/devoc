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
  // Multi-Zones: proxy the separately-deployed `saveurs-aude` app under this path.
  // SAVEURS_AUDE_ORIGIN is the origin of its Vercel deployment (no trailing slash).
  async rewrites() {
    const origin = process.env.SAVEURS_AUDE_ORIGIN;
    if (!origin) {
      return [];
    }
    return [
      {
        destination: `${origin}/demo/saveurs-aude`,
        source: "/demo/saveurs-aude",
      },
      {
        destination: `${origin}/demo/saveurs-aude/:path*`,
        source: "/demo/saveurs-aude/:path*",
      },
    ];
  },
  serverExternalPackages: ["resend", "pg", "sharp"],
  turbopack: {
    root: path.join(import.meta.dirname, "../../"),
  },
};

export default nextConfig;
