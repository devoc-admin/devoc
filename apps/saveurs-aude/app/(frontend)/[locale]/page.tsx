import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center justify-center px-4 py-32">
      <h1 className="font-heading text-5xl text-primary">{t("heroTitle")}</h1>
      <p className="mt-4 font-accent text-muted-foreground text-xl">
        {t("heroSubtitle")}
      </p>
    </div>
  );
}
