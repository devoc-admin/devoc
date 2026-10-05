import { cn } from "cn";

export function Header({
  className,
  breadcrumbs, // 🎰
  logo, // 🎰
}: {
  className?: string;
  breadcrumbs?: React.ReactNode;
  logo?: React.ReactNode;
}) {
  return (
    <Container className={className}>
      {/* 🖼️ */}
      <LogoContainer>{logo}</LogoContainer>
      {/* 🛣️ */}
      <BreadcrumbsContainer>{breadcrumbs}</BreadcrumbsContainer>
    </Container>
  );
}

// 📦
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-header-background text-header-foreground",
        "border-border border-b",
        "grid grid-cols-subgrid",
        className
      )}
    >
      {children}
    </div>
  );
}

// 📦🛣️
export function BreadcrumbsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cn("flex items-center")}>{children}</div>;
}

// 📦🖼️
function LogoContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid place-items-center">{children}</div>;
}
