"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Newsletter() {
  return (
    <div
      className={cn(
        "relative justify-between gap-x-8 gap-y-4",
        "border-t border-t-zinc-600/20 border-b border-b-zinc-600/20 py-6",
        "flex flex-col",
        "md:flex-row md:items-center"
      )}
    >
      {/* 🔤 Restez informés*/}
      <div>
        <div className="font-bold text-lg text-primary-foreground leading-none">
          Restez informé
        </div>
        <div className="text-muted-foreground text-sm">
          Recevez nos dernières actualités et nouveautés
        </div>
      </div>
      {/* 📨 Newsletter */}
      <div
        className={cn(
          "flex w-full grow flex-col gap-4",
          "sm:w-auto sm:flex-row sm:items-center sm:justify-end",
          "md:max-w-125"
        )}
      >
        <Input
          className={cn(
            "h-10 bg-zinc-950 text-primary-foreground text-sm",
            "sm:text-[1rem]"
          )}
          placeholder="Email"
          type="email"
        />
        <Button
          ariaLabel="S'abonner à la newsletter"
          className={cn(
            "cursor-pointer bg-primary/90 text-primary-foreground text-sm transition-colors hover:bg-primary",
            "xs:text-[1rem]",
            "sm:px-10"
          )}
        >
          S'abonner
        </Button>
      </div>
    </div>
  );
}
