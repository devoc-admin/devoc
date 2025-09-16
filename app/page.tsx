import Header from "@/app/components/header";
import Contact from "./sections/contact";
import Main from "./sections/main";
import Services from "./sections/services";
import Showcase from "./sections/showcase";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Services />
      <Showcase />
      <Contact />
    </>
  );
}
