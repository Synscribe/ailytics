"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import styles from "../home.module.css";
import { useScrollScene } from "./use-scroll-scene";

const STEPS = [
  {
    title: "A camera you already own",
    body: "One of the CCTV feeds the site already has. No new cameras or sensors, and usually nobody watching it.",
  },
  {
    title: "Spot the people and the load",
    body: "Ailytics finds the workers and the suspended load in every frame.",
  },
  {
    title: "Work out depth from one camera",
    body: "From that single camera it rebuilds the ground in 3D. No LiDAR, radar or second camera.",
  },
  {
    title: "Project the drop zone",
    body: "It marks where the load would land if it fell, as a live exclusion zone on the ground.",
  },
  {
    title: "Measure real distance",
    body: "It measures how far each worker is from the zone in metres and alerts the lifting supervisor the moment someone steps inside.",
  },
];

const S = "/media/ailytics/stills";

const FEED_WALLS = [
  {
    side: "left",
    feeds: [
      { cam: "Cam 13", src: `${S}/timelapse-later.jpg` },
      { cam: "Cam 12", src: `${S}/machinery-proximity.jpg` },
    ],
  },
  {
    side: "right",
    feeds: [
      { cam: "Cam 15", src: `${S}/open-edge-detection.jpg` },
      { cam: "Cam 16", src: `${S}/crowding.jpg` },
    ],
  },
];

const smooth = (x: number) => {
  const e = Math.min(1, Math.max(0, x));
  return e * e * (3 - 2 * e);
};

/**
 * How it works: one real site photo grows from a framed picture to full width,
 * then gains one layer per step (detections, 3D ground, drop zone, distance).
 */
export function DepthStory() {
  const live = useScrollScene();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const grow = useTransform(scrollYProgress, (q) => smooth((q - 0.04) / 0.14));
  const [stage, setStage] = useState({ step: 0, open: false });

  useMotionValueEvent(scrollYProgress, "change", (q) => {
    if (!live) return;
    const e = smooth((q - 0.04) / 0.14);
    const step =
      e < 1 ? 0 : Math.max(0, Math.min(4, Math.floor(((q - 0.18) / 0.82) * 5)));
    const open = e >= 0.98;
    setStage((prev) =>
      prev.step === step && prev.open === open ? prev : { step, open },
    );
  });

  // Static layout shows the finished picture with every layer.
  const step = live ? stage.step : 4;

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-title"
      className={styles.story}
      data-mode={live ? "scroll" : "static"}
    >
      <motion.div
        className={styles.storyPin}
        data-step={step}
        style={live ? ({ "--e": grow } as never) : undefined}
      >
        <div className={styles.storyIntro}>
          <p className={styles.storyKicker}>How it works</p>
          <h2 id="how-title" className={styles.storyTitle}>
            From one camera to real distance
          </h2>
        </div>

        <ol className={styles.captions}>
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-on={!live || (stage.open && i === step) ? "true" : undefined}
            >
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.viewport}>
          {/* The other feeds on the monitoring wall. They recede and fade as
              Cam 14 grows to full width, before the 3D steps begin. */}
          {FEED_WALLS.map((wall) => (
            <div
              key={wall.side}
              className={styles.feeds}
              data-side={wall.side}
              aria-hidden="true"
            >
              {wall.feeds.map((f) => (
                <div key={f.cam} className={styles.feed}>
                  <Image alt="" fill sizes="22vw" src={f.src} />
                  <span>{f.cam}</span>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.stage}>
            <div className={styles.frame}>
              <Image
                alt="Construction site camera view: a formwork panel is lifted by crane while two workers guide it with tag lines."
                fill
                sizes="100vw"
                src="/media/ailytics/stills/suspended-load-safe.jpg"
              />
              <svg
                className={styles.sGrid}
                viewBox="0 0 160 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g stroke="rgba(52,193,196,.75)" strokeWidth=".25" fill="none">
                  <path d="M0 74 L160 70" />
                  <path d="M0 79 L160 75" />
                  <path d="M0 85 L160 81" />
                  <path d="M0 92 L160 88" />
                  <path d="M0 100 L160 96" />
                  <path d="M10 100 L46 70" />
                  <path d="M38 100 L60 70" />
                  <path d="M66 100 L74 70" />
                  <path d="M94 100 L88 70" />
                  <path d="M122 100 L102 70" />
                  <path d="M150 100 L116 70" />
                </g>
              </svg>
              <svg
                className={styles.sDrop}
                viewBox="0 0 160 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="55"
                  y1="36"
                  x2="55"
                  y2="86"
                  stroke="#FF7A59"
                  strokeWidth=".6"
                />
                <ellipse
                  cx="55"
                  cy="87"
                  rx="22"
                  ry="6.5"
                  fill="rgba(255,122,89,.32)"
                  stroke="#FF7A59"
                  strokeWidth=".6"
                />
              </svg>
              <svg
                className={styles.sMeasure}
                viewBox="0 0 160 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="77"
                  y1="88"
                  x2="128"
                  y2="97"
                  stroke="#34C1C4"
                  strokeWidth=".8"
                />
                <circle cx="128" cy="97" r="1.6" fill="#34C1C4" />
              </svg>
              <span className={`${styles.schip} ${styles.camChip}`}>
                Cam 14 · a camera the site already has
              </span>
              <span
                className={`${styles.sbox} ${styles.sb1}`}
                style={{ left: "22%", top: "4%", width: "25%", height: "32%" }}
              >
                <span>Suspended load</span>
              </span>
              <span
                className={`${styles.sbox} ${styles.sb2}`}
                style={{
                  left: "71.5%",
                  top: "53%",
                  width: "9%",
                  height: "45%",
                }}
              >
                <span>Workers</span>
              </span>
              <span
                className={`${styles.sbox} ${styles.sb3}`}
                style={{
                  left: "80.5%",
                  top: "55%",
                  width: "8.5%",
                  height: "44%",
                }}
              />
              <span className={`${styles.schip} ${styles.dropChip}`}>
                Projected drop zone
              </span>
              <span className={`${styles.schip} ${styles.measureChip}`}>
                3.4 m from drop zone · safe
              </span>
            </div>
          </div>
        </div>

        <div className={styles.storyAlert}>
          <b>Lift in progress · Cam 14</b>
          <span>2 workers outside the drop zone. No alert sent.</span>
        </div>
      </motion.div>
    </section>
  );
}
