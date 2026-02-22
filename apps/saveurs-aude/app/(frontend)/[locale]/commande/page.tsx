import { useTranslations } from "next-intl";
import { CheckoutForm } from "./_components/CheckoutForm";

export default function CheckoutPage() {
  const t = useTranslations("checkout");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      <CheckoutForm />
    </div>
  );
}
