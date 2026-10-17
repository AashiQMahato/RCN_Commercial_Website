export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
