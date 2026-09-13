import { createAuthClient } from "better-auth/react";

// No baseURL: the auth API is mounted on this same app, so better-auth resolves
// it from window.location.origin in the browser (and falls back to the relative
// "/api/auth" during SSR). Works unchanged on localhost, previews and prod.
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
