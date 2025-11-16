import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  theme: "light" | "dark";
  sectionName: string;
};

const offsetTop = 50;

function useNavTheme({ theme = "light", sectionName = "" }: Props) {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    offset: [`start ${offsetTop}px`, "end start"],
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newTheme = theme;
    if (scrollY.get() < offsetTop) return; // top of page
    if (latest <= 0) {
      newTheme = theme === "dark" ? "light" : "dark";
      document.documentElement.style.setProperty("--section-name", "");
      document.documentElement.setAttribute("data-section-name", "");
    }
    document.documentElement.style.setProperty("--nav-theme", newTheme);
    document.documentElement.setAttribute("data-nav-theme", newTheme);
    document.documentElement.style.setProperty("--section-name", sectionName);
    document.documentElement.setAttribute("data-section-name", sectionName);
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-theme", "light");
    document.documentElement.setAttribute("data-nav-theme", "light");
    document.documentElement.style.setProperty("--section-name", "home");
    document.documentElement.setAttribute("data-section-name", "home");
  }, []);

  return { ref };
}

export default useNavTheme;
