import { cn } from "@/lib/utils";

export function Toggle({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="flex w-fit items-center gap-x-1 rounded-md border bg-muted p-1"
      {...props}
    />
  );
}

type ToggleButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export function ToggleButton({ active, icon, label, onClick }: ToggleButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 rounded px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-sidebar-strong dark:bg-sidebar text-foreground shadow-sm"
          : "cursor-pointer text-muted-foreground hover:text-foreground"
      )}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
