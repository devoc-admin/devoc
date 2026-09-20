import { ArrowRightIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactCardItem({
  Icon,
  label,
  value,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <A href={href}>
      {/* ⚫ */}
      <ContactIcon Icon={Icon} />
      {/* 🏷️🔠 */}
      <div className="space-y-0.5">
        <ContactLabel>{label}</ContactLabel>
        <ContactValue>{value}</ContactValue>
      </div>
      {/* ➡️ */}
      <ArrowContact />
    </A>
  );
}

// 📦
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      className={cn(
        "group",
        "border-t-[0.5px] last-of-type:border-b-[0.5px]",
        "flex items-center gap-x-5",
        "py-4",
        "max-xl:last-of-type:hidden"
      )}
      href={href}
      style={{
        borderImage:
          "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.40) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1",
      }}
    >
      {children}
    </a>
  );
}

// ⚫
function ContactIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "grid place-items-center",
        "size-10",
        "rounded-full",
        "border",
        "transition-colors duration-500",
        "border-foreground-dark/10 bg-foreground-dark/3",
        "group-hover:border-primary/50 group-hover:bg-primary/10"
      )}
    >
      <Icon
        className="text-[#AEABA4] transition-colors duration-500 group-hover:text-primary/80"
        size={16}
      />
    </div>
  );
}

// 🏷️
function ContactLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "font-geist-mono text-foreground-dark/50 uppercase",
        // ↔️
        "text-[0.65rem] tracking-[0.15rem]"
      )}
    >
      {children}
    </div>
  );
}

// 📨
function ContactValue({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "font-light",
        "text-[0.95rem]",
        "transition-colors duration-500 group-hover:text-primary"
      )}
    >
      {children}
    </div>
  );
}

/* ➡️ */
function ArrowContact() {
  return (
    <div className="ml-auto transition-all duration-500 group-hover:-translate-x-2 group-hover:text-primary/80">
      <ArrowRightIcon size={18} />
    </div>
  );
}
