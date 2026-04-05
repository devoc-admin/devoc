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
      setSectionName("");
    }
    setTheme(newTheme);
    setSectionName(sectionName);
  });

  useEffect(() => {
    setTheme("light");
    setSectionName("home");
  }, []);

  return { ref, setTheme };
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.style.setProperty("--nav-theme", theme);
  document.documentElement.setAttribute("data-nav-theme", theme);
}

function setSectionName(name: string) {
  document.documentElement.style.setProperty("--section-name", name);
  document.documentElement.setAttribute("data-section-name", name);
}

export default useNavTheme;
