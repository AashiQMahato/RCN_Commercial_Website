"use client";

import { SiteShell } from "@/components/site/site-shell";
import {
  MapPin,
  Router,
  ShieldCheck,
  Wifi,
  Clock,
  CheckCircle2,
  ArrowRight,
  Signal,
  Building2,
  Home,
  Zap,
  Globe,
  PhoneCall,
} from "lucide-react";

const COVERAGE_BLOCKS = [
  {
    title: "Primary Service Area",
    description:
      "Reliable last-mile fiber connectivity in and around Sabaila-12, Raghunathpur. Coverage varies by lane and ward — contact us to verify your address.",
    icon: MapPin,
    color: "rgb(var(--primary))",
  },
  {
    title: "Fast Installation",
    description:
      "Confirmed connections are installed within 1–3 business days. Our technicians complete setup with clean cabling and full router configuration.",
    icon: Router,
    color: "#06b6d4",
  },
  {
    title: "Stable Fiber Network",
    description:
      "99.9% uptime SLA backed by proactive 24/7 monitoring. Ideal for HD/4K streaming, gaming, video calls, and work-from-home.",
    icon: ShieldCheck,
    color: "#d4a853",
  },
  {
    title: "Flexible Speed Tiers",
    description:
      "Plans from 50 Mbps to 200 Mbps — all with unlimited data. Upgrade anytime as your usage grows, with no lock-in period.",
    icon: Wifi,
    color: "#86efac",
  },
];

const AREAS = [
  { name: "Sabaila-12 (HQ)", type: "primary", icon: Building2 },
  { name: "Raghunathpur", type: "primary", icon: Home },
  { name: "Gaur", type: "active", icon: Home },
  { name: "Chandrapur", type: "active", icon: Home },
  { name: "Laxmipur", type: "active", icon: Home },
  { name: "Pheta", type: "active", icon: Home },
  { name: "Dewahi Gonahi", type: "active", icon: Home },
  { name: "Mirchaiya Area", type: "active", icon: Home },
  { name: "Rajbiraj Corridor", type: "expanding", icon: Zap },
  { name: "Dhangadhimai", type: "expanding", icon: Zap },
];

const STATS = [
  { value: "25+", label: "Areas covered", icon: Globe },
  { value: "99.9%", label: "Network uptime", icon: Signal },
  { value: "1–3", label: "Days to install", icon: Clock },
  { value: "10K+", label: "Happy customers", icon: CheckCircle2 },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Share your location",
    desc: "Call, WhatsApp, or message us your ward, tole, or nearest landmark.",
    icon: PhoneCall,
  },
  {
    step: "02",
    title: "We confirm coverage",
    desc: "Our team verifies fiber availability at your address and recommends the best plan.",
    icon: MapPin,
  },
  {
    step: "03",
    title: "Schedule installation",
    desc: "Pick a convenient time. Our technicians arrive on time and complete clean setup.",
    icon: Router,
  },
  {
    step: "04",
    title: "Go live",
    desc: "Your fiber connection is active. Enjoy unlimited high-speed internet from day one.",
    icon: Zap,
  },
];

