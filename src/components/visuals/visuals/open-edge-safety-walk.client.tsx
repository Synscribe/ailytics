"use client";

import { motion } from "framer-motion";

import {
  Counter,
  INSET,
  LINE,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Sample shift on one edge, in hours from 07:00. */
const DAY = 10;
const WALKS = [
  { from: 2, to: 2.8 },
  { from: 7, to: 7.8 },
] as const;
/** Times a worker stepped inside the edge buffer. None fall on a walk. */
const EVENTS = [0.7, 1.3, 1.6, 3.2, 3.7, 4.5, 5.3, 6.4, 8.1, 8.6, 9.3];

const RUN_S = 5.2;

const pct = (hours: number) => `${(hours / DAY) * 100}%`;

/**
 * A playhead runs through one edge's shift. Workers step inside the edge
 * buffer through the day, except during the two safety walks, so the walks
 * see nothing while the camera records every approach.
 */
export default function OpenEdgeSafetyWalkVisual() {
  const { ref, cycle, running, reduce } = useLoop(6, 1300);
  const fade = { duration: reduce ? 0 : RUN_S, ease: "linear" as const };

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          badge={<Pill tone="neutral">Sample shift</Pill>}
          title="North edge · Level 6"
        />

        <div className="relative">
          <div
            className="relative h-16 overflow-hidden rounded-lg"
            style={{ background: INSET }}
          >
            {WALKS.map((walk) => (
              <span
                className="absolute inset-y-1 flex justify-center rounded-md border border-dashed pt-1 text-[9.5px] font-medium"
                key={walk.from}
                style={{
                  left: pct(walk.from),
                  width: pct(walk.to - walk.from),
                  background: "var(--paper)",
                  borderColor: "var(--ink-faint)",
                  color: MUTED,
                }}
              >
                Walk
              </span>
            ))}
            {EVENTS.map((t) => (
              <motion.i
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                key={`${cycle}-${t}`}
                style={{
                  left: pct(t),
                  marginTop: 6,
                  background: TONES.human.solid,
                }}
                transition={{
                  delay: reduce ? 0 : (t / DAY) * RUN_S,
                  duration: 0.3,
                }}
              />
            ))}
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

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Stat label="Seen on safety walks">0</Stat>
          <Stat label="Recorded by the camera">
            <Counter
              duration={RUN_S}
              key={cycle}
              run={running}
              to={EVENTS.length}
            />
          </Stat>
        </div>

        <div
          className="mt-3 flex items-center gap-3 text-[10.5px] font-medium"
          style={{ color: MUTED }}
        >
          <span className="flex items-center gap-1.5">
            <i
              className="size-2 rounded-full"
              style={{ background: TONES.human.solid }}
            />
            Worker inside the edge buffer
          </span>
          <span className="flex items-center gap-1.5">
            <i
              className="size-2.5 rounded-[3px] border border-dashed"
              style={{ borderColor: "var(--ink-faint)" }}
            />
            Safety walk
          </span>
        </div>
      </Plate>
    </VisualFrame>
  );
}

function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border px-2.5 py-2"
      style={{ borderColor: LINE }}
    >
      <span className="block text-[10px] font-medium" style={{ color: MUTED }}>
        {label}
      </span>
      <span className="block text-[18px] leading-tight font-medium tracking-[-0.02em] tabular-nums">
        {children}
      </span>
    </div>
  );
}
