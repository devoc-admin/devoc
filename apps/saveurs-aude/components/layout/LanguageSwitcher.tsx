"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  // 🌐
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(newLocale: "en" | "fr") {
    router.replace(pathname as "/", { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-0.5 text-sm">
      <LangButton
        active={locale === "fr"}
        label="FR"
        onClick={() => switchTo("fr")}
      />
      <span className="text-border">|</span>
      <LangButton
        active={locale === "en"}
        label="EN"
        onClick={() => switchTo("en")}
      />
    </div>
  );
}

// ==============================================
// 🔤
function LangButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "rounded px-1.5 py-0.5",
        "transition-colors",
        "text-muted-foreground hover:text-foreground",
        active && "font-semibold text-primary"
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
