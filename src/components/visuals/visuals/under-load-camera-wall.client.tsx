"use client";

import { motion } from "framer-motion";
import { EyeOffIcon } from "lucide-react";
import Image from "next/image";

import { StatePill } from "./_camera";
import {
  LINE,
  MUTED,
  Pill,
  Plate,
  PlateHead,
  TONES,
  useLoop,
  VisualFrame,
} from "./_kit";

/** Sixteen client stills stand in for a control room's camera feeds. */
const FEEDS = [
  "construction-hero",
  "ppe-hero",
  "ppe-walkway-view2",
  "open-edge-detection",
  "open-edge-shaft",
  "machinery-proximity",
  "no-access-zones",
  "timelapse-later",
  "suspended-load-safe",
  "ppe-detection",
  "poor-ergonomics",
  "warehouse-forklift",
  "forklift-yard",
  "timelapse-earlier",
  "under-load-detection",
  "speeding-wrong-way",
];

/** The feed where a worker steps under the load, and when. */
const EVENT_FEED = 14;
const EVENT_FROM = 2;
const EVENT_TO = 4;

/** The operator's attention moves one feed per phase and never reaches it. */
const FOCUS = [0, 1, 5, 6, 2, 3, 7];

/**
 * One operator's attention moves across a wall of sixteen feeds. A worker
 * steps under a moving load on another screen and back out again before the
 * operator gets there, so the event goes unseen.
 */
export default function UnderLoadCameraWallVisual() {
  const { ref, phase, reduce } = useLoop(FOCUS.length, 1100);
  const live = phase >= EVENT_FROM && phase <= EVENT_TO;
  const over = phase > EVENT_TO;
  const fade = { duration: reduce ? 0 : 0.35 };

  return (
    <VisualFrame innerRef={ref}>
      <Plate>
        <PlateHead
          badge={
            <Pill tone="neutral">Operator on camera {FOCUS[phase] + 1}</Pill>
          }
          title={`Control room · ${FEEDS.length} feeds`}
        />

        <div className="grid grid-cols-4 gap-1.5">
          {FEEDS.map((feed, i) => (
            <span
              className="relative aspect-[4/3] overflow-hidden rounded-[5px]"
              key={feed}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="96px"
                src={`/media/ailytics/stills/${feed}.jpg`}
              />
              <motion.span
                animate={{ opacity: i === FOCUS[phase] ? 1 : 0 }}
                className="absolute inset-0 rounded-[5px] border-2"
                initial={false}
                style={{ borderColor: TONES.positive.solid }}
                transition={fade}
              />
              {i === EVENT_FEED ? (
                <>
                  <motion.span
                    animate={{ opacity: live ? 1 : 0 }}
                    className="absolute inset-0 grid place-items-center rounded-[5px] border-2"
                    initial={false}
                    style={{
                      borderColor: TONES.human.solid,
                      background:
                        "color-mix(in srgb, var(--alert) 22%, transparent)",
                    }}
                    transition={fade}
                  >
                    <motion.i
                      animate={
                        live && !reduce
                          ? { opacity: [1, 0.35, 1] }
                          : { opacity: 1 }
                      }
                      className="size-2 rounded-full"
                      style={{ background: TONES.human.solid }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                  </motion.span>
                  <motion.span
                    animate={{ opacity: over ? 1 : 0 }}
                    className="absolute inset-0 rounded-[5px] border-2 border-dashed"
                    initial={false}
                    style={{ borderColor: TONES.human.solid }}
                    transition={fade}
                  />
                </>
              ) : null}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ opacity: phase >= EVENT_FROM ? 1 : 0.4 }}
          className="mt-3 flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
          initial={false}
          style={{ borderColor: LINE }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <span
            className="grid size-7 flex-none place-items-center rounded-full [&_svg]:size-3.5"
            style={{ background: TONES.human.tint, color: TONES.human.fg }}
          >
            <EyeOffIcon aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] leading-snug font-medium">
              Worker under a moving load
            </span>
            <span
              className="block text-[11px] leading-snug font-medium"
              style={{ color: MUTED }}
            >
              Camera 15 · Lifting area · 4 seconds
            </span>
          </span>
          <StatePill
            instant={reduce}
            offLabel="Happening now"
            on={over}
            onLabel="Not seen"
          />
        </motion.div>
      </Plate>
    </VisualFrame>
  );
}
