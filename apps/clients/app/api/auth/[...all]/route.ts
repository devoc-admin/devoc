import { createAuthHandler } from "@dev-oc/auth/next";
import { auth } from "@/lib/auth/auth";

export const { GET, POST } = createAuthHandler(auth);
