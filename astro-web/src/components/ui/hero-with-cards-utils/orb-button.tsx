import * as React from "react";
import { cn } from "@/lib/utils";

export interface OrbButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default" | "lg";
  variant?: "primary" | "secondary" | "outline";
  children?: React.ReactNode;
}

export const OrbButton = React.forwardRef<HTMLButtonElement, OrbButtonProps>(
  ({ className, size = "default", variant = "primary", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-xs font-semibold gap-1.5",
      default: "px-7 py-3.5 text-sm md:text-base font-bold gap-2",
      lg: "px-9 py-4 text-base md:text-lg font-bold gap-2.5",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 via-sky-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-500 hover:to-sky-400 border border-sky-400/40",
      secondary:
        "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-md",
      outline:
        "bg-transparent text-white hover:bg-white/10 border-2 border-white/40",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-300",
          "active:scale-95 cursor-pointer select-none",
          "focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span
          className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-sky-400/30 via-white/20 to-blue-400/30 rounded-full blur-sm"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center justify-center font-bold tracking-wide">
          {children}
        </span>
      </button>
    );
  }
);

OrbButton.displayName = "OrbButton";
