"use client";

import { motion } from "framer-motion";
import { WavesIcon } from "lucide-react";

import {
  CamBadge,
  CamOverlay,
  EventCard,
  Tag,
} from "@/components/visuals/visuals/_camera";
import { EASE, useLoop, VisualFrame } from "@/components/visuals/visuals/_kit";

/** Quay edge between the deck (left) and the water (right), in still pixels. */
const EDGE_X = 760;
const BUFFER_X = 610;

/** The person's walk across the deck, one point per phase. */
const WALK = [
  [260, 760],
  [380, 650],
  [500, 560],
  [640, 470],
  [700, 430],
] as const;

const BOLLARDS = [110, 300, 660, 880] as const;

/** Container stacks on the deck, kept clear of the walk. */
const CONTAINERS = [
  [60, 70, 250, 92],
  [60, 176, 250, 92],
  [380, 70, 92, 250],
] as const;

/** A moored vessel alongside the quay. */
const HULL =
  "M820 150 Q820 90 900 70 L1080 70 Q1160 90 1160 150 L1160 640 Q1160 760 990 830 Q820 760 820 640 Z";

/**
 * A drawn plan of a quayside, since no clean waterfront footage is on hand.
 * A person crosses the deck towards the water. The marker turns to a hazard
 * when it crosses the safety line at the water's edge.
 */
