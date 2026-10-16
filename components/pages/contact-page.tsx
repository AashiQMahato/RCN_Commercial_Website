"use client";

import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Navigation,
  Headphones,
  Send,
} from "lucide-react";
import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { SiteShell } from "@/components/site/site-shell";
const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone & WhatsApp",
    value: "+977 9801663644",
    href: "tel:+9779801663644",
    color: "rgb(var(--primary))",
    bg: "rgb(var(--primary) / 0.1)",
    sublabel: "Call or WhatsApp anytime",
  },
  {
    icon: Mail,
    label: "Email",
    value: "raghunathpurcable2010@gmail.com",
    href: "mailto:raghunathpurcable2010@gmail.com",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    sublabel: "We reply within a few hours",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Sabaila-12, Raghunathpur, Nepal",
    href: "https://www.google.com/maps?q=Sabaila-12%2C%20Raghunathpur%2C%20Nepal",
    color: "#d4a853",
    bg: "rgba(212,168,83,0.1)",
    sublabel: "Walk in Mon–Sat, 9am–6pm",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24 / 7 — Always on",
    href: null,
    color: "#86efac",
    bg: "rgba(134,239,172,0.1)",
    sublabel: "Including public holidays",
  },
];

const QUICK_ACTIONS = [
  {
    icon: CheckCircle2,
    title: "Check availability",
    desc: "Confirm fiber coverage at your location",
    href: "/coverage",
    color: "rgb(var(--primary))",
  },
  {
    icon: MessageCircle,
    title: "Browse FAQ",
    desc: "Quick answers before you call",
    href: "/faq",
    color: "#06b6d4",
  },
  {
    icon: Navigation,
    title: "View plans",
    desc: "Compare speeds and pricing",
    href: "/plans",
    color: "#d4a853",
  },
];

