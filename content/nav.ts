import { MODULES } from "./modules";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Primary nav (Part E): Product ▾ (5 modules + overview) · Platform · Why SSVP
 * · Roadmap · Security · ROI. Services + Investors are footer-only.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Why SSVP", href: "/why-ssvp" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Security", href: "/security" },
  { label: "ROI", href: "/roi" },
];

/** The Product ▾ mega-menu: overview + the five modules, indexed 01–05. */
export const PRODUCT_MENU: { label: string; href: string; id?: string; sub: string }[] = [
  { label: "The five modules", href: "/product", sub: "One engine, not five tools" },
  ...MODULES.map((m) => ({
    label: m.name,
    href: `/product/${m.slug}`,
    id: m.id,
    sub: m.promise,
  })),
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "The five modules", href: "/product" },
      { label: "Auto-Typing", href: "/product/auto-typing" },
      { label: "Inventory", href: "/product/inventory" },
      { label: "Audit Defense", href: "/product/audit-defense" },
      { label: "Insurance Capture", href: "/product/insurance-capture" },
      { label: "Ordering", href: "/product/ordering" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pilot program", href: "/pilot" },
      { label: "Book a build call", href: "/book" },
      { label: "Services", href: "/services" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Security", href: "/security" },
      { label: "Why SSVP", href: "/why-ssvp" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "ROI", href: "/roi" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
