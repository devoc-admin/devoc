import { Footer } from "./_components/footer/footer";
import { Hero } from "./_components/sections/hero/hero";
import { Main } from "./_components/sections/main/main";
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
