import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  animation = true,
  ...props
}: React.ComponentProps<"div"> & { animation?: boolean }) {
  return (
    <div
      className={cn(
        "group",
        /* ⬇️ Layout */ "flex flex-col gap-6",
        /* ⭕ Radius */ "rounded-xl",
        /* 🖱️ Cursor */ "cursor-pointer",
        /* 🔲 Border */ "border border-zinc-900",
        /* 🖼️ Background */ "bg-card",
        /* 🫷 Padding/Margin */ "py-6",
        /* 🔤 Text */ "text-primary-foreground",
        /* 🥷 Shadow */ "shadow-primary/10",
        /* 🤹 Animation */ animation &&
          "transition-all duration-300 hover:-translate-y-1.25 backdrop-blur-sm hover:border-primary/40 hover:shadow-lg",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        /* ⬇️ Layout */ "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5",
        /* ⬇️ Layout Responsive */ "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        /* 🫷Padding/Margin */ "px-6 [.border-b]:pb-6",
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        /* 🔤 Text */ "leading-none font-bold text-xl text-primary-foreground",
        /* 🤹 Animation */ "transition-colors",
        className,
      )}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        /* ⬇️ Layout */ "flex flex-col",
        /* 🫷Padding/Margin */ "px-6",
        /* 🔤 Text */ "text-muted-foreground",
        className,
      )}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        /* ⬇️ Layout */ "flex items-center",
        /* 🫷Padding/Margin */ "px-6 [.border-t]:pt-6",
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