export default function WaterHazardVisual() {
  const { ref, phase, reduce } = useLoop(7, 1100);
  const step = Math.min(phase, WALK.length - 1);
  const [px, py] = WALK[step];
  const inside = px >= BUFFER_X;
  const flagged = phase >= 4;

  return (
    <VisualFrame className="overflow-hidden p-0 sm:p-0" innerRef={ref}>
      <div
        className="absolute inset-0"
        style={{ background: "var(--muted)" }}
      />
      <CamOverlay>
        <defs>
          <pattern
            height="40"
            id="deck-grid"
            patternUnits="userSpaceOnUse"
            width="40"
          >
            <path
              d="M40 0 L0 0 0 40"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity={0.06}
              strokeWidth={1}
            />
          </pattern>
          <pattern
            height="56"
            id="water-lines"
            patternUnits="userSpaceOnUse"
            width="160"
          >
            <path
              d="M0 28 Q40 16 80 28 T160 28"
              fill="none"
              stroke="var(--paper)"
              strokeOpacity={0.55}
              strokeWidth={2}
            />
          </pattern>
          <clipPath id="water-clip">
            <rect height={960} width={1280 - EDGE_X} x={EDGE_X} />
          </clipPath>
        </defs>
        <rect fill="url(#deck-grid)" height={960} width={EDGE_X} />
        <rect
          fill="var(--signal)"
          fillOpacity={0.3}
          height={960}
          width={1280 - EDGE_X}
          x={EDGE_X}
        />
        <g clipPath="url(#water-clip)">
          <motion.rect
            animate={reduce ? undefined : { x: [EDGE_X - 160, EDGE_X] }}
            fill="url(#water-lines)"
            height={960}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            width={1280 - EDGE_X + 160}
            x={EDGE_X - 160}
          />
        </g>
        {CONTAINERS.map(([x, y, w, h]) => (
          <g key={`${x}-${y}`}>
            <rect
              fill="var(--paper)"
              height={h}
              rx={8}
              stroke="var(--ink)"
              strokeOpacity={0.18}
              strokeWidth={2}
              width={w}
              x={x}
              y={y}
            />
            {Array.from({ length: Math.floor((w > h ? w : h) / 26) }).map(
              (_, i) =>
                w > h ? (
                  <line
                    key={i}
                    stroke="var(--ink)"
                    strokeOpacity={0.08}
                    strokeWidth={2}
                    x1={x + 18 + i * 26}
                    x2={x + 18 + i * 26}
                    y1={y + 12}
                    y2={y + h - 12}
                  />
                ) : (
                  <line
                    key={i}
                    stroke="var(--ink)"
                    strokeOpacity={0.08}
                    strokeWidth={2}
                    x1={x + 12}
                    x2={x + w - 12}
                    y1={y + 18 + i * 26}
                    y2={y + 18 + i * 26}
                  />
                ),
            )}
          </g>
        ))}
        {/* Walkway markings on the deck. */}
        <path
          d="M120 960 L120 360 L560 360"
          fill="none"
          stroke="var(--caution)"
          strokeDasharray="28 18"
          strokeOpacity={0.7}
          strokeWidth={6}
        />
        {/* Moored vessel. */}
        <path
          d={HULL}
          fill="var(--paper)"
          fillOpacity={0.75}
          stroke="var(--ink)"
          strokeOpacity={0.25}
          strokeWidth={3}
        />
        {[170, 330, 490].map((y) => (
          <rect
            fill="var(--muted)"
            height={120}
            key={y}
            rx={10}
            stroke="var(--ink)"
            strokeOpacity={0.12}
            strokeWidth={2}
            width={220}
            x={880}
            y={y}
          />
        ))}
        {/* Quay edge and mooring bollards. */}
        <rect fill="var(--ink-faint)" height={960} width={14} x={EDGE_X - 14} />
        {BOLLARDS.map((y) => (
          <circle
            cx={EDGE_X - 32}
            cy={y}
            fill="var(--ink-muted)"
            key={y}
            r={12}
          />
        ))}
        {/* Safety line: the buffer back from the water's edge. */}
        <rect
          fill="var(--alert)"
          fillOpacity={inside && flagged ? 0.18 : 0.08}
          height={960}
          width={EDGE_X - 14 - BUFFER_X}
          x={BUFFER_X}
        />
        <line
          stroke="var(--alert)"
          strokeDasharray="12 10"
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
          x1={BUFFER_X}
          x2={BUFFER_X}
          y1={0}
          y2={960}
        />
        {/* The walked path and the person marker. */}
        {WALK.slice(Math.max(0, step - 2), step).map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={5}
            fill="var(--ink-muted)"
            opacity={0.2 + i * 0.2}
          />
        ))}
        <motion.g
          animate={{ x: px, y: py }}
          initial={false}
          transition={{ duration: reduce ? 0 : 1, ease: EASE }}
        >
          <circle
            fill="var(--paper)"
            r={30}
            stroke={flagged ? "var(--alert)" : "var(--signal)"}
            strokeWidth={5}
          />
          <circle fill={flagged ? "var(--alert)" : "var(--signal)"} r={12} />
          <rect
            x={-56}
            y={-70}
            width={112}
            height={30}
            rx={5}
            fill="var(--paper)"
          />
          <text
            x={0}
            y={-50}
            textAnchor="middle"
            fill="var(--ink)"
            fontSize={20}
            fontWeight={600}
          >
            Person
          </text>
          {flagged && !reduce ? (
            <motion.circle
              animate={{ r: [30, 70], opacity: [0.6, 0] }}
              fill="none"
              r={30}
              stroke="var(--alert)"
              strokeWidth={3}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
        </motion.g>
      </CamOverlay>

      <Tag tone="hazard" x={BUFFER_X + 12} y={60} below instant={reduce}>
        Safety line
      </Tag>
      <span
        className="absolute z-10 rounded-full px-2 py-[3px] text-[10px] font-medium shadow-sm"
        style={{
          right: "3%",
          top: "8%",
          background: "var(--paper)",
          color: "var(--ink)",
        }}
      >
        Water
      </span>

      <CamBadge camera="Camera 07" place="Quay 3" />
      <EventCard
        icon={<WavesIcon aria-hidden="true" />}
        instant={reduce}
        meta="Past the safety line at the quay edge · Camera 07"
        show={flagged}
        title="Person near the water"
      />
    </VisualFrame>
  );
}
