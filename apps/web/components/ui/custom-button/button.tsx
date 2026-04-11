import s from "./style.module.css";
import { cn } from '@/lib/utils';

export function Button({ children, className, ...props }: { children: React.ReactNode, className?: string } & React.ComponentProps<"button">) {
  return (
    <button className={cn(s.button, className)} {...props}>
      {children}
    </button>
  );
}
