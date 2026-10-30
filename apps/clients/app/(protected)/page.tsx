import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { getCurrentUser } from "@/lib/auth/session";
import { getMyCustomers } from "@/lib/customers";
import { CustomersList } from "./_components/customers-list/customers-list";

export default async function Page() {
  // 🐝
  const [user, customers] = await Promise.all([
    getCurrentUser(),
    getMyCustomers(),
  ]);

  const isAdmin = user.type === "admin";

  if (!isAdmin && customers.length === 1)
    redirect(`/customers/${customers[0].id}`);

  return (
    <div className="size-full">
      <Suspense fallback={<CenteredLoader />}>
        <CustomersList />
      </Suspense>
    </div>
  );
}

// ⏳
function CenteredLoader() {
  return (
    <div className="grid size-full place-items-center">
      <Loader label="Chargement" />
    </div>
  );
}
