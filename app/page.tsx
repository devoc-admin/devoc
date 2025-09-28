import Header from "@/app/components/header";
import Contact from "./sections/contact";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import Realisations from "./sections/realisations";
import Services from "./sections/services";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Realisations />
      <Contact />
      <Footer />
    </>
  );
}
