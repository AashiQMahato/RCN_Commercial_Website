"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { NAV_ITEMS, isActive } from "@/components/site/nav";
import { business } from "@/data/business";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = React.useCallback(() => dialogRef.current?.close(), []);

  // Close the menu after client-side navigation.
  React.useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  };

  return (
    <header
      className="site-header sticky top-0 z-50"
      data-scrolled={scrolled ? "true" : "false"}>
      <div className="container-x flex h-(--header-h) items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={
                    isActive(pathname, item.href) ? "page" : undefined
                  }>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn btn-primary btn-sm hidden sm:inline-flex">
            Get Connected
          </Link>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-fg transition-colors hover:border-line-strong lg:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Site menu"
        className="mobile-menu lg:hidden"
        onClose={() => setMenuOpen(false)}
        onClick={(e) => {
          // Clicking the backdrop (outside the panel) closes the menu.
          if (e.target === e.currentTarget) closeMenu();
        }}>
        <div className="flex h-full flex-col px-6 pt-4 pb-8">
          <div className="flex h-(--header-h) items-center justify-between">
            <Logo compact />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-fg transition-colors hover:border-line-strong">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className="group flex min-h-14 items-center justify-between text-[1.35rem] font-medium tracking-[-0.02em] text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-fg">
                      {item.label}
                      <ArrowRight
                        className="h-4 w-4 text-fg-subtle transition-transform group-hover:translate-x-1 group-aria-[current=page]:text-signal"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-8">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="btn btn-primary w-full">
              Get Connected <ArrowRight aria-hidden="true" />
            </Link>
            <a href={business.contact.phoneHref} className="btn btn-secondary w-full">
              <Phone aria-hidden="true" /> {business.contact.phone}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
