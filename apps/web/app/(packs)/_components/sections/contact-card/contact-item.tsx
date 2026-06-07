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
          "border border-foreground/20 group-hover:border-primary-strong/60",
          "bg-foreground/2 group-hover:bg-primary-strong/10",
          "p-3"
        )}
      >
        <Icon
          className="text-foreground/60 transition group-hover:text-primary-strong"
          size={18}
        />
      </div>
      {/* 🔠 */}
      <div className="flex flex-col">
        <span className="font-geist-mono font-medium text-[0.7rem] text-foreground/60 uppercase tracking-widest">
          {suptitle}
        </span>
        <span className="font-medium group-hover:text-primary-strong">
          {children}
        </span>
        <span
          className={cn(
            "mt-1 font-medium text-foreground/60 text-xs",
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
