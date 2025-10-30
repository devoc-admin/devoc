import Header from "@/app/_components/header";
// import { BackgroundBeams } from "@/components/aceternity/background-beams";
import Contact from "./_sections/contact/contact";
import Footer from "./_sections/footer";
import Hero from "./_sections/hero/hero";
import Processus from "./_sections/processus/processus";
import Realisations from "./_sections/realisations/realisations";
import Services from "./_sections/services/services";
import WorkWith from "./_sections/work-with/work-with";

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
      {/*<BackgroundBeams className="hidden lg:block" />*/}
    </>
  );
}
