"use client";

import { motion } from "framer-motion";
import {
  BellRingIcon,
  HardHatIcon,
  PentagonIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";

import {
  EASE,
  INSET,
  LINE,
  MUTED,
  Plate,
  PlateHead,
  Pill,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

const BLOCKS = [
  { kind: "Detect", label: "Person", icon: UserIcon },
  { kind: "Inside zone", label: "Zone B", icon: PentagonIcon },
  { kind: "Missing", label: "Hard hat", icon: HardHatIcon },
  { kind: "For longer than", label: "10 seconds", icon: TimerIcon },
  { kind: "Then", label: "Alert supervisor", icon: BellRingIcon },
] as const;

/**
 * A customer builds their own use case. Detection, zone, condition, timing
 * and action blocks snap into one chain, and the rule saves and starts
 * running on a camera.
 */
export default function CustomUseCasesVisual() {
  const { ref, phase, cycle, reduce } = useLoop(8, 1000);
  const placed = Math.min(phase, BLOCKS.length);
  const saved = phase >= 6;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          title="New use case"
          badge={
            <span className="relative inline-grid">
              <motion.span
                animate={{ opacity: saved ? 0 : 1 }}
                className="col-start-1 row-start-1"
                initial={false}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <Pill tone="neutral">Draft</Pill>
              </motion.span>
              <motion.span
                animate={{ opacity: saved ? 1 : 0, scale: saved ? 1 : 0.6 }}
                className="col-start-1 row-start-1"
                initial={false}
                transition={reduce ? { duration: 0 } : SPRING}
              >
                <Pill tone="positive">Running</Pill>
              </motion.span>
            </span>
          }
        />

        <div className="relative flex flex-col gap-1.5">
          {/* The spine that joins the blocks. */}
          <span
            className="absolute top-4 bottom-4 left-[17px] w-px"
            style={{ background: LINE }}
          />
          <motion.span
            animate={{
              scaleY: reduce
                ? 1
                : Math.max(0, placed - 1) / (BLOCKS.length - 1),
            }}
            className="absolute top-4 bottom-4 left-[17px] w-[2px] -translate-x-[0.5px]"
            initial={false}
            key={`spine-${cycle}`}
            style={{ background: "var(--signal)", originY: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          />
          {BLOCKS.map((block, index) => {
            const on = index < placed;
            const Icon = block.icon;
            const action = index === BLOCKS.length - 1;
            return (
              <div className="relative h-[34px]" key={block.label}>
                {/* Empty socket, then the block snaps into it. */}
                <span
                  className="absolute inset-0 rounded-xl border border-dashed"
                  style={{ borderColor: LINE }}
                />
                <motion.div
                  animate={{
                    opacity: on ? 1 : 0,
                    x: on ? 0 : 42,
                    scale: on ? 1 : 0.96,
                  }}
                  className="absolute inset-0 flex items-center gap-2 rounded-xl border px-1.5 shadow-sm"
                  initial={false}
                  style={{
                    background: action ? "var(--ink)" : "var(--paper)",
                    borderColor: action ? "var(--ink)" : LINE,
                    color: action ? "var(--paper)" : "var(--ink)",
                  }}
                  transition={reduce ? { duration: 0 } : SPRING}
                >
                  <span
                    className="relative z-10 grid size-[22px] flex-none place-items-center rounded-lg"
                    style={{
                      background: action ? "var(--signal)" : INSET,
                      color: action ? "var(--ink)" : TONES.positive.fg,
                    }}
                  >
                    <Icon aria-hidden="true" className="size-3" />
                  </span>
                  <span
                    className="text-[10.5px] font-medium"
                    style={{
                      color: action
                        ? "color-mix(in srgb, var(--paper) 70%, transparent)"
                        : MUTED,
                    }}
                  >
                    {block.kind}
                  </span>
                  <span className="ml-auto pr-1.5 text-[11.5px] font-semibold">
                    {block.label}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          animate={{ opacity: saved ? 1 : 0, y: saved ? 0 : 6 }}
          className="mt-2.5 flex items-center justify-between text-[10.5px] font-medium"
          initial={false}
          style={{ color: MUTED }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
        >
          <span>Applied to Camera 04 · Gate 2</span>
          <span className="font-semibold" style={{ color: TONES.positive.fg }}>
            Saved
          </span>
        </motion.div>
      </Plate>
    </VisualFrame>
  );
}
