import { cn } from "@/lib/utils";

export function TailwindLandmark() {
  if (process.env.NODE_ENV !== "development") return;
  return (
    <div className="fixed top-5 left-5 z-999 rounded-sm bg-black/80 px-4 py-2 font-geist-mono text-sm text-white">
      <TailwindBelowXs />
      <TailwindXs />
      <TailwindSm />
      <TailwindMd />
      <TailwindLg />
      <TailwindXl />
      <Tailwind2Xl />
    </div>
  );
}

function TailwindBelowXs() {
  return <span className="xs:hidden">Below XS</span>;
}
function TailwindXs() {
  return <span className="xs:inline hidden sm:hidden">XS</span>;
}
function TailwindSm() {
  return <span className="hidden sm:inline md:hidden">SM</span>;
}
function TailwindMd() {
  return <span className="hidden md:inline lg:hidden">MD</span>;
}
function TailwindLg() {
  return <span className="hidden lg:inline xl:hidden">LG</span>;
}
function TailwindXl() {
  return <span className="hidden xl:inline 2xl:hidden">XL</span>;
}
function Tailwind2Xl() {
  return <span className={cn("hidden", "3xl:hidden 2xl:inline")}>2XL</span>;
}
