import { getCustomer } from "@/lib/customers";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = await getCustomer(customerId);
  return <h1 className="text-2xl font-semibold">{customer.name}</h1>;
}
