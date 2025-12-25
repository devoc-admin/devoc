"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Une erreur est survenue lors de la connexion");
      setIsLoading(false);
    }
  }

  return (
    <Card
      animation={false}
      className="w-full max-w-md border-neutral-800 bg-neutral-900"
    >
      <CardHeader className="space-y-1">
        <CardTitle className="font-bold text-2xl text-white!">
          Connexion Admin
        </CardTitle>
        <CardDescription className="text-neutral-400">
          Entrez vos identifiants pour accéder au backoffice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-500/10 p-3 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-neutral-200" htmlFor="email">
              Email
            </Label>
            <Input
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500"
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-200" htmlFor="password">
              Mot de passe
            </Label>
            <Input
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500"
              disabled={isLoading}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              type="password"
              value={password}
            />
          </div>

          <Button
            className="w-full bg-white text-black hover:bg-neutral-200"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
