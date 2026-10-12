import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/customers";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = await getCustomer(customerId);

  // 📁 A customer with a single project lands straight on it
  if (customer.projects.length === 1) {
    redirect(`/customers/${customer.id}/projects/${customer.projects[0].id}`);
  }

  return <h1 className="font-semibold text-2xl">{customer.name}</h1>;
}
