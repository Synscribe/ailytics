"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

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
 * Sample week for one site, laid out like the platform's workload dashboard.
 * Idle hours are out of a 50-hour week. Illustrative values only.
 */
const AVERAGE = 8.1;
const SCALE = 16;

const WORKERS = [
  { id: "W12", name: "Worker 12", zone: "Zone C", idle: 14.2 },
  { id: "W07", name: "Worker 07", zone: "Zone A", idle: 11.6 },
  { id: "W03", name: "Worker 03", zone: "Zone B", idle: 10.4 },
  { id: "W15", name: "Worker 15", zone: "Zone A", idle: 8.0 },
  { id: "W09", name: "Worker 09", zone: "Zone C", idle: 6.9 },
  { id: "W21", name: "Worker 21", zone: "Zone B", idle: 4.6 },
] as const;

/** The dashboard's three states: 25% either side of the team average. */
const STATES = {
  over: { label: "High idle", key: "Over avg +25%", tone: TONES.human },
  balanced: { label: "Balanced", key: "Balanced", tone: TONES.positive },
  under: { label: "Low idle", key: "Under avg −25%", tone: TONES.caution },
} as const;

const stateOf = (idle: number) =>
  idle > AVERAGE * 1.25
    ? STATES.over
    : idle < AVERAGE * 0.75
      ? STATES.under
      : STATES.balanced;

const SHIFTS = [
  { label: "Day shift", hours: "7AM to 5PM", color: TONES.positive.fg },
  { label: "Night shift", hours: "7PM to 5AM", color: MUTED },
];

/**
 * Modelled on the platform's workload dashboard: the summary cards count up,
 * each worker's idle-hours bar grows against the dashed team average, and
 * every row stamps high idle, balanced or low idle.
 */
