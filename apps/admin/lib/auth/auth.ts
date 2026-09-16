import { createAuth } from "@dev-oc/auth/server";

export const auth = createAuth({
  allowedHosts: [
    "localhost:3001",
    "127.0.0.1:3001",
    "192.168.1.*:3001",
    "devoc-admin.vercel.app",
    "devoc-admin-*.vercel.app",
  ],
  trustedOrigins: ["http://192.168.1.*:3001"],
});
