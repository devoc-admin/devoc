import Header from "@/app/header";
import Realisations from "./_components/sections/achievements/achievements";
import ContactWithUs from "./_components/sections/contact/components/contact-with-us";
import Hero from "./_components/sections/hero/hero";
import Method from "./_components/sections/method/method";
import Services from "./_components/sections/services/services";
import WorkWith from "./_components/sections/work-with/work-with";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Realisations />
      <Method />
      <WorkWith />
      <ContactWithUs />
      <Footer />
    </>
  );
}
