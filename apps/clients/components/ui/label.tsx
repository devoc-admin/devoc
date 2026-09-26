"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";

import { cn } from "cn";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        /* ⬇️ Layout */ "flex select-none items-center",
        /* 🕳️ Gap */ "gap-2",
        /* 🔤 Font */ "text-sm font-medium leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "mb-2 text-foreground",
        className,
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
