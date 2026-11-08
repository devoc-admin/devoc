import { cn } from "cn";
import type { Metadata } from "next";
import { Anton, Fraunces, Racing_Sans_One } from "next/font/google";
import { notFound } from "next/navigation";
import s from "./style.module.css";

// 🚧 Test pages: dev only for now. Remove this guard to publish them.
export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div
      className={cn(
        anton.variable,
        racingSansOne.variable,
        fraunces.variable,
        "relative h-[300vh] p-8"
      )}
    >
      <LeftBarWithMarker />
      <RightBarWithMarker />
      {children}
    </div>
  );
}

// 🎀 =======================================
const shift = "15px";
function LeftBarWithMarker() {
  return (
    <div className="fixed top-0 left-0 h-full w-3">
      <LeftMarker />
      <LeftBar />
    </div>
  );
}

function LeftBar() {
  return (
    <div
      className="bg-orange-red size-full"
      style={{
        clipPath: `polygon(0 0, 100% ${shift}, 100% calc(100% - ${shift}), 0% 100%);`,
      }}
    />
  );
}

function LeftMarker() {
  return (
    <div
      className={cn(
        "bg-orange-red absolute top-0 left-full h-10 w-4.25",
        "motion-reduce:hidden",
        s.marker
      )}
      style={{ clipPath: "polygon(100% 50%, 0 0, 0 100%)" }}
    />
  );
}

function RightBarWithMarker() {
  return (
    <div className="fixed top-0 right-0 h-full w-3">
      <RightMarker />
      <RightBar />
    </div>
  );
}

function RightBar() {
  return (
    <div
      className="bg-orange-red size-full"
      style={{
        clipPath: `polygon(0 ${shift}, 100% 0, 100% 100%, 0% calc(100% - ${shift}));`,
      }}
    />
  );
}

function RightMarker() {
  return (
    <div
      className={cn(
        "bg-orange-red absolute top-0 -left-full h-10 w-4.25",
        "motion-reduce:hidden",
        s.marker
      )}
      style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
    />
  );
}

// 🎨 =======================================

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});
const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  variable: "--font-racing",
  weight: "400",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "400",
});
