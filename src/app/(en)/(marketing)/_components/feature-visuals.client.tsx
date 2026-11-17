"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import type { HomeCopy } from "../_copy/en";
import styles from "../home.module.css";

type VisualCopy = HomeCopy["visuals"];

const M = "/media/ailytics";

function Hint({ children }: { children: string }) {
  return (
    <span className={styles.hint} aria-hidden="true">
      {children}
    </span>
  );
}

/* 1. Real 3D distance: the drop zone breathes; pointer over the ground places a worker. */
export function DepthVisual({ copy }: { copy: VisualCopy["depth"] }) {
  const [touched, setTouched] = useState(false);
  const [worker, setWorker] = useState<{
    x: number;
    y: number;
    inside: boolean;
    metres: string;
  } | null>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    if (y < 0.66) {
      setWorker(null);
      return;
    }
    setTouched(true);
    const dx = (x - 55 / 160) / (22 / 160);
    const dy = (y - 0.87) / (0.065 * 1.6);
    const d = Math.sqrt(dx * dx + dy * dy);
    setWorker({
      x,
      y,
      inside: d < 1,
      metres: Math.max(0, (d - 1) * 3.2).toFixed(1),
    });
  }

  return (
    <div
      className={`${styles.vis} ${styles.v3d}`}
      data-touched={touched ? "true" : undefined}
      data-danger={worker?.inside ? "true" : undefined}
      onPointerMove={onMove}
      onPointerLeave={() => setWorker(null)}
    >
      <Image
        alt={copy.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        src={`${M}/stills/suspended-load-safe.jpg`}
      />
      <svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="55" y1="36" x2="55" y2="86" className={styles.dl} />
        <ellipse cx="55" cy="87" rx="22" ry="6.5" className={styles.dz} />
      </svg>
      <span
        className={styles.bx}
        style={{ left: "22%", top: "4%", width: "25%", height: "32%" }}
        aria-hidden="true"
      />
      <span
        className={`${styles.chip} ${styles.chipCoral}`}
        style={{ left: "22%", top: "71%" }}
      >
        {copy.dropZone}
      </span>
      {worker ? (
        <>
          <span
            className={styles.wk}
            data-in={worker.inside ? "true" : undefined}
            style={{ left: `${worker.x * 100}%`, top: `${worker.y * 100}%` }}
            aria-hidden="true"
          />
          <span
            className={`${styles.chip} ${styles.wkchip}`}
            data-in={worker.inside ? "true" : undefined}
            style={{ left: `${worker.x * 100}%`, top: `${worker.y * 100}%` }}
            aria-hidden="true"
          >
            {worker.inside
              ? copy.inside
              : copy.distance.replace("{metres}", worker.metres)}
          </span>
        </>
      ) : null}
      <Hint>{copy.hint}</Hint>
    </div>
  );
}

/* 2. Harsh conditions: a day/night divider sweeps on its own and follows the pointer. */
export function HarshVisual({ copy }: { copy: VisualCopy["harsh"] }) {
  const [split, setSplit] = useState<number | null>(null);

  return (
    <div
      className={`${styles.vis} ${styles.vharsh}`}
      data-live={split !== null ? "true" : undefined}
      data-touched={split !== null ? "true" : undefined}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setSplit(
          Math.min(95, Math.max(5, ((e.clientX - r.left) / r.width) * 100)),
        );
      }}
      onPointerLeave={() => setSplit(null)}
      style={split !== null ? ({ "--split": `${split}%` } as never) : undefined}
    >
      <Image
        alt={copy.dayAlt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        src={`${M}/detection-machinery-proximity-poster.jpg`}
      />
      <div className={styles.night}>
        <Image
          alt={copy.nightAlt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          src={`${M}/detection-low-light-ppe-poster.jpg`}
        />
      </div>
      <span className={styles.splitLine} aria-hidden="true" />
      <span className={styles.chip} style={{ left: 12, top: 12 }}>
        {copy.day}
      </span>
      <span
        className={`${styles.chip} ${styles.chipDark}`}
        style={{ right: 12, top: 12 }}
      >
        {copy.night}
      </span>
      <Hint>{copy.hint}</Hint>
    </div>
  );
}

/* 3. Ask your cameras: a question types itself over the last result, then the
   answer and matching clips land. The result area is never empty. */
/** Clips shown with each answer; the words come from `copy.questions`. */
const HITS = [
  [
    { src: `${M}/detection-smoke-fire-poster.jpg`, label: "Cam 06 · 14:05" },
    { src: `${M}/stills/fire-smoke-detection.jpg`, label: "Cam 07 · 14:06" },
  ],
  [
    { src: `${M}/stills/machinery-proximity.jpg`, label: "Cam 03 · 07:40" },
    {
      src: `${M}/detection-machinery-proximity-poster.jpg`,
      label: "Cam 03 · 09:55",
    },
  ],
  [
    { src: `${M}/stills/no-access-zones.jpg`, label: "Cam 10 · 23:14" },
    { src: `${M}/stills/loitering-unattended.jpg`, label: "Cam 11 · 23:16" },
  ],
];

