import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  transpilePackages: ["react-reveal-slides"],
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
};

export default nextConfig;
