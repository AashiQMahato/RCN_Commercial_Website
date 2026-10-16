"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/landing/container";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { business } from "@/data/business";
import { t } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "navHome", href: "/" },
  { key: "navPlans", href: "/plans" },
  { key: "navCoverage", href: "/coverage" },
  { key: "navAbout", href: "/about" },
  { key: "navContact", href: "/contact" },
  { key: "navFaq", href: "/faq" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const desktopLinkBase =
    "relative px-3 py-2 text-[0.9rem] font-medium transition-colors " +
    "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] " +
    "after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:rounded-full " +
    "after:bg-[rgb(var(--primary))] after:origin-left after:scale-x-0 after:transition-transform after:duration-200 " +
    "hover:after:scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={
          "border-b backdrop-blur-md " +
          "shadow-[0_4px_24px_rgba(0,0,0,0.4)] " +
          "light:shadow-[0_2px_8px_rgba(0,0,0,0.08)] " +
          (scrolled ? "bg-[rgb(var(--bg))]/90" : "bg-[rgb(var(--bg))]/85")
        }
        style={{ borderColor: "rgb(var(--primary) / 0.12)" }}>
        <Container className="flex h-17 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border-[1.5px] border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/12">
              <Image
                src="/logo.webp"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
                unoptimized
              />
            </span>
            <div className="leading-tight">
              <div className="rcn-mono text-sm font-semibold tracking-wide text-[rgb(var(--text))]">
                {business.company.shortName}
              </div>
              <div className="hidden w-max text-xs text-[rgb(var(--text-muted))] sm:block">
                {business.company.name}
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    desktopLinkBase +
                    (active
                      ? " text-[rgb(var(--primary))] after:scale-x-100"
                      : "")
                  }>
                  {t(lang, item.key)}
                </Link>
              );
            })}
          </nav>
      
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="hidden flex-nowrap  items-center gap-2 md:flex">
              <Link href="/plans" className="rcn-btn-secondary">
                {t(lang, "ctaViewPlans")}
              </Link>
              <Link href="/contact" className="rcn-btn-primary">
                {t(lang, "ctaGetConnected")}
              </Link>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--surface))]/60 text-[rgb(var(--text))] backdrop-blur lg:hidden"
              onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </Container>
      </div>

      {open && (
          <div
            className="rcn-enter fixed inset-0 z-50 lg:hidden"
            style={{ ["--enter-y" as string]: "0px", animationDuration: "0.2s" }}>
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />

            <aside
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 h-full w-[min(360px,92vw)] border-l border-[rgb(var(--primary))]/12 bg-[rgb(var(--bg))]/97 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--surface))]/60 text-[rgb(var(--text))]"
                  onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <div
                      key={item.href}
                      className="rcn-enter"
                      style={{
                        ["--enter-y" as string]: "6px",
                        ["--enter-delay" as string]: `${i * 0.03}s`,
                      }}>
                      <Link
                        href={item.href}
                        className={
                          "block rounded-2xl border px-4 py-3 text-sm font-semibold transition " +
                          "border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface))]/40 text-[rgb(var(--text))] " +
                          (active
                            ? "outline outline-[rgb(var(--primary))]/30"
                            : "hover:bg-[rgb(var(--surface-2))]/50")
                        }>
                        {t(lang, item.key)}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-2">
                <Link href="/plans" className="rcn-btn-secondary w-full">
                  {t(lang, "ctaViewPlans")}
                </Link>
                <Link href="/contact" className="rcn-btn-primary w-full">
                  {t(lang, "ctaGetConnected")}
                </Link>
              </div>
            </aside>
          </div>
        )}
    </header>
  );
}
