"use client";

import { motion } from "framer-motion";
import {
  CctvIcon,
  CloudIcon,
  LockKeyholeIcon,
  ServerIcon,
  CpuIcon,
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

const TARGETS = [
  { id: "cloud", label: "Cloud", icon: CloudIcon, onSite: false },
  { id: "premise", label: "On-premise", icon: ServerIcon, onSite: true },
  { id: "edge", label: "Edge", icon: CpuIcon, onSite: true },
] as const;

/**
 * The Ailyssa detection engine moves between where it can run: cloud, a
 * server on the customer's premises, or an edge device beside the cameras.
 * When it runs on site, a lock confirms the video stays on site. The loop
 * ends on edge, the resolved state.
 */
export default function EdgeEngineVisual() {
  const { ref, phase, cycle, reduce } = useLoop(6, 1300);
  const index = Math.min(Math.floor(phase / 2), TARGETS.length - 1);
  const target = TARGETS[index];
  const accent = TONES.positive;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          title="Where detection runs"
          badge={<Pill tone="neutral">Ailyssa</Pill>}
        />

        <div className="flex gap-2">
          {/* The customer's site: cameras plus the on-site places to run. */}
          <div
            className="relative flex flex-1 flex-col gap-2 rounded-xl border border-dashed p-2 pt-6"
            style={{
              borderColor: "color-mix(in srgb, var(--ink) 28%, transparent)",
            }}
          >
            <span
              className="absolute top-1.5 left-2.5 text-[10.5px] font-medium"
              style={{ color: MUTED }}
            >
              Your site
            </span>
            <div className="flex gap-1.5">
              {["Camera 01", "Camera 02"].map((name) => (
                <span
                  className="flex flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10.5px] font-medium"
                  key={name}
                  style={{ background: INSET }}
                >
                  <CctvIcon
                    aria-hidden="true"
                    className="size-3.5"
                    style={{ color: MUTED }}
                  />
                  {name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {TARGETS.filter((t) => t.onSite)
                .slice()
                .reverse()
                .map((t) => (
                  <Slot
                    active={t.id === target.id}
                    cycle={cycle}
                    key={t.id}
                    reduce={reduce}
                    target={t}
                  />
                ))}
            </div>
          </div>

          {/* Off site. */}
          <div className="flex w-[30%] flex-col justify-end">
            <Slot
              active={target.id === "cloud"}
              cycle={cycle}
              reduce={reduce}
              target={TARGETS[0]}
            />
          </div>
        </div>

        <div className="relative mt-3 h-[34px]">
          <motion.div
            animate={{
              opacity: target.onSite ? 1 : 0,
              y: target.onSite ? 0 : 4,
            }}
            className="absolute inset-0 flex items-center gap-2 rounded-xl px-3"
            initial={false}
            style={{ background: accent.tint, color: accent.fg }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <LockKeyholeIcon aria-hidden="true" className="size-3.5" />
            <span className="text-[11.5px] font-medium">
              Video stays on your site
            </span>
          </motion.div>
          <motion.div
            animate={{
              opacity: target.onSite ? 0 : 1,
              y: target.onSite ? 4 : 0,
            }}
            className="absolute inset-0 flex items-center gap-2 rounded-xl px-3"
            initial={false}
            style={{ background: INSET, color: "var(--ink-muted)" }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <CloudIcon aria-hidden="true" className="size-3.5" />
            <span className="text-[11.5px] font-medium">
              Runs in the cloud, no hardware on site
            </span>
          </motion.div>
        </div>
      </Plate>
    </VisualFrame>
  );
}

function Slot({
  target,
  active,
  cycle,
  reduce,
}: {
  target: (typeof TARGETS)[number];
  active: boolean;
  cycle: number;
  reduce: boolean;
}) {
  const Icon = target.icon;
  return (
    <div
      className="relative flex min-h-[78px] flex-col items-center justify-start gap-1 rounded-xl border px-1 pt-2 pb-1.5"
      style={{ borderColor: LINE, background: "var(--paper)" }}
    >
      <Icon
        aria-hidden="true"
        className="size-4"
        style={{ color: active ? "var(--ink)" : MUTED }}
      />
      <span
        className="text-[10.5px] font-medium"
        style={{ color: active ? "var(--ink)" : MUTED }}
      >
        {target.label}
      </span>
      {active ? (
        <motion.span
          className="mt-auto inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-medium"
          layoutId="edge-engine-chip"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
          transition={reduce ? { duration: 0 } : SPRING}
        >
          <motion.i
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            className="size-1.5 rounded-full"
            key={cycle}
            style={{ background: "var(--signal)" }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          Detecting
        </motion.span>
      ) : (
        <span className="mt-auto h-[19px]" />
      )}
    </div>
  );
}
