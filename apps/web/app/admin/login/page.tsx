import type { Metadata } from "next";
import { LoginForm } from "./_components/login-form";
export const metadata: Metadata = {
  title: "Connexion | Admin Dev'Oc",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
