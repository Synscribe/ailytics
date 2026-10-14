"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "../home.module.css";

const M = "/media/ailytics";

type Category = "safety" | "security" | "productivity";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "safety", label: "Safety" },
  { id: "security", label: "Security" },
  { id: "productivity", label: "Productivity" },
];

const TILES = [
  {
    src: `${M}/detection-machinery-proximity-poster.jpg`,
    pos: "15% 60%",
    cam: "Cam 01 · Tower A",
  },
  {
    src: `${M}/detection-machinery-proximity-poster.jpg`,
    pos: "85% 40%",
    cam: "Cam 02 · Tower A",
  },
  {
    src: `${M}/detection-low-light-ppe-poster.jpg`,
    pos: "50% 50%",
    cam: "Cam 03 · Plant 2",
  },
  {
    src: `${M}/detection-vehicle-reversing-poster.jpg`,
    pos: "50% 50%",
    cam: "Cam 04 · Yard",
  },
  {
    src: `${M}/detection-open-edge-poster.jpg`,
    pos: "60% 30%",
    cam: "Cam 05 · Tower A",
  },
  {
    src: `${M}/detection-smoke-fire-poster.jpg`,
    pos: "50% 50%",
    cam: "Cam 06 · Generator yard",
  },
  {
    src: `${M}/detection-ergonomics-poster.jpg`,
    pos: "50% 50%",
    cam: "Cam 07 · Plant 2",
  },
  {
    src: `${M}/stills/suspended-load-safe.jpg`,
    pos: "50% 20%",
    cam: "Cam 08 · Tower B",
  },
  {
    src: `${M}/vlm-falling-object-poster.jpg`,
    pos: "50% 60%",
    cam: "Cam 09 · Tower B",
  },
  {
    src: `${M}/stills/speeding-wrong-way.jpg`,
    pos: "50% 50%",
    cam: "Cam 10 · Gate",
  },
  {
    src: `${M}/stills/no-access-zones.jpg`,
    pos: "50% 50%",
    cam: "Cam 11 · Plant 2",
  },
  {
    src: `${M}/stills/crowding.jpg`,
    pos: "50% 40%",
    cam: "Cam 12 · Dock",
  },
] as const;

const EVENTS: {
  tile: number;
  cat: Category;
  tag: string;
  text: string;
  href?: string;
}[] = [
  {
    tile: 0,
    cat: "safety",
    tag: "1.8 m from excavator",
    text: "Worker too close to excavator",
  },
  {
    tile: 4,
    cat: "safety",
    tag: "Open edge",
    text: "Worker near an open edge",
  },
  {
    tile: 10,
    cat: "security",
    tag: "Restricted area · 23:14",
    text: "After-hours restricted-area entry",
  },
  {
    tile: 9,
    cat: "security",
    tag: "Wrong way",
    text: "Wrong-way vehicle at gate",
  },
  {
    tile: 5,
    cat: "safety",
    tag: "Smoke",
    text: "Smoke in generator yard",
  },
  {
    tile: 1,
    cat: "productivity",
    tag: "Idle 2 h 10 m",
    text: "Piling rig idle since 07:40",
  },
  {
    tile: 11,
    cat: "productivity",
    tag: "14 on shift",
    text: "14 workers on shift at dock",
  },
  {
    tile: 3,
    cat: "safety",
    tag: "Reversing",
    text: "Person behind reversing truck",
  },
  {
    tile: 7,
    cat: "safety",
    tag: "Suspended load",
    text: "Worker under suspended load",
  },
  {
    tile: 2,
    cat: "safety",
    tag: "No hard hat",
    text: "Missing hard hat in low light",
    href: "/use-cases/ppe-detection",
  },
];

const EVENT_MS = 3000;
const RESUME_MS = 12000;

/** The home signature: a wall of real site cameras that catches one hazard at a time. */
export function HeroWall() {
  const [index, setIndex] = useState(0);
  // A picked category keeps the wall on that category's events until the
  // visitor clicks it again or leaves it alone for RESUME_MS.
  const [picked, setPicked] = useState<Category | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wallRef, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const events = picked ? EVENTS.filter((e) => e.cat === picked) : EVENTS;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setIndex((n) => n + 1), EVENT_MS);
    return () => window.clearInterval(id);
  }, [reduce, inView, picked]);

  useEffect(() => {
    if (!picked) return;
    const id = window.setTimeout(() => setPicked(null), RESUME_MS);
    return () => window.clearTimeout(id);
  }, [picked]);

  function pick(cat: Category) {
    if (cat === picked) {
      setPicked(null);
      setIndex(EVENTS.findIndex((e) => e.cat === cat));
      return;
    }
    setPicked(cat);
    setIndex(0);
  }

  const event = events[index % events.length];
  const tile = TILES[event.tile];

  return (
    <>
      <div className={styles.heroControls}>
        <Link
          href={event.href ?? "/use-cases"}
          className={styles.alertLine}
          data-cat={event.cat}
        >
          <span className={styles.alertDot} aria-hidden="true" />
          <span className={styles.alertCam}>Live · {tile.cam}</span>
          <span className={styles.alertText}>{event.text}</span>
          <span className={styles.alertCat}>
            <span aria-hidden="true" />
            {CATEGORIES.find((c) => c.id === event.cat)?.label}
          </span>
          <ArrowRightIcon
            className={styles.alertArrow}
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </Link>

        <div
          className={styles.legend}
          role="group"
          aria-label="Show alerts by category"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              data-cat={c.id}
              data-on={c.id === event.cat ? "true" : undefined}
              aria-pressed={c.id === picked}
              onClick={() => pick(c.id)}
            >
              <span aria-hidden="true" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.wallPerspective} ref={wallRef} aria-hidden="true">
        <div className={styles.wallTilt}>
          <div className={styles.wall}>
            {TILES.map((t, i) => {
              const on = i === event.tile;
              return (
                <div
                  className={styles.cam}
                  data-on={on ? "true" : undefined}
                  data-cat={on ? event.cat : undefined}
                  key={t.cam}
                >
                  <div className={styles.camPx}>
                    <Image
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 17vw, 34vw"
                      src={t.src}
                      style={{ objectPosition: t.pos }}
                      priority={i < 6}
                    />
                    <span className={styles.camTint} />
                    <span className={styles.camShade} />
                  </div>
                  <span className={styles.camFrame} />
                  <span className={styles.camLabel}>{t.cam}</span>
                  {on ? (
                    <span className={styles.camTag} key={index}>
                      {event.tag}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
