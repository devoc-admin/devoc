import Contact from "./section-contact";
import SectionUs from "./section-us";

export default function ContactWithUs() {
  return (
    <div className="grid grid-cols-1 bg-zinc-950 sm:flex-row">
      <SectionUs />
      <Contact />
    </div>
  );
}
