"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon, LightbulbIcon } from "lucide-react";

import {
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
 * Eight sample weeks of safety events on one warehouse's cameras. Weeks five
 * to seven are peak season, when new temps join the floor. Illustrative
 * values only.
 */
const WEEKS = [12, 14, 11, 13, 33, 41, 36, 24] as const;
const PEAK_FROM = 4;
const PEAK_TO = 6;
const SCALE = 46;

const PEAK_TOTAL = WEEKS.slice(PEAK_FROM, PEAK_TO + 1).reduce(
  (sum, n) => sum + n,
  0,
);

/** The most common events in the peak weeks. */
const TYPES = [
  { name: "Walking in forklift lanes", count: 46 },
  { name: "Too close to a moving forklift", count: 31 },
  { name: "No hi-vis vest", count: 22 },
] as const;

const TOP = TYPES[0];

/**
 * Safety events by week on a warehouse's cameras. The bars grow, the peak
 * weeks when new temps start are marked and rise well above the rest, the
 * event types behind the rise are listed, and the rule to brief new starters
 * on first is picked out.
 */
export default function NewStarterEventsVisual() {
  const { ref, phase, reduce } = useLoop(6, 1300);
  const grown = phase >= 1;
  const marked = phase >= 2;
  const listed = phase >= 3;
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
              Safety events · Sample data
            </span>
            <span className="block text-[15px] leading-tight font-medium tracking-[-0.01em]">
              Rule breaks by week
            </span>
          </div>
          <span className="ml-auto flex flex-none gap-1.5">
            <Select>Last 8 weeks</Select>
            <Select>DC North</Select>
          </span>
        </div>

        {/* Weekly events, with the peak intake weeks marked. */}
        <div
          className="rounded-lg border px-2.5 pt-2 pb-1.5"
          style={{ borderColor: LINE, background: "var(--paper)" }}
        >
          <div className="relative flex h-[118px] items-end gap-[6px] pt-5">
            <motion.span
              animate={{ opacity: marked ? 1 : 0 }}
              className="absolute inset-y-0 rounded-md"
              initial={false}
              style={{
                left: `calc(${(PEAK_FROM / WEEKS.length) * 100}% - 3px)`,
                width: `calc(${((PEAK_TO - PEAK_FROM + 1) / WEEKS.length) * 100}% + 3px)`,
                background: `color-mix(in srgb, ${TONES.caution.solid} 14%, transparent)`,
              }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            >
              <span
                className="absolute top-1 left-1.5 text-[8.5px] font-semibold whitespace-nowrap"
                style={{ color: TONES.caution.fg }}
              >
                New temps start
              </span>
            </motion.span>

            {WEEKS.map((count, i) => {
              const peak = i >= PEAK_FROM && i <= PEAK_TO;
              const labelled = i === 0 || count === Math.max(...WEEKS);
              return (
                <span
                  className="relative flex h-full min-w-0 flex-1 flex-col justify-end"
                  key={i}
                >
                  <motion.span
                    animate={{
                      height: grown ? `${(count / SCALE) * 100}%` : "0%",
                    }}
                    className="relative block rounded-t-[4px]"
                    initial={false}
                    style={{
                      background:
                        marked && peak
                          ? TONES.human.solid
                          : TONES.positive.solid,
                    }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      ease: EASE,
                      delay: reduce || !grown ? 0 : i * 0.06,
                    }}
                  >
                    {labelled ? (
                      <motion.span
                        animate={{ opacity: grown ? 1 : 0 }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold tabular-nums"
                        initial={false}
                        transition={{
                          duration: reduce ? 0 : 0.3,
                          delay: reduce ? 0 : 0.6,
                        }}
                      >
                        {count}
                      </motion.span>
                    ) : null}
                  </motion.span>
                </span>
              );
            })}
          </div>
          <div className="mt-1 flex gap-[6px]">
            {WEEKS.map((_, i) => (
              <span
                className="flex-1 text-center text-[8.5px] font-medium"
                key={i}
                style={{ color: MUTED }}
              >
                W{i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* What the new starters get wrong most often. */}
        <motion.div
          animate={{ opacity: listed ? 1 : 0, y: listed ? 0 : 6 }}
          className="mt-2 rounded-lg border px-2.5 py-1.5"
          initial={false}
          style={{ borderColor: LINE, background: "var(--paper)" }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          <span className="mb-1 block text-[10px] font-medium">
            Top events in the peak weeks
          </span>
          <div className="flex flex-col gap-1">
            {TYPES.map((type, i) => (
              <motion.div
                animate={{
                  background:
                    picked && type === TOP
                      ? `color-mix(in srgb, ${TONES.human.solid} 9%, transparent)`
                      : "rgba(0,0,0,0)",
                }}
                className="-mx-1 flex h-[20px] items-center gap-1.5 rounded-md px-1"
                initial={false}
                key={type.name}
                transition={{ duration: reduce ? 0 : 0.4 }}
              >
                <span className="w-[150px] flex-none truncate text-[9.5px] font-medium">
                  {type.name}
                </span>
                <span
                  className="relative h-[8px] min-w-0 flex-1 rounded-[3px]"
                  style={{ background: INSET }}
                >
                  <motion.span
                    animate={{
                      width: listed
                        ? `${(type.count / TOP.count) * 100}%`
                        : "0%",
                    }}
                    className="absolute inset-y-0 left-0 rounded-[3px]"
                    initial={false}
                    style={{ background: TONES.human.solid }}
                    transition={
                      reduce ? { duration: 0 } : { ...SPRING, delay: i * 0.08 }
                    }
                  />
                </span>
                <span className="w-[22px] flex-none text-right text-[9.5px] font-semibold tabular-nums">
                  {type.count}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The rule to brief new starters on first. */}
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
            Brief new starters on forklift lanes first
            <span className="block" style={{ color: MUTED }}>
              {Math.round((TOP.count / PEAK_TOTAL) * 100)}% of peak-season
              events happened in forklift lanes
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
