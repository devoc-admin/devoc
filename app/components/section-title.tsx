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
          "font-bold text-secondary-foreground",
          "text-5xl",
          "xs:text-6xl"
        )}
      >
        {title}
      </h2>
      {/* 🔡 Description */}
      <div
        className={cn(
          "mx-auto max-w-2xl text-pretty text-muted-foreground leading-tight transition-colors hover:text-primary-foreground",
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
