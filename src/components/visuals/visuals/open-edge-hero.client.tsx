"use client";

import { motion } from "framer-motion";
import { ScanLineIcon, TriangleAlertIcon } from "lucide-react";

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
import { EASE, TONES, useLoop } from "./_kit";

/** The two workers standing at the deck edge. */
const WORKERS: Box[] = [
  [867, 53, 47, 187],
  [828, 72, 40, 168],
];
const BYSTANDERS: Box[] = [
  [1080, 23, 60, 93],
  [1195, 0, 53, 96],
];

/** The front of the deck, where it drops into the shaft below. */
const EDGE = "M790 279 L1272 279";
/** The safety buffer, set back from the edge onto the deck. */
const BUFFER = "M790 279 L1272 279 L1272 226 L798 226 Z";

const CHECKS = [
  { label: "Open edge", onLabel: "Traced", at: 3, tone: "caution" },
  { label: "Safety buffer", onLabel: "Active", at: 4, tone: "caution" },
  { label: "Workers 1 and 2", onLabel: "Inside buffer", at: 5, tone: "human" },
] as const;

/**
 * The open edge use-case hero. Ailytics finds the workers on the deck,
 * traces its unprotected edge over the shaft, sets a safety buffer back from
 * it, and flags the two workers standing inside the buffer. Workers further
 * back raise no alert.
 */
export default function OpenEdgeHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const found = phase >= 1;
  const checking = phase >= 2;
  const traced = phase >= 3;
  const buffered = phase >= 4;
  const inside = phase >= 5;

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
        {WORKERS.map((box) => (
          <Frame
            box={box}
            instant={reduce}
            key={box.join()}
            offset={6}
            tone={inside ? "hazard" : "detect"}
            visible={found}
          />
        ))}
        {BYSTANDERS.map((box) => (
          <Frame
            box={box}
            instant={reduce}
            key={box.join()}
            offset={6}
            visible={found}
          />
        ))}
      </CamOverlay>

      <Tag
        below
        instant={reduce}
        tone="hazard"
        visible={traced}
        x={1080}
        y={283}
      >
        Open edge
      </Tag>
      {/* Tags sit under the workers: their frames start too near the top
          of the view for a tag above. */}
      <Tag
        below
        instant={reduce}
        tone={inside ? "hazard" : "detect"}
        visible={found}
        x={WORKERS[1][0]}
        y={WORKERS[1][1] + WORKERS[1][3] + 4}
      >
        {inside ? "Workers 1 and 2 · Near edge" : "Workers 1 and 2"}
      </Tag>
      <Tag
        below
        instant={reduce}
        visible={found}
        x={BYSTANDERS[0][0]}
        y={BYSTANDERS[0][1] + BYSTANDERS[0][3] + 4}
      >
        {phase >= 6 ? "Worker 3 · Clear" : "Worker 3"}
      </Tag>

      {/* The edge check for this deck. Narrow stages leave it out so it does
          not cover the edge; the tags still show each worker's status. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="camera-detail absolute z-10 flex w-[176px] flex-col gap-1.5 rounded-xl p-2 shadow-md @max-[420px]:hidden"
        initial={false}
        style={{
          right: "3%",
          top: "42%",
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 px-0.5 text-[10.5px] font-medium">
          <ScanLineIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Edge check
        </span>
        {CHECKS.map((item) => (
          <span
            className="flex items-center justify-between gap-2 rounded-lg px-1.5 py-1 text-[10.5px] font-medium whitespace-nowrap"
            key={item.label}
            style={{ background: "var(--muted)" }}
          >
            {item.label}
            <StatePill
              instant={reduce}
              offLabel="Checking"
              on={phase >= item.at}
              onLabel={item.onLabel}
              onTone={item.tone}
            />
          </span>
        ))}
      </motion.div>

      <CamBadge camera="Camera 01" place="Deck edge" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-medium whitespace-nowrap"
            style={{ background: TONES.human.tint, color: TONES.human.fg }}
          >
            Alert sent
          </span>
        }
        className="right-auto w-[60%] sm:right-auto"
        icon={<TriangleAlertIcon aria-hidden="true" />}
        instant={reduce}
        meta="Two workers inside the safety buffer at the deck edge"
        show={phase >= 7}
        title="Workers near an unprotected edge"
      />
    </CameraStage>
  );
}
