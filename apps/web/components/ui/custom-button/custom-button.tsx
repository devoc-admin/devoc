import s from "./style.module.css";
import { cn } from "@/lib/utils";

type CustomButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type CustomButtonProps = CustomButtonBaseProps &
  (
    | ({ href?: undefined } & React.ComponentProps<"button">)
    | ({ href: string } & React.ComponentProps<"a">)
  );

export function CustomButton({
  children,
  className,
  ...props
}: CustomButtonProps) {
  if (props.href !== undefined) {
    return (
      <a className={cn(s.button, className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(s.button, className)} {...props}>
      {children}
    </button>
  );
}
