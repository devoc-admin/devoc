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
        "mx-auto flex select-none flex-col gap-4 text-center",
        className
      )}
    >
      {/* 🆎 Title */}
      <h2
        className={cn(
          "font-kanit font-semibold text-secondary-foreground",
          "text-4xl",
          "xs:text-5xl",
          "md:text-6xl",
          "lg:text-7xl"
        )}
      >
        {title}
      </h2>
      {/* 🔡 Description */}
      <div
        className={cn(
          "mx-auto max-w-2xl text-pretty font-kanit text-white leading-tight! transition-colors hover:text-primary-foreground",
          "text-lg",
          "xs:text-xl"
        )}
      >
        {description}
      </div>
    </div>
  );
}

export default SectionTitle;
