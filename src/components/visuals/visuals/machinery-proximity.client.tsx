"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ForkliftIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  StatePill,
  Tag,
  type Box,
} from "./_camera";
import { EASE, SPRING, TONES, useLoop } from "./_kit";

const FORKLIFT: Box = [140, 18, 530, 622];
const WORKER: Box = [745, 254, 105, 410];

/** The danger radius on the ground plane, in still pixels. */
const RADIUS = { cx: 470, cy: 722, rx: 420, ry: 158 };

/**
 * The forklift starts moving and a 3D ground radius arms around it. The
 * worker beside it is now inside the radius and is flagged. When the forklift
 * stops, the radius switches off again, so idle machines do not raise alerts.
 */
export default function MachineryProximityVisual() {
  const { ref, phase, cycle, running, reduce } = useLoop(7, 1150);
  const moving = phase >= 1;
  const armed = phase >= 2;
  const inside = phase >= 3;
  const { cx, cy, rx, ry } = RADIUS;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/machinery-proximity.jpg"
    >
      <CamOverlay>
        <motion.g
          animate={{ opacity: armed ? 1 : 0, scale: armed ? 1 : 0.2 }}
          initial={false}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE }}
        >
          <ellipse
            cx={cx}
            cy={cy}
            fill="var(--alert)"
            fillOpacity={0.2}
            rx={rx}
            ry={ry}
            stroke="var(--alert)"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx={cx}
            cy={cy}
            fill="none"
            rx={rx * 0.55}
            ry={ry * 0.55}
            stroke="var(--paper)"
            strokeDasharray="6 7"
            strokeOpacity={0.8}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
        <AnimatePresence>
          {running && armed ? (
            <motion.ellipse
              animate={{ scale: 1.22, opacity: 0 }}
              cx={cx}
              cy={cy}
              exit={{ opacity: 0 }}
              fill="none"
              initial={{ scale: 1, opacity: 0.7 }}
              key={`ripple-${cycle}`}
              rx={rx}
              ry={ry}
              stroke="var(--alert)"
              strokeWidth={2}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity }}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </AnimatePresence>
        <Frame box={FORKLIFT} instant={reduce} />
        <Frame
          box={WORKER}
          instant={reduce}
          tone={inside ? "hazard" : "detect"}
        />
      </CamOverlay>

      <Tag instant={reduce} x={FORKLIFT[0]} y={FORKLIFT[1] + 52} below>
        Forklift
        <StatePill
          instant={reduce}
          offLabel="Idle"
          on={moving}
          onLabel="Moving"
          onTone="positive"
        />
      </Tag>
      <Tag
        instant={reduce}
        tone={inside ? "hazard" : "detect"}
        x={WORKER[0]}
        y={WORKER[1] - 9}
      >
        {inside ? "Inside radius" : "Person"}
      </Tag>

      <motion.span
        animate={{ opacity: armed ? 1 : 0, scale: armed ? 1 : 0.8 }}
        className="absolute top-2.5 right-2.5 z-10 rounded-full px-2.5 py-1 text-[10.5px] font-medium shadow-sm sm:top-3.5 sm:right-3.5"
        initial={false}
        style={{ background: "var(--paper)", color: TONES.human.fg }}
        transition={reduce ? { duration: 0 } : SPRING}
      >
        3D radius on while moving
      </motion.span>

      <CamBadge camera="Camera 02" place="Loading bay" />
      <EventCard
        icon={<ForkliftIcon aria-hidden="true" />}
        instant={reduce}
        meta="Person inside the forklift radius · Camera 02"
        show={phase >= 4}
        title="Worker too close to a moving forklift"
      />
    </CameraStage>
  );
}
