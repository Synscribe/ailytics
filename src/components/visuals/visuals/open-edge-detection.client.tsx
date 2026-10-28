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

const WORKER: Box = [867, 53, 47, 187];

/** The front of the deck, where it drops into the shaft below. */
const EDGE = "M790 279 L1272 279";
/** The safety buffer, set back from the edge onto the deck. */
const BUFFER = "M790 279 L1272 279 L1272 226 L798 226 Z";

/**
 * The open edge of a deck is traced, then a safety buffer extrudes back from
 * it. The worker on the deck is now inside the buffer and is flagged.
 */
export default function OpenEdgeDetectionVisual() {
  const { ref, phase, reduce } = useLoop(7, 1150);
  const traced = phase >= 1;
  const buffered = phase >= 2;
  const inside = phase >= 3;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/open-edge-shaft.jpg"
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
        x={1080}
        y={283}
        below
      >
        Open edge
      </Tag>
      {/* The tag sits under the worker: the frame starts too near the top
          of the view for a tag above. */}
      <Tag
        below
        instant={reduce}
        tone={inside ? "hazard" : "detect"}
        x={WORKER[0]}
        y={WORKER[1] + WORKER[3] + 4}
      >
        {inside ? "Near open edge" : "Person"}
      </Tag>

      <CamBadge camera="Camera 01" place="Deck edge" />
      <EventCard
        icon={<TriangleAlertIcon aria-hidden="true" />}
        instant={reduce}
        meta="Person inside the edge buffer · Camera 01"
        show={phase >= 4}
        title="Worker near an unprotected edge"
      />
    </CameraStage>
  );
}
