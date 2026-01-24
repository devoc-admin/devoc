import SectionUs from "../../us/us";
import Contact from "../contact";

export default function ContactWithUs() {
  return (
    <div className="grid grid-cols-1 bg-zinc-950 sm:flex-row">
      <SectionUs />
      <Contact />
    </div>
  );
}
