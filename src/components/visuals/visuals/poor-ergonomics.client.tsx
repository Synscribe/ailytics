"use client";

import styles from "./pose-annotation.module.css";
import { motion } from "framer-motion";
import { PackageIcon } from "lucide-react";

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
import { EASE, useLoop } from "./_kit";

type Joint = "head" | "neck" | "hip" | "knee" | "ankle" | "elbow" | "hand";

/** One camera shot of a lift: the still, the worker and their body keypoints, in still pixels. */
type LiftShot = {
  src: string;
  person: Box;
  points: Record<Joint, readonly [number, number]>;
  /** Where the back-bend reading sits, and the leader line to it. */
  annotation: readonly [number, number];
  leader: string;
  camera: string;
  place: string;
  /** Alert card sent once the lift is flagged. */
  alert?: { title: string; meta: string };
};

const BONES: [Joint, Joint][] = [
  ["head", "neck"],
  ["neck", "hip"],
  ["hip", "knee"],
  ["knee", "ankle"],
  ["neck", "elbow"],
  ["elbow", "hand"],
];

const WAREHOUSE: LiftShot = {
  src: "/media/ailytics/stills/poor-ergonomics.jpg",
  person: [508, 470, 258, 312],
  points: {
    head: [548, 512],
    neck: [596, 530],
    hip: [722, 586],
    knee: [668, 698],
    ankle: [624, 760],
    elbow: [590, 590],
    hand: [576, 628],
  },
  annotation: [850, 480],
  leader: "M745 520 L800 480 L840 480",
  camera: "Camera 05",
  place: "Warehouse floor",
};

const WORKSHOP: LiftShot = {
  src: "/media/ailytics/stills/lifting-posture.jpg",
  person: [628, 586, 220, 252],
  points: {
    head: [664, 620],
    neck: [702, 646],
    hip: [818, 692],
    knee: [774, 746],
    ankle: [748, 806],
    elbow: [698, 716],
    hand: [676, 754],
  },
  annotation: [900, 600],
  leader: "M842 640 L880 600 L892 600",
  camera: "Camera 05",
  place: "Workshop floor",
  alert: {
    title: "Unsafe lift on the workshop floor",
    meta: "Back bent past the safe limit · Camera 05",
  },
};

/** Back bend from upright, in degrees, from the neck and hip keypoints. */
function backBend({ neck, hip }: LiftShot["points"]) {
  return Math.round(
    90 - (Math.atan2(hip[1] - neck[1], hip[0] - neck[0]) * 180) / Math.PI,
  );
}

const R = 74;

/**
 * Pose keypoints land on a worker lifting a box, the skeleton joins them,
 * and an angle gauge sweeps from upright to the line of their back. The bend
 * passes the safe limit, so the lift is flagged.
 */
function LiftPosture({ shot }: { shot: LiftShot }) {
  const { ref, phase, cycle, reduce } = useLoop(shot.alert ? 8 : 7, 1100);
  const points = phase >= 1;
  const bones = phase >= 2;
  const gauge = phase >= 3;
  const flagged = phase >= 4;
  const stroke = flagged ? "var(--alert)" : "var(--signal)";

  const { points: P, person } = shot;
  const [HX, HY] = P.hip;
  /** Upright reference straight up from the hip, and the back line to the neck. */
  const upright = `M${HX} ${HY} L${HX} ${HY - R - 26}`;
  const backAngle = Math.atan2(P.neck[1] - HY, P.neck[0] - HX);
  const arc = `M${HX} ${HY - R} A${R} ${R} 0 0 0 ${HX + R * Math.cos(backAngle)} ${HY + R * Math.sin(backAngle)}`;

  return (
    <CameraStage innerRef={ref} src={shot.src}>
      <CamOverlay>
        <Frame
          box={person}
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
          d={upright}
          initial={false}
          stroke="var(--paper)"
          strokeDasharray="6 6"
          strokeWidth={2}
          transition={{ duration: reduce ? 0 : 0.3 }}
        />
        <motion.path
          animate={{ pathLength: gauge ? 1 : 0 }}
          d={arc}
          fill="none"
          initial={false}
          key={`arc-${cycle}`}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={5}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
        />
        <motion.path
          d={shot.leader}
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
        style={at(...shot.annotation)}
        initial={false}
        animate={{ opacity: gauge ? 1 : 0, y: gauge ? 0 : 5 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        <small>BACK BEND</small>
        <strong>
          {backBend(P)}
          <span>°</span>
        </strong>
        <span className={styles.condition}>
          {flagged ? "Over limit" : "Measuring"}
        </span>
      </motion.div>
      <Tag
        instant={reduce}
        tone={flagged ? "hazard" : "detect"}
        x={person[0]}
        y={person[1] - 9}
      >
        {flagged ? "Unsafe lift" : "Person"}
      </Tag>

      <CamBadge camera={shot.camera} place={shot.place} />
      {shot.alert ? (
        <EventCard
          icon={<PackageIcon aria-hidden="true" />}
          instant={reduce}
          meta={shot.alert.meta}
          show={phase >= 5}
          title={shot.alert.title}
        />
      ) : null}
    </CameraStage>
  );
}

export default function PoorErgonomicsVisual() {
  return <LiftPosture shot={WAREHOUSE} />;
}

/** The same posture check on a wide workshop camera, ending in an alert. */
export function WorkshopLiftPostureVisual() {
  return <LiftPosture shot={WORKSHOP} />;
}
