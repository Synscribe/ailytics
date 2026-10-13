"use client";

import { motion } from "framer-motion";
import { CheckIcon, ConstructionIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  StatePill,
  Tag,
  at,
  type Box,
} from "./_camera";
import { EASE, TONES, useLoop } from "./_kit";

const WORKER: Box = [78, 342, 168, 552];
const EXCAVATOR: Box = [505, 288, 345, 316];
const ZONE = "470,600 880,600 930,700 430,700";

const CHECKS = [
  { label: "Hard hat", at: 3 },
  { label: "Safety vest", at: 3 },
  { label: "Excavator distance", at: 4 },
  { label: "Site gate", at: 5 },
];

/**
 * The construction industry hero. One site-entrance camera covers several
 * checks at once: the worker's PPE, how close he is to a working excavator,
 * and whether the gate is closed. Everything here is safe, so it ends on a
 * clear result.
 */
export default function ConstructionHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const checking = phase >= 2;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/construction-hero.jpg"
    >
      <CamOverlay>
        <motion.polygon
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          fill="var(--signal)"
          fillOpacity={0.16}
          initial={false}
          points={ZONE}
          stroke="var(--signal)"
          strokeDasharray="10 8"
          strokeWidth={2}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        <Frame box={WORKER} instant={reduce} visible={phase >= 1} />
        <Frame box={EXCAVATOR} instant={reduce} visible={phase >= 2} />
      </CamOverlay>

      <Tag
        instant={reduce}
        visible={phase >= 1}
        x={WORKER[0]}
        y={WORKER[1] - 9}
      >
        {phase >= 3 ? "Worker · PPE on" : "Worker"}
      </Tag>
      <Tag
        instant={reduce}
        visible={phase >= 2}
        x={EXCAVATOR[0]}
        y={EXCAVATOR[1] - 9}
      >
        Excavator
      </Tag>
      <Tag instant={reduce} visible={phase >= 4} x={430} y={700} below>
        Machine danger area
      </Tag>

      {/* Everything this one camera checks at the site entrance. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="absolute z-10 flex w-[178px] flex-col gap-1.5 rounded-xl p-2 shadow-md"
        initial={false}
        style={{
          ...at(930, 110),
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 px-0.5 text-[10.5px] font-semibold">
          <ConstructionIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Site entrance checks
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
              onLabel={item.label === "Site gate" ? "Closed" : "OK"}
              onTone="positive"
            />
          </span>
        ))}
      </motion.div>

      <CamBadge camera="Camera 02" place="Site entrance" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-semibold whitespace-nowrap"
            style={{
              background: TONES.positive.tint,
              color: TONES.positive.fg,
            }}
          >
            No alerts
          </span>
        }
        icon={<CheckIcon aria-hidden="true" />}
        instant={reduce}
        meta="PPE, machine distance and gate checked on one camera"
        show={phase >= 6}
        title="Site entrance is safe"
        tone="positive"
      />
    </CameraStage>
  );
}
