import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        /* ⬇️ Layout */ "flex",
        /* ↔️ Size */ "h-13 w-full min-w-0",
        /* 🫷Padding/Margin */ "px-3 py-1",
        /* 🔤 Text */ "text-base md:text-sm dark:text-white dark:selection:bg-input",
        /* 🔤 Placeholder */ "placeholder:text-muted-foreground",
        /* ⭕ Radius */ "rounded-md",
        /* 🔲 Border */ "border border-border outline-none",
        /* 🤹 Animation */ "transition-[color,box-shadow]",
        /* 🖼️ Background */ "bg-white dark:bg-input/30",
        /* 📄 File */ "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm",
        /* 🤏 Selection */ "selection:bg-primary selection:text-primary-foreground",
        /* 🎯 Focus */ "focus-visible:border-primary/80 focus-visible:ring-[3px] focus-visible:ring-primary/40",
        /* ⛔ Invalid */ "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        /* 🚫 Disable */ "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
