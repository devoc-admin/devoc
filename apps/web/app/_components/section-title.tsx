import { cn } from "@/lib/utils";

function SectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex select-none flex-col gap-4 text-center text-white",
        className
      )}
    >
      {/* 🆎 Title */}
      <h2
        className={cn(
          "font-kanit font-semibold",
          "text-[40px]",
          "xs:text-5xl",
          "md:text-6xl",
          "lg:text-8xl"
        )}
      >
        {title}
      </h2>
      {/* 🔡 Description */}
      <div
        className={cn(
          "mx-auto max-w-3xl text-pretty font-kanit leading-tight! transition-colors",
          "text-lg",
          "xs:text-xl",
          "md:text-2xl"
        )}
      >
        {description}
      </div>
    </div>
  );
}

export default SectionTitle;
