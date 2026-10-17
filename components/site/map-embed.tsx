"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

import { business } from "@/data/business";

/**
 * Click-to-load Google Map. The embed (~1 MB of third-party JS and cookies)
 * only loads when the visitor asks for it; the address and a direct link are
 * always available.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = React.useState(false);
  const { contact, company } = business;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2">
      {loaded ? (
        <iframe
          title={`${company.name} location on Google Maps`}
          src={contact.googleMapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full opacity-50"
            preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M${-20 + i * 50} 0 C ${40 + i * 40} 120, ${i * 45} 180, ${30 + i * 48} 300`}
                fill="none"
                stroke="var(--line-strong)"
              />
            ))}
            <path d="M0 170 C 120 150, 260 200, 400 140" fill="none" stroke="var(--line-strong)" strokeWidth="6" />
          </svg>
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-pulse-soft text-pulse">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="relative font-medium">{contact.address}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="btn btn-secondary btn-sm">
              Show interactive map
            </button>
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm">
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
