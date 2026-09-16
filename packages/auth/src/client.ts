"use client";

import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// No baseURL: the auth API is mounted on the consuming app itself, so
// better-auth resolves it from window.location.origin in the browser (and falls
// back to the relative "/api/auth" during SSR). Works unchanged on localhost,
// previews and prod.
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;

// ================================
// 🔑 Email + password sign-in state, UI-agnostic
export function useEmailSignIn({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  // 📨
  const [email, setEmail] = useState("");
  function handleEmail(newEmail: string) {
    setEmail(newEmail);
  }

  // 🔑
  const [password, setPassword] = useState("");
  function handlePassword(newPassword: string) {
    setPassword(newPassword);
  }

  // 🚫
  const [error, setError] = useState<string | null>(null);

  // ⏳
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Une erreur est survenue");
        setIsLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Une erreur est survenue lors de la connexion");
      setIsLoading(false);
    }
  }

  return {
    email,
    error,
    handleEmail,
    handlePassword,
    handleSubmit,
    isLoading,
    password,
  };
}

// ================================
// 🚪
export function useSignOut({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  return function handleSignOut() {
    return signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(redirectTo);
          router.refresh();
        },
      },
    });
  };
}
