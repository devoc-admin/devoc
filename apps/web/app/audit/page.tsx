"use client";
import { SearchIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import React, { type ReactNode } from "react";
import { checkIfValidUrl } from "@/app/audit/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Audit = () => {
  const [url, setUrl] = React.useState<string>();
  const [error, setError] = React.useState<string>();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url || (url && !checkIfValidUrl(url))) {
      setError("Veuillez entrer une URL valide");
    }
  };

  return (
    <div className="relative flex min-h-screen min-w-screen flex-col items-center justify-center overflow-hidden">
      {/* 🎨 Background */}
      <div className="-z-10 fixed h-screen w-screen [background:radial-gradient(125%_125%_at_50%_90%,white_60%,var(--color-primary)_100%)]" />
      {/* 📦 Content */}
      <div className="flex flex-col items-center gap-y-12 px-6">
        {/* 🆎 Title */}
        <FadeInDown>
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="font-sarina text-6xl text-secondary md:text-7xl">
              Audit gratuit
            </h1>
            <FadeInUp delay={0.3}>
              <p className="max-w-150 text-center font-kanit text-lg text-muted-foreground md:text-xl">
                Analysez votre site web et découvrez comment l'améliorer
              </p>
            </FadeInUp>
          </div>
        </FadeInDown>

        {/* 📝 Form */}
        <FadeInUp delay={0.2}>
          <form
            className="flex w-full flex-col items-center gap-y-6"
            onSubmit={handleSubmit}
          >
            {/* 🔍 Search input */}
            <div className="relative w-full">
              <div
                className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  isFocused
                    ? "bg-linear-to-r from-primary/20 via-primary-lighter/20 to-primary/20 blur-xl"
                    : "opacity-0"
                )}
              />
              <div className="relative flex items-center">
                <SearchIcon
                  className={cn(
                    "absolute left-4 z-10 transition-colors duration-200",
                    isFocused ? "text-primary" : "text-muted-foreground"
                  )}
                  size={20}
                />
                <Input
                  className={cn(
                    "h-14 w-125 rounded-xl border-2 pr-4 pl-12 font-kanit text-lg!",
                    "bg-white/80 backdrop-blur-sm",
                    "transition-all duration-200",
                    isFocused
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-zinc-200 hover:border-zinc-300"
                  )}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(undefined);
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholder="https://votre-site.fr"
                  type="url"
                />
              </div>
              {error && (
                <FadeInUp>
                  <p className="mt-3 text-center font-medium text-destructive text-sm">
                    {error}
                  </p>
                </FadeInUp>
              )}
            </div>

            {/* 🚀 Submit button */}
            <ScaleOnHover>
              <Button
                className={cn(
                  "group w-50 cursor-pointer! rounded-full py-6! font-bold text-lg",
                  "bg-linear-to-r from-primary to-primary-lighter text-primary-foreground",
                  "shadow-lg shadow-primary/25 transition-shadow hover:shadow-primary/30 hover:shadow-xl",
                  "disabled:opacity-50 disabled:shadow-none"
                )}
                disabled={!url || url.length <= 3}
                type="submit"
              >
                <span>Lancer l'audit</span>
                <SparklesIcon
                  className={cn(
                    "ml-2 transition-transform duration-300",
                    "group-hover:rotate-12 group-hover:scale-110"
                  )}
                  size={20}
                />
              </Button>
            </ScaleOnHover>
          </form>
        </FadeInUp>

        {/* 📊 Features hint */}
        <FadeIn delay={0.6}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Performance", "Accessibilité", "SEO", "Sécurité"].map(
              (item, i) => (
                <FadeInUp delay={0.7 + i * 0.1} key={item}>
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 font-medium text-base text-muted-foreground backdrop-blur-sm">
                    <div className="size-2 rounded-full bg-linear-to-r from-primary to-primary-lighter" />
                    {item}
                  </div>
                </FadeInUp>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Audit;

// ✨ Motion animation wrapper components

type FloatingUpProps = {
  children: ReactNode;
  delay: number;
  duration: number;
  className?: string;
  yRange?: [number, number, number];
};

function FloatingUp({
  children,
  delay,
  duration,
  className,
  yRange = [0, -10, 0],
}: FloatingUpProps) {
  return (
    <motion.div
      animate={{ opacity: 0.6, y: yRange }}
      initial={{ opacity: 0 }}
      transition={{ delay, duration, repeat: Number.POSITIVE_INFINITY }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

type FadeInDownProps = {
  children: ReactNode;
  delay?: number;
};

function FadeInDown({ children, delay = 0 }: FadeInDownProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -30 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

type FadeInUpProps = {
  children: ReactNode;
  delay?: number;
};

function FadeInUp({ children, delay = 0 }: FadeInUpProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
};

function FadeIn({ children, delay = 0, duration = 0.5 }: FadeInProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

type ScaleOnHoverProps = {
  children: ReactNode;
};

function ScaleOnHover({ children }: ScaleOnHoverProps) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      {children}
    </motion.div>
  );
}
