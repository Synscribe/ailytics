"use client";

import { motion } from "framer-motion";
import { SmartphoneIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  CAM_H,
  CAM_W,
  EventCard,
  Frame,
  Tag,
  at,
  type Box,
} from "./_camera";
import { Counter, EASE, SPRING, TONES, useLoop } from "./_kit";

const PERSON: Box = [896, 186, 140, 404];
const CUE: Box = [952, 246, 66, 64];
const SRC = "/media/ailytics/stills/distracted-activity.jpg";

/** Inset size and zoom, as a share of the stage. */
const LENS = { w: 30, zoom: 4 };

/** Background position that centres a still point inside the square lens. */
function lensPosition(x: number, y: number) {
  const kx = LENS.zoom / (LENS.w / 100);
  const ky = kx * (CAM_H / CAM_W);
  const px = (0.5 - (x / CAM_W) * kx) / (1 - kx);
  const py = (0.5 - (y / CAM_H) * ky) / (1 - ky);
  return `${px * 100}% ${py * 100}%`;
}

/**
 * A lens lifts the cue out of the scene: the hand holding a phone to the ear.
 * A dwell timer then runs while the phone stays in use, and the alert fires
 * once it passes the threshold.
 */
export default function DistractedActivityVisual() {
  const { ref, phase, cycle, running, reduce } = useLoop(8, 1050);
  const lens = phase >= 2;
  const timing = phase >= 3;
  const flagged = phase >= 5;
  const [cx, cy] = [CUE[0] + CUE[2] / 2, CUE[1] + CUE[3] / 2];

  return (
    <CameraStage innerRef={ref} src={SRC}>
      <CamOverlay>
        <Frame
          box={PERSON}
          instant={reduce}
          tone={flagged ? "hazard" : "detect"}
          visible={phase >= 1}
        />
        <motion.rect
          animate={{ opacity: lens ? 1 : 0 }}
          fill="none"
          height={CUE[3]}
          initial={false}
          rx={10}
          stroke="var(--paper)"
          strokeWidth={2}
          transition={{ duration: reduce ? 0 : 0.3 }}
          vectorEffect="non-scaling-stroke"
          width={CUE[2]}
          x={CUE[0]}
          y={CUE[1]}
        />
        <motion.line
          animate={{ pathLength: lens ? 1 : 0, opacity: lens ? 1 : 0 }}
          initial={false}
          stroke="var(--paper)"
          strokeDasharray="4 5"
          strokeWidth={1.5}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          vectorEffect="non-scaling-stroke"
          x1={CUE[0]}
          x2={600}
          y1={cy}
          y2={300}
        />
      </CamOverlay>

      {/* The zoomed inset: the same still, scaled around the cue. */}
      <motion.div
        animate={{ opacity: lens ? 1 : 0, scale: lens ? 1 : 0.6 }}
        className="absolute z-10 aspect-square -translate-x-full -translate-y-1/2 overflow-hidden rounded-xl border-[3px] shadow-lg"
        initial={false}
        style={{
          ...at(600, 300),
          width: `${LENS.w}%`,
          borderColor: "var(--paper)",
          backgroundImage: `url(${SRC})`,
          backgroundSize: `${LENS.zoom * 100 * (100 / LENS.w)}% auto`,
          backgroundPosition: lensPosition(cx, cy),
          transformOrigin: "right center",
        }}
        transition={reduce ? { duration: 0 } : SPRING}
      >
        <span
          className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[10px] font-medium"
          style={{ background: "var(--paper)", color: "var(--ink)" }}
        >
          <SmartphoneIcon aria-hidden="true" className="size-3" />
          Phone in use
        </span>
      </motion.div>

      {/* Dwell timer: how long the phone has been in use. */}
      <motion.div
        animate={{ opacity: timing ? 1 : 0, y: timing ? 0 : 6 }}
        className="camera-detail absolute z-10 w-[150px] rounded-xl p-2.5 shadow-md"
        initial={false}
        style={{
          ...at(300, 455),
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <span className="flex items-baseline justify-between text-[10.5px] font-medium">
          In use for
          <span className="text-[15px] font-medium tabular-nums">
            <Counter
              duration={2.6}
              format={(v) => `${Math.round(v)} s`}
              key={cycle}
              run={running && timing}
              to={14}
            />
          </span>
        </span>
        <span
          className="relative mt-2 block h-1.5 overflow-hidden rounded-full"
          style={{ background: "var(--muted)" }}
        >
          <motion.span
            animate={{ scaleX: timing ? 1 : 0 }}
            className="absolute inset-0 rounded-full"
            initial={false}
            style={{ background: TONES.human.solid, originX: 0 }}
            transition={{ duration: reduce ? 0 : 2.6, ease: "linear" }}
          />
          <span
            className="absolute inset-y-0 left-[70%] w-0.5"
            style={{ background: "var(--ink)" }}
          />
        </span>
        <span
          className="mt-1 flex justify-between text-[9.5px] font-medium"
          style={{ color: "var(--ink-faint)" }}
        >
          <span>0 s</span>
          <span>Alert at 10 s</span>
        </span>
      </motion.div>

      <Tag
        instant={reduce}
        tone={flagged ? "hazard" : "detect"}
        visible={phase >= 1}
        x={PERSON[0]}
        y={PERSON[1] - 9}
      >
        {flagged ? "Distracted" : "Person"}
      </Tag>

      <CamBadge camera="Camera 05" place="Zone C" />
      <EventCard
        icon={<SmartphoneIcon aria-hidden="true" />}
        instant={reduce}
        meta="Phone in use inside a monitored zone · Camera 05"
        show={phase >= 6}
        title="Distracted activity"
      />
    </CameraStage>
  );
}
