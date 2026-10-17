import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import {
  business,
  formatNpr,
  yearlyMonthlyEquivalent,
  yearlySaving,
  yearlyTotal,
} from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * Plan comparison. The monthly/yearly switch is two native radio inputs and
 * the price swap is pure CSS (`.pricing:has(...)` in globals.css): no client
 * JavaScript, keyboard accessible, and both prices are in the HTML.
 */
export function PricingTable({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const { plans, pricing } = business;
  const PlanHeading = headingLevel;

  return (
    <div className="pricing">
      <fieldset className="flex flex-col items-center gap-3">
        <legend className="sr-only">Billing period</legend>
        <div className="billing-switch">
          <label>
            <input type="radio" name="billing" value="monthly" defaultChecked />
            Monthly
          </label>
          <label>
            <input type="radio" name="billing" value="yearly" />
            Yearly
            <span className="chip chip-signal min-h-5 px-1.5 text-[0.7rem]">
              −{pricing.yearlyDiscountPercent}%
            </span>
          </label>
        </div>
      </fieldset>

      <Reveal as="ul" className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const featured = Boolean(plan.highlight);
          return (
            <li
              key={plan.id}
              {...stagger(i)}
              className={cn(
                "card card-interactive relative flex flex-col p-7 sm:p-8",
                featured &&
                  "border-[color-mix(in_oklab,var(--signal)_55%,var(--line))] bg-surface-2 lg:-my-3 lg:py-11",
              )}>
              {featured ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--signal),transparent)]"
                />
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <PlanHeading className="t-h3">{plan.name}</PlanHeading>
                  <p className="mt-1 text-sm text-fg-muted">{plan.tagline}</p>
                </div>
                {"badge" in plan && plan.badge ? (
                  <span className="chip chip-signal">{plan.badge}</span>
                ) : null}
              </div>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-[3.25rem] leading-none font-semibold tracking-[-0.045em]">
                  {plan.speedMbps}
                </span>
                <span className="font-mono text-sm text-fg-muted">Mbps</span>
              </p>
              <p className="mt-2 font-mono text-xs tracking-wide text-fg-subtle">
                ↓ {plan.speedMbps} / ↑ {plan.uploadMbps} Mbps · {plan.devices}
              </p>

              <div className="mt-8 border-t border-line pt-6">
                <div className="price-monthly">
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold tracking-[-0.02em]">
                      {formatNpr(plan.monthlyPrice)}
                    </span>
                    <span className="text-sm text-fg-muted">/ month</span>
                  </p>
                  <p className="mt-1 text-sm text-fg-subtle">
                    Billed monthly · cancel anytime
                  </p>
                </div>
                <div className="price-yearly">
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold tracking-[-0.02em]">
                      {formatNpr(yearlyMonthlyEquivalent(plan))}
                    </span>
                    <span className="text-sm text-fg-muted">/ month</span>
                  </p>
                  <p className="mt-1 text-sm text-fg-subtle">
                    {formatNpr(yearlyTotal(plan))} billed yearly · save{" "}
                    {formatNpr(yearlySaving(plan))}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid gap-3 text-[0.95rem] text-fg-muted">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-signal"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?plan=${plan.id}`}
                className={cn(
                  "btn mt-9 w-full",
                  featured ? "btn-primary" : "btn-secondary",
                )}
                aria-label={`Choose ${plan.name} — ${plan.speedMbps} Mbps plan`}>
                Choose {plan.name} <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </Reveal>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-fg-subtle">
        Prices in Nepali rupees. All plans include unlimited data with no
        fair-usage limits and free installation and router for residential
        connections. Yearly billing saves {pricing.yearlyDiscountPercent}%
        compared with paying monthly. Complex commercial installations may
        carry a cabling fee, always quoted upfront.
      </p>
    </div>
  );
}
