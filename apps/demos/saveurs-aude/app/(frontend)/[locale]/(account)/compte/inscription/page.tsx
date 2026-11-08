import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getCurrentCustomer } from "@/lib/auth-actions";
import { RegisterForm } from "./_components/RegisterForm";

export async function generateMetadata() {
  const t = await getTranslations("auth.register");
  return { robots: { index: false }, title: t("title") };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const customer = await getCurrentCustomer();

  if (customer) {
    redirect({ href: "/compte/commandes", locale });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <RegisterForm />
    </div>
  );
}
