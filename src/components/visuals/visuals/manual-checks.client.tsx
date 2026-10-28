"use client";

import { motion } from "framer-motion";

import {
  CheckIcon,
  Counter,
  INSET,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** A sample week of hazards. Manual checks find four of the twenty. */
const TOTAL = 20;
const FOUND = new Set([3, 9, 12, 17]);
const FOUND_PCT = (FOUND.size / TOTAL) * 100;

/** The share of hazards manual monitoring finds. */
const MANUAL_RANGE = { from: 15, to: 30 };

/**
 * A week of hazards lands as a grid. Manual checks tick off a few, the rest
 * turn up as missed, and the share found settles inside the range manual
 * monitoring usually finds.
 */
function ManualChecksVisual({ title, meta }: { title: string; meta: string }) {
  const { ref, phase, cycle, reduce } = useLoop(7, 1100);
  const found = phase >= 1;
  const missed = phase >= 2;
  const scored = phase >= 3;
  const step = (delay: number) =>
    reduce ? { duration: 0 } : { ...SPRING, delay };

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          badge={<Pill tone="neutral">Sample week</Pill>}
          title={title}
        />

        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: TOTAL }, (_, i) => {
            const isFound = FOUND.has(i);
            const on = isFound ? found : missed;
            const t = isFound ? TONES.positive : TONES.human;
            return (
              <span
                className="relative aspect-square rounded-[5px]"
                key={i}
                style={{ background: INSET }}
              >
                <motion.span
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
                  className="absolute inset-0 grid place-items-center rounded-[5px] border-[1.5px]"
                  initial={false}
                  style={
                    isFound
                      ? { background: t.fg, borderColor: t.fg }
                      : { background: t.tint, borderColor: t.solid }
                  }
                  transition={step(isFound ? 0 : i * 0.03)}
                >
                  {isFound ? <CheckIcon size={10} /> : null}
                </motion.span>
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-[11px] font-medium" style={{ color: MUTED }}>
            Found by manual checks
          </span>
          <span className="text-[18px] leading-tight font-medium tracking-[-0.02em]">
            <Counter
              format={(v) => `${Math.round(v)}%`}
              key={cycle}
              run={scored && !reduce}
              to={scored ? FOUND_PCT : 0}
            />
          </span>
        </div>
        <div
          className="relative mt-1.5 h-2.5 rounded-full"
          style={{ background: INSET }}
        >
          <span
            className="absolute -inset-y-1 rounded-[4px] border border-dashed"
            style={{
              left: `${MANUAL_RANGE.from}%`,
              width: `${MANUAL_RANGE.to - MANUAL_RANGE.from}%`,
              borderColor: "var(--ink-faint)",
            }}
          />
          <motion.span
            animate={{ scaleX: scored ? 1 : 0 }}
            className="absolute inset-y-0 left-0 origin-left rounded-full"
            initial={false}
            style={{ width: `${FOUND_PCT}%`, background: TONES.positive.fg }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
          />
        </div>
        <span
          className="mt-1.5 block text-[10px] font-medium"
          style={{
            color: MUTED,
            paddingLeft: `${MANUAL_RANGE.from}%`,
          }}
        >
          Manual monitoring finds 15 to 30%
        </span>

        <div
          className="mt-3 flex items-center gap-3 text-[10.5px] font-medium"
          style={{ color: MUTED }}
        >
          <span className="flex items-center gap-1.5">
            <i
              className="size-2.5 rounded-[3px]"
              style={{ background: TONES.positive.fg }}
            />
            Found
          </span>
          <span className="flex items-center gap-1.5">
            <i
              className="size-2.5 rounded-[3px] border"
              style={{
                background: TONES.human.tint,
                borderColor: TONES.human.solid,
              }}
            />
            Missed
          </span>
          <span className="ml-auto">{meta}</span>
        </div>
      </Plate>
    </VisualFrame>
  );
}

export function OpenEdgeMissedVisual() {
  return (
    <ManualChecksVisual
      meta="Levels 4 to 9 · two walkrounds a day"
      title="Open edge hazards this week"
    />
  );
}

export function UnderLoadMissedVisual() {
  return (
    <ManualChecksVisual
      meta="3 cranes · supervisor spot checks"
      title="Lift hazards this week"
    />
  );
}
