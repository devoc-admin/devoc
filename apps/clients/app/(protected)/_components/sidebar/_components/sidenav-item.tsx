import { cn } from "cn";

export function SidenavItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "flex items-center gap-x-2.5",
        "px-4 py-2.5",
        "rounded-md bg-gray-200"
      )}
    >
      {children}
    </li>
  );
}
