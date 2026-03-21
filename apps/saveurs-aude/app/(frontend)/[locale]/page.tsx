import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/motion";
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/json-ld";
import { getBaseUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Hero from "./_components/hero/hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    description: t("homeDescription"),
    title: "Saveurs d'Aude — Spécialités artisanales de Carcassonne",
  };
}

export default function HomePage() {
  return (
    <>
      {/* 🆘 */}
      <SEO />
      {/* 🦸‍♂️ */}
      <Hero />
      <FadeIn>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "px-4 pb-20"
          )}
        >
          {/*♿*/}
          <AccessibleTitle />
        </div>
      </FadeIn>
    </>
  );
}

// ===================================
// 🆘
function SEO() {
  const baseUrl = getBaseUrl();

  return (
    <JsonLd
      data={[
        buildLocalBusiness(),
        buildBreadcrumbList([{ name: "Accueil", url: baseUrl }]),
      ]}
    />
  );
}

// ===================================
// ♿
function AccessibleTitle() {
  return <h1 className="sr-only">Saveurs d'Aude - Épicerie Fine</h1>;
}
