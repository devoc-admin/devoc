import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildLocalBusiness } from "@/lib/json-ld";
import { getBaseUrl } from "@/lib/seo";
import { ContactForm } from "./_components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tContact = await getTranslations({ locale, namespace: "contact" });
  return {
    description: t("contactDescription"),
    title: tContact("title"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <JsonLd
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Accueil", url: baseUrl },
            { name: "Contact", url: `${baseUrl}/fr/contact` },
          ]),
        ]}
      />
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
