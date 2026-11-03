"use client";

import { motion } from "framer-motion";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  Frame,
  Tag,
  type Box,
} from "./_camera";
import { EASE, SPRING, TONES, useLoop } from "./_kit";

/**
 * The main forklift lane, in still pixels: a straight strip of floor that
 * runs from the back wall, under the parked forklift and the way its forks
 * point, out to the edges of the frame. Its sides follow the slope of the
 * painted floor lines and draw apart toward the bottom right, which is
 * nearer the camera, the way parallel lines on the floor do in this view.
 */
const ZONE = [
  [234, 160],
  [1280, 725],
  [1280, 960],
  [1113, 960],
  [0, 270],
  [0, 195],
] as const;

const PATH = `M${ZONE.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;

const PERSON: Box = [606, 396, 140, 248];
const FORKLIFT: Box = [214, 134, 316, 364];

/**
 * A no-pedestrian lane is drawn over the main forklift route in a warehouse,
 * one corner at a time. The parked forklift in the lane is logged as idle,
 * and a worker walking down the lane is flagged and the shift supervisor is
 * alerted.
 */
export default function WarehouseRestrictedZoneVisual() {
  const { ref, phase, cycle, reduce } = useLoop(ZONE.length + 4, 850);
  const corners = Math.min(phase, ZONE.length);
  const closed = phase >= ZONE.length + 1;
  const entered = phase >= ZONE.length + 2;
  const tone = TONES.caution;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/warehouse-forklift.jpg"
    >
      <CamOverlay>
        <motion.path
          animate={{ opacity: closed ? 1 : 0 }}
          d={PATH}
          fill={entered ? "var(--alert)" : tone.solid}
          fillOpacity={entered ? 0.2 : 0.26}
          initial={false}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        />
        <motion.path
          animate={{ pathLength: reduce ? 1 : corners / ZONE.length }}
          d={PATH}
          fill="none"
          initial={{ pathLength: 0 }}
          key={cycle}
          stroke={entered ? "var(--alert)" : tone.solid}
          strokeLinejoin="round"
          strokeWidth={3}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        {ZONE.map(([x, y], index) => (
          <motion.circle
            animate={{
              opacity: phase >= 1 && index < corners && !closed ? 1 : 0,
              scale: phase >= 1 && index < corners && !closed ? 1 : 0.3,
            }}
            cx={x}
            cy={y}
            fill="var(--paper)"
            initial={false}
            key={`${cycle}-${index}`}
            r={9}
            stroke={tone.solid}
            strokeWidth={3}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={reduce ? { duration: 0 } : SPRING}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <Frame box={FORKLIFT} instant={reduce} visible={closed} />
        <Frame
          box={PERSON}
          instant={reduce}
          tone={entered ? "hazard" : "detect"}
          visible={closed}
        />
      </CamOverlay>

      <Tag
        below
        instant={reduce}
        tone="security"
        visible={closed}
        x={860}
        y={640}
      >
        Forklift lane · No pedestrians
      </Tag>
      <Tag
        instant={reduce}
        visible={closed}
        x={FORKLIFT[0]}
        y={FORKLIFT[1] - 9}
      >
        Forklift 01 · Idle 14 min
      </Tag>
      <Tag
        below
        instant={reduce}
        tone={entered ? "hazard" : "detect"}
        visible={closed}
        x={PERSON[0]}
        y={PERSON[1] + PERSON[3] + 4}
      >
        {entered ? "Person · In forklift lane" : "Person"}
      </Tag>

      <CamBadge camera="Camera 05" place="Warehouse floor" />
      <motion.div
        animate={{
          opacity: entered ? 1 : 0,
          y: entered ? 0 : 14,
          filter: entered ? "blur(0px)" : "blur(6px)",
        }}
        className="camera-event absolute inset-x-2.5 bottom-2.5 z-20 flex items-center gap-2.5 rounded-xl px-3 py-2.5 shadow-md sm:inset-x-3.5 sm:bottom-3.5"
        initial={false}
        style={{ background: "var(--paper)", color: "var(--ink)" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        <span
          className="grid size-7 flex-none place-items-center rounded-full"
          style={{ background: TONES.human.tint, color: TONES.human.fg }}
        >
          <svg fill="none" height="14" viewBox="0 0 24 24" width="14">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.4"
            />
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.4" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-medium">
            Person in the forklift lane
          </span>
          <span
            className="block truncate text-[11px] font-medium"
            style={{ color: "var(--ink-faint)" }}
          >
            Camera 05 · Sent to the shift supervisor
          </span>
        </span>
        <span
          className="rounded-full px-2 py-[3px] text-[10.5px] font-medium whitespace-nowrap"
          style={{ background: TONES.human.tint, color: TONES.human.fg }}
        >
          Alert sent
        </span>
      </motion.div>
    </CameraStage>
  );
}
