"use client";

import { motion } from "framer-motion";

import {
  FAINT,
  INSET,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

type Rect = readonly [x: number, y: number, w: number, h: number];

/**
 * One level's open edges in plan, in a 360×220 viewBox. The slab perimeter is
 * split into lines (no width or height), and each opening is an outline.
 */
const EDGES: Rect[] = [
  [20, 16, 107, 0],
  [127, 16, 106, 0],
  [233, 16, 107, 0],
  [20, 204, 107, 0],
  [127, 204, 106, 0],
  [233, 204, 107, 0],
  [20, 16, 0, 188],
  [340, 16, 0, 188],
  [66, 64, 38, 28],
  [164, 58, 30, 36],
  [158, 140, 46, 30],
  [250, 116, 44, 34],
];

/** Names for the openings, in the order they appear in EDGES. */
const OPENINGS = ["Opening", "Lift shaft", "Stair", "Riser"];

/** The officer's walkround, one stop per phase. */
const ROUTE = [
  [50, 178],
  [48, 96],
  [96, 40],
  [200, 38],
  [300, 46],
  [306, 166],
  [200, 178],
  [110, 124],
] as const;

/** How far the officer can see an edge from, in viewBox units. */
const VIEW = 40;

/** The guardrail on this edge comes down after the walkround has passed it. */
const GAP_EDGE = 2;
const GAP_FROM = 5;

function inView([x, y, w, h]: Rect, [px, py]: readonly [number, number]) {
  const dx = Math.max(x - px, 0, px - (x + w));
  const dy = Math.max(y - py, 0, py - (y + h));
  return Math.hypot(dx, dy) <= VIEW;
}

/**
 * A safety officer walks one level. Only the edges near them light up as
 * watched, and a guardrail comes down behind them on an edge nobody is
 * watching.
 */
export default function OpenEdgeWalkroundVisual() {
  const { ref, phase, reduce } = useLoop(ROUTE.length, 1100);
  const officer = ROUTE[phase];
  const gapOpen = phase >= GAP_FROM;
  const watched = EDGES.filter((edge) => inView(edge, officer)).length;
  const stroke = (i: number) =>
    i === GAP_EDGE && gapOpen
      ? TONES.human.solid
      : inView(EDGES[i], officer)
        ? TONES.positive.solid
        : FAINT;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          badge={
            <Pill tone="neutral">
              {watched} of {EDGES.length} edges in view
            </Pill>
          }
          title="Level 6 · Open edges"
        />

        <div className="relative">
          <svg className="block h-auto w-full" viewBox="0 0 360 220">
            <rect fill={INSET} height={188} rx={3} width={320} x={20} y={16} />
            {EDGES.map((edge, i) => {
              const [x, y, w, h] = edge;
              const style = {
                stroke: stroke(i),
                transition: reduce ? undefined : "stroke 0.4s ease",
              };
              const dash = i === GAP_EDGE && gapOpen ? "6 5" : undefined;
              return w === 0 || h === 0 ? (
                <line
                  key={i}
                  strokeDasharray={dash}
                  strokeLinecap="round"
                  strokeWidth={3}
                  style={style}
                  x1={x}
                  x2={x + w}
                  y1={y}
                  y2={y + h}
                />
              ) : (
                <rect
                  fill="var(--paper)"
                  height={h}
                  key={i}
                  rx={2}
                  strokeWidth={2.5}
                  style={style}
                  width={w}
                  x={x}
                  y={y}
                />
              );
            })}

            <motion.g
              animate={{ x: officer[0], y: officer[1] }}
              initial={false}
              transition={
                reduce ? { duration: 0 } : { duration: 0.9, ease: "easeInOut" }
              }
            >
              <circle fill={TONES.positive.tint} opacity={0.8} r={VIEW} />
              <circle
                fill="var(--ink)"
                r={6}
                stroke="var(--paper)"
                strokeWidth={2}
              />
            </motion.g>
            {EDGES.slice(-OPENINGS.length).map(([x, y, w, h], i) => (
              <text
                fill={MUTED}
                fontSize={9}
                fontWeight={500}
                key={OPENINGS[i]}
                textAnchor="middle"
                x={x + w / 2}
                y={y + h + 11}
              >
                {OPENINGS[i]}
              </text>
            ))}
          </svg>

          <motion.span
            animate={{ opacity: gapOpen ? 1 : 0, y: gapOpen ? 0 : -4 }}
            className="absolute -translate-x-1/2 rounded-[4px] px-1.5 py-[3px] text-[10px] leading-none font-medium whitespace-nowrap shadow-sm"
            initial={false}
            style={{
              left: `${(286 / 360) * 100}%`,
              top: `${(26 / 220) * 100}%`,
              background: TONES.human.fg,
              color: "#fff",
            }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            Guardrail down · unwatched
          </motion.span>
        </div>

        <div
          className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-medium"
          style={{ color: MUTED }}
        >
          <Swatch color={TONES.positive.solid} label="Seen by the officer" />
          <Swatch color={FAINT} label="Unwatched" />
          <span className="ml-auto flex items-center gap-1.5">
            <i className="size-2 rounded-full bg-ink" />
            Safety officer
          </span>
        </div>
      </Plate>
    </VisualFrame>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <i className="h-[3px] w-3 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
