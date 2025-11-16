// @ts-nocheck
import type React from "react";

// Type definitions
type Orientation = "vertical" | "horizontal";
type ColorScheme = "purple" | "blue" | "green" | "red" | "orange";

interface GlowLineProps {
  orientation: Orientation;
  position: string;
  className?: string;
  color: ColorScheme;
}

interface GlowLayer {
  size: string;
  blur: string;
  opacity: string;
  color: string;
}

interface ColorSchemeConfig {
  core: string;
  glow: string[];
}

// Color schemes configuration
const COLOR_SCHEMES: Record<ColorScheme, ColorSchemeConfig> = {
  blue: {
    core: "via-blue-400",
    glow: ["via-blue-400", "via-blue-500", "via-blue-400", "via-blue-300"],
  },
  orange: {
    core: "via-orange-400",
    glow: ["via-orange-400", "via-orange-500", "via-orange-400", "via-orange-300"],
  },
  green: {
    core: "via-green-400",
    glow: ["via-green-400", "via-green-500", "via-green-400", "via-green-300"],
  },
  purple: {
    core: "via-purple-400",
    glow: [
      "via-purple-400",
      "via-purple-500",
      "via-purple-400",
      "via-purple-300",
    ],
  },
  red: {
    core: "via-red-400",
    glow: ["via-red-400", "via-red-500", "via-red-400", "via-red-300"],
  },
};

const GlowLine = ({
  orientation,
  position,
  className = "",
  color,
}) => {
  const isVertical = orientation === "vertical";
  const containerClasses = isVertical
    ? "absolute w-px h-full"
    : "absolute w-full h-px";
  const positionStyle: React.CSSProperties = isVertical
    ? { left: position }
    : { top: position };
  const gradientDirection = isVertical
    ? "bg-gradient-to-b"
    : "bg-gradient-to-r";

  const selectedScheme = COLOR_SCHEMES[color];

  const glowLayers: GlowLayer[] = [
    {
      blur: "blur-sm",
      color: selectedScheme.glow[0],
      opacity: "opacity-100",
      size: isVertical ? "w-1 -ml-0.5" : "h-1 -mt-0.5",
    },
    {
      blur: "blur-md",
      color: selectedScheme.glow[1],
      opacity: "opacity-80",
      size: isVertical ? "w-2 -ml-1" : "h-2 -mt-1",
    },
    {
      blur: "blur-lg",
      color: selectedScheme.glow[2],
      opacity: "opacity-60",
      size: isVertical ? "w-4 -ml-2" : "h-4 -mt-2",
    },
  ];

  return (
    <div className={`${containerClasses} ${className}`} style={positionStyle}>
      <div
        className={`absolute inset-0 ${gradientDirection} from-transparent ${selectedScheme.core} to-transparent`}
      />
      <div
        className={`absolute inset-0 ${isVertical ? "-ml-px w-0.5" : "-mt-px h-0.5"} ${gradientDirection} from-transparent via-white to-transparent opacity-60`}
      />
      {glowLayers.map((layer, index) => (
        <div
          className={`absolute inset-0 ${layer.size} ${gradientDirection} from-transparent ${layer.color} to-transparent ${layer.blur} ${layer.opacity}`}
          key={index}
        />
      ))}
    </div>
  );
};

export default GlowLine;
