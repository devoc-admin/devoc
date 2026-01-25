import { useEffect, useState } from "react";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import { cn } from "@/lib/utils";

export default function Section({
  theme = "light",
  id,
  children,
  className,
}: {
  theme?: "light" | "dark";
  id: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  const { ref } = useNavTheme({ sectionName: id, theme });

  return (
    <div
      className={cn(
        "relative",
        "flex flex-col items-center justify-center",
        "mx-auto",
        "min-h-screen",
        "w-full",
        // Gap 🕳️
        "gap-y-14",
        // Padding ↔️
        "px-4",
        "xs:px-6",
        // Padding ↕️
        "py-14",
        "xs:py-24",
        "sm:py-24",
        "lg:py-34",
        "2xl:py-48",
        //🎨 Colors
        theme === "light" ? "bg-white" : "bg-zinc-950",
        theme === "light" ? "text-zinc-950" : "text-white",
        className
      )}
      id={id}
      ref={ref}
    >
      {hasMounted && children}
    </div>
  );
}
