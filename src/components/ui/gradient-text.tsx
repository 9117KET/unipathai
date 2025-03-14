"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?:
    | "primary"
    | "secondary"
    | "gold"
    | "success"
    | "warning"
    | "error"
    | "custom";
  customGradient?: string;
  animated?: boolean;
  animationSpeed?: "slow" | "medium" | "fast";
  hover?: boolean;
}

export const GradientText = <T extends React.ElementType = "span">({
  children,
  className,
  as,
  variant = "primary",
  customGradient,
  animated = false,
  animationSpeed = "medium",
  hover = false,
  ...props
}: GradientTextProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof GradientTextProps>) => {
  const Component = as || "span";
  const variantMap = {
    primary: "from-uni-primary to-uni-accent",
    secondary: "from-uni-accent to-blue-500",
    gold: "from-uni-gold to-uni-warning",
    success: "from-uni-success to-teal-500",
    warning: "from-uni-warning to-orange-500",
    error: "from-uni-error to-rose-500",
    custom: customGradient || "from-uni-primary to-uni-accent",
  };

  const animationSpeedMap = {
    slow: "animate-gradient-x-slow",
    medium: "animate-gradient-x",
    fast: "animate-gradient-x-fast",
  };

  return (
    <Component
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-r",
        variantMap[variant],
        animated && animationSpeedMap[animationSpeed],
        hover && "gradient-text-hover",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H1 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText<"h1">
    as="h1"
    className={cn("text-3xl md:text-4xl font-bold mb-4", props.className)}
    {...props}
  />
);

export const H2 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText<"h2">
    as="h2"
    className={cn("text-2xl md:text-3xl font-semibold mb-3", props.className)}
    {...props}
  />
);

export const H3 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText<"h3">
    as="h3"
    className={cn("text-xl md:text-2xl font-semibold mb-2", props.className)}
    {...props}
  />
);

export const H4 = (
  props: Omit<React.ComponentPropsWithoutRef<typeof GradientText>, "as">
) => (
  <GradientText<"h4">
    as="h4"
    className={cn("text-lg font-medium mb-2", props.className)}
    {...props}
  />
);
