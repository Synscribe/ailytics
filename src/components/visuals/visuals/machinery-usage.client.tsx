"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  Counter,
  INSET,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Sample day for one machine: working and idle spans, in hours from 07:00. */
const SPANS = [
  { from: 0, to: 1.5, working: true },
  { from: 1.5, to: 2.25, working: false },
  { from: 2.25, to: 4.5, working: true },
  { from: 4.5, to: 5.5, working: false },
  { from: 5.5, to: 8, working: true },
  { from: 8, to: 8.75, working: false },
  { from: 8.75, to: 10, working: true },
] as const;

const DAY = 10;
const RUN_S = 5.2;

const total = (working: boolean) =>
  SPANS.filter((s) => s.working === working).reduce(
    (sum, s) => sum + s.to - s.from,
    0,
  );

const WORKING = total(true);
const IDLE = total(false);

/**
 * A playhead runs through one machine's working day. Behind it, the camera's
 * reading paints the timeline working or idle, and the totals count up to the
 * day's utilisation.
 */
export default function MachineryUsageVisual() {
  const { ref, cycle, running, reduce } = useLoop(6, 1300);
  const accent = TONES.positive;
  const run = running;
  const fade = { duration: reduce ? 0 : RUN_S, ease: "linear" as const };

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          lead={
            <span
              className="relative size-9 flex-none overflow-hidden rounded-lg"
              style={{ background: INSET }}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="36px"
                src="/media/ailytics/stills/machinery-proximity.jpg"
              />
            </span>
          }
          title="Forklift 02 · Loading bay"
          badge={<Pill tone="neutral">Sample data</Pill>}
        />

        <div className="mb-3 grid grid-cols-3 gap-2">
          <Stat
            label="Utilisation"
            run={run}
            cycle={cycle}
            to={(WORKING / DAY) * 100}
            suffix="%"
          />
          <Stat
            label="Working"
            run={run}
            cycle={cycle}
            to={WORKING}
            suffix=" h"
            decimals
          />
          <Stat
            label="Idle"
            run={run}
            cycle={cycle}
            to={IDLE}
            suffix=" h"
            decimals
            muted
          />
        </div>

        {/* The day's timeline, painted behind the playhead. */}
        <div className="relative">
          <div
            className="relative h-7 overflow-hidden rounded-lg"
            style={{ background: INSET }}
          >
            <motion.div
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              className="absolute inset-0"
              initial={{
                clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              }}
              key={cycle}
              transition={fade}
            >
              {SPANS.map((s) => (
                <span
                  className="absolute inset-y-1"
                  key={s.from}
                  style={{
                    left: `${(s.from / DAY) * 100}%`,
                    width: `calc(${((s.to - s.from) / DAY) * 100}% - 2px)`,
                    marginLeft: 1,
                    borderRadius: 5,
                    background: s.working
                      ? accent.solid
                      : "color-mix(in srgb, var(--ink-faint) 40%, var(--paper))",
                  }}
                />
              ))}
            </motion.div>
          </div>
          <motion.span
            animate={{ left: "100%" }}
            className="absolute -top-1 -bottom-1 w-0.5 -translate-x-1/2 rounded-full"
            initial={{ left: reduce ? "100%" : "0%" }}
            key={`head-${cycle}`}
            style={{ background: "var(--ink)" }}
            transition={fade}
          />
        </div>
        <div
          className="mt-1.5 flex justify-between text-[10px] font-medium tabular-nums"
          style={{ color: MUTED }}
        >
          {["07:00", "09:30", "12:00", "14:30", "17:00"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div
          className="mt-3 flex items-center gap-3 text-[10.5px] font-medium"
          style={{ color: MUTED }}
        >
          <span className="flex items-center gap-1.5">
            <i
              className="size-2 rounded-sm"
              style={{ background: accent.solid }}
            />{" "}
            Working
          </span>
          <span className="flex items-center gap-1.5">
            <i
              className="size-2 rounded-sm"
              style={{
                background:
                  "color-mix(in srgb, var(--ink-faint) 40%, var(--paper))",
              }}
            />{" "}
            Idle
          </span>
          <span className="ml-auto">From Camera 02</span>
        </div>
      </Plate>
    </VisualFrame>
  );
}

function Stat({
  label,
  to,
  suffix,
  run,
  cycle,
  decimals = false,
  muted = false,
}: {
  label: string;
  to: number;
  suffix: string;
  run: boolean;
  cycle: number;
  decimals?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="rounded-xl px-2.5 py-2" style={{ background: INSET }}>
      <span className="block text-[10px] font-medium" style={{ color: MUTED }}>
        {label}
      </span>
      <span
        className="block text-[18px] leading-tight font-medium tracking-[-0.02em]"
        style={{ color: muted ? "var(--ink-muted)" : "var(--ink)" }}
      >
        <Counter
          duration={RUN_S}
          format={(v) => `${decimals ? v.toFixed(1) : Math.round(v)}${suffix}`}
          key={cycle}
          run={run}
          to={to}
        />
      </span>
    </div>
  );
}
