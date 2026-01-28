import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  outputFileTracingRoot: path.join(__dirname, "../../"),
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
};

export default nextConfig;
