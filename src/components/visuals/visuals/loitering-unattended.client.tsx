"use client";

import { motion } from "framer-motion";
import { TimerIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  Tag,
  at,
  type Box,
} from "./_camera";
import { EASE, useLoop } from "./_kit";

const PERSON: Box = [282, 340, 228, 552];

/** Dwell ring on the ground around the person's feet. */
const RING = { cx: 398, cy: 886, rx: 170, ry: 46 };

const STEPS = ["0:00", "0:40", "1:20", "2:00", "2:40", "3:20"];
const LIMIT_STEP = 3;

/**
 * A person stays at a gate. A dwell ring on the ground fills like a clock as
 * the minutes pass, and once it passes the dwell limit the person is flagged
 * as loitering, as a security event.
 */
export default function LoiteringUnattendedVisual() {
  const { ref, phase, cycle, reduce } = useLoop(8, 1000);
  const step = Math.min(Math.max(phase - 1, 0), STEPS.length - 1);
  const watching = phase >= 1;
  const flagged = step >= LIMIT_STEP;
  const { cx, cy, rx, ry } = RING;
  const fill = (step + 1) / STEPS.length;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/loitering-unattended.jpg"
    >
      <CamOverlay>
        <ellipse
          cx={cx}
          cy={cy}
          fill="none"
          rx={rx}
          ry={ry}
          stroke="var(--paper)"
          strokeOpacity={0.55}
          strokeWidth={8}
        />
        <motion.ellipse
          animate={{ pathLength: watching ? fill : 0 }}
          cx={cx}
          cy={cy}
          fill="none"
          initial={false}
          key={`ring-${cycle}`}
          rx={rx}
          ry={ry}
          stroke={flagged ? "var(--caution)" : "var(--signal)"}
          strokeLinecap="round"
          strokeWidth={8}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
        />
        <Frame
          box={PERSON}
          instant={reduce}
          tone={flagged ? "security" : "detect"}
          visible={watching}
        />
      </CamOverlay>

      <Tag
        instant={reduce}
        tone={flagged ? "security" : "detect"}
        visible={watching}
        x={PERSON[0]}
        y={PERSON[1] - 9}
      >
        {flagged ? "Loitering" : "Person"}
      </Tag>

      {/* Dwell clock beside the person. */}
      <motion.div
        animate={{ opacity: watching ? 1 : 0, x: watching ? 0 : -6 }}
        className="camera-detail absolute z-10 flex w-[132px] flex-col gap-1 rounded-xl p-2.5 shadow-md"
        initial={false}
        style={{
          ...at(560, 420),
          background: "var(--paper)",
          color: "var(--ink)",
        }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <span className="flex items-center gap-1.5 text-[10.5px] font-medium">
          <TimerIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
          Time at gate
        </span>
        <span className="text-[20px] leading-none font-medium tracking-[-0.02em] tabular-nums">
          {STEPS[step]}
        </span>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--ink-faint)" }}
        >
          Dwell limit {STEPS[LIMIT_STEP]}
        </span>
      </motion.div>

      <CamBadge camera="Camera 01" place="Gate 2" />
      <EventCard
        icon={<TimerIcon aria-hidden="true" />}
        instant={reduce}
        meta={`At Gate 2 for over ${STEPS[LIMIT_STEP]} · Camera 01`}
        show={phase >= 6}
        title="Person loitering at a gate"
        tone="caution"
      />
    </CameraStage>
  );
}
