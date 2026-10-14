"use client";

import styles from "./pose-annotation.module.css";
import { motion } from "framer-motion";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  Frame,
  Tag,
  at,
  type Box,
} from "./_camera";
import { EASE, useLoop } from "./_kit";

const PERSON: Box = [508, 470, 258, 312];

/** Body keypoints for the lifting pose, in still pixels. */
const P = {
  head: [548, 512],
  neck: [596, 530],
  hip: [722, 586],
  knee: [668, 698],
  ankle: [624, 760],
  elbow: [590, 590],
  hand: [576, 628],
} as const;

const BONES: [keyof typeof P, keyof typeof P][] = [
  ["head", "neck"],
  ["neck", "hip"],
  ["hip", "knee"],
  ["knee", "ankle"],
  ["neck", "elbow"],
  ["elbow", "hand"],
];

const [HX, HY] = P.hip;
const R = 74;
/** Upright reference straight up from the hip, and the back line to the neck. */
const UPRIGHT = `M${HX} ${HY} L${HX} ${HY - R - 26}`;
const backAngle = Math.atan2(P.neck[1] - HY, P.neck[0] - HX);
const ARC = `M${HX} ${HY - R} A${R} ${R} 0 0 0 ${HX + R * Math.cos(backAngle)} ${HY + R * Math.sin(backAngle)}`;
const BEND = Math.round(
  90 - (Math.atan2(HY - P.neck[1], HX - P.neck[0]) * 180) / Math.PI,
);

/**
 * Pose keypoints land on a worker lifting a box, the skeleton joins them,
 * and an angle gauge sweeps from upright to the line of his back. The bend
 * passes the safe limit, so the lift is flagged.
 */
export default function PoorErgonomicsVisual() {
  const { ref, phase, cycle, reduce } = useLoop(7, 1100);
  const points = phase >= 1;
  const bones = phase >= 2;
  const gauge = phase >= 3;
  const flagged = phase >= 4;
  const stroke = flagged ? "var(--alert)" : "var(--signal)";

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/poor-ergonomics.jpg"
    >
      <CamOverlay>
        <Frame
          box={PERSON}
          instant={reduce}
          tone={flagged ? "hazard" : "detect"}
        />
        {BONES.map(([a, b], index) => (
          <motion.line
            animate={{ pathLength: bones ? 1 : 0, opacity: bones ? 1 : 0 }}
            initial={false}
            key={`${a}-${b}`}
            stroke={a === "neck" && b === "hip" ? stroke : "var(--paper)"}
            strokeLinecap="round"
            strokeWidth={a === "neck" && b === "hip" ? 5 : 3}
            transition={{
              duration: reduce ? 0 : 0.5,
              delay: reduce ? 0 : index * 0.08,
              ease: EASE,
            }}
            x1={P[a][0]}
            x2={P[b][0]}
            y1={P[a][1]}
            y2={P[b][1]}
          />
        ))}
        {Object.entries(P).map(([name, [x, y]], index) => (
          <motion.circle
            animate={{ scale: points ? 1 : 0, opacity: points ? 1 : 0 }}
            cx={x}
            cy={y}
            fill="var(--paper)"
            initial={false}
            key={name}
            r={7}
            stroke="var(--ink)"
            strokeWidth={2.5}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{
              duration: reduce ? 0 : 0.35,
              delay: reduce ? 0 : index * 0.06,
              ease: EASE,
            }}
          />
        ))}
        <motion.path
          animate={{ opacity: gauge ? 1 : 0 }}
          d={UPRIGHT}
          initial={false}
          stroke="var(--paper)"
          strokeDasharray="6 6"
          strokeWidth={2}
          transition={{ duration: reduce ? 0 : 0.3 }}
        />
        <motion.path
          animate={{ pathLength: gauge ? 1 : 0 }}
          d={ARC}
          fill="none"
          initial={false}
          key={`arc-${cycle}`}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={5}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
        />
        <motion.path
          d="M745 520 L800 480 L840 480"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.3"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ opacity: gauge ? 1 : 0, pathLength: gauge ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      </CamOverlay>

      <motion.div
        className={styles.annotation}
        style={at(850, 480)}
        initial={false}
        animate={{ opacity: gauge ? 1 : 0, y: gauge ? 0 : 5 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        <small>BACK BEND</small>
        <strong>
          {BEND}
          <span>°</span>
        </strong>
        <span className={styles.condition}>
          {flagged ? "Over limit" : "Measuring"}
        </span>
      </motion.div>
      <Tag
        instant={reduce}
        tone={flagged ? "hazard" : "detect"}
        x={PERSON[0]}
        y={PERSON[1] - 9}
      >
        {flagged ? "Unsafe lift" : "Person"}
      </Tag>

      <CamBadge camera="Camera 05" place="Warehouse floor" />
    </CameraStage>
  );
}
