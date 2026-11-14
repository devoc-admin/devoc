import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Actualite } from "../_types";

export function ActualiteCard({
  img,
  slug,
  title,
  excerpt,
  category: { color, label },
}: Actualite) {
  return (
    <Link href={`/${slug}`}>
      <Card className="group pt-0 pb-4">
        {/* 🖼️ */}
        <Illustration src={img} />

        {/* 🟡🆎🔠 */}
        <CardHeader>
          <Category color={color}>{label}</Category>
          <Title>{title}</Title>
          <Description>{excerpt}</Description>
        </CardHeader>

        {/* 🦶 */}
        <Footer />
      </Card>
    </Link>
  );
}

// 🖼️ ================================
function Illustration({ src }: { src: StaticImageData }) {
  return (
    <div className="overflow-hidden">
      <Image
        alt=""
        className="w-full transition-transform duration-[0.5s] group-hover:scale-105"
        src={src}
        width="400"
      />
    </div>
  );
}

// 🆎 ================================
function Title({ children }: { children: React.ReactNode }) {
  return (
    <CardTitle className="mb-2 text-2xl font-bold text-balance">
      {children}
    </CardTitle>
  );
}

// 🔠 ================================
function Description({ children }: { children: React.ReactNode }) {
  return (
    <CardDescription className="line-clamp-3 text-base font-medium text-ellipsis">
      {children}
    </CardDescription>
  );
}

// 🟡 ================================
function Category({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <div
        className="font-medium uppercase"
        style={{
          color,
        }}
      >
        {children}
      </div>
      <Adornment color={color} />
    </div>
  );
}

function Adornment({ color }: { color: string }) {
  return (
    <div className="grid grid-flow-col grid-cols-3 grid-rows-2 place-items-center gap-x-1 gap-y-0.5">
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="size-0.75 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div
        className="row-span-full h-2 w-12"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

// 🦶 ================================

function Footer() {
  return (
    <CardFooter className="font-medium text-emerald-700">
      <div className="flex items-center gap-x-1">
        <span className="text-base">Lire la suite</span>
        <Chevron />
      </div>
    </CardFooter>
  );
}

function Chevron() {
  return <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} />;
}
