import { ProjectsList } from "./_components/projects-list/projects-list";
export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  return (
    <Container>
      <ProjectsList customerId={customerId} />
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-8">{children}</div>;
}
