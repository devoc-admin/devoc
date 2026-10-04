import { getCustomer } from "@/lib/customers";

export default async function CustomerTitle({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = await getCustomer(customerId);

  return <span className="font-medium">{customer.name}</span>;
}
