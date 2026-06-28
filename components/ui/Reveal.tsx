import type { ReactNode } from "react";

/**
 * Layout wrapper. This used to be a JS scroll-reveal (opacity/translate driven
 * by the motion library), which meant content shipped invisible and only
 * appeared once JS had downloaded and run. It now renders a plain,
 * server-rendered element so content is visible instantly with zero JavaScript.
 * `delay` is accepted for call-site compatibility and intentionally ignored.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  return <Tag className={className}>{children}</Tag>;
}
