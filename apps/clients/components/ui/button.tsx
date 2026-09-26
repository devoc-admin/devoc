"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { LoaderIcon } from "lucide-react";

import { cn } from "cn";

const buttonVariants = cva(
  cn(
    /* ⬇️ Layout */ "inline-flex gap-x-1 shrink-0 items-center justify-center",
    /* 🖱️ Cursor */ "cursor-pointer",
    /* ⭕ Radius */ "rounded-md",
    /* 🔤 Text */ "text-sm text-foreground font-medium whitespace-nowrap",
    /* 💄 Outline */ "outline-none transition-all",
    /* 🎯 Focus */ "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px]",
    /* 🚫 Disabled */ "disabled:pointer-events-none disabled:opacity-50",
    /* ⛔ Invalid */ "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    /* 🗿 Icon */ "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default: cn(
          /* 🖼️ Background */ "bg-primary",
          /* 🖼️ Background | Hover */ "hover:bg-primary/90",
          /* 🎯 Focus */ "focus-visible:ring-primary/50 focus-visible:border-primary",
          /* 🔤 Text */ "text-primary-foreground",
          /* 🥷 Shadow */ "shadow-xs",
        ),
        destructive: cn(
          /* 🖼️ Background */ "bg-destructive dark:bg-destructive/60",
          /* 🖼️ Background | Hover */ "hover:bg-destructive/90",
          /* 🎯 Focus */ "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          /* 🔤 Text */ "text-white ",
          /* 🥷 Shadow */ "shadow-xs",
        ),
        outline: cn(
          /* 🖼️ Background */ "bg-background dark:bg-input/30",
          /* 🖼️ Background | Hover */ "hover:bg-accent dark:hover:bg-input/50",
          /* 🔤 Text | Hover */ "hover:text-accent-foreground",
          /* 🔲 Border */ "border dark:border-input",
          /* 🥷 Shadow */ "shadow-xs",
        ),
        secondary: cn(
          /* 🖼️ Background */ "bg-secondary",
          /* 🖼️ Background | Hover */ "hover:bg-secondary/80",
          /* 🔤 Text */ "text-secondary-foreground",
          /* 🥷 Shadow */ "shadow-xs",
        ),
        ghost: cn(
          /* 🖼️ Background */ "",
          /* 🖼️ Background | Hover */ "hover:bg-accent dark:hover:bg-accent/50",
          /* 🔤 Text */ "",
          /* 🔤 Text | Hover */ "hover:text-accent-foreground",
        ),
        link: cn(
          /* 🔤 Text */ "text-primary underline-offset-4",
          /* 🔤 Text | Hover */ "hover:underline",
        ),
      },
      size: {
        default: cn(
          /* ↔️ Size */ "h-9",
          /* 🫷Padding */ "px-4 py-2",
          /* 🗿 Icon */ "has-[>svg]:px-3",
        ),
        sm: cn(
          /* ↔️ Size */ "h-8",
          /* 🕳️ Gap */ "gap-1.5",
          /* ⭕ Radius */ "rounded-md",
          /* 🫷Padding */ "px-3",
          /* 🗿 Icon */ "has-[>svg]:px-2.5",
        ),
        lg: cn(
          /* ↔️ Size */ "h-12",
          /* 🔤 Text */ "text-base",
          /* ⭕ Radius */ "rounded-md",
          /* 🫷Padding */ "px-6",
          /* 🗿 Icon */ "has-[>svg]:px-4",
        ),
        xl: cn(
          /* ↔️ Size */ "h-12",
          /* ⭕ Radius */ "rounded-md",
          /* 🫷Padding */ "px-8",
          /* 🔤 Text */ "text-xl",
          /* 🗿 Icon */ "has-[>svg]:px-6",
        ),
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  children,
  ariaLabel,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
    loading?: boolean;
    ariaLabel?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      aria-label={ariaLabel}
      {...props}
    >
      {loading && <LoaderIcon className="size-4 animate-spin" />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
