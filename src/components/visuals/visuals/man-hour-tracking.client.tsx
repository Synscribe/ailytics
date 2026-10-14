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
  FAINT,
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

const AREAS = [
  { name: "Zone A", hours: [0, 9, 20, 27, 38, 47] },
  { name: "Zone B", hours: [0, 6, 13, 18, 25, 31] },
  { name: "Zone C", hours: [0, 4, 10, 12, 19, 24] },
  { name: "Gate 2", hours: [0, 2, 3, 5, 6, 8] },
];

const SCALE = 50;

/** Moves a number to its new value through a motion value, without re-rendering. */
function Hours({ value, instant }: { value: number; instant: boolean }) {
  const node = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(value);

  useMotionValueEvent(mv, "change", (v) => {
    if (node.current) node.current.textContent = `${Math.round(v)} h`;
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
      {`${value} h`}
    </span>
  );
}

/** Workforce hours accrue by area as the site clock moves through the day. */
export default function ManHourTrackingVisual() {
  const { ref, phase, cycle, reduce } = useLoop(6, 1300);
  const total = AREAS.reduce((sum, area) => sum + area.hours[phase], 0);
  const accent = TONES.positive;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          title="Hours by area"
          badge={<Pill tone="neutral">Sample data</Pill>}
        />

        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <span className="block text-[22px] leading-none font-medium tracking-[-0.02em]">
              <Hours instant={reduce} value={total} />
            </span>
            <span
              className="mt-1 block text-[11px] font-medium"
              style={{ color: MUTED }}
            >
              Recorded today
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tabular-nums"
            style={{ background: INSET }}
          >
            <svg fill="none" height="12" viewBox="0 0 24 24" width="12">
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

        <div className="flex flex-col gap-2">
          {AREAS.map((area) => (
            <div className="flex items-center gap-2.5" key={area.name}>
              <span className="w-[52px] flex-none text-[11.5px] font-medium">
                {area.name}
              </span>
              <span
                className="relative h-[10px] flex-1 overflow-hidden rounded-full"
                style={{ background: INSET }}
              >
                <motion.span
                  animate={{ scaleX: area.hours[phase] / SCALE }}
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  style={{ background: accent.solid, originX: 0 }}
                  transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                />
              </span>
              <span
                className="w-[40px] flex-none text-right text-[11.5px] font-medium"
                style={{ color: area.hours[phase] ? "var(--ink)" : FAINT }}
              >
                <Hours instant={reduce} value={area.hours[phase]} />
              </span>
            </div>
          ))}
        </div>
      </Plate>
    </VisualFrame>
  );
}
