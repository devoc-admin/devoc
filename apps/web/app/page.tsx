import Header from "@/app/components/header";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import Contact from "./sections/contact";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import Processus from "./sections/processus";
import Realisations from "./sections/realisations";
import Services from "./sections/services";
import WorkWith from "./sections/work-with";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Realisations />
      <Processus />
      <WorkWith />
      <Contact />
      <Footer />
      <BackgroundBeams className="hidden lg:block" />
    </>
  );
}