export function CoveragePage() {
  return (
    <SiteShell>
    
      <div className="rcn-container container-section">

        {/* Header */}
        <div className="rcn-rise mb-14 text-center" style={{ ["--enter-y" as string]: "24px" }}>
          <span className="rcn-badge mb-4 inline-flex">
            <span
              className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
              style={{ background: "rgb(var(--primary))" }}
            />
            Coverage
          </span>
          <h1
            className="font-(family-name:--font-heading) text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "rgb(var(--text))" }}>
            Service areas &{" "}
            <em style={{ color: "rgb(var(--primary))" }}>availability</em>
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--text-soft))" }}>
            Share your ward or landmark and we&apos;ll confirm coverage and the
            fastest available install slot.
          </p>
        </div>

        {/* Stats bar */}
        <div className="rcn-enter rcn-card rcn-card-md mb-12 grid grid-cols-2 gap-6 lg:grid-cols-4" style={{ ["--enter-delay" as string]: "0.15s", ["--enter-y" as string]: "16px", borderColor: "rgb(var(--primary) / 0.2)" }}>
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 text-center">
                <Icon
                  className="mb-1 h-5 w-5"
                  style={{ color: "rgb(var(--primary))" }}
                />
                <span
                  className="rcn-mono text-2xl font-semibold"
                  style={{ color: "rgb(var(--primary))" }}>
                  {s.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgb(var(--text-soft))" }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Coverage blocks */}
        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COVERAGE_BLOCKS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rcn-enter rcn-card rcn-card-md rcn-card--hoverable group h-full" style={{ ["--enter-delay" as string]: `${0.2 + idx * 0.07}s`, ["--enter-y" as string]: "24px", borderColor: `${b.color.includes("var") ? "rgb(var(--primary))" : b.color}33`, }}>
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${b.color.includes("var") ? "#10b981" : b.color}22`,
                    color: b.color.includes("var")
                      ? "rgb(var(--primary))"
                      : b.color,
                  }}>
                  <Icon className="h-6 w-6" />
                </div>
                <div
                  className="font-(family-name:--font-heading) mb-2 text-base font-bold"
                  style={{ color: "rgb(var(--text))" }}>
                  {b.title}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgb(var(--text-soft))" }}>
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-col: areas + how it works */}
        <div className="mb-14 grid gap-8 lg:grid-cols-2">
          {/* Covered areas */}
          <div className="rcn-enter rcn-card rcn-card-lg" style={{ ["--enter-delay" as string]: "0.35s", ["--enter-y" as string]: "0px", borderColor: "rgb(var(--primary) / 0.2)" }}>
            <h2
              className="font-(family-name:--font-heading) mb-1 text-xl font-bold"
              style={{ color: "rgb(var(--text))" }}>
              Covered locations
            </h2>
            <p
              className="mb-5 text-sm"
              style={{ color: "rgb(var(--text-soft))" }}>
              25+ wards and villages currently served
            </p>
            <div className="space-y-2">
              {AREAS.map((area, idx) => {
                const Icon = area.icon;
                const isExpanding = area.type === "expanding";
                const isPrimary = area.type === "primary";
                return (
                  <div key={area.name} className="rcn-enter flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200" style={{ ["--enter-delay" as string]: `${0.4 + idx * 0.04}s`, ["--enter-y" as string]: "0px", background: isPrimary
                        ? "rgb(var(--primary) / 0.08)"
                        : "rgb(var(--surface-2) / 0.5)",
                      border: `1px solid ${isPrimary ? "rgb(var(--primary) / 0.2)" : "transparent"}`, }}>
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{
                        color: isPrimary
                          ? "rgb(var(--primary))"
                          : isExpanding
                            ? "#d4a853"
                            : "rgb(var(--text-soft))",
                      }}
                    />
                    <span
                      className="flex-1 text-sm font-medium"
                      style={{ color: "rgb(var(--text-muted))" }}>
                      {area.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{
                        background: isPrimary
                          ? "rgb(var(--primary) / 0.15)"
                          : isExpanding
                            ? "rgba(212,168,83,0.15)"
                            : "rgb(var(--primary) / 0.08)",
                        color: isPrimary
                          ? "rgb(var(--primary))"
                          : isExpanding
                            ? "#d4a853"
                            : "rgb(var(--text-soft))",
                      }}>
                      {isPrimary ? "HQ" : isExpanding ? "Soon" : "Active"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How it works */}
          <div className="rcn-enter rcn-card rcn-card-lg" style={{ ["--enter-delay" as string]: "0.4s", ["--enter-y" as string]: "0px", borderColor: "rgb(var(--primary) / 0.2)" }}>
            <h2
              className="font-(family-name:--font-heading) mb-1 text-xl font-bold"
              style={{ color: "rgb(var(--text))" }}>
              How to get connected
            </h2>
            <p
              className="mb-6 text-sm"
              style={{ color: "rgb(var(--text-soft))" }}>
              From inquiry to live internet in 4 simple steps
            </p>
            <div className="space-y-5">
              {HOW_IT_WORKS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="rcn-enter flex items-start gap-4" style={{ ["--enter-delay" as string]: `${0.45 + idx * 0.08}s`, ["--enter-y" as string]: "12px" }}>
                    <div className="flex shrink-0 flex-col items-center">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: "rgb(var(--primary) / 0.12)" }}>
                        <Icon
                          className="h-4 w-4"
                          style={{ color: "rgb(var(--primary))" }}
                        />
                      </div>
                      {idx < HOW_IT_WORKS.length - 1 && (
                        <div
                          className="mt-2 h-6 w-px"
                          style={{ background: "rgb(var(--primary) / 0.2)" }}
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="rcn-mono text-xs font-medium"
                          style={{ color: "rgb(var(--primary) / 0.6)" }}>
                          {step.step}
                        </span>
                        <span
                          className="font-(family-name:--font-heading) font-semibold"
                          style={{ color: "rgb(var(--text))" }}>
                          {step.title}
                        </span>
                      </div>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "rgb(var(--text-soft))" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA card */}
        <div className="rcn-enter rcn-card rcn-card-lg text-center" style={{ ["--enter-delay" as string]: "0.6s", ["--enter-y" as string]: "20px", borderColor: "rgb(var(--primary) / 0.25)" }}>
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(var(--primary) / 0.12)" }}>
            <MapPin
              className="h-6 w-6"
              style={{ color: "rgb(var(--primary))" }}
            />
          </div>
          <h3
            className="font-(family-name:--font-heading) text-xl font-bold"
            style={{ color: "rgb(var(--text))" }}>
            Not sure if we cover your area?
          </h3>
          <p
            className="mx-auto mt-2 max-w-sm text-sm"
            style={{ color: "rgb(var(--text-soft))" }}>
            Send us your ward/tole/landmark and preferred timing — we&apos;ll confirm
            availability and recommend the best plan.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="rcn-btn-primary">
              Check availability <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+9779801663644" className="rcn-btn-secondary">
              <PhoneCall className="h-4 w-4" /> Call us now
            </a>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
