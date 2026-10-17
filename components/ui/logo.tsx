import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";

/** RCN wordmark: the official seal plus a typographic lockup. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-11 items-center gap-3 rounded-md">
      <span className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-line-strong">
        <Image
          src="/logo.webp"
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-cover"
          unoptimized
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-fg">
          {business.company.shortName}
          <span className="text-signal">.</span>
        </span>
        {compact ? null : (
          <span className="mt-1 hidden font-mono text-[0.68rem] tracking-[0.08em] text-fg-subtle uppercase sm:block">
            {business.company.name}
          </span>
        )}
        <span className={compact ? "sr-only" : "sr-only sm:hidden"}>
          {business.company.name}
        </span>
      </span>
    </Link>
  );
}
