"use client";

import { motion } from "framer-motion";
import { ArrowDownToLineIcon, TriangleAlertIcon } from "lucide-react";

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

const LOAD: Box = [561, 52, 184, 472];
const WORKER: Box = [808, 700, 76, 216];
const BYSTANDER: Box = [60, 744, 48, 112];

/** Where the load would land, projected flat onto the ground. */
const ZONE = { cx: 676, cy: 876, rx: 214, ry: 58 };

const DROPS = [
  `M${LOAD[0]} ${LOAD[1] + LOAD[3]} L${ZONE.cx - ZONE.rx} ${ZONE.cy}`,
  `M${LOAD[0] + LOAD[2]} ${LOAD[1] + LOAD[3]} L${ZONE.cx + ZONE.rx} ${ZONE.cy}`,
];

const CHECKS = [
  { label: "Suspended load", onLabel: "Moving", at: 3, tone: "caution" },
  { label: "Danger zone", onLabel: "Projected", at: 4, tone: "caution" },
  { label: "Worker 1", onLabel: "Inside zone", at: 5, tone: "human" },
] as const;

/**
 * The suspended load use-case hero. Ailytics finds the moving load and both
 * workers, projects the drop zone onto the ground, and flags the worker
 * whose feet are inside it. The worker outside the zone raises no alert.
 */
export default function SuspendedLoadHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const found = phase >= 1;
  const checking = phase >= 2;
  const zone = phase >= 4;
  const under = phase >= 5;
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
              pathLength: checking ? 1 : 0,
              opacity: checking ? 1 : 0,
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
        <Frame box={LOAD} instant={reduce} visible={found} />
        <Frame
          box={WORKER}
          instant={reduce}
          offset={6}
          tone={under ? "hazard" : "detect"}
          visible={found}
        />
        <Frame box={BYSTANDER} instant={reduce} offset={6} visible={found} />
      </CamOverlay>

      <Tag instant={reduce} visible={found} x={LOAD[0]} y={LOAD[1] - 9}>
        Suspended load
      </Tag>
      <Tag
        instant={reduce}
        tone={under ? "hazard" : "detect"}
        visible={found}
        x={WORKER[0]}
        y={WORKER[1] - 9}
      >
        {under ? "Worker 1 · Under load" : "Worker 1"}
      </Tag>
      <Tag
        instant={reduce}
        visible={found}
        x={BYSTANDER[0]}
        y={BYSTANDER[1] - 7}
      >
        {phase >= 6 ? "Worker 2 · Outside zone" : "Worker 2"}
      </Tag>

      {/* The drop zone check for this lift. Narrow stages leave it out so it
          does not cover the load; the tags still show each worker's status. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="camera-detail absolute z-10 flex w-[176px] flex-col gap-1.5 rounded-xl p-2 shadow-md @max-[420px]:hidden"
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
          <ArrowDownToLineIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Drop zone check
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

      <CamBadge camera="Camera 03" place="Lifting area" />
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
        meta="Feet inside the projected drop zone"
        show={phase >= 7}
        title="Worker under suspended load"
      />
    </CameraStage>
  );
}
