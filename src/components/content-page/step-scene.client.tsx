"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { useScrollScene } from "@/app/(marketing)/_components/use-scroll-scene";

import type { DetailScene } from "./scenes";
import styles from "./step-scene.module.css";

type Step = { title: string; description: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const pct = (x: number, y: number) => ({
  left: `${(x / 1280) * 100}%`,
  top: `${(y / 960) * 100}%`,
});

function Marks({ scene }: { scene: DetailScene["howItWorks"] }) {
  return (
    <>
      {scene.hazardPath ? (
        <svg
          aria-hidden="true"
          className={styles.svg}
          preserveAspectRatio="none"
          viewBox="0 0 1280 960"
        >
          <motion.path
            animate={{ pathLength: 1 }}
            className={styles.hazardPath}
            d={scene.hazardPath}
            initial={{ pathLength: 0 }}
            transition={{ duration: 1, ease: EASE }}
          />
        </svg>
      ) : null}
      {scene.marks.map(({ box: [x, y, w, h], label, tone }, i) => (
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className={styles.mark}
          initial={{ opacity: 0, scale: 1.15 }}
          key={`${x}-${y}`}
          style={{
            transformOrigin: `${((x + w / 2) / 1280) * 100}% ${((y + h / 2) / 960) * 100}%`,
          }}
          transition={{ delay: 0.15 + i * 0.18, duration: 0.5, ease: EASE }}
        >
          <span
            className={styles.box}
            data-tone={tone}
            style={{
              ...pct(x, y),
              width: `${(w / 1280) * 100}%`,
              height: `${(h / 960) * 100}%`,
            }}
          />
          <span
            className={styles.chip}
            data-tone={tone}
            style={pct(x, y + h + 26)}
          >
            {label}
          </span>
        </motion.span>
      ))}
    </>
  );
}

/** One card per step after the first. The newest is large; older ones recede. */
function Cards({
  cards,
  step,
}: {
  cards: DetailScene["howItWorks"]["cards"];
  step: number;
}) {
  return (
    <div className={styles.cards}>
      <AnimatePresence>
        {cards
          .map((card, i) => ({ ...card, at: i + 1 }))
          .filter((card) => step >= card.at)
          .map((card) => {
            const current = card.at === step;
            return (
              <motion.div
                animate={{ opacity: 1, scale: current ? 1 : 0.92, x: 0 }}
                className={styles.card}
                data-current={current ? "true" : undefined}
                data-tone={card.tone}
                exit={{ opacity: 0, x: 40 }}
                initial={{ opacity: 0, x: 60, scale: 1.04 }}
                key={card.title}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <strong>{card.title}</strong>
                <span>{card.body}</span>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

/**
 * How it works, laid out like the homepage scene: the camera view fills the
 * screen and pins, the current step's title and text sit top left, and each
 * step adds a layer. Phones, reduced motion and no-JS get the finished view
 * with every step listed under it.
 */
export function StepScene({
  steps,
  scene,
  introduction,
}: {
  introduction: Step;
  steps: Step[];
  scene: DetailScene["howItWorks"];
}) {
  const frames = [introduction, ...steps];
  const pinned = useScrollScene();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStep(Math.min(frames.length - 1, Math.floor(v * frames.length))),
  );

  const view = (
    <div className={styles.stage}>
      <div className={styles.canvas}>
        <Image alt={scene.alt} fill sizes="100vw" src={scene.src} />
        <Marks scene={scene} />
      </div>
      <span className={styles.camera}>{scene.camera}</span>
      <Cards
        cards={scene.cards}
        step={pinned ? Math.max(0, step - 1) : steps.length - 1}
      />
    </div>
  );

  if (!pinned) {
    return (
      <div className={styles.static} ref={ref}>
        <div className={styles.introduction}>
          <h2>{introduction.title}</h2>
          <p>{introduction.description}</p>
        </div>
        {view}
        <ol className={styles.list}>
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      className={styles.track}
      ref={ref}
      style={{ height: `${steps.length * 80 + 40}vh` }}
    >
      <div className={styles.pinned}>
        {view}
        <div className={styles.copy}>
          {step > 0 && <h2 className="sr-only">{introduction.title}</h2>}
          {/* Old and new step crossfade in place, in step with the cards. */}
          <AnimatePresence initial={false}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0, y: 6 }}
              key={step}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {step === 0 ? (
                <h2>{introduction.title}</h2>
              ) : (
                <h3>{frames[step].title}</h3>
              )}
              <p>{frames[step].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
