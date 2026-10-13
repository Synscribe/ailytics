"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { EASE, SPRING, TONES, useLoop, VisualFrame } from "./_kit";

/** Polygon vertices in the 800×600 frame: the deck between the two rails. */
const ZONE = [
  [318, 150],
  [424, 150],
  [604, 462],
  [214, 462],
] as const;

const PATH = `M${ZONE.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;

/**
 * A restricted zone is drawn on a real site camera view, one vertex at a
 * time, then saved with alerts on entry. Configuration only: nobody is
 * detected in this frame.
 */
export default function NoAccessZonesVisual() {
  const { ref, phase, cycle, reduce } = useLoop(7, 1100);
  const corners = Math.min(phase, ZONE.length);
  const closed = phase >= 5;
  const saved = phase >= 6;
  const alert = TONES.caution;

  return (
    <VisualFrame className="p-0 sm:p-0" innerRef={ref}>
      <Image
        alt=""
        className="object-cover"
        fill
        sizes="(min-width: 1024px) 34vw, (min-width: 768px) 45vw, 100vw"
        src="/media/ailytics/stills/no-access-zones.jpg"
      />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <motion.path
          animate={{ opacity: closed ? 1 : 0 }}
          d={PATH}
          fill={alert.solid}
          initial={false}
          style={{ fillOpacity: 0.24 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        />
        <motion.path
          key={cycle}
          animate={{ pathLength: reduce ? 1 : corners / ZONE.length }}
          d={PATH}
          fill="none"
          initial={{ pathLength: 0 }}
          stroke={alert.solid}
          strokeLinejoin="round"
          strokeWidth={5}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        />
        {ZONE.map(([x, y], index) => (
          <motion.circle
            key={`${cycle}-${index}`}
            animate={{
              opacity: phase >= 1 && index <= corners ? 1 : 0,
              scale: phase >= 1 && index <= corners ? 1 : 0.3,
            }}
            cx={x}
            cy={y}
            fill="var(--paper)"
            initial={false}
            r={11}
            stroke={alert.solid}
            strokeWidth={5}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={reduce ? { duration: 0 } : SPRING}
          />
        ))}
      </svg>

      <motion.span
        animate={{ opacity: closed ? 1 : 0, y: closed ? 0 : 6 }}
        className="absolute top-[42%] left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-sm"
        initial={false}
        style={{ background: "var(--paper)", color: alert.fg }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        Zone B · No access
      </motion.span>

      <motion.div
        animate={{
          opacity: saved ? 1 : 0,
          y: saved ? 0 : 14,
          filter: saved ? "blur(0px)" : "blur(6px)",
        }}
        className="absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 shadow-md sm:inset-x-5 sm:bottom-5"
        initial={false}
        style={{ background: "var(--paper)", color: "var(--ink)" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        <span
          className="grid size-7 flex-none place-items-center rounded-full"
          style={{ background: alert.tint, color: alert.fg }}
        >
          <svg fill="none" height="14" viewBox="0 0 24 24" width="14">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.4"
            />
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.4" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-semibold">
            Restricted zone saved
          </span>
          <span
            className="block truncate text-[11px] font-medium"
            style={{ color: "var(--ink-faint)" }}
          >
            Camera 03 · Alert on entry
          </span>
        </span>
        <span
          className="rounded-full px-2 py-[3px] text-[10.5px] font-semibold"
          style={{ background: TONES.positive.tint, color: TONES.positive.fg }}
        >
          On
        </span>
      </motion.div>
    </VisualFrame>
  );
}
