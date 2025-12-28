"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const [isGrabbing, setIsGrabbing] = React.useState(false)

  React.useEffect(() => {
    if (!isGrabbing) return

    const handlePointerUp = () => setIsGrabbing(false)
    window.addEventListener("pointerup", handlePointerUp)

    return () => window.removeEventListener("pointerup", handlePointerUp)
  }, [isGrabbing])

  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        /*📌 Position */ "relative",
        /* ⬇️ Layout */ "flex items-center",
        /* ↔️ Size */ "w-full",
        /* 👆 Interaction */ "touch-none select-none",
        /* 🚫 Disable */ "data-disabled:opacity-50",
        /* ↩️ Orientation */"data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          /*📌 Position */ "relative",
          /* ↔️ Size */ "grow",
          /* 🖼️ Background */ "bg-muted",
          /* 💦 Overflow */ "overflow-hidden",
          /* ⭕ Radius */ "rounded-full",
          /* ↩️ Orientation */ "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            /* 📌 Position */ "absolute",
            /* 🖼️ Background */"bg-primary",
            /* ↩️ Orientation */ "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          onPointerDown={() => setIsGrabbing(true)}
          className={cn(
            /* ⬇️ Layout */ "block",
            /* ↔️ Size */ "size-4 shrink-0",
            /* 🖼️ Background */ "bg-white",
            /* ⭕ Radius */ "rounded-full",
            /* 🔲 Border */ "border border-primary",
            /* 💍 Ring */ "ring-primary/20 hover:ring-4",
            /* 🥷 Shadow */"shadow-sm",
            /* 👆 Interaction */ "cursor-grab", isGrabbing && "cursor-grabbing",
            /* 🤹 Animation */ "transition-[color,box-shadow]",
            /* 🎯 Focus */ "focus-visible:ring-4 focus-visible:outline-hidden",
            /* 🚫 Disable */ "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
