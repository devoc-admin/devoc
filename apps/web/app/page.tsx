import dynamic from "next/dynamic";
import Header from "@/app/header";
import Hero from "./_components/sections/hero/hero";
import Footer from "./footer";

// Lazy load below-the-fold sections to reduce initial JavaScript bundle
const Services = dynamic(
  () => import("./_components/sections/services/services")
);

// const Realisations = dynamic(
//   () => import("./_components/sections/achievements/achievements")
// );

const Method = dynamic(() => import("./_components/sections/method/method"));

const WorkWith = dynamic(
  () => import("./_components/sections/work-with/work-with")
);

const Us = dynamic(() => import("./_components/sections/us/us"));

const ThreadsSeparator = dynamic(
  () => import("./_components/separators/threads-separator")
);

const Contact = dynamic(() => import("./_components/sections/contact/contact"));

// =============================

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WorkWith />
      <Us />
      <ThreadsSeparator />
      <Services />
      {/*<Realisations />*/}
      <Method />
      <Contact />
      <Footer />
    </>
  );
}