const TYPE_MS = 32;
const HOLD_MS = 4200;

export function AskVisual({ copy }: { copy: VisualCopy["ask"] }) {
  const QUESTIONS = copy.questions.map((q, i) => ({
    ...q,
    q: q.question,
    a: q.answer,
    hits: HITS[i],
  }));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(0);
  const [typed, setTyped] = useState(QUESTIONS[0].q.length);
  const [touched, setTouched] = useState(false);
  const [run, setRun] = useState(0);

  const current = QUESTIONS[qi];
  const done = typed >= current.q.length;
  const result = QUESTIONS[done ? qi : shown];
  const count = QUESTIONS.length;

  useEffect(() => {
    if (reduce || !inView) return;
    if (!done) {
      const id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }
    if (touched) return;
    const id = window.setTimeout(() => {
      setShown(qi);
      setQi((qi + 1) % count);
      setTyped(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [reduce, inView, done, touched, run, qi, typed, count]);

  // Start the first question from an empty field once it scrolls into view.
  const started = useRef(false);
  useEffect(() => {
    if (reduce || !inView || started.current) return;
    started.current = true;
    const id = window.setTimeout(() => setTyped(0), 0);
    return () => window.clearTimeout(id);
  }, [reduce, inView]);

  function pick(i: number) {
    setTouched(true);
    setShown(done ? qi : shown);
    setQi(i);
    setTyped(reduce ? QUESTIONS[i].q.length : 0);
    setRun((n) => n + 1);
  }

  return (
    <div
      ref={ref}
      className={`${styles.vis} ${styles.vask}`}
      data-touched={touched ? "true" : undefined}
    >
      <div className={styles.askField}>
        <span className={styles.mag} aria-hidden="true" />
        <span className={styles.askTyped}>
          {current.q.slice(0, typed)}
          <span className={styles.caret} aria-hidden="true" />
        </span>
      </div>
      <div className={styles.sugg}>
        {QUESTIONS.map((q, i) => (
          <button
            key={i}
            type="button"
            data-on={i === qi ? "true" : undefined}
            onClick={() => pick(i)}
          >
            {q.chip}
          </button>
        ))}
      </div>
      <div className={styles.askResult} data-dim={done ? undefined : "true"}>
        <p className={styles.ans} aria-live="polite">
          {result.a}
        </p>
        <div className={styles.res}>
          {result.hits.map((h) => (
            <div key={h.label}>
              <Image
                alt=""
                fill
                sizes="(min-width: 1024px) 18vw, 44vw"
                src={h.src}
              />
              <span>{h.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.reason}>
          <p className={styles.verdict}>{result.verdict}</p>
          <p>
            <b>{result.issue}:</b> {result.finding}
          </p>
          <p className={styles.fix}>
            <b>{copy.rectification}</b> {result.fix}
          </p>
        </div>
      </div>
      <Hint>{copy.hint}</Hint>
    </div>
  );
}

export { SiteCameraWall as SitesVisual } from "@/components/site-camera-wall/site-camera-wall";

/* 5. Set up your way: a zone draws itself and the grace period slides; drag to set it. */
export function SetupVisual({ copy }: { copy: VisualCopy["setup"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [grace, setGrace] = useState(30);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (reduce || !inView || touched) return;
    const controls = animate(0, 33, {
      duration: 1.6,
      ease: [0.45, 0, 0.2, 1],
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1.6,
      onUpdate: (v) => setGrace(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce, inView, touched]);

  return (
    <div
      ref={ref}
      className={`${styles.vis} ${styles.vsetup}`}
      data-touched={touched ? "true" : undefined}
    >
      <div className={styles.setupCam}>
        <Image
          alt={copy.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          src={`${M}/detection-vehicle-reversing-poster.jpg`}
        />
        <svg
          viewBox="0 0 160 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="40,90 70,48 112,48 140,90" className={styles.zone} />
        </svg>
      </div>
      <div className={styles.settings}>
        <div className={styles.setRow}>
          <b>{copy.zone}</b>
          <span className={styles.toggle} aria-hidden="true">
            <i />
          </span>
          <span className={styles.setVal}>{copy.on}</span>
        </div>
        <label className={styles.setRow}>
          <b>{copy.grace}</b>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={grace}
            className={styles.range}
            style={{ "--v": `${(grace / 60) * 100}%` } as never}
            onChange={(e) => {
              setTouched(true);
              setGrace(Number(e.target.value));
            }}
            onPointerDown={() => setTouched(true)}
          />
          <span className={styles.setVal}>
            {copy.graceValue.replace("{seconds}", String(grace))}
          </span>
        </label>
        <div className={styles.setRow}>
          <b>{copy.cooldown}</b>
          <span className={styles.setVal}>{copy.cooldownValue}</span>
        </div>
      </div>
      <Hint>{copy.hint}</Hint>
    </div>
  );
}
