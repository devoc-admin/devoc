import { cn } from "@/lib/utils";

export function SiteDemo() {
  return (
    <div
      className={cn(
        // Mobile
        "static",
        // Desktop
        "md:fixed",
        "md:top-8 md:bottom-auto md:-left-13 md:w-auto md:-rotate-35",
        "md:z-50",
        "py-1",
        "text-white",
        "bg-primary"
      )}
    >
      <div
        className={cn(
          "px-16 py-0.5",
          "text-center",
          // 📱 Mobile
          "w-full text-sm",
          // 🖥️ Desktop
          "md:w-auto md:text-base",
          "border-secondary border-style border-t border-b border-dashed"
        )}
      >
        Site démonstration
      </div>
    </div>
  );
}
