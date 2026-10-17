import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { Icon } from "@/components/ui/icons";
import { BENEFITS } from "@/data/content";

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <p className="eyebrow mb-5">Why RCN</p>
          <h2 id="benefits-title" className="t-h2">
            Everything a home connection{" "}
            <em className="t-accent">should</em> be.
          </h2>
          <p className="t-lead mt-5 max-w-md">
            Fast fiber, honest pricing and people who pick up the phone — built
            and supported by a local team.
          </p>
          <Link href="/plans" className="btn btn-ghost mt-6 -ml-1">
            Compare plans <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal
          as="ul"
          className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2"
          aria-labelledby="benefits-title">
          {BENEFITS.map((b, i) => (
            <li
              key={b.title}
              {...stagger(i)}
              className="group relative flex gap-5 bg-bg p-6 sm:block sm:p-8">
              <span className="icon-tile transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:-translate-y-0.5">
                <Icon name={b.icon} />
              </span>
              <div>
                <h3 className="t-h3 sm:mt-6">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">
                  {b.body}
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
