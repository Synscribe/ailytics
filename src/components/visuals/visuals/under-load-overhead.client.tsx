"use client";

import { motion } from "framer-motion";

import { CamBadge, CameraStage, CamOverlay, Frame, Tag } from "./_camera";
import { EASE, useLoop } from "./_kit";

/** Boxes and points in the still's 1280×960 pixels. */
const LOAD = [561, 52, 184, 472] as const;
const WORKER = [808, 700, 76, 216] as const;
const CREW = [58, 738, 54, 120] as const;

/**
 * Where each worker on the ground is looking: from the head down to the
 * ground ahead of them.
 */
const GAZES = ["M836 712 L700 950 L846 960 Z", "M88 750 L150 960 L250 930 Z"];

/** The line the worker under the load would need to look along. */
const SIGHTLINE = "M836 712 L700 524";

/**
 * A formwork panel hangs overhead while the crew below watch the ground in
 * front of them. The camera marks where each person is looking, then the
 * line up to the load that nobody on the ground is checking.
 */
export default function UnderLoadOverheadVisual() {
  const { ref, phase, reduce } = useLoop(6, 1100);
  const gazes = phase >= 1;
  const unseen = phase >= 2;
  const fade = (visible: boolean, delay = 0) => ({
    animate: { opacity: visible ? 1 : 0 },
    initial: false as const,
    transition: { duration: reduce ? 0 : 0.5, ease: EASE, delay },
  });

  return (
    <CameraStage
      innerRef={ref}
      src="/media/ailytics/stills/under-load-detection.jpg"
    >
      <CamOverlay>
        {GAZES.map((d, i) => (
          <motion.path
            d={d}
            fill="var(--ink)"
            fillOpacity={0.3}
            key={d}
            stroke="#fff"
            strokeDasharray="6 5"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
            {...fade(gazes, i * 0.15)}
          />
        ))}
        <motion.path
          d={SIGHTLINE}
          fill="none"
          stroke="var(--alert)"
          strokeDasharray="10 8"
          strokeLinecap="round"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
          {...fade(unseen)}
        />
        <Frame box={LOAD} instant={reduce} />
        <Frame box={CREW} instant={reduce} visible={gazes} />
        <Frame
          box={WORKER}
          instant={reduce}
          tone={unseen ? "hazard" : "detect"}
          visible={gazes}
        />
      </CamOverlay>

      <Tag instant={reduce} x={LOAD[0]} y={LOAD[1]}>
        Suspended load · moving
      </Tag>
      <Tag instant={reduce} visible={gazes} x={CREW[0]} y={CREW[1]}>
        Eyes on their work
      </Tag>
      <Tag
        below
        instant={reduce}
        tone="hazard"
        visible={unseen}
        x={WORKER[0] - 120}
        y={WORKER[1] + WORKER[3] - 4}
      >
        Under the load · not looking up
      </Tag>

      <CamBadge camera="Camera 03" place="Lifting area" />
    </CameraStage>
  );
}
