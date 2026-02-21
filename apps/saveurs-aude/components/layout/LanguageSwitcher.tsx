"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(newLocale: "en" | "fr") {
    router.replace(pathname as "/", { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-0.5 text-sm">
      <button
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors",
          locale === "fr"
            ? "font-semibold text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => switchTo("fr")}
        type="button"
      >
        FR
      </button>
      <span className="text-border">|</span>
      <button
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors",
          locale === "en"
            ? "font-semibold text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => switchTo("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
