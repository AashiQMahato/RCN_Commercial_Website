"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, Cable, Globe2, Users, Zap } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";

const FiberRing3D = dynamic(
  () => import("./FiberRing3D").then((m) => m.FiberRing3D),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

const INTENT_EVENTS = ["pointermove", "scroll", "touchstart", "keydown"] as const;

/**
 * The WebGL scene is heavy (three.js) and purely decorative: only mount it on
 * large screens, once the visitor first interacts with the page, so it never
 * competes with the initial render.
 */
function useDesktopScene() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let armed = false;
    const reveal = () => {
      disarm();
      if (mq.matches) setShow(true);
    };
    const arm = () => {
      if (armed) return;
      armed = true;
      INTENT_EVENTS.forEach((e) =>
        window.addEventListener(e, reveal, { once: true, passive: true }),
      );
    };
    const disarm = () => {
      armed = false;
      INTENT_EVENTS.forEach((e) => window.removeEventListener(e, reveal));
    };
    const update = () => {
      if (mq.matches) arm();
      else {
        disarm();
        setShow(false);
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      disarm();
    };
  }, []);
  return show;
}

const HEADLINE_WORDS = [
  "We connect",
  "communities,",
  "one fiber",
  "at a time.",
];

export function HeroSection() {
  const showScene = useDesktopScene();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28">
      {/* Background canvases */}

      {/* Radial spotlight + grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[rgb(var(--primary))]/30 to-transparent" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[rgb(var(--cyan))]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--primary) / 0.25) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary) / 0.25) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="rcn-enter" style={{ ["--enter-y" as string]: "20px" }}>
            <GhostCard
              pill
              className="inline-flex items-center gap-2.5 px-4 py-2"
              noHover>
              <Cable className="h-3.5 w-3.5 text-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
                About Raghunathpur Cable Network
              </span>
            </GhostCard>
          </div>

          <div className="mt-4">
            <GhostCard
              pill
              className="inline-flex items-center gap-2 px-4 py-2"
              noHover>
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Serving Sabaila Muncipality Since 2010
              </span>
            </GhostCard>
          </div>

          {/* Headline */}
          <h1 className="mt-7">
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <span
                  className="rcn-rise block"
                  style={{
                    ["--enter-y" as string]: "40%",
                    ["--enter-delay" as string]: `${0.05 + wi * 0.08}s`,
                  }}>
                  <span
                    className={
                      wi === 0 || wi === 2
                        ? "text-5xl font-black tracking-tight text-[rgb(var(--text))] sm:text-6xl lg:text-7xl"
                        : "bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                    }>
                    {word}{" "}
                  </span>
                </span>
              </span>
            ))}
          </h1>

          <p
            className="rcn-rise mt-7 max-w-xl text-lg leading-8 text-[rgb(var(--text-muted))]"
            style={{ ["--enter-y" as string]: "20px", ["--enter-delay" as string]: "0.2s" }}>
            Since 2010, Raghunathpur Cable Network has been the backbone of
            digital connectivity across Raghunathpur and surrounding areas —
            delivering blazing-fast fiber internet with a community-first heart.
          </p>

          <div
            className="rcn-enter mt-10 flex flex-wrap gap-6"
            style={{ ["--enter-y" as string]: "20px", ["--enter-delay" as string]: "0.3s" }}>
            {[
              { icon: Users, label: "Customers", value: "10,000+" },
              { icon: Globe2, label: "Areas covered", value: "25+" },
              { icon: Zap, label: "Peak speed", value: "200 Mbps" },
            ].map((s) => (
              <GhostCard
                key={s.label}
                className="flex items-center gap-3 px-4 py-3"
                noHover>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12">
                  <s.icon className="h-4 w-4 text-[rgb(var(--primary))]" />
                </div>
                <div>
                  <div className="rcn-mono text-sm font-semibold text-[rgb(var(--text))]">
                    {s.value}
                  </div>
                  <div className="text-xs text-[rgb(var(--text-soft))]">
                    {s.label}
                  </div>
                </div>
              </GhostCard>
            ))}
          </div>

          <div
            className="rcn-enter mt-10 flex flex-wrap gap-3"
            style={{ ["--enter-y" as string]: "16px", ["--enter-delay" as string]: "0.4s" }}>
            <Link href="/plans" className="rcn-btn-secondary">
              Explore Plans
            </Link>
            <Link href="/contact" className="rcn-btn-primary">
              Get Connected
            </Link>
          </div>
        </div>

        {/* Right */}
        <div
          aria-hidden="true"
          className="rcn-enter relative hidden h-130 lg:block"
          style={{ ["--enter-delay" as string]: "0.3s" }}>
          <Card className="absolute inset-0 rounded-3xl" noHover>
            <div />
          </Card>
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            {showScene ? <FiberRing3D /> : null}
          </div>

          <div className="rcn-float absolute -right-4 top-12">
            <GhostCard className="flex items-center gap-2 px-4 py-3" noHover>
              <span className="rcn-pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Network: All Systems Operational
              </span>
            </GhostCard>
          </div>

          <div
            className="rcn-float absolute -left-4 bottom-20"
            style={{ animationDuration: "5s", animationDelay: "1.5s" }}>
            <GhostCard className="flex items-center gap-2 px-4 py-3" noHover>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12">
                <Zap className="h-4 w-4 text-[rgb(var(--primary))]" />
              </div>
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Fiber-grade backbone
              </span>
            </GhostCard>
          </div>
        </div>
      </Container>

      {/* Scroll indicator (mouse + arrow) */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-10 w-6 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--surface))]/35 backdrop-blur-xl">
            <div className="rcn-float absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[rgb(var(--text-soft))]" />
          </div>
          <ArrowDown className="h-5 w-5 text-[rgb(var(--text-soft))]" />
        </div>
      </div>
    </section>
  );
}
