"use client";

import {
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 300,
  ...props
}: ComponentProps<typeof Provider>) {
  return <Provider delayDuration={delayDuration} {...props} />;
}

function Tooltip(props: ComponentProps<typeof Root>) {
  return (
    <TooltipProvider>
      <Root {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger(props: ComponentProps<typeof Trigger>) {
  return <Trigger {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          "z-50",
          "rounded-md",
          "bg-foreground px-2.5 py-1.5",
          "text-background text-xs",
          "shadow-md",
          "fade-in-0 zoom-in-95 animate-in",
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
