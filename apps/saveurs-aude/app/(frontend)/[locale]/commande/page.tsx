import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getShippingConfig } from "@/lib/shipping";
import { CheckoutForm } from "./_components/CheckoutForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return {
    robots: { index: false },
    title: t("title"),
  };
}

export default async function CheckoutPage() {
  const [t, shippingConfig] = await Promise.all([
    getTranslations("checkout"),
    getShippingConfig(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      <CheckoutForm shippingConfig={shippingConfig} />
    </div>
  );
}
