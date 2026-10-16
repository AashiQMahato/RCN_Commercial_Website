import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const alt = `${business.company.name} — Fiber internet & cable TV in Sabaila, Nepal`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 70% 60% at 75% 40%, rgba(16,185,129,0.25), transparent 70%), #080f0a",
          color: "#f0fdf4",
        }}>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#34d399",
          }}>
          {`${business.company.shortName} · Est. ${business.company.establishedYear}`}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>
          {business.company.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 24, color: "#bbf7d0" }}>
          Fiber internet & cable TV · 50–200 Mbps · Unlimited data
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 48, color: "#86efac" }}>
          {`${business.contact.address} · ${business.contact.phone}`}
        </div>
      </div>
    ),
    size,
  );
}
