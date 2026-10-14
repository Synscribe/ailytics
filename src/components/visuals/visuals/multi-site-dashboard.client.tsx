"use client";

import { motion } from "framer-motion";
import { MapPinIcon } from "lucide-react";

import {
  INSET,
  LINE,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Sample sites. Positions are a share of the map; alerts are sample counts. */
const SITES = [
  { name: "North yard", x: 22, y: 30, alerts: 0 },
  { name: "Plant 2", x: 64, y: 22, alerts: 3 },
  { name: "Tower site", x: 44, y: 62, alerts: 1 },
  { name: "Port terminal", x: 80, y: 68, alerts: 0 },
] as const;

/**
 * Sites report in one by one on a central map. Each pin lands with its open
 * alerts, the site list fills alongside, and the site that needs attention
 * rises to the top.
 */
export default function MultiSiteDashboardVisual() {
  const { ref, phase, reduce } = useLoop(7, 1100);
  const reported = Math.min(phase, SITES.length);
  const ranked = phase >= 5;
  const order = ranked ? [...SITES].sort((a, b) => b.alerts - a.alerts) : SITES;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          title="All sites"
          badge={<Pill tone="neutral">Sample data</Pill>}
        />

        {/* Map: roads and coastline, pins on top. */}
        <div
          className="relative h-[136px] overflow-hidden rounded-xl border"
          style={{ background: "var(--paper)", borderColor: LINE }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                height="5"
                id="site-map-dots"
                patternUnits="userSpaceOnUse"
                width="5"
              >
                <circle
                  cx="1"
                  cy="1"
                  fill="var(--ink)"
                  fillOpacity={0.08}
                  r="0.5"
                />
              </pattern>
            </defs>
            <rect fill="url(#site-map-dots)" height="100" width="100" />
            {/* Coastline: water in the lower right. */}
            <path
              d="M100 30 C88 40 86 58 76 68 S58 84 56 100 L100 100 Z"
              fill="color-mix(in srgb, var(--signal) 22%, var(--paper))"
            />
            <path
              d="M0 64 C22 56 40 76 60 60 S86 48 100 54"
              fill="none"
              stroke="var(--muted)"
              strokeWidth={7}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M28 100 C32 72 48 52 46 0"
              fill="none"
              stroke="var(--muted)"
              strokeWidth={6}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0 22 C30 26 60 14 100 20"
              fill="none"
              stroke="var(--muted)"
              strokeWidth={4}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {SITES.map((site, index) => {
            const on = index < reported;
            const alert = site.alerts > 0;
            const t = alert ? TONES.human : TONES.positive;
            return (
              <motion.span
                animate={{
                  opacity: on ? 1 : 0,
                  scale: on ? 1 : 0.4,
                  y: on ? 0 : -8,
                }}
                className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                initial={false}
                key={site.name}
                style={{ left: `${site.x}%`, top: `${site.y + 12}%` }}
                transition={reduce ? { duration: 0 } : SPRING}
              >
                <span
                  className="inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[9.5px] font-medium whitespace-nowrap shadow-sm"
                  style={{ background: "var(--paper)", color: "var(--ink)" }}
                >
                  <i
                    className="size-1.5 rounded-full"
                    style={{ background: t.solid }}
                  />
                  {site.name}
                </span>
                <MapPinIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4"
                  style={{ color: alert ? t.solid : "var(--ink)" }}
                  fill="var(--paper)"
                />
              </motion.span>
            );
          })}
        </div>

        {/* Site list, re-ranked by open alerts once every site has reported. */}
        <div className="mt-2.5 flex flex-col gap-1">
          {order.map((site) => {
            const index = SITES.findIndex((s) => s.name === site.name);
            const on = index < reported;
            const alert = site.alerts > 0;
            const t = alert ? TONES.human : TONES.positive;
            return (
              <motion.div
                className="flex h-[26px] items-center gap-2 rounded-lg px-2 text-[11px]"
                key={site.name}
                layout={!reduce}
                style={{ background: INSET }}
                transition={SPRING}
              >
                <span className="font-medium">{site.name}</span>
                <span className="ml-auto inline-grid justify-items-end">
                  <motion.span
                    animate={{ opacity: on ? 0 : 1 }}
                    className="col-start-1 row-start-1 text-[10px] font-medium"
                    initial={false}
                    style={{ color: MUTED }}
                    transition={{ duration: reduce ? 0 : 0.2 }}
                  >
                    Connecting
                  </motion.span>
                  <motion.span
                    animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.7 }}
                    className="col-start-1 row-start-1 rounded-full px-2 py-[1px] text-[10px] font-medium tabular-nums"
                    initial={false}
                    style={{ background: t.tint, color: t.fg }}
                    transition={reduce ? { duration: 0 } : SPRING}
                  >
                    {alert ? `${site.alerts} open` : "Clear"}
                  </motion.span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </Plate>
    </VisualFrame>
  );
}
