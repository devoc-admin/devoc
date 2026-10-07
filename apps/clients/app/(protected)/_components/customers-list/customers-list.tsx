import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyCustomers } from "@/lib/customers";

export async function CustomersList() {
  const customers = await getMyCustomers();
  return (
    <Container>
      {customers.map((customer) => (
        <CustomerCard customer={customer} key={customer.id} />
      ))}
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-x-4">{children}</div>;
}

// 🃏
function CustomerCard({
  customer,
}: {
  customer: Awaited<ReturnType<typeof getMyCustomers>>[number];
}) {
  const { id, name } = customer;
  return (
    <Link href={`/customers/${id}`}>
      <Card className="w-100 cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
