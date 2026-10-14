"use client";

import { motion } from "framer-motion";
import { UsersIcon } from "lucide-react";

import {
  CamBadge,
  CameraStage,
  CamOverlay,
  EventCard,
  Frame,
  type Box,
} from "./_camera";
import { EASE, SPRING, TONES, useLoop } from "./_kit";

const PEOPLE: Box[] = [
  [262, 186, 152, 362],
  [518, 4, 146, 240],
  [962, 188, 208, 404],
  [966, 4, 124, 140],
];

const LIMIT = 3;

const ZONE = "M30 40 L1250 40 L1250 620 L30 620 Z";

/**
 * People are counted into a work zone one by one. The zone's head count
 * ticks up against its limit, and when it passes, the zone and everyone in
 * it turn to a hazard.
 */
export default function CrowdingVisual() {
  const { ref, phase, reduce } = useLoop(8, 1000);
  const count = Math.min(phase, PEOPLE.length);
  const over = count > LIMIT;
  const t = over ? TONES.human : TONES.positive;

  return (
    <CameraStage innerRef={ref} src="/media/ailytics/stills/crowding.jpg">
      <CamOverlay>
        <path
          d={ZONE}
          fill="none"
          stroke="var(--paper)"
          strokeDasharray="10 8"
          strokeOpacity={0.9}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          animate={{ opacity: over ? 1 : 0 }}
          d={ZONE}
          fill="var(--alert)"
          fillOpacity={0.16}
          initial={false}
          stroke="var(--alert)"
          strokeWidth={2.5}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          vectorEffect="non-scaling-stroke"
        />
        {PEOPLE.map((box, index) => (
          <Frame
            box={box}
            instant={reduce}
            key={box.join("-")}
            tone={over ? "hazard" : "detect"}
            visible={index < count}
          />
        ))}
      </CamOverlay>

      {/* Head count against the zone limit. */}
      <div
        className="camera-detail absolute z-10 flex w-[150px] flex-col gap-2 rounded-xl p-2.5 shadow-md"
        style={{
          right: "3%",
          top: "21%",
          background: "var(--paper)",
          color: "var(--ink)",
        }}
      >
        <span className="flex items-center justify-between text-[10.5px] font-medium">
          Zone B head count
          <UsersIcon
            aria-hidden="true"
            className="size-3"
            style={{ color: "var(--ink-faint)" }}
          />
        </span>
        <span className="flex items-end gap-1.5">
          <motion.span
            animate={{ scale: [1.18, 1] }}
            className="block text-[24px] leading-none font-medium tabular-nums"
            key={count}
            style={{
              color: over ? t.fg : "var(--ink)",
              originX: 0,
              originY: 1,
            }}
            transition={reduce ? { duration: 0 } : SPRING}
          >
            {count}
          </motion.span>
          <span
            className="pb-0.5 text-[11px] font-medium"
            style={{ color: "var(--ink-faint)" }}
          >
            of {LIMIT} allowed
          </span>
        </span>
        <span className="grid grid-cols-4 gap-1">
          {PEOPLE.map((_, index) => (
            <motion.i
              animate={{ opacity: index < count ? 1 : 0.25 }}
              className="h-1.5 rounded-full"
              initial={false}
              key={index}
              style={{
                background:
                  index >= LIMIT
                    ? TONES.human.solid
                    : over
                      ? TONES.human.solid
                      : TONES.positive.solid,
              }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
          ))}
        </span>
      </div>

      <CamBadge camera="Camera 09" place="Zone B" />
      <EventCard
        icon={<UsersIcon aria-hidden="true" />}
        instant={reduce}
        meta="4 people in Zone B, limit 3 · Camera 09"
        show={phase >= 5}
        title="Zone over its head count"
      />
    </CameraStage>
  );
}
