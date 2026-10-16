"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { FAQ_CATEGORIES } from "@/data/faq";


function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  id,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className={`rcn-enter rcn-card overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[rgb(var(--primary))/50] shadow-[0_0_24px_rgb(var(--primary)/0.12)]"
          : "rcn-card--hoverable"
      }`} style={{ ["--enter-delay" as string]: `${index * 0.05}s`, ["--enter-y" as string]: "16px", borderColor: isOpen ? "rgb(var(--primary) / 0.45)" : undefined, }}>
      <button
        type="button"
        id={`${id}-q`}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`${id}-a`}>
        <span
          className="font-(family-name:--font-heading) text-base font-semibold leading-snug"
          style={{ color: "rgb(var(--text))" }}>
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`mt-0.5 shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "rgb(var(--primary))" }}>
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      {/* Answer stays in the DOM (crawlable); height animates via grid rows. */}
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div
              className="border-t px-6 pb-5 pt-4 text-sm leading-relaxed"
              style={{
                borderColor: "rgb(var(--primary) / 0.15)",
                color: "rgb(var(--text-muted))",
              }}>
              <div
                className="mr-2 mt-0.5 inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: "rgb(var(--primary))" }}
              />
              {answer}
            </div>
          </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <SiteShell>
      <div className="rcn-container container-section">
        {/* Page header */}
        <div className="rcn-rise mb-14 text-center" style={{ ["--enter-y" as string]: "24px" }}>
          <span className="rcn-badge mb-4 inline-flex">
            <span
              className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
              style={{ background: "rgb(var(--primary))" }}
            />
            FAQ
          </span>
          <h1
            className="font-(family-name:--font-heading) text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "rgb(var(--text))" }}>
            Quick answers,{" "}
            <em style={{ color: "rgb(var(--primary))" }}>clear</em> decisions
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--text-soft))" }}>
            Everything you need to know before getting connected. Still have
            questions? We&apos;re here 24/7.
          </p>
        </div>

        {/* Category tabs */}
        <div className="rcn-enter mb-8 flex flex-wrap justify-center gap-3" style={{ ["--enter-delay" as string]: "0.15s", ["--enter-y" as string]: "16px" }}>
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="rcn-card rcn-card-sm inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  borderColor: isActive
                    ? "rgb(var(--primary) / 0.6)"
                    : undefined,
                  background: isActive
                    ? "rgb(var(--primary) / 0.12)"
                    : undefined,
                  color: isActive
                    ? "rgb(var(--primary))"
                    : "rgb(var(--text-muted))",
                  fontWeight: isActive ? 600 : 400,
                }}>
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Questions */}
          <div key={activeCategory} className="rcn-enter mx-auto max-w-3xl space-y-3" style={{ ["--enter-y" as string]: "0px" }}>
            <div className="mb-5 flex items-center gap-3">
              {(() => {
                const Icon = activeData.icon;
                return (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: `${activeData.color}22`,
                      color: activeData.color,
                    }}>
                    <Icon className="h-5 w-5" />
                  </span>
                );
              })()}
              <h2
                className="font-(family-name:--font-heading) text-xl font-semibold"
                style={{ color: "rgb(var(--text))" }}>
                {activeData.label}
              </h2>
              <span
                className="rcn-card rcn-card-sm ml-auto text-xs"
                style={{ color: "rgb(var(--text-soft))" }}>
                {activeData.questions.length} questions
              </span>
            </div>

            {activeData.questions.map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <AccordionItem
                  key={key}
                  id={`faq-${key}`}
                  question={item.q}
                  answer={item.a}
                  isOpen={!!openItems[key]}
                  onToggle={() => toggleItem(key)}
                  index={idx}
                />
              );
            })}
          </div>


        {/* CTA bottom */}
        <div className="rcn-enter rcn-card rcn-card-lg mx-auto mt-16 max-w-3xl text-center" style={{ ["--enter-delay" as string]: "0.5s", ["--enter-y" as string]: "20px", borderColor: "rgb(var(--primary) / 0.2)" }}>
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(var(--primary) / 0.12)" }}>
            <MessageCircle
              className="h-6 w-6"
              style={{ color: "rgb(var(--primary))" }}
            />
          </div>
          <h3
            className="font-(family-name:--font-heading) text-xl font-bold"
            style={{ color: "rgb(var(--text))" }}>
            Still have questions?
          </h3>
          <p
            className="mt-2 text-sm"
            style={{ color: "rgb(var(--text-soft))" }}>
            Our team is available 24/7 — call, WhatsApp, or email us anytime.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rcn-btn-primary">
              Contact Support <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+9779801663644" className="rcn-btn-secondary">
              +977 9801663644
            </a>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
