import { getCustomer } from "@/lib/customers";
import { ProjectsList } from "./_components/projects-list/projects-list";
export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = await getCustomer(customerId);
  return (
    <Container>
      <Title>{customer.name}</Title>
      <ProjectsList customerId={customerId} />
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-8">{children}</div>;
}

// 🆎
export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-semibold">{children}</h1>;
}
