import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FiberPoster } from "@/components/hero/fiber-poster";
import { SiteShell } from "@/components/site/site-shell";
import { business } from "@/data/business";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative overflow-clip">
        <div className="container-x grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow enter">Error 404</p>
            <h1 className="t-h1 mt-6">
              <span className="mask-line">
                <span>
                  This line <em className="t-accent">isn&apos;t connected.</em>
                </span>
              </span>
            </h1>
            <p className="t-lead enter mt-6 max-w-lg">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
              Head back home, or call us on{" "}
              <a href={business.contact.phoneHref} className="link">
                {business.contact.phone}
              </a>
              .
            </p>
            <div className="enter mt-9 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Back to home <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/plans" className="btn btn-secondary">
                View plans
              </Link>
            </div>
          </div>
          <div className="enter mx-auto aspect-square w-full max-w-md opacity-70">
            <FiberPoster />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
