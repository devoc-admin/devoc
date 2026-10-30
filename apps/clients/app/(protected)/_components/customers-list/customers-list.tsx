import Image from "next/image";
import Link from "next/link";
import { getMyCustomers } from "@/lib/customers";

export async function CustomersList() {
  // 🐝
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
      <button
        className="grid h-65 w-80 cursor-pointer place-items-center rounded-2xl border transition-transform hover:scale-101 active:scale-99"
        type="button"
      >
        <LogoAndNameContainer>
          <CompanyLogo customerId={id} />
          <Title>{name}</Title>
        </LogoAndNameContainer>
      </button>
    </Link>
  );
}

export function LogoAndNameContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      {children}
    </div>
  );
}

export function CompanyLogo({ customerId }: { customerId: number }) {
  const imageSrc = `/api/customers/${customerId}/logo`;
  return (
    <Image
      alt=""
      className="size-16 rounded-sm object-contain"
      height={64}
      src={imageSrc}
      unoptimized
      width={64}
    />
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="font-medium">{children}</h2>;
}
