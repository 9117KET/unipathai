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

export const Card = ({
  variant = "default",
  size = "md",
  className,
  children,
  hoverEffect = false,
  onClick,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-xl",
        variants[variant],
        sizes[size],
        hoverEffect &&
          "hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

type CardHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

export const CardHeader = ({
  className,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
};

type CardTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

export const CardTitle = ({
  className,
  children,
  ...props
}: CardTitleProps) => {
  return (
    <h3
      className={cn(
        "font-semibold leading-tight tracking-tight text-lg",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

type CardDescriptionProps = {
  className?: string;
  children?: React.ReactNode;
};

export const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground opacity-80", className)}
      {...props}
    >
      {children}
    </p>
  );
};

type CardContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export const CardContent = ({
  className,
  children,
  ...props
}: CardContentProps) => {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
};

type CardFooterProps = {
  className?: string;
  children?: React.ReactNode;
};

export const CardFooter = ({
  className,
  children,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center pt-4 border-t border-border/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
