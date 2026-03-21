import { redirect } from "@/i18n/navigation";
import { getCurrentCustomer } from "@/lib/auth-actions";

export default async function ProtectedAccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect({ href: "/compte/connexion", locale });
  }

  return <>{children}</>;
}
