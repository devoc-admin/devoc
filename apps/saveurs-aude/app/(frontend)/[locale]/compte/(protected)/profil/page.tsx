import { getTranslations } from "next-intl/server";
import { getCurrentCustomer } from "@/lib/auth-actions";
import { AddressList } from "./_components/AddressList";
import { ProfileForm } from "./_components/ProfileForm";

export async function generateMetadata() {
  const t = await getTranslations("account.profile");
  return { title: t("title") };
}

export default async function ProfilePage() {
  const customer = await getCurrentCustomer();

  if (!customer) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <ProfileForm customer={customer} />
      <div className="mt-12">
        <AddressList addresses={customer.addresses} />
      </div>
    </div>
  );
}
