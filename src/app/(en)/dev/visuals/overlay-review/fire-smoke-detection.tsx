"use client";

import styles from "./review.module.css";
import { motion } from "framer-motion";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  Frame,
  Tag,
  type Box,
} from "@/components/visuals/visuals/_camera";
import { EASE, useLoop } from "@/components/visuals/visuals/_kit";

const CELL = 80;
const COLS = 16;
const ROWS = 8;

/**
 * Grid cells over the sky that read as smoke, with the phase each one is
 * first flagged in. The plume is found from its dense core outwards.
 */
const EXTENT: Record<number, readonly [number, number]> = {
  2: [4, 8],
  3: [3, 9],
  4: [3, 10],
  5: [3, 10],
  6: [4, 10],
  7: [6, 10],
};
const SMOKE: Record<string, number> = {};
for (const [row, [from, to]] of Object.entries(EXTENT)) {
  for (let col = from; col <= to; col += 1) {
    const r = Number(row);
    const core = col >= 5 && col <= 8 && r >= 3 && r <= 6;
    SMOKE[`${col}-${r}`] = core ? 1 : 2;
  }
}

const PLUME: Box = [236, 176, 796, 464];

/**
 * The camera watches the skyline in grid cells. Cells that read as smoke
 * light up from the dense core outwards, then merge into one detection frame
 * and raise the alarm.
 */
export default function FireSmokeDetectionVisual() {
  const { ref, phase, reduce } = useLoop(7, 1100);
  const merged = phase >= 3;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/fire-smoke-detection.jpg"
    >
      <CamOverlay>
        <motion.g
          animate={{ opacity: merged ? 0 : 1 }}
          initial={false}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, index) => {
            const c = index % COLS;
            const r = Math.floor(index / COLS);
            const at = SMOKE[`${c}-${r}`];
            const lit = at !== undefined && phase >= at;
            return (
              <motion.rect
                animate={{ opacity: lit ? 1 : phase === 0 ? 0 : 0.5 }}
                fill={lit ? "var(--alert)" : "none"}
                fillOpacity={0.3}
                height={CELL - 6}
                initial={false}
                key={index}
                rx={6}
                stroke={lit ? "var(--alert)" : "var(--paper)"}
                strokeOpacity={lit ? 0.9 : 0.22}
                strokeWidth={1}
                transition={{
                  duration: reduce ? 0 : 0.35,
                  delay: reduce || !lit ? 0 : ((c * 7 + r * 3) % 9) * 0.04,
                }}
                vectorEffect="non-scaling-stroke"
                width={CELL - 6}
                x={c * CELL + 3}
                y={r * CELL + 3}
              />
            );
          })}
        </motion.g>
        <Frame box={PLUME} instant={reduce} tone="hazard" visible={merged} />
      </CamOverlay>

      <Tag
        instant={reduce}
        tone="hazard"
        visible={merged}
        x={PLUME[0]}
        y={PLUME[1] - 9}
      >
        Smoke
      </Tag>

      <CamBadge camera="Camera 11" place="North perimeter" />
      <motion.div
        className={styles.toast}
        initial={false}
        animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 6 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
      >
        <span className={styles.alertDot} />
        <div>
          <strong>Smoke detected</strong>
          <span>Camera 11 · North perimeter</span>
        </div>
      </motion.div>
    </CameraStage>
  );
}
