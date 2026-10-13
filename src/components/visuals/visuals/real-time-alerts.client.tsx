"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BellRingIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

import {
  BRAND,
  EASE,
  INSET,
  LINE,
  MUTED,
  SPRING,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";
import { CamOverlay, Frame } from "./_camera";

/**
 * A supervisor's phone: a missing-PPE notification drops in, then opens into
 * the evidence view with the real event frame, time and location. The status
 * stamps reviewed once the supervisor has seen it.
 */
export default function RealTimeAlertsVisual() {
  const { ref, phase, cycle, reduce } = useLoop(7, 1150);
  const banner = phase >= 1 && phase < 3;
  const detail = phase >= 3;
  const reviewed = phase >= 5;
  const alert = TONES.human;

  return (
    <VisualFrame innerRef={ref}>
      <div
        className="relative aspect-[9/13] h-full max-h-[420px] overflow-hidden rounded-[1.6rem] border-[5px] shadow-lg"
        style={{
          borderColor: "var(--ink)",
          background: BRAND.surface,
          color: "var(--ink)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-3 py-2"
          style={{ borderColor: LINE }}
        >
          <span className="text-[12px] font-semibold">Alerts</span>
          <BellRingIcon
            aria-hidden="true"
            className="size-3.5"
            style={{ color: MUTED }}
          />
        </div>

        {/* Older, already-reviewed items sit behind the new alert. */}
        <div className="flex flex-col gap-1.5 p-2.5">
          {["Zone A · Camera 02", "Zone C · Camera 07"].map((where) => (
            <div
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
              key={where}
              style={{ background: INSET }}
            >
              <span
                className="size-6 flex-none rounded-md"
                style={{ background: LINE }}
              />
              <span className="min-w-0 flex-1">
                <span
                  className="block h-1.5 w-3/4 rounded-full"
                  style={{ background: LINE }}
                />
                <span
                  className="mt-1 block truncate text-[9.5px] font-medium"
                  style={{ color: MUTED }}
                >
                  {where}
                </span>
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {banner ? (
            <motion.div
              key={`banner-${cycle}`}
              animate={{ y: 0, opacity: 1 }}
              className="absolute inset-x-2 top-2 flex items-center gap-2 rounded-xl px-2.5 py-2 shadow-md"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              initial={{ y: -60, opacity: 0 }}
              style={{ background: BRAND.surface, border: `1px solid ${LINE}` }}
              transition={SPRING}
            >
              <span
                className="grid size-6 flex-none place-items-center rounded-full"
                style={{ background: alert.tint, color: alert.fg }}
              >
                <BellRingIcon aria-hidden="true" className="size-3" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-semibold">
                  Missing PPE detected
                </span>
                <span
                  className="block truncate text-[10px] font-medium"
                  style={{ color: MUTED }}
                >
                  Gate 2 · Camera 04 · now
                </span>
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {detail ? (
            <motion.div
              key={`detail-${cycle}`}
              animate={{ y: 0, opacity: 1 }}
              className="absolute inset-x-0 top-0 bottom-0 flex flex-col"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              initial={reduce ? false : { y: 24, opacity: 0 }}
              style={{ background: BRAND.surface }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="px-3 pt-2.5 pb-2">
                <span className="block text-[12.5px] font-semibold">
                  No vest, no hard hat
                </span>
                <span
                  className="block text-[10px] font-medium"
                  style={{ color: MUTED }}
                >
                  Missing PPE
                </span>
              </div>
              <div className="relative min-h-[72px] w-full flex-1">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="320px"
                  src="/media/ailytics/stills/ppe-detection.jpg"
                />
                <CamOverlay>
                  <Frame box={[421, 285, 231, 544]} instant tone="hazard" />
                </CamOverlay>
              </div>
              <div className="flex flex-none flex-col gap-1.5 px-3 py-2.5 text-[10.5px] font-medium">
                <span className="flex items-center gap-1.5">
                  <ClockIcon
                    aria-hidden="true"
                    className="size-3"
                    style={{ color: MUTED }}
                  />
                  Just now
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPinIcon
                    aria-hidden="true"
                    className="size-3"
                    style={{ color: MUTED }}
                  />
                  Gate 2 · Camera 04
                </span>
                <span className="relative mt-0.5 h-[20px]">
                  <motion.span
                    animate={{ opacity: reviewed ? 0 : 1 }}
                    className="absolute inset-y-0 left-0 inline-flex items-center rounded-full px-2 text-[10px] font-semibold"
                    initial={false}
                    style={{ background: alert.tint, color: alert.fg }}
                    transition={{ duration: 0.3 }}
                  >
                    New
                  </motion.span>
                  <motion.span
                    animate={{
                      opacity: reviewed ? 1 : 0,
                      scale: reviewed ? 1 : 0.6,
                    }}
                    className="absolute inset-y-0 left-0 inline-flex items-center rounded-full px-2 text-[10px] font-semibold"
                    initial={false}
                    style={{
                      background: TONES.positive.tint,
                      color: TONES.positive.fg,
                    }}
                    transition={reduce ? { duration: 0 } : SPRING}
                  >
                    Reviewed
                  </motion.span>
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </VisualFrame>
  );
}
