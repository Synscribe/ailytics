"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./scanned-highlight.module.css";

const STEP = 75; // ms per letter, averaged over each line
const START = 200;
const GAP = 4000; // pause between repeat scans

type Line = { start: number; travel: number; delay: number; duration: number };
type Scan = { lines: Line[]; delays: number[] };

/** A scan line crosses the phrase once on entering the viewport; each letter
 *  turns teal as it passes. Copy stays readable without JS. */
export function ScannedHighlight({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [scan, setScan] = useState<Scan | null>(null);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    // Measure after the web font swaps in, so the beam matches the glyphs.
    document.fonts.ready.then(() => {
      if (!cancelled && ref.current) setScan(measure(ref.current));
    });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  // The beam repeats on a shared cycle, so a wrapped phrase scans line by line
  // each time. Letters turn teal on the first pass and stay teal.
  useEffect(() => {
    if (!scan || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const beams = ref.current?.querySelectorAll("[data-beam]") ?? [];
    const last = scan.lines[scan.lines.length - 1];
    const period = last.delay + last.duration - START + GAP;
    const animations = [...beams].map((beam, n) => {
      const { travel, delay, duration } = scan.lines[n];
      const end = duration / period;
      const to = `translateX(calc(-100% + ${travel}px))`;
      return beam.animate(
        [
          { offset: 0, transform: "translateX(-100%)", opacity: 1 },
          { offset: end * 0.92, opacity: 1 },
          { offset: end, transform: to, opacity: 0 },
          { offset: 1, transform: to, opacity: 0 },
        ],
        { duration: period, delay, iterations: Infinity },
      );
    });
    return () => animations.forEach((animation) => animation.cancel());
  }, [scan]);

  let index = 0;
  return (
    <span
      ref={ref}
      className={styles.highlight}
      data-state={scan ? "scanned" : "idle"}
    >
      {children.split(/(\s+)/).map((word, w) =>
        /^\s*$/.test(word) ? (
          word
        ) : (
          <span key={w} className={styles.word}>
            {[...word].map((char) => {
              const i = index++;
              const line = scan?.lines.find((l) => l.start === i);
              return (
                <span
                  key={i}
                  className={styles.letter}
                  data-letter=""
                  style={
                    scan
                      ? { transitionDelay: `${scan.delays[i]}ms` }
                      : undefined
                  }
                >
                  {char}
                  {line ? (
                    <span
                      aria-hidden="true"
                      className={styles.beam}
                      data-beam=""
                    />
                  ) : null}
                </span>
              );
            })}
          </span>
        ),
      )}
    </span>
  );
}

/** Groups letters into rendered lines and times one beam across each line at
 *  a steady speed. Each letter turns as the beam reaches its centre. */
function measure(root: HTMLElement): Scan {
  const rects = [...root.querySelectorAll("[data-letter]")].map((letter) =>
    letter.getBoundingClientRect(),
  );
  const lines: Line[] = [];
  const delays: number[] = [];
  let elapsed = START;
  for (let start = 0; start < rects.length;) {
    let end = start;
    while (
      end + 1 < rects.length &&
      Math.abs(rects[end + 1].top - rects[start].top) < 2
    )
      end++;
    const left = rects[start].left;
    const travel = rects[end].right - left;
    const duration = (end - start + 1) * STEP;
    lines.push({ start, travel, delay: elapsed, duration });
    for (let i = start; i <= end; i++) {
      const centre = (rects[i].left + rects[i].right) / 2 - left;
      delays[i] = elapsed + (centre / travel) * duration;
    }
    elapsed += duration;
    start = end + 1;
  }
  return { lines, delays };
}
