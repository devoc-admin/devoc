import type { Metadata } from "next";
import { LoginForm } from "./_components/login-form";
export const metadata: Metadata = {
  title: "Connexion | Admin Dev'Oc",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-bold text-3xl text-white">Dev'Oc</h1>
          <p className="mt-2 text-neutral-400">Administration</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
