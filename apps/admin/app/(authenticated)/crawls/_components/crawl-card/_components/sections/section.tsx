import type { LucideIcon } from "lucide-react";

export function Section({ ...props }: React.ComponentProps<"section">) {
  return (
    <section className="border-border space-y-2 border-t pt-4" {...props} />
  );
}
export function SectionContent({ ...props }: React.ComponentProps<"div">) {
  return <div className="space-y-1" {...props} />;
}

export function SectionTitle({ ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className="text-muted-foreground text-xs font-medium tracking-wide uppercase"
      {...props}
    />
  );
}

export function SectionInformation({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-x-2 text-sm" {...props} />;
}

export function SectionInformationIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon className="text-muted-foreground shrink-0" size={14} />;
}

export function SectionInformationName({ children }: { children: string }) {
  return <span className="text-muted-foreground">{children}:</span>;
}
