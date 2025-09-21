import Header from "@/app/components/header";
import Contact from "./sections/contact";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import Services from "./sections/services";
import Showcase from "./sections/showcase";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Showcase />
      <Contact />
      <Footer />
    </>
  );
}
