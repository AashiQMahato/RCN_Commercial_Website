import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { business } from "@/data/business";

/** Verified headline figures from data/business.ts — one source for the whole site. */
export function StatsBand({ className = "" }: { className?: string }) {
  return (
    <div className={`container-x relative ${className}`}>
      <Reveal
        as="div"
        className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
        <dl className="contents">
          {business.stats.map((stat, i) => (
            <div
              key={stat.id}
              {...stagger(i)}
              className="flex flex-col-reverse justify-end gap-2 border-line py-8 pr-4 odd:border-r even:pl-6 [&:nth-child(n+3)]:border-t lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:[&:nth-child(n+3)]:border-t-0">
              <dt className="text-sm text-fg-subtle">{stat.label}</dt>
              <dd className="text-[clamp(1.9rem,1.4rem+1.8vw,2.9rem)] leading-none font-semibold tracking-[-0.035em] text-fg">
                {stat.prefix ? (
                  <span className="mr-1 text-[0.45em] font-medium tracking-normal text-fg-muted">
                    {stat.prefix.trim()}
                  </span>
                ) : null}
                {stat.animate ? (
                  <CountUp value={stat.value} />
                ) : (
                  <span className="tabular-nums">{stat.value}</span>
                )}
                {stat.suffix ? (
                  <span className="text-signal">{stat.suffix}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
