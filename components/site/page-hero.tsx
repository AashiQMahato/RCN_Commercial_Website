import type { ReactNode } from "react";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Shared header for secondary pages: eyebrow, masked headline, lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-clip border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_70%_at_85%_0%,var(--signal-soft),transparent_70%)]"
      />
      <div className="container-x relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="eyebrow enter">{eyebrow}</p>
        <h1 className="t-h1 mt-6 max-w-4xl">
          <span className="mask-line">
            <span style={d(60)}>{title}</span>
          </span>
        </h1>
        {lead ? (
          <p className="t-lead enter-rise mt-6 max-w-2xl" style={d(160)}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="enter mt-9" style={d(240)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
