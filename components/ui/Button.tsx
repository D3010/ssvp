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
  // pulse-green = proof. The primary CTA is the only button allowed to be green.
  primary:
    "bg-gradient-to-b from-[#62ffb6] to-pulse text-ink font-semibold hover:to-[#35e996] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_24px_-6px_color-mix(in_srgb,var(--color-pulse)_55%,transparent)]",
  secondary:
    "border border-white/10 bg-white/[0.03] text-text backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
  ghost: "text-ice hover:text-text",
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
