"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/" as const, tKey: "home" as const },
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/avis" as const, tKey: "reviews" as const },
  { href: "/faq" as const, tKey: "faq" as const },
  { href: "/contact" as const, tKey: "contact" as const },
  { href: "/compte" as const, tKey: "account" as const },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // 🌐
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      {/* ☰ */}
      <MenuTrigger label={t("home")} onOpen={() => setOpen(false)} />

      {/* 🫥 */}
      {/*<Backdrop onClose={() => setOpen(false)} open={open} />*/}

      {/* 📋 */}
      <Panel onClose={() => setOpen(false)} open={open} t={t} />
    </div>
  );
}

// ==============================================
// ☰
function MenuTrigger({ label, onOpen }: { label: string; onOpen: () => void }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "p-2",
        "text-foreground/70",
        "transition-colors hover:text-primary"
      )}
      onClick={onOpen}
      type="button"
    >
      <Menu className="size-5" />
    </button>
  );
}

// ==============================================
// 🫥
function _Backdrop({ onClose, open }: { onClose: () => void; open: boolean }) {
  return (
    <button
      aria-label="Close menu"
      className={cn(
        "fixed inset-0 z-50",
        "bg-foreground/20 backdrop-blur-sm",
        "transition-opacity duration-300",
        "pointer-events-none opacity-0",
        open && "pointer-events-auto opacity-100"
      )}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
      type="button"
    />
  );
}

// ==============================================
// 📋
function Panel({
  onClose,
  open,
  t,
}: {
  onClose: () => void;
  open: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className={cn(
        "fixed",
        "inset-y-0",
        "right-0",
        "z-50",
        "w-72 max-w-[calc(100vw-3rem)]",
        "h-fit",
        "bg-background shadow-xl",
        "transition-transform duration-300 ease-out",
        "translate-x-full",
        open && "translate-x-0"
      )}
    >
      {/* 🏠 */}
      <div
        className={cn(
          "flex items-center justify-between",
          "border-border/50 border-b",
          "p-4"
        )}
      >
        <span className="font-heading text-lg text-primary">
          Saveurs d&apos;Aude
        </span>
        <button
          aria-label={t("home")}
          className={cn(
            "p-1",
            "text-foreground/70",
            "transition-colors hover:text-primary"
          )}
          onClick={onClose}
          type="button"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* 🧭 */}
      <nav className="flex flex-col px-4 pt-2">
        {navLinks.map(({ href, tKey }) => (
          <Link
            className={cn(
              "border-border/30 border-b",
              "py-3.5",
              "font-medium text-foreground/80",
              "transition-colors hover:text-primary"
            )}
            href={href}
            key={href}
            onClick={onClose}
          >
            {t(tKey)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
