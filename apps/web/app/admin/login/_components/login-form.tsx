"use client";

import { LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth/auth-client";
import DevOcIcon from "@/public/icon.svg";

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

      router.push("/admin/audit");
      router.refresh();
    } catch {
      setError("Une erreur est survenue lors de la connexion");
      setIsLoading(false);
    }
  }

  return (
    <Card
      animation={false}
      className="w-full max-w-130 border-none from-transparent to-transparent py-12 shadow-none! shadow-zinc-200! backdrop-blur-2xl selection:bg-zinc-950"
    >
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <Image
          alt="DevOc Logo"
          className="size-12"
          height={12}
          src={DevOcIcon.src}
          width={12}
        />
        <CardTitle className="font-bold font-kanit text-4xl text-zinc-950 dark:text-white">
          Connexion
        </CardTitle>
      </CardHeader>
      <div className="px-10">
        <Separator orientation="horizontal" />
      </div>
      <CardContent className="px-10 text-zinc-950">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-100 p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label className="font-normal text-zinc-400" htmlFor="email">
              <MailIcon className="mr-0 h-4 w-4" />
              <span>Email</span>
            </Label>
            <Input
              className="border-zinc-300! ring-0!"
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-normal text-zinc-400" htmlFor="password">
              <LockIcon className="mr-0 h-4 w-4" />
              <span>Mot de passe</span>
            </Label>
            <Input
              className="border-zinc-300! ring-0!"
              disabled={isLoading}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              value={password}
            />
          </div>

          <Button
            className="mt-6 h-12 w-full cursor-pointer bg-zinc-950! text-md text-white"
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
