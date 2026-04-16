import dynamic from "next/dynamic";
import Header from "@/app/header.tsx";
import Hero from "./_components/sections/hero/hero.tsx";
import Footer from "./footer.tsx";

const WorkWith = dynamic(
  () => import("./_components/sections/work-with/work-with.tsx"),
);

const Us = dynamic(() => import("./_components/sections/us/us.tsx"));

const ThreadsSeparator = dynamic(
  () => import("./_components/separators/threads-separator"),
);

// Lazy load below-the-fold sections to reduce initial JavaScript bundle
const Services = dynamic(
  () => import("./_components/sections/services/services.tsx"),
);

// const Realisations = dynamic(
//   () => import("./_components/sections/achievements/achievements.tsx")
// );

// const Method = dynamic(
//   () => import("./_components/sections/method/method.tsx")
// );
//
const Contact = dynamic(
  () => import("./_components/sections/contact/contact.tsx"),
);

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
      {/*<Realisations />
      <Method />*/}
      <Contact />
      <Footer />
    </>
  );
}
