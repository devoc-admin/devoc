import Image from "next/image";
import Link from "next/link";
import { getCustomer } from "@/lib/customers";

export async function ProjectsList({ customerId }: { customerId: string }) {
  // 🐝
  const { projects } = await getCustomer(customerId);

  return (
    <Container>
      {projects.map((project) => (
        <ProjectCard
          customerId={customerId}
          key={project.id}
          project={project}
        />
      ))}
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-x-4">{children}</div>;
}

// 🃏
function ProjectCard({
  project,
  customerId,
}: {
  project: Awaited<ReturnType<typeof getCustomer>>["projects"][number];
  customerId: string;
}) {
  const { id, name } = project;
  return (
    <Link href={`/customers/${customerId}/projects/${id}`}>
      <Card>
        <LogoAndNameContainer>
          <ProjectLogo customerId={customerId} projectId={id} />
          <Title>{name}</Title>
        </LogoAndNameContainer>
      </Card>
    </Link>
  );
}

// 📦
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="grid h-65 w-80 cursor-pointer place-items-center rounded-2xl border transition-transform hover:scale-101 active:scale-99"
      type="button"
    >
      {children}
    </button>
  );
}

// 📦🆎🖼️
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

// 🖼️
export function ProjectLogo({
  customerId,
  projectId,
}: {
  customerId: string;
  projectId: number;
}) {
  const imageSrc = `/api/customers/${customerId}/projects/${projectId}/logo`;
  return (
    <Image
      alt=""
      className="size-16 rounded-sm object-contain"
      height={64}
      preload
      src={imageSrc}
      unoptimized
      width={64}
    />
  );
}

// 🆎
export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="font-medium">{children}</h2>;
}
