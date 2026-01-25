import Header from "@/app/header";
import Realisations from "./_components/sections/achievements/achievements";
import Contact from "./_components/sections/contact/contact";
import Hero from "./_components/sections/hero/hero";
import Method from "./_components/sections/method/method";
import Services from "./_components/sections/services/services";
import Us from "./_components/sections/us/us";
import WorkWith from "./_components/sections/work-with/work-with";
import ThreadsSeparator from "./_components/separators/threads-separator";
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
      <Us />
      <ThreadsSeparator />
      <Contact />
      <Footer />
    </>
  );
}
