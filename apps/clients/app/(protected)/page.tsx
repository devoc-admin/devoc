import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { CustomersList } from "./_components/customers-list/customers-list";

export default async function Page() {
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
