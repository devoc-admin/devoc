import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getShippingConfig } from "@/lib/shipping.server";
import { CartContent } from "./_components/CartContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return {
    robots: { index: false },
    title: t("title"),
  };
}

export default async function CartPage() {
  const shippingConfig = await getShippingConfig();

  return (
    <CartContent
      freeShippingThreshold={shippingConfig.freeShippingThreshold}
      shippingCost={shippingConfig.shippingCost}
    />
  );
}
