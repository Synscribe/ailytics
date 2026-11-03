"use client";

import { motion } from "framer-motion";
import { OctagonAlertIcon } from "lucide-react";

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

/**
 * The keep-clear zone along the full length of the roller conveyor, with a
 * margin on the operator side, in still pixels.
 */
const ZONE = "M898 18 L1012 18 L1130 960 L850 960 Z";

const OUTSIDE: Box[] = [
  [262, 186, 152, 362],
  [518, 4, 146, 240],
];
const INSIDE: Box[] = [
  [966, 4, 124, 126],
  [962, 188, 208, 404],
];

/**
 * A keep-clear zone runs along a roller conveyor on a fabrication line. The
 * two workers beside the rollers are flagged; the workers at the table
 * outside the zone are not.
 */
export default function MachineZoneEntryVisual() {
  const { ref, phase, reduce } = useLoop(8, 1000);
  const drawn = phase >= 1;
  const found = phase >= 2;
  const inside = phase >= 3;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/crowding.jpg">
      <CamOverlay>
        <motion.path
          animate={{ opacity: drawn ? 1 : 0 }}
          d={ZONE}
          fill={inside ? "var(--alert)" : "var(--caution)"}
          fillOpacity={inside ? 0.2 : 0.14}
          initial={false}
          stroke={inside ? "var(--alert)" : "var(--caution)"}
          strokeDasharray={inside ? undefined : "10 8"}
          strokeWidth={2.5}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        {OUTSIDE.map((box) => (
          <Frame
            box={box}
            instant={reduce}
            key={box.join("-")}
            visible={found}
          />
        ))}
        {INSIDE.map((box) => (
          <Frame
            box={box}
            instant={reduce}
            key={box.join("-")}
            tone={inside ? "hazard" : "detect"}
            visible={found}
          />
        ))}
      </CamOverlay>

      <Tag
        below
        instant={reduce}
        tone="security"
        visible={drawn}
        x={850}
        y={700}
      >
        Conveyor · Keep-clear zone
      </Tag>
      {INSIDE.map(([x, y, , h]) => (
        <Tag
          below
          instant={reduce}
          key={`${x}-${y}`}
          tone={inside ? "hazard" : "detect"}
          visible={found}
          x={x}
          y={y + h + 4}
        >
          {inside ? "Worker · Inside zone" : "Worker"}
        </Tag>
      ))}

      <CamBadge camera="Camera 06" place="Fabrication line" />
      <EventCard
        icon={<OctagonAlertIcon aria-hidden="true" />}
        instant={reduce}
        meta="Camera 06 · sent to the line supervisor"
        show={phase >= 4}
        title="2 workers inside the conveyor zone"
      />
    </CameraStage>
  );
}
