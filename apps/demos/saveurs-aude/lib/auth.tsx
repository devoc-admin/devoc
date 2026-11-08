"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
} from "react";
import type { CustomerData } from "@/lib/auth-actions";
import { getCurrentCustomer, logoutCustomer } from "@/lib/auth-actions";

type AuthContextValue = {
  customer: CustomerData | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  refresh: () => void;
  setCustomer: (customer: CustomerData | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialCustomer,
}: {
  children: React.ReactNode;
  initialCustomer: CustomerData | null;
}) {
  const [customer, setCustomer] = useState<CustomerData | null>(
    initialCustomer
  );
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    startTransition(async () => {
      const data = await getCurrentCustomer();
      setCustomer(data);
    });
  }, []);

  const logout = useCallback(async () => {
    await logoutCustomer();
    setCustomer(null);
  }, []);

  return (
    <AuthContext
      value={{
        customer,
        isLoading: isPending,
        logout,
        refresh,
        setCustomer,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
