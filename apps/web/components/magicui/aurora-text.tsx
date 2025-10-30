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
		backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
			colors[0]
		})`,
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		animationDuration: `${10 / speed}s`,
	};

	return (
		<span className={`relative inline-block ${className}`}>
			<span
				aria-hidden="true"
				className="relative animate-aurora-text-background px-2 bg-size-[200%_auto] bg-clip-text text-transparent"
				style={gradientStyle}
			>
				{children}
			</span>
		</span>
	);
};

AuroraText.displayName = "AuroraText";
