"use client";
import { cn } from "@/lib/utils";
import { Company } from "./_components/company";
import { companies } from "./work-with-data";

export function WorkWith() {
  return (
    <div
      className={cn(
        "relative z-10",
        "bg-white",
        "py-32",
        // ↔️
        "hidden",
        "xs:block"
      )}
    >
      <NoxExpertsOntTravailléAvecEux />
      <div className="flex w-full text-2xl">
        <BorderL />
        <div className="relative">
          <BorderT />
          <div
            className={cn(
              "max-w-200",
              "border-b border-l",
              "grid",
              // 📱 Responsive
              "xs:grid-cols-2 xs:grid-rows-auto",
              "sm:grid-cols-3 sm:grid-rows-2"
            )}
          >
            {companies.map((props) => (
              <Company key={props.name} {...props} />
            ))}
          </div>
          <BorderB />
        </div>
        <BorderR />
      </div>
    </div>
  );
}

// ==========================
// 🆎 Header
function NoxExpertsOntTravailléAvecEux() {
  return (
    <div
      className={cn(
        "px-8",
        "text-center font-regular",
        // ↔️
        "xs:mb-6 xs:text-2xl",
        "sm:mb-6 sm:text-2xl",
        "md:mb-10 md:text-2xl",
        "lg:mb-16 lg:text-3xl"
      )}
    >
      Nos experts ont travaillé avec eux
    </div>
  );
}

// ==========================
// ― Border
function BorderX({ className }: { className: string }) {
  return <div className={cn("grow", "border-border border-y", className)} />;
}

function BorderL() {
  return <BorderX className="mask-l-from-10% mask-l-to-90%" />;
}

function BorderR() {
  return <BorderX className="mask-r-from-10% mask-r-to-90%" />;
}

function BorderY({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "absolute",
        "h-30",
        "w-full",
        "border-border border-x",
        className
      )}
    />
  );
}

function BorderT() {
  return (
    <BorderY
      className={cn(
        "top-0",
        "-translate-y-full",
        "mask-t-from-20% mask-t-to-90%"
      )}
    />
  );
}

function BorderB() {
  return (
    <BorderY
      className={cn(
        "bottom-0",
        "translate-y-full",
        "mask-b-from-20% mask-b-to-90%"
      )}
    />
  );
}
