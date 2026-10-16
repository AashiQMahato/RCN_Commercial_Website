"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const NotFoundScene = dynamic(
  () => import("@/components/three/not-found-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-indigo-500/20" />
      </div>
    ),
  },
);

export default function NotFound() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center px-6 py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="rcn-enter inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              404
            </div>

            <h1 className="rcn-enter mt-6 text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-6xl" style={{ ["--enter-delay" as string]: "0.05s" }}>
              Page Not Found
            </h1>

            <p className="rcn-enter mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/55" style={{ ["--enter-delay" as string]: "0.12s" }}>
              The page you’re looking for doesn’t exist (or moved). Use the
              button below to return home.
            </p>

            <div className="rcn-enter mt-8" style={{ ["--enter-delay" as string]: "0.18s" }}>
              <div>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-gray-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                  Go back home
                </Link>
              </div>
            </div>
          </div>

          <div className="rcn-enter card relative h-90 w-full overflow-hidden shadow-sm sm:h-105" style={{ ["--enter-delay" as string]: "0.08s" }}>
            <NotFoundScene />
          </div>
        </div>
      </div>
    </div>
  );
}
