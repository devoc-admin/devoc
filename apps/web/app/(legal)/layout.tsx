import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Footer from "../_components/footer/footer";
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "relative z-1",
          "overflow-hidden",
          "mx-auto bg-background-dark",
          // ↔️
          "py-16",
          "xs:py-16",
          "sm:py-20",
          "md:py-24",
          "lg:py-26",
          "xl:py-26",
          "2xl:py-26"
        )}
      >
        <OrangeDot className="top-0 right-0 size-[50vw] translate-x-1/2 -translate-y-1/2 opacity-30" />
        <OrangeDot className="top-0 left-1/2 size-[100vw] translate-x-[-60%] -translate-y-1/6 opacity-8" />
        <div
          className={cn(
            "relative mx-auto w-300 max-w-full space-y-12",
            // ↔️
            "gap-y-12 px-6",
            "sm:px-8",
            "md:px-10",
            "lg:px-12",
            "xl:px-0",
            "2xl:px-0"
          )}
        >
          <RetourAccueil />
          <div
            className={cn(
              "flex flex-col",
              // ↔️
              "gap-y-12",
              "sm:gap-y-14",
              "md:gap-y-14",
              "lg:gap-y-16",
              "xl:gap-y-22",
              "2xl:gap-y-26"
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ⬅️
function RetourAccueil() {
  return (
    <Link
      className={cn(
        "inline-flex items-center",
        "gap-x-3",
        "cursor-pointer",
        "rounded-full",
        "border border-foreground-dark/10",
        "bg-linear-to-r from-foreground-dark/5 to-foreground-dark/15",
        "py-2 pr-5 pl-4",
        "font-geist-mono text-foreground-dark/70 text-xs uppercase tracking-widest",
        "transition-transform",
        "brightness-90! hover:brightness-100!"
      )}
      href="/"
    >
      <ArrowLeftIcon size={16} />
      <span>Retour à l'accueil</span>
    </Link>
  );
}

// 🟠
function OrangeDot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute",
        "rounded-full bg-radial from-primary to-60% to-transparent",
        "blur-[100px]",
        className
      )}
    />
  );
}
