"use client";
import Header from "@/app/_components/header";
import ContactWithUs from "./_components/contact-with-us";
import Footer from "./_components/footer";
import Hero from "./_components/section-hero";
import Processus from "./_components/section-processus";
import Realisations from "./_components/section-realisations";
import Services from "./_components/section-services";
import WorkWith from "./_components/section-work-with";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Realisations />
      <Processus />
      <WorkWith />
      <ContactWithUs />
      <Footer />
    </>
  );
}
