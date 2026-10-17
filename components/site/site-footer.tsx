import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { NAV_ITEMS } from "@/components/site/nav";
import { business, formatNpr } from "@/data/business";

export function SiteFooter() {
  const { contact, company, plans } = business;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-10">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-muted">
            {company.services} for {company.primaryServiceArea}. Serving{" "}
            {company.province} since {company.establishedYear}.
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2
            id="footer-explore"
            className="font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">
            Explore
          </h2>
          <ul className="mt-5 grid gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">
            Plans
          </h2>
          <ul className="mt-5 grid gap-1">
            {plans.map((plan) => (
              <li key={plan.id}>
                <Link
                  href="/plans"
                  className="inline-flex min-h-9 items-center gap-2 text-fg-muted transition-colors hover:text-fg">
                  {plan.name}
                  <span className="font-mono text-xs text-fg-subtle">
                    {plan.speedMbps} Mbps · {formatNpr(plan.monthlyPrice)}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/coverage"
                className="inline-flex min-h-9 items-center text-fg-muted transition-colors hover:text-fg">
                Check coverage
              </Link>
            </li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">
            Contact
          </h2>
          <ul className="mt-5 grid gap-3 text-fg-muted">
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-9 items-center gap-3 transition-colors hover:text-fg">
                <Phone className="h-4 w-4 text-signal" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-9 items-center gap-3 break-all transition-colors hover:text-fg">
                <Mail className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-start gap-3 transition-colors hover:text-fg">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                <span>
                  {contact.address}
                  <span className="sr-only"> (opens Google Maps)</span>
                </span>
              </a>
            </li>
            <li className="pl-7 text-sm text-fg-subtle">
              {contact.officeHours}
              <br />
              {contact.supportHours}
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>
            {company.location}, {company.district}, {company.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
