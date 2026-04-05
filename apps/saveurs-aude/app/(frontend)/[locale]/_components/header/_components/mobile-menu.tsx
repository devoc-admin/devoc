"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 🌐
  const t = useTranslations("nav");
  const tc = useTranslations("header");

  // ♿ Move focus into panel on open, back to trigger on close
  useEffect(() => {
    if (open) {
      const firstFocusable =
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // ♿ Focus trap + Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable.at(-1);
    if (!(first && last)) return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <div className="md:hidden">
      {/* ☰ */}
      <MenuTrigger
        label={tc("menu")}
        onOpen={() => setOpen(true)}
        ref={triggerRef}
      />

      {/* 🫥 */}
      <Backdrop onClose={() => setOpen(false)} open={open} />

      {/* 📋 */}
      <Panel
        closeLabel={tc("close")}
        onClose={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        open={open}
        ref={panelRef}
        t={t}
      />
    </div>
  );
}

// ==============================================
// ☰
import { forwardRef } from "react";

const MenuTrigger = forwardRef<
  HTMLButtonElement,
  { label: string; onOpen: () => void }
>(({ label, onOpen }, ref) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          aria-label={label}
          className={cn(
            "p-2",
            "text-foreground/70",
            "transition-colors hover:text-primary"
          )}
          onClick={onOpen}
          ref={ref}
          type="button"
        >
          <Menu className="size-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
});
MenuTrigger.displayName = "MenuTrigger";

// ==============================================
// 🫥
function Backdrop({ onClose, open }: { onClose: () => void; open: boolean }) {
  if (!open) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss pattern
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: backdrop dismiss pattern
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape handled in Panel's onKeyDown
    <div
      className={cn("fixed inset-0 z-50", "bg-foreground/20 backdrop-blur-sm")}
      onClick={onClose}
    />
  );
}

// ==============================================
// 📋
const Panel = forwardRef<
  HTMLDivElement,
  {
    closeLabel: string;
    onClose: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    open: boolean;
    t: ReturnType<typeof useTranslations>;
  }
>(({ closeLabel, onClose, onKeyDown, open, t }, ref) => {
  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: dialog with focus trap needs onKeyDown
    <div
      aria-label={t("home")}
      aria-modal="true"
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
      onKeyDown={onKeyDown}
      ref={ref}
      role="dialog"
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
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label={closeLabel}
              className={cn(
                "p-1",
                "text-foreground/70",
                "transition-colors hover:text-primary"
              )}
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>{closeLabel}</TooltipContent>
        </Tooltip>
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
});
Panel.displayName = "Panel";
