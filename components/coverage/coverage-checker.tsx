"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Info, Mail, Phone } from "lucide-react";

import {
  business,
  mailtoUrl,
  whatsappUrl,
  type AreaStatus,
} from "@/data/business";

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | {
      kind: "sent";
      place: string;
      known: AreaStatus | "unlisted";
      link: string;
    };

/**
 * Coverage enquiry. RCN confirms availability manually (there is no
 * automated coverage API), so this validates the location, prepares a
 * WhatsApp message to the team and says clearly what happens next.
 */
export function CoverageChecker({ idPrefix = "coverage" }: { idPrefix?: string }) {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  const landmarkRef = React.useRef<HTMLInputElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const ids = {
    area: `${idPrefix}-area`,
    landmark: `${idPrefix}-landmark`,
    hint: `${idPrefix}-hint`,
    error: `${idPrefix}-error`,
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const areaId = String(data.get("area") ?? "");
    const landmark = String(data.get("landmark") ?? "").trim();

    if (landmark.length < 3) {
      setStatus({
        kind: "error",
        message:
          "Please enter your ward, tole or a nearby landmark (at least 3 characters).",
      });
      landmarkRef.current?.focus();
      return;
    }

    const match = business.serviceAreas.find((a) => a.id === areaId);
    const place = [landmark, match?.name].filter(Boolean).join(", ");
    const link = whatsappUrl(
      `Hello ${business.company.shortName}, please check fiber availability for: ${place}.`,
    );

    setStatus({ kind: "sent", place, known: match?.status ?? "unlisted", link });
    window.open(link, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const invalid = status.kind === "error";

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="grid gap-5">
        <div>
          <label htmlFor={ids.area} className="field-label">
            Area <span className="font-normal text-fg-subtle">(optional)</span>
          </label>
          <select id={ids.area} name="area" defaultValue="" className="input">
            <option value="">Select your area</option>
            {business.serviceAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
            <option value="other">Other / not listed</option>
          </select>
        </div>

        <div>
          <label htmlFor={ids.landmark} className="field-label">
            Ward, tole or nearest landmark
          </label>
          <input
            ref={landmarkRef}
            id={ids.landmark}
            name="landmark"
            required
            minLength={3}
            autoComplete="street-address"
            placeholder="e.g. Ward 12, near the school"
            aria-invalid={invalid}
            aria-describedby={invalid ? `${ids.error} ${ids.hint}` : ids.hint}
            className="input"
            onInput={() => {
              if (invalid) setStatus({ kind: "idle" });
            }}
          />
          {invalid ? (
            <p id={ids.error} className="field-error" role="alert">
              {status.message}
            </p>
          ) : null}
          <p id={ids.hint} className="field-hint">
            Our team confirms availability for your exact street and suggests
            the earliest installation slot.
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto sm:justify-self-start">
          Check availability <ArrowRight aria-hidden="true" />
        </button>
      </form>

      <div aria-live="polite">
        {status.kind === "sent" ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mt-6 rounded-[var(--radius-md)] border border-line bg-surface-2 p-5 outline-none">
            <p className="flex items-start gap-3 font-medium">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-signal"
                aria-hidden="true"
              />
              Request ready for “{status.place}”
            </p>
            <p className="mt-2 pl-8 text-sm leading-relaxed text-fg-muted">
              {status.known === "expanding"
                ? "We're expanding our network into this area. Send the WhatsApp message and our team will confirm whether your street is connected yet."
                : status.known === "unlisted"
                  ? "This area isn't on our published list yet. Send the WhatsApp message and our team will let you know what's possible."
                  : "We already serve parts of this area. Send the WhatsApp message and our team will confirm your street and the next installation slot."}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 pl-8 text-sm">
              <a
                href={status.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link">
                WhatsApp didn&apos;t open? Open it here
              </a>
              <a
                href={business.contact.phoneHref}
                className="link inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call{" "}
                {business.contact.phone}
              </a>
              <a
                href={mailtoUrl(
                  "Coverage check",
                  `Please check fiber availability for: ${status.place}`,
                )}
                className="link inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email us
                instead
              </a>
            </div>
          </div>
        ) : (
          <p className="mt-5 flex items-start gap-2 text-sm text-fg-subtle">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Opens WhatsApp with your location filled in — nothing is sent until
            you press send.
          </p>
        )}
      </div>
    </div>
  );
}
