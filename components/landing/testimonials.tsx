"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function initials(name: string) {
  const parts = name.replace(/\./g, "").split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({
  name,
  quote,
  source,
}: {
  name: string;
  quote: string;
  source?: string;
}) {
  return (
    <Card size="md" accentColor="rgb(var(--green-400) / 0.18)">
      <div className="flex items-center gap-3">
        <div className="rcn-mono flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/15 text-sm font-semibold text-[rgb(var(--text))]">
          {initials(name)}
        </div>
        <div>
          <div className="text-sm font-semibold text-[rgb(var(--text))]">
            {name}
          </div>
          {source ? (
            <div className="text-xs text-[rgb(var(--text-soft))]">{source}</div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 text-[rgb(var(--primary))]">★★★★★</div>

      <p className="mt-5 border-l-[3px] border-[rgb(var(--primary))] pl-4 text-[1.05rem] italic leading-7 text-[rgb(var(--text-muted))]">
        {quote}
      </p>
    </Card>
  );
}

export function Testimonials() {
  const { lang } = useLanguage();
  const total = business.testimonials.length;

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(3);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setVisibleCount(mq.matches ? 3 : 1);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    if (total <= 1) return;

    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % total);
    }, 4000);

    return () => window.clearInterval(id);
  }, [paused, total]);

  if (business.testimonials.length === 0) {
    // TODO: add real data to business.testimonials
    return null;
  }

  const visible = Array.from(
    { length: Math.min(visibleCount, total) },
    (_, i) => {
      const idx = (active + i) % total;
      return { item: business.testimonials[idx], idx };
    },
  );

  return (
    <section id="testimonials" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <MessageCircle className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionTestimonials")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionTestimonials")}
            </h2>
          </div>
        </Reveal>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(({ item, idx }, slot) => (
                <div
                  key={`${idx}-${slot}`}
                  className="rcn-enter"
                  style={{ ["--enter-y" as string]: "12px", animationDuration: "0.35s" }}>
                  <TestimonialCard
                    name={item.name}
                    quote={item.quote}
                    source={item.source}
                  />
                </div>
              ))}
          </div>

          <div className="mt-7 flex justify-center gap-2">
            {business.testimonials.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={
                    "h-2 w-2 rounded-full transition " +
                    (isActive
                      ? "bg-[rgb(var(--primary))]"
                      : "bg-[rgb(var(--primary))]/25 hover:bg-[rgb(var(--primary))]/45")
                  }
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
