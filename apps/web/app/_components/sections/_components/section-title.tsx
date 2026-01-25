import { cn } from "@/lib/utils";

function SectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-4 px-6",
        "mx-auto",
        "text-center text-white",
        className
      )}
    >
      {/* 🆎 Title */}
      <h2
        className={cn(
          "font-kanit font-semibold",
          "max-w-[17ch]",
          "leading-none!",
          "text-[50px]",
          "xs:text-[55px]",
          "sm:text-6xl",
          "md:text-7xl",
          "lg:text-8xl",
          "xl:text-9xl"
        )}
      >
        {title}
      </h2>
      {/* 🔡 Description */}
      <div
        className={cn(
          "mx-auto max-w-xl text-pretty font-kanit leading-tight! transition-colors",
          "text-lg",
          "xs:text-xl",
          "md:text-2xl",
          "empty:hidden"
        )}
      >
        {description}
      </div>
    </div>
  );
}

export default SectionTitle;
