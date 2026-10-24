import { Sidenav } from "../../../_components/sidebar";

export default async function CustomerSidenav({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  return <Sidenav className="w-60" customerId={customerId} />;
}
