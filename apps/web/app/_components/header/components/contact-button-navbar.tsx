import { SendIcon } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "@/components/ui/custom-button/custom-button";
import { cn } from "@/lib/utils";

export function ContactButtonNavbar() {
  return (
    <Link href="#contact">
      <CustomButton
        aria-label="Nous contacter"
        className={cn(
          "flex items-center gap-2",
          "cursor-pointer",
          "rounded-full!",
          "font-bold text-primary-foreground",
          "transition-colors",
          "pr-6! pl-5!"
        )}
        style={
          {
            "--accent": "var(--primary-lighter)",
            "--accent-secondary": "var(--primary-strong)",
          } as React.CSSProperties
        }
      >
        <SendIcon aria-hidden="true" size={18} />
        <span>Contact</span>
      </CustomButton>
    </Link>
  );
}
