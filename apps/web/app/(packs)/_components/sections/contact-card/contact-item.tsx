import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactItem({
  suptitle,
  href,
  subtitle,
  children,
  Icon,
}: {
  Icon: LucideIcon;
  href: string;
  suptitle: string;
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <a
      className={cn(
        "group",
        "transition-colors",
        "bg-transparent hover:bg-white/10",
        "px-6",
        "flex items-center gap-x-4",
        "py-5",
        "border-t last-of-type:border-b"
      )}
      href={href}
      style={{
        borderImage:
          "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 10%, transparent) 20%,  color-mix(in oklab, var(--foreground) 10%, transparent) 80%, transparent) 1",
      }}
    >
      {/* 🖼️ */}
      <div
        className={cn(
          "grid place-items-center",
          "rounded-full",
          "transition",
          "border-foreground/20 group-hover:border-orange-red/60 border",
          "bg-foreground/2 group-hover:bg-orange-red/10",
          "p-3"
        )}
      >
        <Icon
          className="text-foreground/60 group-hover:text-orange-red transition"
          size={18}
        />
      </div>
      {/* 🔠 */}
      <div className="flex flex-col">
        <span className="font-geist-mono text-foreground/60 text-[0.7rem] font-medium tracking-widest uppercase">
          {suptitle}
        </span>
        <span className="group-hover:text-orange-red font-medium">
          {children}
        </span>
        <span
          className={cn(
            "text-foreground/60 mt-1 text-xs font-medium",
            // ↔️
            "hidden",
            "sm:inline"
          )}
        >
          {subtitle}
        </span>
      </div>
    </a>
  );
}
