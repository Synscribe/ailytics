import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: AI video analytics for heavy industry safety`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori cannot load an SVG through <img>, so the brand mark is drawn inline:
// a slate square offset behind a teal one, as in public/brand/logo.svg.
function BrandMark({ size: s = 40 }: { size?: number }) {
  return (
    <svg fill="none" height={s} viewBox="0 0 40 40" width={s}>
      <rect
        height={26}
        stroke="#27405d"
        strokeWidth={3}
        width={26}
        x={12}
        y={2}
      />
      <rect
        height={26}
        stroke="#34c1c4"
        strokeWidth={3.5}
        width={26}
        x={3}
        y={11}
      />
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(circle at 85% 110%, rgba(52,193,196,0.28), transparent 55%), #f9fbfd",
        color: "#27405d",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <BrandMark />
        <span style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          AI video analytics for heavy industry safety
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#52667d" }}>
          Safety, security and productivity alerts from the cameras you already
          have.
        </div>
      </div>
    </div>,
    size,
  );
}
