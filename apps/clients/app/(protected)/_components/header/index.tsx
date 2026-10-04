import { cn } from "cn";
import { Logo } from "./_components/logo";
export function Header({
  className,
  title,
}: {
  className?: string;
  title?: React.ReactNode;
}) {
  return (
    <Container className={className}>
      {/* 🖼️ */}
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {/* 🏷️ */}
      <div className="flex items-center px-6">{title}</div>
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
        "py-3",
        "border-border border-b",
        "grid grid-cols-subgrid",
        className
      )}
    >
      {children}
    </div>
  );
}

// 🖼️

function LogoContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid place-items-center">{children}</div>;
}
