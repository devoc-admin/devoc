import { cn } from "@/lib/utils";
import Footer from "../_components/footer/footer";
import { RetourAccueil } from "./_components/buttons/back-home";
export default function PackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "relative z-1",
          "mx-auto bg-background text-foreground",
          // ↔️
          "pt-16 pb-18",
          "xs:pt-16 xs:pb-18",
          "sm:pt-20 sm:pb-22",
          "md:pt-24 md:pb-32",
          "lg:pt-26 lg:pb-32",
          "xl:pt-26 xl:pb-32",
          "2xl:pt-26 2xl:pb-64"
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <OrangeDot className="top-0 right-0 size-[50vw] translate-x-1/2 -translate-y-1/2 opacity-30" />
          <OrangeDot className="top-0 left-1/2 size-[100vw] translate-x-[-60%] -translate-y-1/6 opacity-8" />
        </div>
        <div
          className={cn(
            "relative mx-auto w-300 max-w-full",
            // ↔️
            "space-y-8 px-6",
            "xs:space-y-8 xs:px-6",
            "xl:space-y-12 xl:px-0",
            "2xl:space-y-12 2xl:px-0"
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
      <Footer animate={false} />
    </div>
  );
}

// 🟠
function OrangeDot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute",
        "rounded-full bg-radial from-primary-strong to-60% to-transparent",
        "blur-[100px]",
        className
      )}
    />
  );
}
