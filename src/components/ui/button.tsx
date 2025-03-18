import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-uni-primary to-uni-accent text-white shadow-lg hover:shadow-xl hover:from-uni-primary/90 hover:to-uni-accent/90",
        destructive:
          "bg-gradient-to-r from-uni-error to-rose-500 text-white shadow-lg hover:shadow-xl hover:from-uni-error/90 hover:to-rose-500/90",
        outline:
          "border-2 border-uni-primary bg-transparent text-uni-primary shadow-md hover:shadow-lg hover:bg-uni-primary hover:text-white",
        secondary:
          "bg-gradient-to-r from-uni-accent to-uni-primary text-white shadow-lg hover:shadow-xl hover:from-uni-accent/90 hover:to-uni-primary/90",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-uni-primary underline-offset-4 hover:underline",
        glass:
          "glass-card text-uni-primary hover:text-white hover:bg-gradient-to-r hover:from-uni-primary/90 hover:to-uni-accent/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
