import leatherTexture from "@/assets/texture/leather-3.webp";
import { cn } from "@/lib/utils";

export function SiteDemo() {
  return (
    <Container>
      <LeatherTexture />
      <SiteDemonstration />
    </Container>
  );
}

// 📦 =================================================
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative isolate md:fixed",
        "md:top-8 md:bottom-auto md:-left-13 md:z-50 md:w-auto md:-rotate-35",
        "py-1",
        "bg-primary text-white"
      )}
    >
      {children}
    </div>
  );
}

// 🔠 =================================================

function SiteDemonstration() {
  return (
    <div
      className={cn(
        "px-16 py-0.5",
        "text-center text-base",
        "w-full",
        "md:w-auto",
        "border-secondary border-t border-b border-dashed"
      )}
    >
      Site de démonstration
    </div>
  );
}

// 🖼️ =================================================
function LeatherTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-auto bg-repeat opacity-30 brightness-40"
      style={{ backgroundImage: `url(${leatherTexture.src})` }}
    />
  );
}
