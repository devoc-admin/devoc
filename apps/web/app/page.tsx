import Header from "@/app/_components/header";
import Footer from "./_components/footer";
import Contact from "./_components/section-contact";
import Hero from "./_components/section-hero";
import Processus from "./_components/section-processus";
import Realisations from "./_components/section-realisations";
import Services from "./_components/section-services";
import WorkWith from "./_components/section-work-with";
// import { BackgroundBeams } from "@/components/aceternity/background-beams";

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
