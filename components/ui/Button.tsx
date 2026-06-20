"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // brand gradient = the primary action. Animated blue→violet sweep, white text.
  primary:
    "animate-gradient-pan bg-[linear-gradient(110deg,var(--brand-1),var(--brand-2)_45%,var(--brand-3))] text-white font-semibold shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--brand-2)_60%,transparent)] hover:shadow-[0_14px_34px_-8px_color-mix(in_srgb,var(--brand-2)_75%,transparent)]",
  secondary:
    "border border-line bg-white text-text hover:border-pulse/40 hover:bg-surface-2 shadow-[0_1px_2px_0_rgba(20,21,43,0.05)]",
  ghost: "text-pulse hover:text-text",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
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
  magnetic?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
} & Record<string, unknown>) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const enableMagnetic = magnetic && !reduce;

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (!enableMagnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, sizes[size], variants[variant], disabled && "opacity-50 pointer-events-none", className);
  const style = enableMagnetic ? { x: sx, y: sy } : undefined;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <motion.a
          href={href}
          className={classes}
          style={style}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          {...rest}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.span style={style} onMouseMove={handleMove} onMouseLeave={reset} className="inline-flex">
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
