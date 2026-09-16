"use client";

import { useEmailSignIn } from "@dev-oc/auth/client";
import { LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import type { ChangeEventHandler } from "react";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DevOcIcon from "@/public/icon.svg";

export function LoginForm() {
  const {
    email,
    error,
    handleEmail,
    handlePassword,
    handleSubmit,
    isLoading,
    password,
  } = useEmailSignIn({ redirectTo: "/" });

  return (
    <Card
      animation={false}
      className={cn(
        "w-full max-w-220",
        "border-none",
        // ↔️
        "xl:min-w-180 xl:px-12"
      )}
    >
      {/* 🌼🆎 */}
      <CardHeader className="flex flex-col items-center justify-center text-center">
        {/* 🌼 */}
        <DevOcLogo />
        {/* 🆎 */}
        <CardTitle className="font-bold font-kanit text-4xl text-zinc-950">
          Connexion
        </CardTitle>
        <CardDescription className="-mt-1 font-medium uppercase">
          Espace client
        </CardDescription>
      </CardHeader>
      {/* ― */}
      <div className="px-6">
        <Separator orientation="horizontal" />
      </div>
      {/* 🚫📨🔑⏹️ */}
      <CardContent className="text-zinc-950">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 🚫 */}
          <ErrorMessage error={error} />
          {/* 📨 */}
          <Mail
            isLoading={isLoading}
            onChange={(e) => handleEmail(e.target.value)}
            value={email}
          />
          {/* 🔑 */}
          <Password
            isLoading={isLoading}
            onChange={(e) => handlePassword(e.target.value)}
            value={password}
          />
          {/* ⏹️ */}
          <ButtonLogin isLoading={isLoading} />
        </form>
      </CardContent>
    </Card>
  );
}

// ================================
// 🌼
function DevOcLogo() {
  return (
    <Image
      alt="DevOc Logo"
      className="size-12"
      height={48}
      src={DevOcIcon.src}
      width={48}
    />
  );
}
// ================================
// 🚫
function ErrorMessage({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <div className="rounded-md bg-red-100 p-3 text-red-600 text-sm">
      {error}
    </div>
  );
}

// ================================
// 🔠
function Mail({
  value,
  onChange,
  isLoading,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-normal text-zinc-400" htmlFor="email">
        <MailIcon className="mr-0 h-4 w-4" />
        <span>Email</span>
      </Label>
      <Input
        className="border-zinc-300! ring-0!"
        disabled={isLoading}
        id="email"
        onChange={onChange}
        required
        type="email"
        value={value}
      />
    </div>
  );
}

// ================================
// 🔑
function Password({
  value,
  onChange,
  isLoading,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-normal text-zinc-400" htmlFor="password">
        <LockIcon className="mr-0 h-4 w-4" />
        <span>Mot de passe</span>
      </Label>
      <Input
        className="border-zinc-300! ring-0!"
        disabled={isLoading}
        id="password"
        onChange={onChange}
        required
        type="password"
        value={value}
      />
    </div>
  );
}

// ⏹️
function ButtonLogin({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      className="mt-6 h-12 w-full cursor-pointer bg-zinc-950! text-md text-white"
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? "Connexion..." : "Se connecter"}
    </Button>
  );
}
