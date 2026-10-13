"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

import { useLoop, VisualFrame } from "./_kit";

const SIZES = "(min-width: 1024px) 34vw, (min-width: 768px) 45vw, 100vw";

/**
 * The same camera view at two points in time. A divider sweeps across the
 * frame so the later view replaces the earlier one, the way a spot comparison
 * reveals change in a work area.
 */
export default function TimelapseXrayVisual() {
  const { ref, running, reduce } = useLoop(1, 8000);
  const split = useMotionValue(50);
  const clip = useMotionTemplate`inset(0 0 0 ${split}%)`;
  const left = useMotionTemplate`${split}%`;
  const earlierOpacity = useTransform(split, [8, 20], [0, 1]);
  const laterOpacity = useTransform(split, [80, 92], [1, 0]);

  useEffect(() => {
    if (reduce) {
      split.set(50);
      return;
    }
    if (!running) return;
    const controls = animate(split, [92, 92, 8, 8, 92], {
      duration: 8,
      ease: [0.65, 0, 0.35, 1],
      times: [0, 0.12, 0.5, 0.62, 1],
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduce, running, split]);

  return (
    <VisualFrame className="p-0 sm:p-0" innerRef={ref}>
      <Image
        alt=""
        className="object-cover"
        fill
        sizes={SIZES}
        src="/media/ailytics/stills/timelapse-earlier.jpg"
      />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image
          alt=""
          className="object-cover"
          fill
          sizes={SIZES}
          src="/media/ailytics/stills/timelapse-later.jpg"
        />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 w-0.5 -translate-x-1/2"
        style={{ left, background: "var(--paper)" }}
      >
        <span
          className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-md"
          style={{ background: "var(--paper)", color: "var(--ink)" }}
        >
          <svg fill="none" height="14" viewBox="0 0 24 24" width="14">
            <path
              d="M9 6l-6 6 6 6M15 6l6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </span>
      </motion.div>

      <motion.span
        className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm sm:top-4 sm:left-4"
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          opacity: earlierOpacity,
        }}
      >
        Earlier
      </motion.span>
      <motion.span
        className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm sm:top-4 sm:right-4"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          opacity: laterOpacity,
        }}
      >
        Later
      </motion.span>
    </VisualFrame>
  );
}
