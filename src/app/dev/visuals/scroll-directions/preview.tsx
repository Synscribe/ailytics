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
import { ArrowDown } from "lucide-react";
import { ProjectVisual } from "@/components/visuals/project-visual";
import s from "./preview.module.css";
const M = "/media/ailytics/stills/";
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
          <span className={s.number}>Construction</span>
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
          Construction mosaic using your existing footage, colours and type. The
          live pages are unchanged.
        </p>
        <nav>
          <a href="#construction-direction">
            View Construction mosaic <ArrowDown size={15} />
          </a>
        </nav>
      </header>
      <Mosaic />
      <footer className={s.end}>
        <h2>
          The same footage.
          <br />A clearer sequence.
        </h2>
        <p>
          Construction moves from site coverage to one hazard, within a single
          feature visual.
        </p>
        <a href="#">Back to the top ↑</a>
      </footer>
    </main>
  );
}
