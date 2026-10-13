"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "../home.module.css";
import { useScrollScene } from "./use-scroll-scene";

const M = "/media/ailytics";

const STATEMENTS = [
  "Sites run dozens of cameras. Nobody can watch them all.",
  "Walkarounds see one moment of one shift.",
  "Footage gets checked after something goes wrong.",
];

const PAYOFF =
  "With Ailytics, every camera is watched all day, and your team is alerted while there is still time to act.";

const WALL = [
  { src: `${M}/detection-machinery-proximity-poster.jpg` },
  { src: `${M}/detection-open-edge-poster.jpg`, watch: true },
  { src: `${M}/detection-low-light-ppe-poster.jpg` },
  { src: `${M}/detection-vehicle-reversing-poster.jpg`, miss: 0 },
  { src: `${M}/detection-smoke-fire-poster.jpg` },
  { src: `${M}/detection-ergonomics-poster.jpg` },
  { src: `${M}/detection-machinery-proximity-poster.jpg`, watch: true },
  { src: `${M}/detection-open-edge-poster.jpg` },
  { src: `${M}/detection-low-light-ppe-poster.jpg`, miss: 1 },
  { src: `${M}/detection-vehicle-reversing-poster.jpg` },
  { src: `${M}/detection-smoke-fire-poster.jpg`, miss: 2 },
  { src: `${M}/detection-ergonomics-poster.jpg` },
];

function Words({ text, lit }: { text: string; lit: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} data-on={i < lit ? "true" : undefined}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const wordCount = (s: string) => s.split(" ").length;

/**
 * The problem: three statements stack on the left while one card gains a
 * layer per statement. The payoff line then flips the card to its solved state.
 */
export function ProblemScene() {
  const live = useScrollScene();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [p, setP] = useState(0);
  useEffect(() => {
    const section = ref.current;
    if (!section || !live) return;
    const pin = section.firstElementChild as HTMLElement;
    const measure = () => {
      const contentHeight = Math.max(
        ...Array.from(
          pin.children,
          (child) => child.getBoundingClientRect().height,
        ),
      );
      section.style.setProperty(
        "--leading-space",
        `${Math.max(0, (pin.clientHeight - contentHeight) / 2)}px`,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(pin);
    Array.from(pin.children).forEach((child) => observer.observe(child));
    measure();
    return () => {
      observer.disconnect();
      section.style.removeProperty("--leading-space");
    };
  }, [live]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!live) return;
    const q = Math.round(v * 400) / 400;
    setP((prev) => (prev === q ? prev : q));
  });

  // Static layout: every statement, every layer, problem state, then the payoff.
  const bi = live ? Math.min(3, Math.floor(p * 4)) : 2;
  const t = live ? Math.min(1, p * 4 - bi) : 1;
  const fill = (ti: number) => Math.min(1, ti / 0.4);

  const cardOn = true;
  const missOn = (i: number) => !live || bi > 0 || t > 0.6 + i * 0.1;
  const walkOn = !live || bi > 1 || (bi === 1 && t > 0.42);
  const afterOn = !live || bi > 2 || (bi === 2 && t > 0.42);
  const solved = live && bi === 3 && t > 0.45;
  const payoffLit = !live
    ? wordCount(PAYOFF)
    : bi === 3
      ? Math.round(fill(t) * wordCount(PAYOFF))
      : 0;

  return (
    <section
      ref={ref}
      id="problem"
      aria-labelledby="problem-title"
      className={styles.problem}
      data-mode={live ? "scroll" : "static"}
    >
      <div className={styles.problemPin}>
        <div className={styles.plist}>
          <div
            className={styles.pgroup}
            data-hide={live && bi === 3 ? "true" : undefined}
          >
            <h2 id="problem-title" className={styles.plabel}>
              The problem
            </h2>
            {STATEMENTS.map((s, i) => {
              const lit = !live
                ? wordCount(s)
                : i < bi
                  ? wordCount(s)
                  : i === bi
                    ? Math.round(fill(t) * wordCount(s))
                    : 0;
              return (
                <p
                  key={s}
                  className={styles.pstate}
                  data-shown={!live || bi < 3 ? "true" : undefined}
                  data-past={live && i < bi ? "true" : undefined}
                >
                  <Words text={s} lit={lit} />
                </p>
              );
            })}
          </div>
          <div
            className={styles.pgroup}
            data-hide={live && bi !== 3 ? "true" : undefined}
          >
            <p className={styles.payoff}>
              <Words text={PAYOFF} lit={payoffLit} />
            </p>
          </div>
        </div>

        <div
          className={styles.pcard}
          data-on={cardOn ? "true" : undefined}
          data-solved={solved ? "true" : undefined}
          role="img"
          aria-label={
            solved
              ? "Illustration: Ailytics watches all 12 cameras, covers every hour of the shift and sends the alert as the incident happens."
              : "Illustration: one operator watches 2 of 12 cameras while hazards on 3 others are missed, walkarounds cover two moments of the shift, and the incident is found in the footage afterwards."
          }
        >
          <div className={styles.pwall}>
            {WALL.map((tile, i) => (
              <div
                key={i}
                className={styles.ptile}
                data-watch={tile.watch ? "true" : undefined}
              >
                <Image
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 12vw, 22vw"
                  src={tile.src}
                />
                {tile.miss !== undefined ? (
                  <span
                    className={styles.pmiss}
                    data-on={missOn(tile.miss) ? "true" : undefined}
                  >
                    Missed
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.prow} data-on={walkOn ? "true" : undefined}>
            <b>{solved ? "Every hour covered" : "Walkarounds"}</b>
            <div className={styles.pbar}>
              <i className={styles.pwalk} style={{ left: "37%" }} />
              <i className={styles.pwalk} style={{ left: "58%" }} />
              {[12, 46, 71, 88].map((left, i) => (
                <i
                  key={left}
                  className={styles.phaz}
                  style={{ left: `${left}%`, transitionDelay: `${i * 0.15}s` }}
                />
              ))}
              <i className={styles.pfill} />
            </div>
          </div>

          <div className={styles.prow} data-on={afterOn ? "true" : undefined}>
            <b>
              {solved
                ? "Alert sent as it happened"
                : "Found after the incident"}
            </b>
            <div className={styles.pscrub}>
              <span className={styles.pinc} />
              <span className={styles.phead} />
            </div>
          </div>

          <div className={styles.pfoot}>
            <span>
              {solved
                ? "Ailytics on all 12 cameras"
                : "1 operator watching 2 of 12 cameras"}
            </span>
            <span>Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
