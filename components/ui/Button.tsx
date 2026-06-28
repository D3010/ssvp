"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // brand gradient = the primary action. Static blue→violet sweep, white text.
  // A subtle CSS lift on hover replaces the old JS "magnetic" effect.
  primary:
    "bg-[linear-gradient(110deg,var(--brand-1),var(--brand-2)_45%,var(--brand-3))] text-white font-semibold shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--brand-2)_60%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_color-mix(in_srgb,var(--brand-2)_75%,transparent)]",
  secondary:
    "border border-line bg-white text-text hover:border-pulse/40 hover:bg-surface-2 shadow-[0_1px_2px_0_rgba(20,21,43,0.05)]",
  ghost: "text-pulse hover:text-text",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
} & Record<string, unknown>) {
  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
