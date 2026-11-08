import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getCurrentCustomer } from "@/lib/auth-actions";
import { LoginForm } from "./_components/LoginForm";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { robots: { index: false }, title: t("title") };
}

export default async function LoginPage({
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
      <LoginForm />
    </div>
  );
}
