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

const WORKER: Box = [474, 512, 62, 134];

/** The unprotected slab edge, traced along the opening. */
const EDGE = "M372 690 L548 664 L652 650 L700 566";
/** The safety buffer, offset back from the edge onto the slab. */
const BUFFER =
  "M372 690 L548 664 L652 650 L700 566 L640 520 L560 586 L380 612 Z";

/**
 * The open edge of a slab is traced, then a safety buffer extrudes back from
 * it. The worker on the slab is now inside the buffer and is flagged.
 */
export default function OpenEdgeDetectionVisual() {
  const { ref, phase, reduce } = useLoop(7, 1150);
  const traced = phase >= 1;
  const buffered = phase >= 2;
  const inside = phase >= 3;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/open-edge-detection.jpg"
    >
      <CamOverlay>
        <motion.path
          animate={{ opacity: buffered ? 1 : 0 }}
          d={BUFFER}
          fill="var(--alert)"
          fillOpacity={0.26}
          initial={false}
          stroke="var(--alert)"
          strokeDasharray="6 6"
          strokeWidth={1.5}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          animate={{ pathLength: traced ? 1 : 0 }}
          d={EDGE}
          fill="none"
          initial={false}
          stroke="var(--alert)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          transition={{ duration: reduce ? 0 : 1, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        <Frame
          box={WORKER}
          instant={reduce}
          tone={inside ? "hazard" : "detect"}
        />
      </CamOverlay>

      <Tag
        instant={reduce}
        tone="hazard"
        visible={traced}
        x={660}
        y={672}
        below
      >
        Open edge
      </Tag>
      <Tag
        instant={reduce}
        tone={inside ? "hazard" : "detect"}
        x={WORKER[0]}
        y={WORKER[1] - 9}
      >
        {inside ? "Near open edge" : "Person"}
      </Tag>

      <CamBadge camera="Camera 08" place="Level 5 slab" />
      <EventCard
        icon={<TriangleAlertIcon aria-hidden="true" />}
        instant={reduce}
        meta="Person inside the edge buffer · Camera 08"
        show={phase >= 4}
        title="Worker near an unprotected edge"
      />
    </CameraStage>
  );
}
