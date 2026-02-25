import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/json-ld";
import { getBaseUrl } from "@/lib/seo";

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
  const baseUrl = getBaseUrl();

  return (
    <>
      <JsonLd
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([{ name: "Accueil", url: baseUrl }]),
        ]}
      />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="sr-only">Saveurs d'Aude - Épicerie Fine</h1>
        <Image
          alt="Saveurs d'Aude - Épicerie Fine"
          height={314}
          priority
          src="/saveurs_aude_logo_no_margin.svg"
          width={336}
        />
      </div>
    </>
  );
}
