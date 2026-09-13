import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  // Resolved per request from the Host header, validated against this allowlist.
  // better-auth also derives trustedOrigins from it (https:// for every host,
  // plus http:// for loopback ones), so no URL has to be configured per env.
  baseURL: {
    allowedHosts: [
      "localhost:3001",
      "127.0.0.1:3001",
      "192.168.1.*:3001",
      "devoc-admin.vercel.app",
      "devoc-admin-*.vercel.app",
    ],
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  // Only for LAN dev over plain http: allowedHosts contributes https:// for
  // non-loopback hosts, so the http origin has to be trusted explicitly.
  trustedOrigins: ["http://192.168.1.*:3001"],
});

export type Session = typeof auth.$Infer.Session;
