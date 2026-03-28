import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export async function SkipLink() {
  const t = await getTranslations("common");

  return (
    <a
      className={cn(
        "sr-only",
        "focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-[9999]",
        "focus:rounded-md focus:bg-primary focus:px-4 focus:py-2",
        "focus:font-semibold focus:text-primary-foreground focus:text-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring"
      )}
      href="#main-content"
    >
      {t("skipToContent")}
    </a>
  );
}
