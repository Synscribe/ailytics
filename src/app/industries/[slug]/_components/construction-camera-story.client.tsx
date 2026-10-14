"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ProjectVisual } from "@/components/visuals/project-visual";
import s from "./construction-camera-story.module.css";

const subscribe = () => () => {};
const feeds = [
  "open-edge-detection",
  "ppe-hero",
  "no-access-zones",
  "machinery-proximity",
  "under-load-detection",
  "crowding",
  "ppe-detection",
  "timelapse-later",
  "speeding-wrong-way",
];

export function ConstructionCameraStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [manual, setManual] = useState<boolean | null>(null);
  const [focused, setFocused] = useState(false);
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(progress, [0, 0.7, 1], [1, 3.08, 3.08]);
  const fade = useTransform(progress, [0, 0.3, 0.65], [1, 1, 0]);
  useMotionValueEvent(progress, "change", (value) => {
    setFocused(value > 0.65);
    setManual(null);
  });
  const focus = manual ?? (reduce ? false : focused);
  return (
    <section
      ref={ref}
      id="camera-coverage"
      className={s.story}
      data-enhanced={enhanced}
      aria-labelledby="camera-coverage-title"
    >
      <div className={s.pin}>
        <div className={s.copy}>
          <p className={s.eyebrow}>Construction</p>
          <h2 id="camera-coverage-title">
            See the site.
            <br /> Find the risk.
          </h2>
          <p>
            Every camera adds a view. Ailytics brings the hazard that needs
            attention into focus.
          </p>
          <div className={s.status}>
            <i />
            <span>
              {focus
                ? "Workers beneath a suspended load"
                : "Monitoring the site’s camera views"}
            </span>
          </div>
          <p className={s.note}>Illustrative camera views</p>
          <button
            type="button"
            className={s.control}
            aria-pressed={focus}
            onClick={() => setManual(!focus)}
          >
            {focus ? "Show all cameras" : "Focus on the lifting area"}
          </button>
        </div>
        <div className={s.frame}>
          <motion.div
            className={s.mosaic}
            style={{
              scale: manual !== null ? (manual ? 3.08 : 1) : reduce ? 1 : scale,
            }}
          >
            {feeds.map((feed, index) => (
              <motion.div
                key={feed}
                className={s.tile}
                style={{
                  opacity:
                    index === 4
                      ? 1
                      : manual !== null
                        ? manual
                          ? 0
                          : 1
                        : reduce
                          ? 1
                          : fade,
                }}
              >
                <Image
                  src={`/media/ailytics/stills/${feed}.jpg`}
                  alt={
                    index === 4
                      ? "Construction camera view of a suspended load"
                      : ""
                  }
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                />
                <span>
                  Camera{" "}
                  {String([1, 2, 4, 5, 3, 6, 7, 8, 9][index]).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className={s.focus}
            aria-hidden={!focus}
            initial={false}
            animate={{ opacity: focus ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            style={{ visibility: focus ? "visible" : "hidden" }}
          >
            {focus && <ProjectVisual id="under-load-detection" fill />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
