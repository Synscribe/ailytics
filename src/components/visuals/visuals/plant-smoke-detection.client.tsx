"use client";

import { motion } from "framer-motion";
import { FlameIcon } from "lucide-react";

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

/** The monitored band of sky above the production hall roofs, in still pixels. */
const WATCH = "M0 36 L1280 36 L1280 262 L0 262 Z";

const PLUME: Box = [950, 106, 102, 100];

/**
 * A camera over a steel plant watches the sky above the production hall
 * roofs. A thin wisp of smoke above the roofline is framed and sent as an
 * alert.
 */
export default function PlantSmokeDetectionVisual() {
  const { ref, phase, reduce } = useLoop(6, 1100);
  const watching = phase >= 1;
  const found = phase >= 2;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/plant-smoke.jpg">
      <CamOverlay>
        <motion.path
          animate={{ opacity: watching ? 1 : 0 }}
          d={WATCH}
          fill="var(--caution)"
          fillOpacity={found ? 0.04 : 0.1}
          initial={false}
          stroke="var(--caution)"
          strokeDasharray="10 8"
          strokeWidth={2}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        <Frame box={PLUME} instant={reduce} tone="hazard" visible={found} />
      </CamOverlay>

      <Tag
        below
        instant={reduce}
        tone="security"
        visible={watching}
        x={24}
        y={266}
      >
        Roofline · Smoke watch
      </Tag>
      <Tag
        instant={reduce}
        tone="hazard"
        visible={found}
        x={PLUME[0]}
        y={PLUME[1] - 9}
      >
        Smoke
      </Tag>

      <CamBadge camera="Camera 11" place="Production halls" />
      <EventCard
        icon={<FlameIcon aria-hidden="true" />}
        instant={reduce}
        meta="Smoke above the production hall roof · Camera 11"
        show={phase >= 3}
        title="Smoke detected"
      />
    </CameraStage>
  );
}
