import { useTranslations } from "next-intl";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32">
      <SaveursAude />
      <SpecialitesArtisanalesDuSudDeLaFrance />
    </div>
  );
}

// ================================
function SaveursAude() {
  const t = useTranslations("home");
  return (
    <h1 className="font-heading text-5xl text-primary">{t("heroTitle")}</h1>
  );
}

function SpecialitesArtisanalesDuSudDeLaFrance() {
  const t = useTranslations("home");
  return (
    <p className="mt-4 font-accent text-muted-foreground text-xl">
      {t("heroSubtitle")}
    </p>
  );
}
