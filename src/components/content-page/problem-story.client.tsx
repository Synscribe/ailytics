"use client";

import Image from "next/image";
import { useSyncExternalStore, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Clock3, FileText, ScanEye } from "lucide-react";
import s from "./problem-story.module.css";

const subscribe = () => () => {};

/** Fade and settle for an overlay entering or leaving the camera view. */
function overlayMotion(reduce: boolean | null) {
  return {
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const photos = [
  "ppe-detection",
  "machinery-proximity",
  "under-load-detection",
  "open-edge-detection",
];
export function ProblemStory({
  kind,
  content,
  id = "problems",
}: {
  kind: "ppe" | "construction";
  id?: string;
  content: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
}) {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduce && window.innerWidth >= 1024 && window.innerHeight > 650)
      setActive(
        Math.min(
          content.items.length - 1,
          Math.floor(value * content.items.length),
        ),
      );
  });
  const isPpe = kind === "ppe";
  return (
    <section
      ref={section}
      className={s.section}
      data-enhanced={enhanced}
      id={id}
    >
      <div className={s.stage}>
        <div className={s.heading}>
          <p>{isPpe ? "01 / PPE detection" : "02 / Construction"}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className={s.layout}>
          <div className={s.visual}>
            <div className={s.camera}>
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={isPpe ? "ppe" : active}
                  className={s.photo}
                  initial={{ opacity: reduce ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: reduce ? 1 : 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src={`/media/ailytics/stills/${isPpe ? "ppe-detection" : photos[active]}.jpg`}
                    alt={
                      isPpe
                        ? "Worker entering a construction site without a hard hat"
                        : content.items[active].title
                    }
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
              <span className={s.cameraLabel}>Illustrative camera view</span>
              {/* The PPE story keeps one photo, so its overlays crossfade
                  the way the construction photos do. */}
              {isPpe && (
                <AnimatePresence initial={false} mode="sync">
                  {active === 0 && (
                    <motion.div
                      key="target"
                      className={s.target}
                      {...overlayMotion(reduce)}
                    >
                      <span>Missing protection</span>
                    </motion.div>
                  )}
                  {active === 1 && (
                    <motion.div
                      key="timeline"
                      className={s.timeline}
                      {...overlayMotion(reduce)}
                    >
                      <Clock3 size={18} />
                      <div>
                        <strong>Found in the footage</strong>
                        <span>After the shift</span>
                      </div>
                      <div className={s.track}>
                        <i />
                        <b />
                      </div>
                    </motion.div>
                  )}
                  {active === 2 && (
                    <motion.div
                      key="record"
                      className={s.record}
                      {...overlayMotion(reduce)}
                    >
                      <FileText size={22} />
                      <strong>An incomplete record</strong>
                      <div>
                        <span>Event frame</span>
                        <b>Available</b>
                      </div>
                      <div>
                        <span>Time and location</span>
                        <b className={s.missing}>Not recorded</b>
                      </div>
                      <div>
                        <span>Follow-up</span>
                        <b className={s.missing}>Not recorded</b>
                      </div>
                      <small>Illustration of manual record gaps</small>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
            <div className={s.caption}>
              <span>
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(content.items.length).padStart(2, "0")}
              </span>
              <strong>{content.items[active].title}</strong>
              <ScanEye size={18} />
            </div>
          </div>
          <div className={s.rows}>
            {content.items.map((item, index) => (
              <button
                key={item.title}
                data-index={index}
                data-active={active === index}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={s.row}
              >
                <span className={s.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
