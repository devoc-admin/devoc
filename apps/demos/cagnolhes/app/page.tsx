import { Actualites } from "@/app/_components/sections/actualites/section-actualites";
import { Demarches } from "@/app/_components/sections/demarches/section-demarches";
import { cn } from "@/lib/utils";
import { Header } from "./_components/header";
export default function Home() {
  return (
    <>
      <Header />
      <main className={cn("grow py-32")}>
        <Actualites />
        <Demarches />
      </main>
    </>
  );
}
