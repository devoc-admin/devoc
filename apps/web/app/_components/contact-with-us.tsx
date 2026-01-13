import GlowLine from "@/components/sera-ui/glow-line";
import Contact from "./section-contact";
import SectionUs from "./section-us";

export default function ContactWithUs() {
  return (
    <div className="relative flex w-full flex-col bg-zinc-950 sm:flex-row sm:items-start xl:gap-16 xl:px-6 xl:py-24">
      <GlowLine color="orange" orientation="horizontal" position="0px" />
      <SectionUs />
      <div className="pointer-events-none absolute top-0 left-1/2 z-10 hidden h-full w-8 -translate-x-1/2 sm:block">
        <GlowLine color="orange" orientation="vertical" position="0px" />
      </div>
      <Contact />
    </div>
  );
}
