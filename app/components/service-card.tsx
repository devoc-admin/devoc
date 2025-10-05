/** biome-ignore-all lint/performance/noNamespaceImport: exception */
"use client";
import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  features: string[];
  icon: string;
};

export default function ServiceCard({
  title,
  description,
  features,
  icon,
}: Props) {
  /** biome-ignore lint/performance/noDynamicNamespaceImportAccess: exception */
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;
  return (
    <Card>
      <CardHeader>
        <div className="mb-3 flex items-center justify-between">
          {/* 🟪 Icon */}
          <div
            className={cn(
              "grid w-fit items-center rounded-lg p-2.5 text-primary",
              "bg-primary/15",
              "group-hover:bg-primary/20"
            )}
          >
            <Icon size={28} />
          </div>
          {/* 👉 Progress Bar */}
          <motion.div
            className="h-1 w-[30%] rounded-lg bg-primary"
            initial={{ width: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ width: "30%" }}
          />
        </div>

        {/* 🆎 Title */}
        <CardTitle
          className={cn(
            "font-bold text-xl",
            "text-primary-foreground",
            "group-hover:text-primary"
          )}
        >
          {title}
        </CardTitle>
      </CardHeader>

      {/* 🔡 Description */}
      <CardContent className="grow gap-4">
        <CardDescription className="mb-2 text-base">
          {description}
        </CardDescription>
        <ul className="mt-auto">
          {features.map((feature) => (
            <li className="flex items-center gap-2" key={feature}>
              <div className="size-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
