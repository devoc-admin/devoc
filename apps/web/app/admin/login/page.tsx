import type { Metadata } from "next";
import Balatro from "./_components/balatro";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Connexion | Admin Dev'Oc",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute top-0 -z-10 h-full w-full">
        <Balatro
          color1="#F48C06"
          color2="#FFC731"
          color3="#FF5709"
          isRotate={false}
          mouseInteraction={false}
          pixelFilter={2000}
        />
      </div>
      <LoginForm />
    </div>
  );
}
