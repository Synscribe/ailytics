"use client";

import { motion } from "framer-motion";
import { FactoryIcon, HardHatIcon } from "lucide-react";

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

const FORKLIFT: Box = [214, 134, 316, 364];
const WORKER: Box = [606, 396, 140, 248];

const CHECKS = [
  { label: "Forklift 01", onLabel: "Idle 18 min", at: 2, tone: "caution" },
  { label: "Forklift distance", onLabel: "Clear", at: 3, tone: "positive" },
  { label: "Smoke and fire", onLabel: "None", at: 4, tone: "positive" },
  { label: "Hi-vis vest", onLabel: "Missing", at: 5, tone: "human" },
] as const;

/**
 * The manufacturing industry hero. One camera on a workshop floor logs how
 * long the forklift has been idle, checks how far the worker is from it,
 * looks for smoke or fire, and checks the worker's PPE. The worker has no
 * hi-vis vest, so it ends on one alert.
 */
export default function ManufacturingHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const found = phase >= 1;
  const checking = phase >= 2;
  const flagged = phase >= 5;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/warehouse-forklift.jpg"
    >
      <CamOverlay>
        <Frame box={FORKLIFT} instant={reduce} offset={6} visible={found} />
        <Frame
          box={WORKER}
          instant={reduce}
          offset={6}
          tone={flagged ? "hazard" : "detect"}
          visible={found}
        />
      </CamOverlay>

      <Tag instant={reduce} visible={found} x={FORKLIFT[0]} y={FORKLIFT[1] - 9}>
        Forklift 01
      </Tag>
      <Tag
        below
        instant={reduce}
        tone={flagged ? "hazard" : "detect"}
        visible={found}
        x={WORKER[0]}
        y={WORKER[1] + WORKER[3] + 4}
      >
        {flagged ? "Worker · No hi-vis vest" : "Worker"}
      </Tag>

      {/* Everything this one camera checks on the workshop floor. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="camera-detail absolute z-10 flex w-[184px] flex-col gap-1.5 rounded-xl p-2 shadow-md"
        initial={false}
        style={{
          right: "3%",
          top: "16%",
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 px-0.5 text-[10.5px] font-medium">
          <FactoryIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Workshop floor checks
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

      <CamBadge camera="Camera 02" place="Workshop floor" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-medium whitespace-nowrap"
            style={{ background: TONES.human.tint, color: TONES.human.fg }}
          >
            Alert sent
          </span>
        }
        icon={<HardHatIcon aria-hidden="true" />}
        instant={reduce}
        meta="Worker on the forklift floor without a hi-vis vest"
        show={phase >= 7}
        title="Missing PPE on the workshop floor"
      />
    </CameraStage>
  );
}
