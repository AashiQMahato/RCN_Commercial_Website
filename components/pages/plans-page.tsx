"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import {
  Check,
  Star,
  Zap,
  Wifi,
  Shield,
  HeadphonesIcon,
  Infinity,
  Monitor,
  Briefcase,
  ArrowRight,
  Sparkles,
  Clock,
  Download,
  Upload,
  Users,
  Tv,
} from "lucide-react";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Perfect for everyday browsing",
    speed: "50",
    price: { monthly: 499, yearly: 424 },
    color: "rgb(var(--primary))",
    glowColor: "rgb(var(--primary) / 0.15)",
    borderColor: "rgb(var(--primary) / 0.22)",
    icon: Wifi,
    badge: null,
    devices: "3–5 devices",
    features: [
      { text: "50 Mbps download speed", icon: Download },
      { text: "25 Mbps upload speed", icon: Upload },
      { text: "Unlimited data, no FUP", icon: Infinity },
      { text: "HD streaming on all devices", icon: Monitor },
      { text: "Free router & installation", icon: Zap },
      { text: "Standard 24/7 support", icon: HeadphonesIcon },
      { text: "Static IP available (add-on)", icon: Shield },
    ],
    cta: "Get Basic",
    ctaClass: "rcn-btn-secondary",
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Most popular for homes & WFH",
    speed: "100",
    price: { monthly: 699, yearly: 594 },
    color: "#d4a853",
    glowColor: "rgba(212,168,83,0.18)",
    borderColor: "#d4a853",
    icon: Star,
    badge: "Most Popular",
    devices: "6–10 devices",
    features: [
      { text: "100 Mbps download speed", icon: Download },
      { text: "50 Mbps upload speed", icon: Upload },
      { text: "Unlimited data, no FUP", icon: Infinity },
      { text: "4K streaming & gaming ready", icon: Monitor },
      { text: "Free router & installation", icon: Zap },
      { text: "Priority 24/7 support", icon: HeadphonesIcon },
      { text: "Enhanced Wi-Fi coverage", icon: Wifi },
      { text: "Cable TV bundle available", icon: Tv },
    ],
    cta: "Get Standard",
    ctaClass: "rcn-btn-primary",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For power users & home offices",
    speed: "200",
    price: { monthly: 999, yearly: 849 },
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.15)",
    borderColor: "#06b6d4",
    icon: Sparkles,
    badge: "Best Value",
    devices: "10+ devices",
    features: [
      { text: "200 Mbps download speed", icon: Download },
      { text: "100 Mbps upload speed", icon: Upload },
      { text: "Unlimited data, no FUP", icon: Infinity },
      { text: "8K / multi-screen streaming", icon: Monitor },
      { text: "Free router & installation", icon: Zap },
      { text: "Dedicated priority support", icon: HeadphonesIcon },
      { text: "Work-from-home optimized", icon: Briefcase },
      { text: "Static IP included", icon: Shield },
      { text: "Cable TV bundle included", icon: Tv },
      { text: "Multi-device management", icon: Users },
    ],
    cta: "Get Premium",
    ctaClass: "rcn-btn-cyan",
  },
];

const WHY_RCN = [
  {
    icon: Zap,
    title: "Fiber-grade speed",
    desc: "Direct fiber connection to your home — no coax degradation.",
  },
  {
    icon: Infinity,
    title: "Truly unlimited",
    desc: "No data caps, no FUP throttling — ever.",
  },
  {
    icon: Clock,
    title: "Fast installation",
    desc: "Setup within 1–3 business days after confirmation.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 support",
    desc: "Real people available round the clock, including holidays.",
  },
];

