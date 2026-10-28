"use client";

import { motion } from "framer-motion";
import { ForkliftIcon, ScanLineIcon } from "lucide-react";

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

const FORKLIFT: Box = [214, 130, 316, 372];
const PEDESTRIAN: Box = [608, 398, 132, 242];

/**
 * The danger area on the warehouse floor, in still pixels: an ellipse around
 * the forklift, turned to follow its direction of travel.
 */
const AREA = { cx: 440, cy: 470, rx: 330, ry: 150, angle: 28 };

/** From the fork tips to the pedestrian's feet. */
const MEASURE = { x1: 505, y1: 500, x2: 668, y2: 632 };

const CHECKS = [
  { label: "Forklift", onLabel: "Moving", at: 2, tone: "positive" },
  { label: "Danger area", onLabel: "Active", at: 3, tone: "caution" },
  { label: "Pedestrian", onLabel: "1.8 m away", at: 5, tone: "human" },
] as const;

/**
 * The pedestrian detection use-case hero. Ailytics finds a forklift and a
 * pedestrian on a warehouse floor. When the forklift moves, a danger area
 * switches on around it, the distance to the pedestrian is measured on the
 * ground, and the pedestrian inside the area is flagged.
 */
export default function PedestrianHeroVisual() {
  const { ref, phase, reduce } = useLoop(9, 1000);
  const found = phase >= 1;
  const checking = phase >= 2;
  const moving = phase >= 2;
  const armed = phase >= 3;
  const measured = phase >= 4;
  const inside = phase >= 5;
  const { cx, cy, rx, ry, angle } = AREA;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/warehouse-forklift.jpg"
    >
      <CamOverlay>
        <motion.g
          animate={{ opacity: armed ? 1 : 0, scale: armed ? 1 : 0.3 }}
          initial={false}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        >
          <ellipse
            cx={cx}
            cy={cy}
            fill="var(--alert)"
            fillOpacity={0.2}
            rx={rx}
            ry={ry}
            stroke="var(--alert)"
            strokeWidth={2.5}
            transform={`rotate(${angle} ${cx} ${cy})`}
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
        <motion.line
          animate={{ pathLength: measured ? 1 : 0, opacity: measured ? 1 : 0 }}
          initial={false}
          stroke="var(--paper)"
          strokeDasharray="6 6"
          strokeLinecap="round"
          strokeWidth={2.5}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          vectorEffect="non-scaling-stroke"
          {...MEASURE}
        />
        <Frame box={FORKLIFT} instant={reduce} offset={6} visible={found} />
        <Frame
          box={PEDESTRIAN}
          instant={reduce}
          offset={6}
          tone={inside ? "hazard" : "detect"}
          visible={found}
        />
      </CamOverlay>

      <Tag instant={reduce} visible={found} x={FORKLIFT[0]} y={FORKLIFT[1] - 9}>
        Forklift
        <StatePill
          instant={reduce}
          offLabel="Idle"
          on={moving}
          onLabel="Moving"
          onTone="positive"
        />
      </Tag>
      <Tag
        below
        instant={reduce}
        tone="hazard"
        visible={measured}
        x={520}
        y={590}
      >
        1.8 m
      </Tag>
      <Tag
        below
        instant={reduce}
        tone={inside ? "hazard" : "detect"}
        visible={found}
        x={PEDESTRIAN[0]}
        y={PEDESTRIAN[1] + PEDESTRIAN[3] + 4}
      >
        {inside ? "Pedestrian · Too close" : "Pedestrian"}
      </Tag>

      {/* The proximity check for this forklift. Narrow stages leave it out
          so it does not cover the pedestrian; the tags still show it. */}
      <motion.div
        animate={{ opacity: checking ? 1 : 0, x: checking ? 0 : 8 }}
        className="camera-detail absolute z-10 flex w-[176px] flex-col gap-1.5 rounded-xl p-2 shadow-md @max-[420px]:hidden"
        initial={false}
        style={{
          right: "3%",
          top: "38%",
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
          Proximity check
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

      <CamBadge camera="Camera 05" place="Warehouse floor" />
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
        icon={<ForkliftIcon aria-hidden="true" />}
        instant={reduce}
        meta="1.8 m from a moving forklift"
        show={phase >= 7}
        title="Pedestrian too close to a forklift"
      />
    </CameraStage>
  );
}
