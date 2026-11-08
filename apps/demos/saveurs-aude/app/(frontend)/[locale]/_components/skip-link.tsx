import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export async function SkipLink() {
  const t = await getTranslations("header");

  return (
    <a
      className={cn(
        "sr-only",
        "focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-[9999]",
        "focus:bg-primary focus:rounded-md focus:px-4 focus:py-2",
        "focus:text-primary-foreground focus:text-sm focus:font-semibold",
        "focus:ring-ring focus:ring-2 focus:outline-none"
      )}
      href="#main-content"
    >
      {t("skipToContent")}
    </a>
  );
}
