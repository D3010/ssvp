export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Pulse", href: "/pulse" },
  { label: "Industries", href: "/industries/pharmacy" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Firm",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "SSVP Pulse", href: "/pulse" },
      { label: "Services", href: "/services" },
      { label: "Pharmacy", href: "/industries/pharmacy" },
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
