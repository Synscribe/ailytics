"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, Bell, FileText, Check } from "lucide-react";
import { ProjectVisual } from "@/components/visuals/project-visual";
import s from "./preview.module.css";
const M = "/media/ailytics/stills/";
const steps = [
  {
    title: "Spot missing protection.",
    body: "The camera checks the PPE required in the work area. A missing hard hat becomes an event your team can review.",
    label: "Detect",
    status: "Missing hard hat detected",
  },
  {
    title: "Give the supervisor the evidence.",
    body: "The alert carries the camera frame, time and location. Your team has the context to follow up during the shift.",
    label: "Alert",
    status: "Event sent to the supervisor",
  },
  {
    title: "Bring the event into your report.",
    body: "Keep the evidence with the event record for safety reviews, toolbox talks and audit preparation.",
    label: "Report",
    status: "Evidence attached to the report",
  },
];
function PpeStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setStep(Math.min(2, Math.floor(p * 3))),
  );
  const active = reduce ? 2 : step;
  return (
    <section id="ppe-direction" className={s.story} ref={ref}>
      <div className={s.steps}>
        {steps.map((item, i) => (
          <article
            className={s.step}
            key={item.label}
            data-active={active === i}
          >
            <span className={s.number}>
              0{i + 1} / {item.label}
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className={s.pinned}>
        <div className={s.console}>
          <div className={s.consoleHead}>
            <span>
              <i /> Camera 04
            </span>
            <span>Site entrance</span>
          </div>
          <div className={s.camera}>
            <Image
              src={`${M}ppe-detection.jpg`}
              alt="Site entrance camera evidence showing a worker carrying a hard hat."
              fill
              sizes="(min-width: 900px) 46vw, 90vw"
            />
            <div className={s.box}>
              <span>Missing hard hat</span>
            </div>
            <motion.div
              className={s.alert}
              initial={false}
              animate={{
                opacity: active >= 1 ? 1 : 0,
                y: active >= 1 ? 0 : 12,
              }}
              transition={{ duration: reduce ? 0 : 0.45 }}
            >
              <Bell size={18} />
              <div>
                <strong>Missing PPE detected</strong>
                <span>Site entrance · Camera 04</span>
              </div>
              <span className={s.sent}>Sent</span>
            </motion.div>
          </div>
          <div className={s.event}>
            <span className={s.small}>ILLUSTRATIVE EVENT</span>
            <h4>{steps[active].status}</h4>
            <div className={s.track}>
              {steps.map((x, i) => (
                <span key={x.label} data-done={i <= active}>
                  {i < active ? <Check size={12} /> : <i />}
                  {x.label}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            className={s.report}
            initial={false}
            animate={{
              height: active === 2 ? 72 : 0,
              opacity: active === 2 ? 1 : 0,
            }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <FileText size={22} />
            <div>
              <strong>PPE event report</strong>
              <span>Frame, location and event details</span>
            </div>
            <Check size={18} />
          </motion.div>
        </div>
        <p className={s.caption}>
          One camera event, from detection to review. Scroll to follow it.
        </p>
      </div>
    </section>
  );
}
const feeds = [
  "open-edge-detection.jpg",
  "ppe-hero.jpg",
  "no-access-zones.jpg",
  "machinery-proximity.jpg",
  "under-load-detection.jpg",
  "crowding.jpg",
  "ppe-detection.jpg",
  "timelapse-later.jpg",
  "speeding-wrong-way.jpg",
];
function Mosaic() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(p, [0, 0.7, 1], [1, 3.08, 3.08]);
  const fade = useTransform(p, [0, 0.3, 0.65], [1, 1, 0]);
  const [focused, setFocused] = useState(false);
  useMotionValueEvent(p, "change", (v) => setFocused(v > 0.6));
  return (
    <section id="construction-direction" ref={ref} className={s.mosaicStory}>
      <div className={s.mosaicPin}>
        <div className={s.mosaicCopy}>
          <span className={s.number}>02 / Construction</span>
          <h2>
            See the site.
            <br />
            Find the risk.
          </h2>
          <p>
            Every camera adds a view. Ailytics brings the hazard that needs
            attention into focus.
          </p>
          <div className={s.focusCopy}>
            <i />
            <span>
              {focused || reduce
                ? "Workers beneath a suspended load"
                : "Monitoring the site’s camera views"}
            </span>
          </div>
          <span className={s.small}>ILLUSTRATIVE CAMERA VIEWS</span>
        </div>
        <div className={s.mosaicFrame}>
          <motion.div
            className={s.mosaic}
            style={{ scale: reduce ? 3.08 : scale }}
          >
            {feeds.map((src, i) => (
              <motion.div
                key={src}
                className={s.tile}
                style={{ opacity: i === 4 ? 1 : reduce ? 0 : fade }}
              >
                <Image
                  src={M + src}
                  alt={
                    i === 4
                      ? "Construction camera view of a suspended load"
                      : ""
                  }
                  fill
                  sizes="(min-width:900px) 20vw, 35vw"
                />
                <motion.span style={{ opacity: reduce ? 0 : fade }}>
                  Camera {String(i === 4 ? 3 : i + 1).padStart(2, "0")}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className={s.focusVisual}
            initial={false}
            animate={{ opacity: reduce || focused ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            <ProjectVisual id="under-load-detection" fill />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default function Preview() {
  return (
    <main className={s.page}>
      <header className={s.intro}>
        <Link href="/dev/visuals">Visual workshop</Link>
        <span className={s.small}>SCROLL STUDY · PRIVATE PREVIEW</span>
        <h1>
          Make the camera story
          <br />
          part of the scroll.
        </h1>
        <p>
          Two directions using your existing footage, colours and type. The live
          pages are unchanged.
        </p>
        <nav>
          <a href="#ppe-direction">
            01 · PPE workflow <ArrowDown size={15} />
          </a>
          <a href="#construction-direction">
            02 · Construction mosaic <ArrowDown size={15} />
          </a>
        </nav>
      </header>
      <div className={s.sectionIntro}>
        <span className={s.number}>01 / PPE detection</span>
        <h2>
          From a missing hard hat
          <br />
          to evidence your team can use.
        </h2>
        <p>
          The camera stays in place while the explanation moves through
          detection, alert and report.
        </p>
      </div>
      <PpeStory />
      <div className={s.divider}>
        <span>Next direction</span>
        <ArrowDown size={22} />
      </div>
      <Mosaic />
      <footer className={s.end}>
        <h2>
          The same footage.
          <br />A clearer sequence.
        </h2>
        <p>
          PPE uses a continuous event story. Construction moves from site
          coverage to one hazard.
        </p>
        <a href="#">Back to the top ↑</a>
      </footer>
    </main>
  );
}
