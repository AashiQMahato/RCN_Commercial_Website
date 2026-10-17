"use client";

import * as React from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";

import { business, mailtoUrl, whatsappUrl } from "@/data/business";

type Errors = Partial<Record<"name" | "contact", string>>;
type Channel = "email" | "whatsapp";

const PLAN_OPTIONS = [
  ...business.plans.map((p) => ({
    id: p.id,
    label: `${p.name} — ${p.speedMbps} Mbps`,
  })),
  { id: "business", label: "Business / custom plan" },
  { id: "cable-tv", label: "Cable TV" },
  { id: "unsure", label: "Not sure yet — please advise" },
];

/**
 * Enquiry form. There is no server endpoint, so the enquiry is handed to the
 * visitor's email app or WhatsApp with every field pre-filled. Both channels
 * reach the same RCN team.
 */
export function ContactForm() {
  const [errors, setErrors] = React.useState<Errors>({});
  const [sent, setSent] = React.useState<{ channel: Channel; link: string } | null>(null);
  const [plan, setPlan] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  // Pre-select a plan chosen on the pricing cards (/contact?plan=standard).
  React.useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("plan");
    if (wanted && PLAN_OPTIONS.some((o) => o.id === wanted)) setPlan(wanted);
  }, []);

  const submit = (channel: Channel) => {
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const area = get("area");
    const message = get("message");

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!phone && !email)
      next.contact = "Add a phone number or email so we can reply.";
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.contact = "That email address doesn't look right.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(next.name ? "#cf-name" : "#cf-phone")?.focus();
      return;
    }

    const planLabel = PLAN_OPTIONS.find((o) => o.id === plan)?.label;
    const lines = [
      `Name: ${name}`,
      phone && `Phone: ${phone}`,
      email && `Email: ${email}`,
      area && `Area / landmark: ${area}`,
      planLabel && `Interested in: ${planLabel}`,
      message && `\n${message}`,
    ].filter(Boolean);

    const link =
      channel === "email"
        ? mailtoUrl(`${business.company.shortName} enquiry from ${name}`, lines.join("\n"))
        : whatsappUrl(`Hello ${business.company.shortName},\n${lines.join("\n")}`);

    if (channel === "email") window.location.href = link;
    else window.open(link, "_blank", "noopener,noreferrer");
    setSent({ channel, link });
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit("email");
      }}
      className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="field-label">
            Full name
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className="input"
          />
          {errors.name ? (
            <p id="cf-name-error" className="field-error">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXXXXXXX"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby="cf-contact-hint"
            className="input"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="field-label">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby="cf-contact-hint"
            className="input"
          />
        </div>
        <div>
          <label htmlFor="cf-area" className="field-label">
            Ward, tole or landmark
          </label>
          <input
            id="cf-area"
            name="area"
            autoComplete="street-address"
            className="input"
          />
        </div>
      </div>
      <p
        id="cf-contact-hint"
        className={errors.contact ? "field-error -mt-2" : "field-hint -mt-2"}>
        {errors.contact ?? "Phone or email — whichever you prefer we use to reply."}
      </p>

      <div>
        <label htmlFor="cf-plan" className="field-label">
          Interested in
        </label>
        <select
          id="cf-plan"
          name="plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="input">
          <option value="">Choose an option</option>
          {PLAN_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="field-label">
          Message <span className="font-normal text-fg-subtle">(optional)</span>
        </label>
        <textarea id="cf-message" name="message" rows={4} className="input" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-primary">
          <Mail aria-hidden="true" /> Send by email
        </button>
        <button
          type="button"
          onClick={() => submit("whatsapp")}
          className="btn btn-secondary">
          <MessageCircle aria-hidden="true" /> Send on WhatsApp
        </button>
      </div>

      <div aria-live="polite">
        {sent ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-5 text-sm outline-none">
            <p className="flex items-start gap-3 font-medium text-fg">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
              {sent.channel === "email"
                ? "Your email is ready in your mail app — just press send."
                : "Your message is ready in WhatsApp — just press send."}
            </p>
            <p className="mt-2 pl-8 text-fg-muted">
              Didn&apos;t open?{" "}
              <a href={sent.link} className="link" target={sent.channel === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer">
                Try again
              </a>{" "}
              or contact us directly at{" "}
              <a href={`mailto:${business.contact.email}`} className="link break-all">
                {business.contact.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
