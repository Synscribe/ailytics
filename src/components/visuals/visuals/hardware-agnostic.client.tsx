"use client";

import { motion } from "framer-motion";
import { CctvIcon, CpuIcon } from "lucide-react";

import {
  EASE,
  FAINT,
  INSET,
  LINE,
  MUTED,
  Plate,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

const CAMERAS = [
  { name: "Cam 01", protocol: "RTSP" },
  { name: "Cam 02", protocol: "ONVIF" },
  { name: "Cam 03", protocol: "RTSP" },
  { name: "Cam 04", protocol: "ONVIF" },
];

/** Column centres of the four camera tiles, as a share of the row width. */
const X = [12.5, 37.5, 62.5, 87.5];

/**
 * Existing cameras latch onto Ailytics one stream at a time: a packet travels
 * down each connector and the camera stamps connected when it arrives.
 */
export default function HardwareAgnosticVisual() {
  const { ref, phase, cycle, reduce } = useLoop(6, 1250);
  const connected = Math.min(phase, CAMERAS.length);
  const accent = TONES.positive;

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <div className="grid grid-cols-4 gap-2">
          {CAMERAS.map((camera, index) => {
            const on = index < connected;
            return (
              <div
                className="relative flex flex-col items-center gap-1 rounded-xl border px-1 py-2"
                key={camera.name}
                style={{
                  borderColor: LINE,
                  background: on ? accent.tint : INSET,
                }}
              >
                <CctvIcon
                  aria-hidden="true"
                  className="size-4"
                  style={{ color: on ? accent.fg : MUTED }}
                />
                <span className="text-[11px] font-semibold">{camera.name}</span>
                <span
                  className="text-[9.5px] font-semibold tracking-[0.06em]"
                  style={{ color: MUTED }}
                >
                  {camera.protocol}
                </span>
                <motion.span
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full"
                  initial={false}
                  style={{ background: accent.solid }}
                  transition={reduce ? { duration: 0 } : SPRING}
                >
                  <svg fill="none" height="8" viewBox="0 0 14 14" width="8">
                    <path
                      d="M3 7.3l2.8 2.8L11 4.2"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.6"
                    />
                  </svg>
                </motion.span>
              </div>
            );
          })}
        </div>

        <div className="relative h-11">
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {X.map((x, index) => (
              <line
                key={x}
                stroke={index < connected ? accent.solid : FAINT}
                strokeDasharray={index < connected ? undefined : "3 3"}
                strokeWidth={1.4}
                vectorEffect="non-scaling-stroke"
                x1={x}
                x2={50}
                y1={0}
                y2={100}
              />
            ))}
          </svg>
          {!reduce && phase >= 1 && phase <= CAMERAS.length ? (
            <motion.span
              key={`${cycle}-${phase}`}
              animate={{
                left: [`${X[phase - 1]}%`, "50%"],
                top: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: accent.solid }}
              transition={{
                duration: 0.9,
                ease: EASE,
                times: [0, 0.15, 0.85, 1],
              }}
            />
          ) : null}
        </div>

        <div
          className="mx-auto flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          <CpuIcon aria-hidden="true" className="size-3.5" />
          <span className="text-[12px] font-semibold">Ailytics</span>
          <span className="text-[11px] font-medium tabular-nums opacity-75">
            {connected}/{CAMERAS.length} streams
          </span>
        </div>

        <p
          className="mt-3 text-center text-[11px] font-medium"
          style={{ color: MUTED }}
        >
          Uses the cameras and recorders already on site
        </p>
      </Plate>
    </VisualFrame>
  );
}
