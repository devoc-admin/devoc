import type { LucideIcon } from "lucide-react";

export function Section({ ...props }: React.ComponentProps<"section">) {
  return (
    <section className="space-y-2 border-border border-t pt-4" {...props} />
  );
}
export function SectionContent({ ...props }: React.ComponentProps<"div">) {
  return <div className="space-y-1" {...props} />;
}

export function SectionTitle({ ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className="font-medium text-muted-foreground text-xs uppercase tracking-wide"
      {...props}
    />
  );
}

export function SectionInformation({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-x-2 text-sm" {...props} />;
}

export function SectionInformationIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon className="shrink-0 text-muted-foreground" size={14} />;
}

export function SectionInformationName({ children }: { children: string }) {
  return <span className="text-muted-foreground">{children}:</span>;
}
