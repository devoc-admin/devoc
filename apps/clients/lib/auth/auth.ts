import { createAuth } from "@dev-oc/auth/server";

export const auth = createAuth({
  allowedHosts: [
    "localhost:3002",
    "127.0.0.1:3002",
    "192.168.1.*:3002",
    "devoc-clients.vercel.app",
    "devoc-clients-*.vercel.app",
  ],
  trustedOrigins: ["http://192.168.1.*:3002"],
});
