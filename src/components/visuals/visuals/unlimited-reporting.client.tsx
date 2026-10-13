"use client";

import { motion } from "framer-motion";
import { FileTextIcon } from "lucide-react";
import Image from "next/image";

import {
  EASE,
  INSET,
  LINE,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Sample rows only. The plate is labelled as a sample report. */
const ROWS = [
  {
    what: "Missing hard hat",
    where: "Zone A · Camera 02",
    time: "06:52",
    frame: "/media/ailytics/feature-report-event-low-light.jpg",
  },
  {
    what: "Missing vest",
    where: "Gate 2 · Camera 04",
    time: "10:15",
    frame: "/media/ailytics/feature-report-event-vest.jpg",
  },
  {
    what: "Missing hard hat",
    where: "Gate 2 · Camera 04",
    time: "14:03",
    frame: "/media/ailytics/feature-report-event-hard-hat.jpg",
  },
];

/**
 * An on-demand report builds itself: a progress bar runs, recorded PPE events
 * print into the document one row at a time with their evidence frame, and
 * the file stamps ready to share.
 */
export default function UnlimitedReportingVisual() {
  const { ref, phase, cycle, reduce } = useLoop(7, 1100);
  const printed = Math.max(0, Math.min(phase - 1, ROWS.length));
  const ready = phase >= 5;
  const accent = TONES.system;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          lead={
            <span
              className="grid size-7 flex-none place-items-center rounded-lg"
              style={{ background: INSET, color: accent.fg }}
            >
              <FileTextIcon aria-hidden="true" className="size-3.5" />
            </span>
          }
          title="PPE events report"
          badge={<Pill tone="neutral">Sample</Pill>}
        />

        <div
          className="mb-2.5 hidden items-center gap-2 text-[10.5px] font-medium xl:flex"
          style={{ color: MUTED }}
        >
          <span
            className="rounded-md px-2 py-0.5"
            style={{ background: INSET }}
          >
            Last 7 days
          </span>
          <span
            className="rounded-md px-2 py-0.5"
            style={{ background: INSET }}
          >
            All work areas
          </span>
        </div>

        <span
          className="relative mb-3 block h-1 overflow-hidden rounded-full"
          style={{ background: INSET }}
        >
          <motion.span
            key={cycle}
            animate={{ scaleX: 1 }}
            className="absolute inset-0 rounded-full"
            initial={{ scaleX: reduce ? 1 : 0 }}
            style={{ background: "var(--ink)", originX: 0 }}
            transition={{
              duration: reduce ? 0 : 4.4,
              ease: "linear",
              delay: reduce ? 0 : 0.4,
            }}
          />
        </span>

        <div className="flex flex-col">
          {ROWS.map((row, index) => {
            const on = index < printed;
            return (
              <div
                className="relative flex items-center gap-2.5 overflow-hidden border-t py-2"
                key={row.time}
                style={{ borderColor: LINE }}
              >
                <motion.span
                  animate={{
                    opacity: on ? 1 : 0,
                    y: on ? 0 : 8,
                    filter: on ? "blur(0px)" : "blur(6px)",
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2.5"
                  initial={false}
                  transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                >
                  <span
                    className="relative h-7 w-10 flex-none overflow-hidden rounded-md"
                    style={{ background: INSET }}
                  >
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="40px"
                      src={row.frame}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-semibold">
                      {row.what}
                    </span>
                    <span
                      className="block truncate text-[10px] font-medium"
                      style={{ color: MUTED }}
                    >
                      {row.where}
                    </span>
                  </span>
                  <span
                    className="text-[10.5px] font-semibold tabular-nums"
                    style={{ color: MUTED }}
                  >
                    {row.time}
                  </span>
                </motion.span>
                {!on ? (
                  <span
                    className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                    style={{ background: INSET }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          className="flex items-center justify-between border-t pt-2.5"
          style={{ borderColor: LINE }}
        >
          <span className="text-[10.5px] font-medium" style={{ color: MUTED }}>
            Frames attached as evidence
          </span>
          <motion.span
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.6 }}
            className="rounded-full px-2.5 py-[3px] text-[10.5px] font-semibold"
            initial={false}
            style={{
              background: TONES.positive.tint,
              color: TONES.positive.fg,
            }}
            transition={reduce ? { duration: 0 } : SPRING}
          >
            PDF ready
          </motion.span>
        </div>
      </Plate>
    </VisualFrame>
  );
}
