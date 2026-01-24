"use client";
import { cn } from "@/lib/utils";
import { Company } from "./_components/company";
import { companies } from "./work-with-data";

function WorkWith() {
  return (
    <div className="mb-22 w-full text-center text-2xl">
      <div className="mb-6 px-6 font-kanit font-regular text-3xl">
        Nous avons travaillé avec eux
      </div>
      <div className="flex w-full">
        <div className="grow border-border border-y" />
        <div
          className={cn(
            "grid max-w-200 grid-cols-3 grid-rows-2 border-b border-l",
            // Responsive
            "grid-cols-1 grid-rows-auto",
            "xs:grid-cols-2 xs:grid-rows-auto",
            "sm:grid-cols-3 sm:grid-rows-2"
          )}
        >
          {companies.map(({ name, logo, link }) => (
            <Company key={name} link={link} logo={logo} name={name} />
          ))}
        </div>
        <div className="grow border-border border-y" />
      </div>
    </div>
  );
}

export default WorkWith;
