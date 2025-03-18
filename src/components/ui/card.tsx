"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Define variants for the card
const variants = {
  default: "bg-card text-card-foreground shadow",
  outline: "border border-card-border bg-transparent",
  glass: "glass-card backdrop-blur-md transition-all",
  gradient:
    "bg-gradient-to-br from-card-bg/50 to-card-bg/80 border border-card-border shadow-md",
};

// Define sizes for the card
const sizes = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

type CardProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children?: React.ReactNode;
  hoverEffect?: boolean;
  onClick?: () => void;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      hoverEffect = true,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        variants[variant],
        sizes[size],
        hoverEffect && "hover:shadow-xl hover:bg-white/10",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

type CardHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

type CardTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-uni-primary to-uni-accent bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

type CardDescriptionProps = {
  className?: string;
  children?: React.ReactNode;
};

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

type CardContentProps = {
  className?: string;
  children?: React.ReactNode;
};

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

type CardFooterProps = {
  className?: string;
  children?: React.ReactNode;
};

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-6 pt-0",
        "border-t border-white/10",
        "bg-gradient-to-r from-uni-primary/20 via-uni-accent/20 to-transparent",
        "backdrop-blur-md",
        "transition-all duration-300",
        "hover:from-uni-primary/30 hover:via-uni-accent/30",
        "relative",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-uni-primary/10 before:to-uni-accent/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-uni-primary/5 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
