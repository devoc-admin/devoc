import { Footer } from "./_components/footer/footer";
import { Hero } from "./_components/hero/hero";
import { Main } from "./_components/main";
import { WorkWith } from "./_components/sections/work-with/work-with";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkWith />
      <Main />
      <Footer />
    </>
  );
}
