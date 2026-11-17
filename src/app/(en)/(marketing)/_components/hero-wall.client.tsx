"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { localizedHref, type Locale } from "@/lib/i18n";

import type { HomeCopy } from "../_copy/en";
import styles from "../home.module.css";

const M = "/media/ailytics";

type Category = "safety" | "security" | "productivity";

const CATEGORIES: Category[] = ["safety", "security", "productivity"];

const TILES = [
  {
    src: `${M}/detection-machinery-proximity-poster.jpg`,
    pos: "15% 60%",
  },
  {
    src: `${M}/detection-machinery-proximity-poster.jpg`,
    pos: "85% 40%",
  },
  {
    src: `${M}/detection-low-light-ppe-poster.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/detection-vehicle-reversing-poster.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/detection-open-edge-poster.jpg`,
    pos: "60% 30%",
  },
  {
    src: `${M}/detection-smoke-fire-poster.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/detection-ergonomics-poster.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/stills/suspended-load-safe.jpg`,
    pos: "50% 20%",
  },
  {
    src: `${M}/vlm-falling-object-poster.jpg`,
    pos: "50% 60%",
  },
  {
    src: `${M}/stills/speeding-wrong-way.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/stills/no-access-zones.jpg`,
    pos: "50% 50%",
  },
  {
    src: `${M}/stills/crowding.jpg`,
    pos: "50% 40%",
  },
] as const;

/** Each alert's tag and text come from `copy.events`, in the same order. */
const EVENTS: {
  tile: number;
  cat: Category;
  href?: string;
}[] = [
  {
    tile: 0,
    cat: "safety",
  },
  {
    tile: 4,
    cat: "safety",
  },
  {
    tile: 10,
    cat: "security",
  },
  {
    tile: 9,
    cat: "security",
  },
  {
    tile: 5,
    cat: "safety",
  },
  {
    tile: 1,
    cat: "productivity",
  },
  {
    tile: 11,
    cat: "productivity",
  },
  {
    tile: 3,
    cat: "safety",
  },
  {
    tile: 7,
    cat: "safety",
  },
  {
    tile: 2,
    cat: "safety",
    href: "/use-cases/ppe-detection",
  },
];

const EVENT_MS = 3000;
const RESUME_MS = 12000;

/** The home signature: a wall of real site cameras that catches one hazard at a time. */
export function HeroWall({
  copy,
  locale,
}: {
  copy: HomeCopy["heroWall"];
  locale: Locale;
}) {
  const [index, setIndex] = useState(0);
  // A picked category keeps the wall on that category's events until the
  // visitor clicks it again or leaves it alone for RESUME_MS.
  const [picked, setPicked] = useState<Category | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wallRef, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const allEvents = EVENTS.map((e, i) => ({ ...e, ...copy.events[i] }));
  const events = picked ? allEvents.filter((e) => e.cat === picked) : allEvents;

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
  const cam = copy.cams[event.tile];

  return (
    <>
      <div className={styles.heroControls}>
        <Link
          href={localizedHref(locale, event.href ?? "/use-cases")}
          className={styles.alertLine}
          data-cat={event.cat}
        >
          <span className={styles.alertDot} aria-hidden="true" />
          <span className={styles.alertCam}>
            {copy.live} · {cam}
          </span>
          <span className={styles.alertText}>{event.text}</span>
          <span className={styles.alertCat}>
            <span aria-hidden="true" />
            {copy.categories[event.cat]}
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
          aria-label={copy.legendLabel}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              data-cat={c}
              data-on={c === event.cat ? "true" : undefined}
              aria-pressed={c === picked}
              onClick={() => pick(c)}
            >
              <span aria-hidden="true" />
              {copy.categories[c]}
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
                  key={i}
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
                  <span className={styles.camLabel}>{copy.cams[i]}</span>
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
