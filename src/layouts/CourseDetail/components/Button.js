import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

// Manually manage variants and sizes with a straightforward approach
const getButtonClasses = (variant, size, additionalClasses) => {
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${additionalClasses}`;
};

const Button = forwardRef(
  ({ asChild = false, variant = "default", size = "default", className = "", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classes = getButtonClasses(variant, size, className);

    return <Comp className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
