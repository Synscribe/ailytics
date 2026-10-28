"use client";

import { motion } from "framer-motion";
import { BellRingIcon } from "lucide-react";

import { CamBadge, CameraStage, CamOverlay, EventCard, Tag } from "./_camera";
import { TONES, useLoop } from "./_kit";

/**
 * The flagged worker beside the excavator. The still is a real Ailytics
 * detection frame, so its boxes and tags are part of the image.
 */
const WORKER = { cx: 136, cy: 500 };

const RINGS = [0, 0.55, 1.1];

/**
 * A worker steps into the danger area beside a working excavator. The
 * detection is already on screen, then the alert goes off around the worker
 * and the event card confirms it was sent.
 */
export default function PedestrianCrossingVisual() {
  const { ref, phase, reduce } = useLoop(6, 1100);
  const sounding = phase >= 1;

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/excavator-worker.jpg"
    >
      <CamOverlay>
        {sounding
          ? RINGS.map((delay) => (
              <motion.circle
                animate={
                  reduce
                    ? { r: 90, opacity: 0.6 }
                    : { r: [28, 170], opacity: [0.85, 0] }
                }
                cx={WORKER.cx}
                cy={WORKER.cy}
                fill="none"
                initial={false}
                key={delay}
                stroke="var(--alert)"
                strokeWidth={3}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        delay,
                        duration: 1.65,
                        ease: "easeOut",
                        repeat: Infinity,
                      }
                }
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}
      </CamOverlay>

      <Tag
        below
        instant={reduce}
        tone="hazard"
        visible={sounding}
        x={60}
        y={612}
      >
        <BellRingIcon aria-hidden="true" className="size-2.5" />
        Alert sounding
      </Tag>

      <CamBadge camera="Camera 09" place="Piling area" />
      <EventCard
        badge={
          <span
            className="rounded-full px-2 py-[3px] text-[10.5px] font-medium whitespace-nowrap"
            style={{ background: TONES.human.tint, color: TONES.human.fg }}
          >
            Alert sent
          </span>
        }
        icon={<BellRingIcon aria-hidden="true" />}
        instant={reduce}
        meta="Excavator working nearby · Camera 09"
        show={phase >= 2}
        title="Worker inside the excavator's danger area"
      />
    </CameraStage>
  );
}
