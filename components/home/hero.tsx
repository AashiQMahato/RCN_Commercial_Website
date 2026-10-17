import Link from "next/link";
import { ArrowRight, MapPin, Tag } from "lucide-react";

import { HeroVisual } from "@/components/hero/hero-visual";
import { StatsBand } from "@/components/home/stats-band";
import { business, formatNpr } from "@/data/business";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const { company, plans } = business;
  const fromPrice = Math.min(...plans.map((p) => p.monthlyPrice));
  const slowest = Math.min(...plans.map((p) => p.speedMbps));
  const fastest = Math.max(...plans.map((p) => p.speedMbps));

  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_45%_at_78%_38%,var(--signal-soft),transparent_70%)]"
      />

      <div className="container-x relative grid items-center gap-6 pt-10 pb-6 sm:pt-14 lg:min-h-[min(820px,calc(100svh-var(--header-h)-140px))] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-4 lg:py-12">
        <div className="relative z-10">
          <p className="eyebrow enter">
            {company.services} · Since {company.establishedYear}
          </p>

          <h1 id="hero-title" className="t-display mt-7">
            <span className="mask-line">
              <span style={d(40)}>Fast, reliable</span>
            </span>
            <span className="mask-line">
              <span style={d(110)}>fiber internet,</span>
            </span>
            <span className="mask-line">
              <span style={d(180)}>
                <em className="t-accent">right here</em>
              </span>
            </span>
            <span className="mask-line">
              <span style={d(250)}>in Madhesh.</span>
            </span>
          </h1>

          <p className="t-lead enter-rise mt-7 max-w-[34rem]" style={d(240)}>
            Unlimited fiber plans from {slowest} to {fastest} Mbps with free
            installation and local support around the clock — for{" "}
            {company.primaryServiceArea}.
          </p>

          <div className="enter mt-9 flex flex-wrap gap-3" style={d(320)}>
            <Link href="/contact" className="btn btn-primary">
              Get Connected <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/plans" className="btn btn-secondary">
              Explore plans
            </Link>
          </div>

          <ul
            className="enter mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fg-muted"
            style={d(400)}>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-signal" aria-hidden="true" />
              {company.location} · {company.district}
            </li>
            <li className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-signal" aria-hidden="true" />
              Plans from {formatNpr(fromPrice)}/month
            </li>
          </ul>
        </div>

        <div
          className="enter relative -mx-(--gutter) aspect-[16/11] sm:mx-0 lg:aspect-square lg:max-h-[640px]"
          style={d(120)}>
          <HeroVisual />
        </div>
      </div>

      <StatsBand />
    </section>
  );
}
