import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { getCurrentUser } from "@/lib/auth/session";
import { getMyCustomers } from "@/lib/customers";
import { CustomersList } from "./_components/customers-list/customers-list";

export default async function Page() {
  const user = await getCurrentUser();
  console.log(user);
  // 👤 A regular user linked to a single customer lands straight on it
  if (user.type !== "admin") {
    const customers = await getMyCustomers();
    if (customers.length === 1) redirect(`/customers/${customers[0].id}`);
  }

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
