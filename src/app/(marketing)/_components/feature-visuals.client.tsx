"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import styles from "../home.module.css";

const M = "/media/ailytics";

function Hint({ children }: { children: string }) {
  return (
    <span className={styles.hint} aria-hidden="true">
      {children}
    </span>
  );
}

/* 1. Real 3D distance: the drop zone breathes; pointer over the ground places a worker. */
export function DepthVisual() {
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
        alt="Site camera view of a crane lifting a formwork panel, with the projected drop zone marked on the ground."
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
        Projected drop zone
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
              ? "Inside drop zone · alert"
              : `${worker.metres} m from drop zone`}
          </span>
        </>
      ) : null}
      <Hint>Try it: move over the ground</Hint>
    </div>
  );
}

/* 2. Harsh conditions: a day/night divider sweeps on its own and follows the pointer. */
export function HarshVisual() {
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
        alt="Daylight camera view of an excavator and workers on a construction site."
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        src={`${M}/detection-machinery-proximity-poster.jpg`}
      />
      <div className={styles.night}>
        <Image
          alt="Night camera view of a site with a worker detected in low light."
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          src={`${M}/detection-low-light-ppe-poster.jpg`}
        />
      </div>
      <span className={styles.splitLine} aria-hidden="true" />
      <span className={styles.chip} style={{ left: 12, top: 12 }}>
        Daylight
      </span>
      <span
        className={`${styles.chip} ${styles.chipDark}`}
        style={{ right: 12, top: 12 }}
      >
        Night shift
      </span>
      <Hint>Try it: move across</Hint>
    </div>
  );
}

/* 3. Ask your cameras: a question types itself over the last result, then the
   answer and matching clips land. The result area is never empty. */
const QUESTIONS = [
  {
    chip: "Smoke or fire",
    q: "Any smoke or fire near the generators today?",
    a: "Yes, once. Smoke in the generator yard at 14:05. The alert went to the duty supervisor.",
    hits: [
      { src: `${M}/detection-smoke-fire-poster.jpg`, label: "Cam 06 · 14:05" },
      { src: `${M}/stills/fire-smoke-detection.jpg`, label: "Cam 07 · 14:06" },
    ],
    reasoning: {
      verdict: "Non-compliant · 1 issue",
      issue: "Fire hazard (High)",
      finding: "Smoke is rising above the roofline beside the generator yard.",
      fix: "Send the fire warden to check the source and keep people clear until it is confirmed safe.",
    },
  },
  {
    chip: "Idle machinery",
    q: "Which machines sat idle for over an hour this morning?",
    a: "One excavator in Zone C, idle from 07:40 to 09:55.",
    hits: [
      { src: `${M}/stills/machinery-proximity.jpg`, label: "Cam 03 · 07:40" },
      {
        src: `${M}/detection-machinery-proximity-poster.jpg`,
        label: "Cam 03 · 09:55",
      },
    ],
    reasoning: {
      verdict: "Needs attention · 1 issue",
      issue: "Idle machinery (Medium)",
      finding:
        "The excavator stayed parked with no work cycles for 2 h 15 min.",
      fix: "Reassign it to another zone, or return it to cut hire and fuel costs.",
    },
  },
  {
    chip: "Unauthorized entry",
    q: "Did anyone enter a restricted area after hours?",
    a: "Yes. One person at the substation gate at 23:14.",
    hits: [
      { src: `${M}/stills/no-access-zones.jpg`, label: "Cam 10 · 23:14" },
      { src: `${M}/stills/loitering-unattended.jpg`, label: "Cam 11 · 23:16" },
    ],
    reasoning: {
      verdict: "Non-compliant · 1 issue",
      issue: "Unauthorized entry (High)",
      finding:
        "A worker is opening the barrier past a STOP sign into a zone with an active excavator, outside permitted hours.",
      fix: "Lock the barrier after hours and confirm the worker's access permit with the site supervisor.",
    },
  },
];

const TYPE_MS = 32;
const HOLD_MS = 4200;

export function AskVisual() {
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

  useEffect(() => {
    if (reduce || !inView) return;
    if (!done) {
      const id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }
    if (touched) return;
    const id = window.setTimeout(() => {
      setShown(qi);
      setQi((qi + 1) % QUESTIONS.length);
      setTyped(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [reduce, inView, done, touched, run, qi, typed]);

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
            key={q.chip}
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
          <p className={styles.verdict}>{result.reasoning.verdict}</p>
          <p>
            <b>{result.reasoning.issue}:</b> {result.reasoning.finding}
          </p>
          <p className={styles.fix}>
            <b>Rectification:</b> {result.reasoning.fix}
          </p>
        </div>
      </div>
      <Hint>Try it: pick a question</Hint>
    </div>
  );
}

export { SiteCameraWall as SitesVisual } from "@/components/site-camera-wall/site-camera-wall";

/* 5. Set up your way: a zone draws itself and the grace period slides; drag to set it. */
export function SetupVisual() {
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
          alt="Yard camera view with an exclusion zone drawn behind a reversing vehicle."
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
          <b>Exclusion zone</b>
          <span className={styles.toggle} aria-hidden="true">
            <i />
          </span>
          <span className={styles.setVal}>On</span>
        </div>
        <label className={styles.setRow}>
          <b>Grace period</b>
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
          <span className={styles.setVal}>{grace} s</span>
        </label>
        <div className={styles.setRow}>
          <b>Alert cooldown</b>
          <span className={styles.setVal}>5 min</span>
        </div>
      </div>
      <Hint>Try it: drag the slider</Hint>
    </div>
  );
}
