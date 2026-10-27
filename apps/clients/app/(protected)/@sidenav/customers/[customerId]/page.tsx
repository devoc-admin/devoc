import { Sidenav } from "@/app/(protected)/_components/sidenav/index";

export default async function CustomerSidenav({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  return <Sidenav customerId={customerId} />;
}
