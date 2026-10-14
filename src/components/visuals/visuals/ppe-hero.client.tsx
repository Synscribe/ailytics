"use client";

import { motion } from "framer-motion";
import { CheckIcon, HardHatIcon } from "lucide-react";

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

const FRONT: Box = [548, 236, 146, 396];
const HAT: Box = [594, 234, 50, 32];
const VEST: Box = [578, 330, 90, 142];
const OTHERS: { box: Box; label: string; below: boolean }[] = [
  { box: [990, 100, 80, 230], label: "Worker 2", below: true },
  { box: [896, 244, 52, 92], label: "Worker 3", below: false },
];

const ITEMS = [
  { label: "Hard hat", at: 3 },
  { label: "Safety vest", at: 4 },
  { label: "Gloves", at: 5 },
];

/**
 * The PPE use-case hero. Ailytics finds every worker on one camera, checks
 * the front worker head to toe, then clears the other two. Everyone in this
 * frame is wearing PPE, so the outcome is a clear check, and the card says
 * what happens when an item is missing.
 */
export default function PpeHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const found = phase >= 1;
  const checking = phase >= 2;
  const cleared = phase >= 5;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/ppe-hero.jpg">
      <CamOverlay>
        <Frame box={HAT} instant={reduce} visible={phase >= 3} offset={5} />
        <Frame box={VEST} instant={reduce} visible={phase >= 4} offset={6} />
        <Frame box={FRONT} instant={reduce} visible={found} />
        {OTHERS.map((worker) => (
          <Frame
            box={worker.box}
            instant={reduce}
            key={worker.label}
            offset={6}
            visible={found}
          />
        ))}
      </CamOverlay>

      <Tag instant={reduce} visible={found} x={FRONT[0]} y={FRONT[1] - 9}>
        {cleared ? "Worker 1 · PPE on" : "Worker 1"}
      </Tag>
      {OTHERS.map((worker) => (
        <Tag
          instant={reduce}
          key={worker.label}
          visible={found}
          x={worker.box[0]}
          y={worker.below ? worker.box[1] + worker.box[3] : worker.box[1] - 7}
          below={worker.below}
        >
          {phase >= 6 ? `${worker.label} · PPE on` : worker.label}
        </Tag>
      ))}

      {/* The head-to-toe check for the front worker. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="camera-detail absolute z-10 flex w-[150px] flex-col gap-1.5 rounded-xl p-2 shadow-md"
        initial={false}
        style={{
          right: "3%",
          top: "24%",
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 px-0.5 text-[10.5px] font-medium">
          <HardHatIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Worker 1 PPE check
        </span>
        {ITEMS.map((item) => (
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
              onLabel="Worn"
              onTone="positive"
            />
          </span>
        ))}
      </motion.div>

      <CamBadge camera="Camera 03" place="Basement level" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-medium whitespace-nowrap"
            style={{
              background: TONES.positive.tint,
              color: TONES.positive.fg,
            }}
          >
            3 of 3 compliant
          </span>
        }
        icon={<CheckIcon aria-hidden="true" />}
        instant={reduce}
        meta="If an item is missing, the supervisor gets an alert"
        show={phase >= 7}
        title="Every worker on this camera is wearing PPE"
        tone="positive"
      />
    </CameraStage>
  );
}
