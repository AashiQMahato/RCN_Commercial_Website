import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { FaqList } from "@/components/home/faq-list";
import { FinalCta } from "@/components/home/final-cta";
import { PricingTable } from "@/components/home/pricing-table";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  business,
  formatNpr,
  yearlyMonthlyEquivalent,
} from "@/data/business";
import { BENEFITS } from "@/data/content";
import { FAQ_CATEGORIES } from "@/data/faq";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fiber Internet Plans & Pricing",
  description:
    "Compare RCN fiber internet plans: Basic 50 Mbps (NPR 499), Standard 100 Mbps (NPR 699) and Premium 200 Mbps (NPR 999) per month. Unlimited data, free installation, 15% off yearly.",
  path: "/plans",
});

const supportLevel = (features: readonly string[]) =>
  features.find((f) => /support/i.test(f)) ?? "24/7 support";

export default function PlansPage() {
  const { plans } = business;
  const included = BENEFITS.filter((b) =>
    ["infinity", "install", "support", "pricing"].includes(b.icon),
  );
  const billingFaqs =
    FAQ_CATEGORIES.find((c) => c.id === "plans-billing")?.questions ?? [];

  const rows: { label: string; values: string[] }[] = [
    { label: "Download speed", values: plans.map((p) => `${p.speedMbps} Mbps`) },
    { label: "Upload speed", values: plans.map((p) => `${p.uploadMbps} Mbps`) },
    { label: "Recommended for", values: plans.map((p) => p.devices) },
    {
      label: "Monthly price",
      values: plans.map((p) => `${formatNpr(p.monthlyPrice)} / mo`),
    },
    {
      label: "Paying yearly",
      values: plans.map((p) => `${formatNpr(yearlyMonthlyEquivalent(p))} / mo`),
    },
    { label: "Data", values: plans.map(() => "Unlimited, no FUP") },
    { label: "Installation & router", values: plans.map(() => "Free") },
    { label: "Support", values: plans.map((p) => supportLevel(p.features)) },
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Plans & pricing"
        title={
          <>
            Pricing that&apos;s <em className="t-accent">simple.</em>
          </>
        }
        lead="Choose the speed that fits your home or business. Unlimited data, free installation and no lock-in on every plan."
      />

      <section aria-label="Plans" className="section">
        <div className="container-x">
          <PricingTable headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="included-title" className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="included-title"
              eyebrow="Included"
              title="Every plan comes with"
            />
          </Reveal>
          <Reveal
            as="ul"
            className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {included.map((b, i) => (
              <li key={b.title} {...stagger(i)} className="bg-bg p-7">
                <span className="icon-tile">
                  <Icon name={b.icon} />
                </span>
                <h3 className="t-h3 mt-6">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">
                  {b.body}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="compare-title"
              eyebrow="Compare"
              title="Side by side"
            />
          </Reveal>
          <Reveal className="mt-10 overflow-x-auto rounded-[var(--radius-lg)] border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Comparison of RCN internet plans</caption>
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="w-1/4 p-5 font-medium text-fg-subtle">
                    Plan
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className="p-5 text-lg font-semibold">
                      {p.name}
                      {p.highlight ? (
                        <span className="chip chip-signal ml-3 align-middle">
                          {p.badge}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="p-5 font-medium text-fg-muted">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-5">
                        {v === "Free" || v.startsWith("Unlimited") ? (
                          <span className="inline-flex items-center gap-2">
                            <Check className="h-4 w-4 text-signal" aria-hidden="true" />
                            {v}
                          </span>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="business-title" className="section">
        <div className="container-x">
          <Reveal className="grid gap-8 rounded-[var(--radius-xl)] border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Business & custom</p>
              <h2 id="business-title" className="t-h2 mt-5">
                Need a plan for your business?
              </h2>
              <p className="t-lead mt-5 max-w-xl">
                Dedicated fiber, static IP and cable TV bundles for offices,
                shops and organisations — tailored to how you work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact?plan=business" className="btn btn-primary">
                Talk to our team <ArrowRight aria-hidden="true" />
              </Link>
              <a href={business.contact.phoneHref} className="btn btn-secondary">
                {business.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="plan-faq-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="plan-faq-title"
              eyebrow="Billing"
              title="Plans & billing questions"
            />
            <Link href="/faq" className="btn btn-ghost mt-6 -ml-1">
              All FAQs <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={billingFaqs} />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