export function PlansPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <SiteShell>
      <div className="rcn-container container-section">
        {/* Header */}
        <div className="rcn-rise mb-12 text-center" style={{ ["--enter-y" as string]: "24px" }}>
          <span className="rcn-badge mb-4 inline-flex">
            <span
              className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
              style={{ background: "rgb(var(--primary))" }}
            />
            Plans
          </span>
          <h1
            className="font-(family-name:--font-heading) text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "rgb(var(--text))" }}>
            Pricing that&apos;s{" "}
            <em style={{ color: "rgb(var(--primary))" }}>simple</em>
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--text-soft))" }}>
            Choose a plan that fits your home or business. No hidden fees.
            Upgrade or cancel anytime.
          </p>

          {/* Billing toggle */}
          <div
            className="mt-8 inline-flex items-center gap-1 rounded-xl p-1"
            style={{
              background: "rgb(var(--surface))",
              border: "1px solid rgb(var(--primary) / 0.2)",
            }}>
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background:
                    billing === b ? "rgb(var(--primary))" : "transparent",
                  color:
                    billing === b ? "rgb(var(--bg))" : "rgb(var(--text-muted))",
                }}>
                {b === "yearly" ? "Yearly" : "Monthly"}
                {b === "yearly" && (
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{
                      background:
                        billing === "yearly"
                          ? "rgba(0,0,0,0.2)"
                          : "rgba(212,168,83,0.2)",
                      color:
                        billing === "yearly" ? "rgb(var(--bg))" : "#d4a853",
                    }}>
                    −15%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            const price =
              billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            const isFeatured = plan.id === "standard";

            return (
              <div key={plan.id} className={`rcn-enter rcn-card rcn-card-lg flex flex-col ${isFeatured ? "rcn-plan-featured" : "rcn-card--hoverable"}`} style={{ ["--enter-delay" as string]: `${idx * 0.1}s`, ["--enter-y" as string]: "32px", borderColor: plan.borderColor,
                  boxShadow: isFeatured
                    ? `inset 0 1px 0 rgba(212,168,83,0.2), 0 0 40px rgba(212,168,83,0.18), 0 8px 32px rgb(0 0 0 / 0.6)`
                    : `0 0 32px ${plan.glowColor}, 0 4px 12px rgb(0 0 0 / 0.4)`,
                  position: "relative",
                  overflow: "hidden", }}>
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: isFeatured
                        ? "rgba(212,168,83,0.2)"
                        : "rgba(6,182,212,0.15)",
                      color: isFeatured ? "#f0c060" : "#06b6d4",
                      border: `1px solid ${isFeatured ? "rgba(212,168,83,0.4)" : "rgba(6,182,212,0.4)"}`,
                    }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan icon + name */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${plan.color.replace("rgb(var(--primary))", "#10b981")}22`,
                      color: plan.color.includes("var")
                        ? "rgb(var(--primary))"
                        : plan.color,
                    }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div
                      className="font-(family-name:--font-heading) text-lg font-bold"
                      style={{ color: "rgb(var(--text))" }}>
                      {plan.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgb(var(--text-soft))" }}>
                      {plan.tagline}
                    </div>
                  </div>
                </div>

                {/* Speed pill */}
                <div
                  className="rcn-card rcn-card-sm mb-5 inline-flex w-fit items-center gap-2"
                  style={{
                    borderColor: `${plan.color.includes("var") ? "rgb(var(--primary) / 0.3)" : plan.color}44`,
                  }}>
                  <Zap
                    className="h-3.5 w-3.5"
                    style={{
                      color: plan.color.includes("var")
                        ? "rgb(var(--primary))"
                        : plan.color,
                    }}
                  />
                  <span
                    className="rcn-mono text-sm font-medium"
                    style={{
                      color: plan.color.includes("var")
                        ? "rgb(var(--primary))"
                        : plan.color,
                    }}>
                    {plan.speed} Mbps
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "rgb(var(--text-soft))" }}>
                    · {plan.devices}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span
                      className="rcn-mono text-4xl font-semibold"
                      style={{ color: "rgb(var(--text))" }}>
                      NPR {price.toLocaleString()}
                    </span>
                    <span
                      className="mb-1 text-sm"
                      style={{ color: "rgb(var(--text-soft))" }}>
                      /mo
                    </span>
                  </div>
                  {billing === "yearly" && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "rgb(var(--primary))" }}>
                      You save NPR{" "}
                      {(
                        (plan.price.monthly - plan.price.yearly) *
                        12
                      ).toLocaleString()}{" "}
                      per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => {
                    return (
                      <li
                        key={f.text}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: "rgb(var(--text-muted))" }}>
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: "rgb(var(--primary) / 0.15)" }}>
                          <Check
                            className="h-3 w-3"
                            style={{ color: "rgb(var(--primary))" }}
                          />
                        </span>
                        {f.text}
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`${plan.ctaClass} w-full justify-center`}>
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="rcn-enter mt-16" style={{ ["--enter-delay" as string]: "0.5s", ["--enter-y" as string]: "24px" }}>
          <h2
            className="font-(family-name:--font-heading) mb-6 text-center text-2xl font-bold"
            style={{ color: "rgb(var(--text))" }}>
            Why choose RCN?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_RCN.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rcn-enter rcn-card rcn-card-md rcn-card--hoverable text-center" style={{ ["--enter-delay" as string]: `${0.55 + idx * 0.08}s`, ["--enter-y" as string]: "20px" }}>
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgb(var(--primary) / 0.12)" }}>
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "rgb(var(--primary))" }}
                    />
                  </div>
                  <div
                    className="font-(family-name:--font-heading) font-semibold"
                    style={{ color: "rgb(var(--text))" }}>
                    {w.title}
                  </div>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "rgb(var(--text-soft))" }}>
                    {w.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rcn-enter rcn-card rcn-card-lg mt-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left" style={{ ["--enter-delay" as string]: "0.7s", ["--enter-y" as string]: "20px", borderColor: "rgb(var(--primary) / 0.2)" }}>
          <div>
            <div
              className="font-(family-name:--font-heading) text-xl font-bold"
              style={{ color: "rgb(var(--text))" }}>
              Need a business or custom plan?
            </div>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgb(var(--text-soft))" }}>
              Dedicated fiber, static IP, SLA guarantees, and cable TV bundles
              for your organisation.
            </p>
          </div>
          <Link href="/contact" className="rcn-btn-primary shrink-0">
            Talk to sales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
