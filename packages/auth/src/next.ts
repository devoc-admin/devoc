import { toNextJsHandler } from "better-auth/next-js";
import type { Auth } from "./server";

// Mount in app/api/auth/[...all]/route.ts
export function createAuthHandler(auth: Auth) {
  return toNextJsHandler(auth);
}
