"use client";
// @ts-nocheck

import type React from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = ({
  children,
  className = "",
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}: AuroraTextProps) => {
  const gradientStyle = {
    animationDuration: `${10 / speed}s`,
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
      colors[0]
    })`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden="true"
        className="relative animate-aurora-text-background bg-size-[200%_auto] bg-clip-text px-2 text-transparent"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
};

AuroraText.displayName = "AuroraText";
