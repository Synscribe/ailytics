"use client";

import { motion } from "framer-motion";
import { CarFrontIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  Tag,
  at,
  type Box,
} from "./_camera";
import { Counter, EASE, Pill, useLoop } from "./_kit";

const CAR: Box = [652, 474, 300, 192];

/** Where the car has been, oldest first, ending at its rear axle. */
const TRACK = [
  [250, 930],
  [352, 868],
  [450, 806],
  [544, 744],
  [628, 690],
] as const;

/** The lane's allowed direction, drawn on the open road. */
const LANE = "M1110 690 L870 842";

/**
 * Track points plot the car's path one by one. Set against the lane's allowed
 * direction, the path runs the wrong way, and its speed passes the site
 * limit, so the vehicle is flagged as a security event.
 */
export default function SpeedingWrongWayVisual() {
  const { ref, phase, cycle, running, reduce } = useLoop(8, 1000);
  const plotted = Math.min(phase, TRACK.length);
  const flagged = phase >= 5;
  const path = `M${TRACK.map(([x, y]) => `${x} ${y}`).join(" L")}`;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/speeding-wrong-way.jpg"
    >
      <CamOverlay>
        <defs>
          <marker
            id="lane-head"
            markerHeight="4"
            markerUnits="strokeWidth"
            markerWidth="4"
            orient="auto"
            refX="2"
            refY="2"
          >
            <path d="M0 0 L4 2 L0 4 Z" fill="var(--signal)" />
          </marker>
        </defs>
        <path
          d={LANE}
          markerEnd="url(#lane-head)"
          stroke="var(--signal)"
          strokeLinecap="round"
          strokeWidth={6}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          animate={{
            pathLength: reduce
              ? 1
              : Math.max(0, plotted - 1) / (TRACK.length - 1),
          }}
          d={path}
          fill="none"
          initial={false}
          key={`track-${cycle}`}
          stroke={flagged ? "var(--caution)" : "var(--paper)"}
          strokeDasharray="2 10"
          strokeLinecap="round"
          strokeWidth={4}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        {TRACK.map(([x, y], index) => (
          <motion.circle
            animate={{
              scale: index < plotted ? 1 : 0,
              opacity: index < plotted ? 1 : 0,
            }}
            cx={x}
            cy={y}
            fill="var(--paper)"
            initial={false}
            key={`${x}-${y}`}
            r={9}
            stroke="var(--ink)"
            strokeWidth={3}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          />
        ))}
        <Frame
          box={CAR}
          instant={reduce}
          tone={flagged ? "security" : "detect"}
        />
      </CamOverlay>

      <span
        className="absolute z-10 inline-flex -translate-x-1/2 -translate-y-[160%] items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold shadow-sm"
        style={{
          ...at(990, 766),
          background: "var(--paper)",
          color: "var(--ink)",
        }}
      >
        Allowed direction
      </span>

      <Tag
        instant={reduce}
        tone={flagged ? "security" : "detect"}
        x={CAR[0]}
        y={CAR[1] - 9}
      >
        {flagged ? "Wrong way" : "Vehicle"}
      </Tag>

      {/* Speed from the track, against the site limit. */}
      <motion.div
        animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : 8 }}
        className="absolute top-2.5 right-2.5 z-10 w-[136px] rounded-xl p-2.5 shadow-md sm:top-3.5 sm:right-3.5"
        initial={false}
        style={{ background: "var(--paper)", color: "var(--ink)" }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <span className="flex items-center justify-between text-[10.5px] font-semibold">
          Speed
          <Pill tone="neutral">Sample</Pill>
        </span>
        <span className="mt-1 block text-[20px] leading-none font-bold tracking-[-0.02em] tabular-nums">
          <Counter
            duration={2.2}
            format={(v) => `${Math.round(v)} mph`}
            key={cycle}
            run={running && phase >= 2}
            to={14}
          />
        </span>
        <span
          className="mt-1 block text-[10px] font-medium"
          style={{ color: "var(--ink-faint)" }}
        >
          Site limit 10 mph
        </span>
      </motion.div>

      <CamBadge camera="Camera 12" place="Gate 2 road" />
      <EventCard
        className="left-auto w-[62%] sm:left-auto"
        icon={<CarFrontIcon aria-hidden="true" />}
        instant={reduce}
        meta="Over the limit, against the lane · Camera 12"
        show={phase >= 6}
        title="Vehicle speeding the wrong way"
        tone="caution"
      />
    </CameraStage>
  );
}
