import { Actualites } from "@/app/_components/sections/actualites/section-actualites";
import { Demarches } from "@/app/_components/sections/demarches/section-demarches";
import { cn } from "@/lib/utils";
import { Hero } from "./_components/hero/hero";
export default function Home() {
  return (
    <>
      <Hero />
      <main className={cn("grow", "bg-emerald-50", "py-32")}>
        <Actualites />
        <Demarches />
      </main>
    </>
  );
}
