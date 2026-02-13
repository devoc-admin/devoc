"use client";
import { cn } from "@/lib/utils";
import { Company } from "./_components/company";
import { companies } from "./work-with-data";

function WorkWith() {
  return (
    <div className={cn("my-22")}>
      <NoxExpertsOntTravailléAvecEux />
      <div className="flex w-full text-2xl">
        <Border />
        <div
          className={cn(
            "max-w-200",
            "border-b border-l",
            // 📱 Responsive
            "grid",
            "grid-cols-1 grid-rows-auto",
            "xs:grid-cols-2 xs:grid-rows-auto",
            "sm:grid-cols-3 sm:grid-rows-2"
          )}
        >
          {companies.map((props) => (
            <Company key={props.name} {...props} />
          ))}
        </div>
        <Border />
      </div>
    </div>
  );
}

// ==========================
// 🆎 Header
function NoxExpertsOntTravailléAvecEux() {
  return (
    <div className="mb-6 px-6 text-center font-kanit font-regular text-3xl">
      Nos experts ont travaillé avec eux
    </div>
  );
}

// ==========================
// ― Border
function Border() {
  return <div className="grow border-border border-y" />;
}

export default WorkWith;
