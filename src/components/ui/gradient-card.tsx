"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent";
}

export function GradientCard({
  children,
  className,
  variant = "default",
}: GradientCardProps) {
  const variantClasses = {
    default: "gradient-card",
    primary: "gradient-card border-indigo-400/30 bg-indigo-950/30",
    secondary: "gradient-card border-purple-400/30 bg-purple-950/30",
    accent: "gradient-card border-pink-400/30 bg-pink-950/30",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>{children}</div>
  );
}
