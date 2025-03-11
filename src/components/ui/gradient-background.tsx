"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AccentPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
  animated?: boolean;
  showAccents?: boolean;
  accentPositions?: {
    accent1?: AccentPosition;
    accent2?: AccentPosition;
    accent3?: AccentPosition;
  };
}

export const GradientBackground = ({
  children,
  className,
  intensity = "medium",
  animated = true,
  showAccents = true,
  accentPositions,
}: GradientBackgroundProps) => {
  const intensityMap = {
    light: {
      accent1: "opacity-30",
      accent2: "opacity-30",
      accent3: "opacity-30",
      blur: "blur-3xl",
    },
    medium: {
      accent1: "opacity-50",
      accent2: "opacity-50",
      accent3: "opacity-50",
      blur: "blur-2xl",
    },
    strong: {
      accent1: "opacity-70",
      accent2: "opacity-70",
      accent3: "opacity-70",
      blur: "blur-xl",
    },
  };

  const { accent1, accent2, accent3, blur } = intensityMap[intensity];

  return (
    <div className={cn("gradient-background relative min-h-0", className)}>
      {showAccents && (
        <>
          <div
            className={cn(
              "gradient-accent-1 absolute w-[42rem] h-[42rem] rounded-full mix-blend-multiply filter",
              blur,
              accent1,
              animated && "animate-blob",
              "pointer-events-none"
            )}
            style={{
              top: accentPositions?.accent1?.top || "0%",
              left: accentPositions?.accent1?.left || "auto",
              right: accentPositions?.accent1?.right || "10%",
              bottom: accentPositions?.accent1?.bottom || "auto",
              transform: "translateZ(0)",
            }}
          ></div>
          <div
            className={cn(
              "gradient-accent-2 absolute w-[38rem] h-[38rem] rounded-full mix-blend-multiply filter",
              blur,
              accent2,
              animated && "animate-blob animation-delay-2000",
              "pointer-events-none"
            )}
            style={{
              top: accentPositions?.accent2?.top || "auto",
              left: accentPositions?.accent2?.left || "10%",
              right: accentPositions?.accent2?.right || "auto",
              bottom: accentPositions?.accent2?.bottom || "0%",
              transform: "translateZ(0)",
            }}
          ></div>
          <div
            className={cn(
              "gradient-accent-3 absolute w-[48rem] h-[48rem] rounded-full mix-blend-multiply filter",
              blur,
              accent3,
              animated && "animate-blob animation-delay-4000",
              "pointer-events-none"
            )}
            style={{
              top: accentPositions?.accent3?.top || "40%",
              left: accentPositions?.accent3?.left || "30%",
              right: accentPositions?.accent3?.right || "auto",
              bottom: accentPositions?.accent3?.bottom || "auto",
              transform: "translateZ(0)",
            }}
          ></div>
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
