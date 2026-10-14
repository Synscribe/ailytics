"use client";

import { motion } from "framer-motion";
import { TriangleAlertIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  Tag,
  type Box,
} from "./_camera";
import { EASE, useLoop } from "./_kit";

const LOAD: Box = [561, 52, 184, 472];
const WORKER: Box = [808, 700, 76, 216];

/** Where the load would land, projected onto the ground. */
const ZONE = { cx: 676, cy: 876, rx: 214, ry: 58 };

const DROPS = [
  `M${LOAD[0]} ${LOAD[1] + LOAD[3]} L${ZONE.cx - ZONE.rx} ${ZONE.cy}`,
  `M${LOAD[0] + LOAD[2]} ${LOAD[1] + LOAD[3]} L${ZONE.cx + ZONE.rx} ${ZONE.cy}`,
];
const PLUMB = `M${LOAD[0] + LOAD[2] / 2} ${LOAD[1] + LOAD[3]} L${ZONE.cx} ${ZONE.cy}`;

/**
 * The suspended formwork panel is detected, and its drop zone is projected
 * straight down onto the ground. The worker walking there is inside the zone,
 * so his frame turns to a hazard.
 */
export default function UnderLoadDetectionVisual() {
  const { ref, phase, reduce } = useLoop(7, 1150);
  const projecting = phase >= 1;
  const zone = phase >= 2;
  const seen = phase >= 3;
  const under = phase >= 4;
  const draw = { duration: reduce ? 0 : 0.9, ease: EASE };

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/under-load-detection.jpg"
    >
      <CamOverlay>
        {DROPS.map((d) => (
          <motion.path
            animate={{
              pathLength: projecting ? 1 : 0,
              opacity: projecting ? 1 : 0,
            }}
            d={d}
            fill="none"
            initial={false}
            key={d}
            stroke="var(--paper)"
            strokeDasharray="5 6"
            strokeWidth={1.5}
            transition={draw}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <motion.path
          animate={{
            pathLength: projecting ? 1 : 0,
            opacity: projecting ? 1 : 0,
          }}
          d={PLUMB}
          fill="none"
          initial={false}
          stroke="var(--alert)"
          strokeWidth={2}
          transition={draw}
          vectorEffect="non-scaling-stroke"
        />
        <motion.ellipse
          animate={{ opacity: zone ? 1 : 0, scaleY: zone ? 1 : 0.05 }}
          cx={ZONE.cx}
          cy={ZONE.cy}
          fill="var(--alert)"
          fillOpacity={0.24}
          initial={false}
          rx={ZONE.rx}
          ry={ZONE.ry}
          stroke="var(--alert)"
          strokeWidth={2.5}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        <Frame box={LOAD} instant={reduce} />
        <Frame
          box={WORKER}
          instant={reduce}
          tone={under ? "hazard" : "detect"}
          visible={seen}
        />
      </CamOverlay>

      <Tag instant={reduce} x={LOAD[0]} y={LOAD[1] - 9}>
        Suspended load
      </Tag>
      <Tag
        instant={reduce}
        tone="hazard"
        visible={zone}
        x={ZONE.cx - ZONE.rx + 20}
        y={ZONE.cy - ZONE.ry + 6}
      >
        Drop zone
      </Tag>
      <Tag
        instant={reduce}
        tone={under ? "hazard" : "detect"}
        visible={seen}
        x={WORKER[0]}
        y={WORKER[1] - 9}
      >
        {under ? "Under load" : "Person"}
      </Tag>

      <CamBadge camera="Camera 03" place="Lifting area" />
      <EventCard
        className="right-auto w-[54%] sm:right-auto"
        icon={<TriangleAlertIcon aria-hidden="true" />}
        instant={reduce}
        meta="Person in the drop zone · Camera 03"
        show={phase >= 5}
        title="Worker under a suspended load"
      />
    </CameraStage>
  );
}
