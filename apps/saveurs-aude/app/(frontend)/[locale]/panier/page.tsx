import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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

export default function CartPage() {
  return <CartContent />;
}
