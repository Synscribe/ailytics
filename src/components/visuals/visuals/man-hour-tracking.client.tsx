"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import {
  EASE,
  INSET,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Illustrative values only. The plate is labelled as sample data. */
const CLOCK = ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"];

/** Hours into the shift that each clock phase reaches. */
const CUTOFF = [0, 2, 4, 6, 8, 10];
const SHIFT = 10;

type Span = { from: number; to: number; working: boolean };

/** One sample shift per worker in the zone: working and idle spans, in hours from 07:00. */
const WORKERS: { name: string; spans: Span[] }[] = [
  {
    name: "Worker 1",
    spans: [
      { from: 0, to: 2.5, working: true },
      { from: 2.5, to: 3, working: false },
      { from: 3, to: 5, working: true },
      { from: 5, to: 5.75, working: false },
      { from: 5.75, to: 8.25, working: true },
      { from: 8.25, to: 8.75, working: false },
      { from: 8.75, to: 10, working: true },
    ],
  },
  {
    name: "Worker 2",
    spans: [
      { from: 0, to: 1.5, working: true },
      { from: 1.5, to: 2.75, working: false },
      { from: 2.75, to: 5, working: true },
      { from: 5, to: 5.75, working: false },
      { from: 5.75, to: 7, working: true },
      { from: 7, to: 8, working: false },
      { from: 8, to: 10, working: true },
    ],
  },
  {
    name: "Worker 3",
    spans: [
      { from: 0, to: 3.25, working: true },
      { from: 3.25, to: 3.5, working: false },
      { from: 3.5, to: 5, working: true },
      { from: 5, to: 5.75, working: false },
      { from: 5.75, to: 9.5, working: true },
      { from: 9.5, to: 10, working: false },
    ],
  },
];

const IDLE_FILL = "color-mix(in srgb, var(--ink-faint) 40%, var(--paper))";

/** Hours in the given state across every worker, up to the cutoff hour. */
function hoursUpTo(cutoff: number, working: boolean) {
  return WORKERS.reduce(
    (sum, worker) =>
      sum +
      worker.spans
        .filter((s) => s.working === working)
        .reduce((h, s) => h + Math.max(0, Math.min(s.to, cutoff) - s.from), 0),
    0,
  );
}

/** Moves a number to its new value through a motion value, without re-rendering. */
function Figure({
  value,
  format,
  instant,
}: {
  value: number;
  format: (v: number) => string;
  instant: boolean;
}) {
  const node = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(value);

  useMotionValueEvent(mv, "change", (v) => {
    if (node.current) node.current.textContent = format(v);
  });

  useEffect(() => {
    if (instant) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: EASE });
    return () => controls.stop();
  }, [instant, mv, value]);

  return (
    <span ref={node} className="tabular-nums">
      {format(value)}
    </span>
  );
}

/**
 * The shift clock steps through the day. Each worker's row fills in behind it,
 * painted working or idle from the camera's reading, and the working and idle
 * totals for the zone build up alongside.
 */
export default function ManHourTrackingVisual() {
  const { ref, phase, cycle, reduce } = useLoop(6, 1300);
  const cutoff = CUTOFF[phase];
  const working = hoursUpTo(cutoff, true);
  const idle = hoursUpTo(cutoff, false);
  const elapsed = working + idle;
  const active = elapsed ? (working / elapsed) * 100 : 0;
  const accent = TONES.positive;
  const step = { duration: reduce ? 0 : 0.9, ease: EASE };

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          title="Zone A · Day shift"
          badge={<Pill tone="neutral">Sample data</Pill>}
        />

        <div className="mb-3 grid grid-cols-3 gap-2">
          <Stat label="Working">
            <Figure
              format={(v) => `${v.toFixed(1)} h`}
              instant={reduce}
              value={working}
            />
          </Stat>
          <Stat label="Idle" muted>
            <Figure
              format={(v) => `${v.toFixed(1)} h`}
              instant={reduce}
              value={idle}
            />
          </Stat>
          <Stat label="Time working">
            <Figure
              format={(v) => `${Math.round(v)}%`}
              instant={reduce}
              value={active}
            />
          </Stat>
        </div>

        <div className="flex flex-col gap-2">
          {WORKERS.map((worker) => (
            <div className="flex items-center gap-2.5" key={worker.name}>
              <span className="w-[58px] flex-none text-[11.5px] font-medium">
                {worker.name}
              </span>
              <span
                className="relative h-[14px] flex-1 overflow-hidden rounded-md"
                style={{ background: INSET }}
              >
                <motion.span
                  animate={{
                    clipPath: `inset(0 ${100 - (cutoff / SHIFT) * 100}% 0 0)`,
                  }}
                  className="absolute inset-0"
                  initial={false}
                  transition={step}
                >
                  {worker.spans.map((s) => (
                    <span
                      className="absolute inset-y-0.5"
                      key={s.from}
                      style={{
                        left: `${(s.from / SHIFT) * 100}%`,
                        width: `calc(${((s.to - s.from) / SHIFT) * 100}% - 2px)`,
                        marginLeft: 1,
                        borderRadius: 3,
                        background: s.working ? accent.solid : IDLE_FILL,
                      }}
                    />
                  ))}
                </motion.span>
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-2 flex items-center gap-3 text-[10.5px] font-medium"
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
              style={{ background: IDLE_FILL }}
            />{" "}
            Idle
          </span>
          <span
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium tabular-nums"
            style={{ background: INSET, color: "var(--ink)" }}
          >
            <svg fill="none" height="11" viewBox="0 0 24 24" width="11">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.2"
              />
              <motion.path
                key={cycle}
                animate={{ rotate: reduce ? 300 : phase * 60 }}
                d="M12 12V7"
                initial={false}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.2"
                style={{ originX: "12px", originY: "12px" }}
                transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              />
            </svg>
            {CLOCK[phase]}
          </span>
        </div>
      </Plate>
    </VisualFrame>
  );
}

function Stat({
  label,
  muted = false,
  children,
}: {
  label: string;
  muted?: boolean;
  children: React.ReactNode;
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
        {children}
      </span>
    </div>
  );
}
