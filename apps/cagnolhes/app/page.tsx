import { Actualites } from "@/app/_components/sections/actualites/section-actualites";
import { cn } from "@/lib/utils";
import { Hero } from "./_components/hero/hero";
export default function Home() {
  return (
    <>
      <Hero />
      <main className={cn("grow", "bg-emerald-50", "py-32")}>
        <div className={cn("relative", "mx-auto", "w-[min(1400px,90vw)]")}>
          <Actualites />
        </div>
      </main>
    </>
  );
}
