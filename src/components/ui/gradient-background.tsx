"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  showAccents?: boolean;
  accentPositions?: {
    accent1?: { top?: string; left?: string; right?: string; bottom?: string };
    accent2?: { top?: string; left?: string; right?: string; bottom?: string };
    accent3?: { top?: string; left?: string; right?: string; bottom?: string };
  };
}

export function GradientBackground({
  children,
  className,
  showAccents = true,
  accentPositions,
}: GradientBackgroundProps) {
  return (
    <div className={cn("gradient-background", className)}>
      {showAccents && (
        <>
          <div
            className="gradient-accent-1"
            style={accentPositions?.accent1 || {}}
          />
          <div
            className="gradient-accent-2"
            style={accentPositions?.accent2 || {}}
          />
          <div
            className="gradient-accent-3"
            style={accentPositions?.accent3 || {}}
          />
        </>
      )}
      {children}
    </div>
  );
}
