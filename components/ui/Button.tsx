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
  // The machine's primary action: solid mint, obsidian text. Never gold —
  // gold is reserved for human-verification components (VerifyButton family).
  primary:
    "bg-mint text-obsidian font-semibold shadow-[0_10px_28px_-10px_rgb(127_224_176/0.5)] hover:-translate-y-0.5 hover:bg-[#93e8c0] hover:shadow-[0_16px_36px_-10px_rgb(127_224_176/0.65)]",
  // Bordered glass on dark.
  secondary:
    "border border-hairline bg-[color-mix(in_srgb,var(--color-emerald-deep)_50%,transparent)] text-text hover:border-mint/40 hover:bg-emerald",
  ghost: "font-mono text-xs uppercase tracking-[0.12em] text-mint hover:text-text",
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