export default function ManHourTrackingVisual() {
  const { ref, phase, cycle, reduce, running } = useLoop(6, 1300);
  const counted = phase >= 1;
  const grown = phase >= 2;
  const marked = phase >= 3;
  const stamped = phase >= 4;
  const top = WORKERS[0];

  return (
    <VisualFrame innerRef={ref}>
      <Plate
        className="w-[520px] p-3.5 sm:p-3.5"
        maxWidth="520px"
        minScale={0.5}
      >
        {/* Header: page title, shift key and filters. */}
        <div className="mb-2.5 flex items-start gap-2">
          <div className="min-w-0">
            <span
              className="block text-[9.5px] font-medium"
              style={{ color: MUTED }}
            >
              Productivity
            </span>
            <span className="block text-[15px] leading-tight font-medium tracking-[-0.01em]">
              Worker Activity
            </span>
            <span className="mt-1 flex flex-wrap gap-x-3 text-[9px] font-medium">
              {SHIFTS.map((s) => (
                <span className="inline-flex items-center gap-1" key={s.label}>
                  <i
                    className="size-[6px] rounded-[1px]"
                    style={{ background: s.color }}
                  />
                  {s.label}
                  <span style={{ color: MUTED }}>{s.hours}</span>
                </span>
              ))}
            </span>
          </div>
          <span className="ml-auto flex flex-none gap-1.5">
            <Select>Last 7 days</Select>
            <Select>All zones</Select>
          </span>
        </div>

        {/* Summary cards */}
        <div className="mb-2.5 grid grid-cols-4 gap-1.5">
          <Card label="Workers" note="2 off shift">
            {counted ? (
              <Counter key={`w-${cycle}`} run={running} to={24} />
            ) : (
              "–"
            )}
          </Card>
          <Card label="Idle hours" note={`${AVERAGE}h avg per worker`}>
            {counted ? (
              <Counter
                key={`h-${cycle}`}
                format={(v) => `${Math.round(v)}h`}
                run={running}
                to={194}
              />
            ) : (
              "–"
            )}
          </Card>
          <Card label="High idle workers" note="above avg +25%" alert>
            {counted ? (
              <Counter key={`o-${cycle}`} run={running} to={3} />
            ) : (
              "–"
            )}
          </Card>
          <Card label="Highest idle" note={top.name} strong>
            {counted ? (
              <Counter
                key={`t-${cycle}`}
                format={(v) => `${Math.round(v)}%`}
                run={running}
                to={Math.round((top.idle / 50) * 100)}
              />
            ) : (
              "–"
            )}
          </Card>
        </div>

        {/* Idle load per worker */}
        <div
          className="rounded-lg border"
          style={{ borderColor: LINE, background: "var(--paper)" }}
        >
          <div
            className="flex items-start gap-2 border-b px-2.5 py-1.5"
            style={{ borderColor: LINE }}
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-medium">
                Idle time per worker
              </span>
              <span
                className="block truncate text-[8.5px] font-medium"
                style={{ color: MUTED }}
              >
                bar length = idle hours this week · dashed line = team average
              </span>
            </span>
            <span className="ml-auto flex flex-none flex-col gap-0.5 text-[8px] font-medium">
              {Object.values(STATES).map((s) => (
                <span className="inline-flex items-center gap-1" key={s.key}>
                  <i
                    className="size-[6px] rounded-[1px]"
                    style={{ background: s.tone.solid }}
                  />
                  {s.key}
                </span>
              ))}
            </span>
          </div>

          <div className="relative px-2.5 pt-3.5 pb-1.5">
            {/* Team average: a dashed line across every bar. */}
            <motion.span
              animate={{ opacity: marked ? 1 : 0 }}
              className="pointer-events-none absolute top-1 bottom-1 border-l border-dashed"
              initial={false}
              style={{
                // Padding + avatar + name before the bar, pill + % after it.
                left: `calc(126px + (100% - 20px - 116px - 118px) * ${AVERAGE / SCALE})`,
                borderColor: "var(--ink-muted)",
              }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <span
                className="absolute -top-0.5 left-1 text-[8px] font-medium whitespace-nowrap"
                style={{ color: MUTED }}
              >
                avg {AVERAGE}h
              </span>
            </motion.span>

            <div className="flex flex-col gap-1">
              {WORKERS.map((w, i) => {
                const s = stateOf(w.idle);
                return (
                  <div
                    className="flex h-[25px] items-center gap-1.5"
                    key={w.id}
                  >
                    <span
                      className="grid size-[20px] flex-none place-items-center rounded-full text-[7.5px] font-semibold"
                      style={{ background: INSET, color: TONES.positive.fg }}
                    >
                      {w.id}
                    </span>
                    <span className="w-[84px] flex-none leading-tight">
                      <span className="block truncate text-[10px] font-medium">
                        {w.name}
                      </span>
                      <span
                        className="block truncate text-[8.5px] font-medium"
                        style={{ color: MUTED }}
                      >
                        Tower site · {w.zone}
                      </span>
                    </span>
                    <span
                      className="relative h-[14px] min-w-0 flex-1 rounded-[3px]"
                      style={{ background: INSET }}
                    >
                      <motion.span
                        animate={{
                          width: grown ? `${(w.idle / SCALE) * 100}%` : "0%",
                        }}
                        className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-[3px] pl-1.5 text-[8.5px] font-semibold text-white tabular-nums"
                        initial={false}
                        style={{ background: s.tone.solid }}
                        transition={{
                          duration: reduce ? 0 : 0.8,
                          ease: EASE,
                          delay: reduce || !grown ? 0 : i * 0.08,
                        }}
                      >
                        {w.idle.toFixed(1)}h
                      </motion.span>
                    </span>
                    <span className="relative h-[16px] w-[62px] flex-none">
                      <motion.span
                        animate={{
                          opacity: stamped ? 1 : 0,
                          scale: stamped ? 1 : 0.6,
                        }}
                        className="absolute inset-0 inline-flex items-center justify-center rounded-full border text-[8.5px] font-medium"
                        initial={false}
                        style={{
                          background: s.tone.tint,
                          color: s.tone.fg,
                          borderColor: `color-mix(in srgb, ${s.tone.solid} 50%, transparent)`,
                        }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { ...SPRING, delay: i * 0.06 }
                        }
                      >
                        {s.label}
                      </motion.span>
                    </span>
                    <span
                      className="w-[44px] flex-none text-right text-[9px] font-medium tabular-nums"
                      style={{ color: MUTED }}
                    >
                      {Math.round((w.idle / 50) * 100)}% idle
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
