import Link from "next/link";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import ProjetPreviewForm from "./projets-preview-form";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <DevOc />
      <ToAccessYourProject />
      <ProjetPreviewForm />
      <BackgroundBeams className="hidden lg:block" />
    </div>
  );
}

// ------------------------------------------------------
function DevOc() {
  return (
    <Link href="/" title="Aller sur le site principal de Dev'Oc">
      <h1
        className={cn(
          "relative flex select-none items-center",
          "text-8xl",
          "xs:text-9xl",
          "sm:text-[9rem]",
          "md:text-[10rem]",
          "lg:text-[11rem]",
          "xl:text-[12rem]"
        )}
      >
        <div className={cn("font-style-script", "pt-4")}>Dev'</div>
        <AuroraText
          className="font-extrabold font-geist text-transparent tracking-tighter"
          colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
        >
          Oc
        </AuroraText>
      </h1>
    </Link>
  );
}

// ------------------------------------------------------
function ToAccessYourProject() {
  return (
    <div
      className={cn(
        "text-center font-bold font-kanit text-xl leading-tight",
        "xs:text-2xl"
      )}
    >
      Pour accéder à votre projet, entrez votre mot de passe
    </div>
  );
}