export function ContactPage() {
  return (
    <SiteShell>
      {/* Page header */}
      <div className="rcn-container pt-16 pb-2 text-center">
        <div className="rcn-rise" style={{ ["--enter-y" as string]: "24px" }}>
          <span className="rcn-badge mb-4 inline-flex">
            <span
              className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
              style={{ background: "rgb(var(--primary))" }}
            />
            Contact
          </span>
          <h1
            className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "rgb(var(--text))" }}>
            Let&apos;s get you{" "}
            <em style={{ color: "rgb(var(--primary))" }}>connected</em>
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--text-soft))" }}>
            Share your location and we&apos;ll confirm coverage, recommend a plan,
            and schedule the fastest installation slot.
          </p>
        </div>
      </div>

      <section className="container-section">
        <Container>
          {/* Quick action pills */}
          <div className="rcn-enter mb-10 flex flex-wrap justify-center gap-3" style={{ ["--enter-delay" as string]: "0.15s", ["--enter-y" as string]: "16px" }}>
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <a
                  key={a.title}
                  href={a.href}
                  className="rcn-card rcn-card-sm rcn-card--hoverable inline-flex items-center gap-2.5 no-underline"
                  style={{ color: "rgb(var(--text-muted))" }}>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ background: `${a.color}18`, color: a.color }}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="text-left">
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "rgb(var(--text))" }}>
                      {a.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgb(var(--text-soft))" }}>
                      {a.desc}
                    </div>
                  </div>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: a.color }}
                  />
                </a>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            {/* Left — map + form */}
            <div className="flex flex-col gap-6">
              {/* Map */}
              <Reveal>
                <div
                  className="rcn-card rcn-card-md overflow-hidden p-0"
                  style={{ borderColor: "rgb(var(--primary) / 0.2)" }}>
                  {/* Map header */}
                  <div
                    className="flex items-center justify-between border-b px-5 py-4"
                    style={{ borderColor: "rgb(var(--primary) / 0.12)" }}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                          background: "rgb(var(--primary) / 0.12)",
                          color: "rgb(var(--primary))",
                        }}>
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div>
                        <div
                          className="font-[family-name:var(--font-heading)] text-sm font-semibold"
                          style={{ color: "rgb(var(--text))" }}>
                          Raghunathpur Cable Network
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "rgb(var(--text-soft))" }}>
                          Sabaila-12, Raghunathpur, Nepal
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps?q=Sabaila-12%2C%20Raghunathpur%2C%20Nepal"
                      target="_blank"
                      rel="noreferrer"
                      className="rcn-card rcn-card-sm inline-flex items-center gap-1.5 text-xs font-medium no-underline"
                      style={{ color: "rgb(var(--primary))" }}>
                      <Navigation className="h-3 w-3" />
                      Open Maps
                    </a>
                  </div>

                  {/* Iframe */}
                  <div className="relative overflow-hidden">
                    <iframe
                      title="Raghunathpur Cable Network on Google Maps"
                      className="h-72 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Raghunathpur%2C%20Cable%2C%20Network%2C%20Pvt.%2C%20Ltd.&output=embed"
                      style={{ border: 0, display: "block" }}
                    />
                    {/* Overlay tint to match dark theme */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 80%, rgb(var(--surface) / 0.3))",
                      }}
                    />
                  </div>

                  {/* Map footer tip */}
                  <div
                    className="flex items-center gap-2 border-t px-5 py-3 text-xs"
                    style={{
                      borderColor: "rgb(var(--primary) / 0.12)",
                      color: "rgb(var(--text-soft))",
                    }}>
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "rgb(var(--primary))" }}
                    />
                    Identify your nearest landmark on the map and share it when
                    you contact us.
                  </div>
                </div>
              </Reveal>

              {/* Contact form */}
              <Reveal delay={0.08}>
                <div
                  className="rcn-card rcn-card-lg"
                  style={{
                    borderColor: "rgb(var(--primary) / 0.25)",
                    background:
                      "linear-gradient(135deg, rgb(var(--surface) / 0.9), rgb(var(--surface-2) / 0.6))",
                  }}>
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "rgb(var(--primary) / 0.12)",
                        color: "rgb(var(--primary))",
                      }}>
                      <Send className="h-5 w-5" />
                    </span>
                    <div>
                      <h2
                        className="font-[family-name:var(--font-heading)] text-xl font-bold"
                        style={{ color: "rgb(var(--text))" }}>
                        Request a callback
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--text-soft))" }}>
                        We&apos;ll call you back within a few hours
                      </p>
                    </div>
                  </div>
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            {/* Right — contact details + support */}
            <div className="flex flex-col gap-5">
              {/* Contact items */}
              {CONTACT_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={0.1 + idx * 0.07}>
                    <div
                      className="rcn-card rcn-card-md rcn-card--hoverable flex items-start gap-4"
                      style={{ borderColor: `${item.color}25` }}>
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: item.bg, color: item.color }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className="mb-0.5 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: item.color }}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel="noreferrer"
                            className="block truncate font-[family-name:var(--font-heading)] text-sm font-semibold no-underline transition-colors duration-200"
                            style={{ color: "rgb(var(--text))" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = item.color)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "rgb(var(--text))")
                            }>
                            {item.value}
                          </a>
                        ) : (
                          <div
                            className="font-[family-name:var(--font-heading)] text-sm font-semibold"
                            style={{ color: "rgb(var(--text))" }}>
                            {item.value}
                          </div>
                        )}
                        <div
                          className="mt-0.5 text-xs"
                          style={{ color: "rgb(var(--text-soft))" }}>
                          {item.sublabel}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              {/* Support badge */}
              <Reveal delay={0.42}>
                <div
                  className="rcn-card rcn-card-md"
                  style={{
                    borderColor: "rgb(var(--primary) / 0.2)",
                    background:
                      "linear-gradient(135deg, rgb(var(--primary) / 0.08), rgb(var(--primary) / 0.03))",
                  }}>
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background: "rgb(var(--primary) / 0.15)",
                        color: "rgb(var(--primary))",
                      }}>
                      <Headphones className="h-4 w-4" />
                    </span>
                    <div
                      className="font-[family-name:var(--font-heading)] font-semibold"
                      style={{ color: "rgb(var(--text))" }}>
                      24/7 Support
                    </div>
                    <span
                      className="rcn-card rcn-card-sm ml-auto inline-flex items-center gap-1.5 text-xs"
                      style={{ color: "rgb(var(--primary))" }}>
                      <span
                        className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
                        style={{ background: "rgb(var(--primary))" }}
                      />
                      Live
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgb(var(--text-soft))" }}>
                    Our team is available round the clock — including weekends
                    and public holidays. For urgent issues, call directly for
                    fastest response.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href="tel:+9779801663644"
                      className="rcn-btn-primary w-full justify-center">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                    <a
                      href="mailto:raghunathpurcable2010@gmail.com"
                      className="rcn-btn-secondary w-full justify-center">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Pro tip */}
              <Reveal delay={0.5}>
                <div
                  className="rcn-card rcn-card-sm flex items-start gap-3"
                  style={{
                    borderColor: "rgba(212,168,83,0.25)",
                    background: "rgba(212,168,83,0.06)",
                  }}>
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "#d4a853" }}
                  />
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgb(var(--text-muted))" }}>
                    <span
                      className="font-semibold"
                      style={{ color: "#d4a853" }}>
                      Pro tip:
                    </span>{" "}
                    For fastest coverage confirmation, include your nearest
                    landmark, ward number, and preferred installation time when
                    you message us.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
