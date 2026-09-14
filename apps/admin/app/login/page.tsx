import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Balatro from "./_components/balatro";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Connexion | Admin Dev'Oc",
};

export default function LoginPage() {
  return (
    <div
      className={cn(
        "grid min-h-screen",
        "place-items-center",
        // ↔️
        "grid-cols-1",
        "xl:grid-cols-[1fr_auto]"
      )}
    >
      <AnimatedBackground />
      <LoginForm />
    </div>
  );
}

// 🃏
// ======================
function AnimatedBackground() {
  return (
    <div
      className={cn(
        "size-full",
        // ↔️
        "hidden",
        "xl:block"
      )}
    >
      <Balatro
        color1="#F48C06"
        color2="#FFC731"
        color3="#FF5709"
        isRotate={false}
        mouseInteraction={false}
        pixelFilter={30_000}
      />
    </div>
  );
}
