import { type BetterAuthOptions, betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

// Settings shared by every app: same user tables, same session lifetime.
export const baseAuthOptions = {
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
} satisfies BetterAuthOptions;

export function createPool(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error("[@dev-oc/auth] DATABASE_URL is required");
  }
  return new Pool({ connectionString: databaseUrl });
}

export type CreateAuthOptions = {
  /**
   * Hosts the app is served from. The base URL is resolved per request from
   * the Host header and validated against this list; better-auth also derives
   * trustedOrigins from it (https:// for every host, plus http:// for loopback
   * ones), so no URL has to be configured per env.
   */
  allowedHosts: string[];
  /**
   * Extra origins to trust, e.g. LAN dev over plain http: allowedHosts only
   * contributes https:// for non-loopback hosts.
   */
  trustedOrigins?: string[];
  /** Defaults to process.env.DATABASE_URL. */
  databaseUrl?: string;
};

export function createAuth({
  allowedHosts,
  trustedOrigins,
  databaseUrl,
}: CreateAuthOptions) {
  return betterAuth({
    ...baseAuthOptions,
    baseURL: { allowedHosts },
    database: createPool(databaseUrl),
    plugins: [nextCookies()],
    trustedOrigins,
  });
}

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];
