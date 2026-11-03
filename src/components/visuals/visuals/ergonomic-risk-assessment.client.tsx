"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon, LightbulbIcon } from "lucide-react";

import {
  Counter,
  EASE,
  INSET,
  LINE,
  MUTED,
  Plate,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/**
 * Sample week of bent-back lifts per work area, laid out like the platform's
 * dashboards. Illustrative values only.
 */
const SCALE = 80;

const AREAS = [
  { name: "Packing line 3", camera: "Camera 05", lifts: 68 },
  { name: "Goods in", camera: "Camera 01", lifts: 41 },
  { name: "Line 2 loading", camera: "Camera 06", lifts: 29 },
  { name: "Returns bench", camera: "Camera 09", lifts: 18 },
  { name: "Picking aisle 4", camera: "Camera 03", lifts: 9 },
  { name: "Dispatch", camera: "Camera 02", lifts: 6 },
] as const;

const TOTAL = AREAS.reduce((sum, area) => sum + area.lifts, 0);

/** Risk levels by bent-back lifts per week. Each carries a label, never colour alone. */
const LEVELS = {
  high: { label: "High risk", tone: TONES.human },
  medium: { label: "Medium", tone: TONES.caution },
  low: { label: "Low", tone: TONES.positive },
} as const;

const levelOf = (lifts: number) =>
  lifts >= 35 ? LEVELS.high : lifts >= 15 ? LEVELS.medium : LEVELS.low;

const HIGH_RISK = AREAS.filter((area) => levelOf(area.lifts) === LEVELS.high);
const TOP = AREAS[0];

/**
 * Ergonomic risk assessment from existing cameras. The summary counts up,
 * each work area's bar of bent-back lifts grows, the rows are rated, and the
 * area with the most risky lifts is picked out for review.
 */
export default function ErgonomicRiskAssessmentVisual() {
  const { ref, phase, cycle, reduce, running } = useLoop(6, 1300);
  const counted = phase >= 1;
  const grown = phase >= 2;
  const rated = phase >= 3;
  const picked = phase >= 4;

  return (
    <VisualFrame innerRef={ref}>
      <Plate
        className="w-[520px] p-3.5 sm:p-3.5"
        maxWidth="520px"
        minScale={0.5}
      >
        {/* Header: page title and filters. */}
        <div className="mb-2.5 flex items-start gap-2">
          <div className="min-w-0">
            <span
              className="block text-[9.5px] font-medium"
              style={{ color: MUTED }}
            >
              Ergonomics
            </span>
            <span className="block text-[15px] leading-tight font-medium tracking-[-0.01em]">
              Ergonomic risk assessment
            </span>
          </div>
          <span className="ml-auto flex flex-none gap-1.5">
            <Select>Last 7 days</Select>
            <Select>All areas</Select>
          </span>
        </div>

        {/* Summary cards */}
        <div className="mb-2.5 grid grid-cols-4 gap-1.5">
          <Card label="Bent-back lifts" note="this week">
            {counted ? (
              <Counter key={`l-${cycle}`} run={running} to={TOTAL} />
            ) : (
              "–"
            )}
          </Card>
          <Card label="Areas assessed" note="6 cameras">
            {counted ? (
              <Counter key={`a-${cycle}`} run={running} to={AREAS.length} />
            ) : (
              "–"
            )}
          </Card>
          <Card label="High-risk areas" note="35+ risky lifts" alert>
            {counted ? (
              <Counter key={`h-${cycle}`} run={running} to={HIGH_RISK.length} />
            ) : (
              "–"
            )}
          </Card>
          <Card label="Highest risk" note={TOP.camera} strong>
            {counted ? (
              <span className="block truncate text-[13px] leading-[1.7]">
                {TOP.name}
              </span>
            ) : (
              "–"
            )}
          </Card>
        </div>

        {/* Bent-back lifts per work area */}
        <div
          className="rounded-lg border"
          style={{ borderColor: LINE, background: "var(--paper)" }}
        >
          <div className="border-b px-2.5 py-1.5" style={{ borderColor: LINE }}>
            <span className="block text-[11px] font-medium">
              Bent-back lifts by work area
            </span>
            <span
              className="block truncate text-[8.5px] font-medium"
              style={{ color: MUTED }}
            >
              back bent past the safe limit while lifting · this week
            </span>
          </div>

          <div className="flex flex-col gap-1 px-2.5 pt-2 pb-1.5">
            {AREAS.map((area, i) => {
              const level = levelOf(area.lifts);
              const top = area === TOP;
              return (
                <motion.div
                  animate={{
                    background:
                      picked && top
                        ? `color-mix(in srgb, ${TONES.human.solid} 9%, transparent)`
                        : "rgba(0,0,0,0)",
                  }}
                  className="-mx-1 flex h-[25px] items-center gap-1.5 rounded-md px-1"
                  initial={false}
                  key={area.name}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                >
                  <span className="w-[92px] flex-none leading-tight">
                    <span className="block truncate text-[10px] font-medium">
                      {area.name}
                    </span>
                    <span
                      className="block truncate text-[8.5px] font-medium"
                      style={{ color: MUTED }}
                    >
                      {area.camera}
                    </span>
                  </span>
                  <span
                    className="relative h-[12px] min-w-0 flex-1 rounded-[3px]"
                    style={{ background: INSET }}
                  >
                    <motion.span
                      animate={{
                        width: grown ? `${(area.lifts / SCALE) * 100}%` : "0%",
                      }}
                      className="absolute inset-y-0 left-0 rounded-[3px]"
                      initial={false}
                      style={{
                        background: rated ? level.tone.solid : MUTED,
                      }}
                      transition={{
                        duration: reduce ? 0 : 0.8,
                        ease: EASE,
                        delay: reduce || !grown ? 0 : i * 0.08,
                      }}
                    />
                  </span>
                  <span className="w-[22px] flex-none text-right text-[9.5px] font-semibold tabular-nums">
                    {grown ? area.lifts : "–"}
                  </span>
                  <span className="relative h-[16px] w-[58px] flex-none">
                    <motion.span
                      animate={{
                        opacity: rated ? 1 : 0,
                        scale: rated ? 1 : 0.6,
                      }}
                      className="absolute inset-0 inline-flex items-center justify-center rounded-full border text-[8.5px] font-medium"
                      initial={false}
                      style={{
                        background: level.tone.tint,
                        color: level.tone.fg,
                        borderColor: `color-mix(in srgb, ${level.tone.solid} 50%, transparent)`,
                      }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { ...SPRING, delay: i * 0.06 }
                      }
                    >
                      {level.label}
                    </motion.span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* The area to review first. */}
        <motion.div
          animate={{ opacity: picked ? 1 : 0, y: picked ? 0 : 6 }}
          className="mt-2 flex items-center gap-2 rounded-lg border px-2.5 py-2"
          initial={false}
          style={{ borderColor: LINE, background: "var(--paper)" }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          <span
            className="grid size-6 flex-none place-items-center rounded-full"
            style={{ background: TONES.caution.tint, color: TONES.caution.fg }}
          >
            <LightbulbIcon aria-hidden="true" className="size-3" />
          </span>
          <span className="min-w-0 text-[10px] leading-snug font-medium">
            Review {TOP.name} first
            <span className="block" style={{ color: MUTED }}>
              {Math.round((TOP.lifts / TOTAL) * 100)}% of this week&apos;s
              bent-back lifts happen there
            </span>
          </span>
        </motion.div>
      </Plate>
    </VisualFrame>
  );
}

function Select({ children }: { children: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md border px-1.5 py-1 text-[9.5px] font-medium whitespace-nowrap"
      style={{ borderColor: LINE }}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-2.5"
        style={{ color: MUTED }}
      />
    </span>
  );
}

function Card({
  label,
  note,
  alert = false,
  strong = false,
  children,
}: {
  label: string;
  note: string;
  alert?: boolean;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-w-0 rounded-lg border px-2 py-1.5"
      style={{ borderColor: LINE, background: "var(--paper)" }}
    >
      <span
        className="block truncate text-[9px] font-medium"
        style={{ color: MUTED }}
      >
        {label}
      </span>
      <span className="block text-[18px] leading-tight font-semibold tracking-[-0.02em]">
        {children}
      </span>
      <span
        className="block truncate text-[8.5px]"
        style={{
          color: alert ? TONES.human.fg : strong ? "var(--ink)" : MUTED,
          fontWeight: alert || strong ? 600 : 500,
        }}
      >
        {note}
      </span>
    </div>
  );
}
