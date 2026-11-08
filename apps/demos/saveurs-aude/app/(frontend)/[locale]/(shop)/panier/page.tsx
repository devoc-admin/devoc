import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getShippingConfig } from "@/lib/shipping.server";
import { CartContent } from "./_components/CartContent";

export default async function CartPage() {
  const { freeShippingThreshold, shippingCost } = await getShippingConfig();

  return (
    <CartContent
      freeShippingThreshold={freeShippingThreshold}
      shippingCost={shippingCost}
    />
  );
}

//🏷️ METADATA

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // 🌐
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });

  return {
    robots: { index: false },
    title: t("title"),
  };
}
