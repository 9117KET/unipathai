"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  gradient?: "primary" | "accent" | "gold" | "success" | "error";
  animate?: boolean;
  as?: React.ElementType;
}

export function GradientText({
  className,
  gradient = "primary",
  animate = false,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const gradients = {
    primary: "from-uni-primary to-uni-accent",
    accent: "from-uni-accent to-uni-primary",
    gold: "from-uni-gold to-amber-400",
    success: "from-uni-success to-emerald-400",
    error: "from-uni-error to-rose-400",
  };

  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[gradient],
        animate && "animate-gradient",
        className
      )}
      {...props}
    />
  );
}

export const H1 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText
    as="h1"
    className={cn("text-3xl md:text-4xl font-bold mb-4", props.className)}
    {...props}
  />
);

export const H2 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText
    as="h2"
    className={cn("text-2xl md:text-3xl font-semibold mb-3", props.className)}
    {...props}
  />
);

export const H3 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText
    as="h3"
    className={cn("text-xl md:text-2xl font-semibold mb-2", props.className)}
    {...props}
  />
);

export const H4 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText
    as="h4"
    className={cn("text-lg font-medium mb-2", props.className)}
    {...props}
  />
);
