import { cn } from "cn";
import { Logo } from "./_components/logo";
export function Header({ className }: { className?: string }) {
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
      {/* 🖼️ */}
      <LogoContainer>
        <Logo />
      </LogoContainer>

      <div>Header</div>
    </div>
  );
}

function LogoContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid place-items-center">{children}</div>;
}
