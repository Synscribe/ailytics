"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through a list of words inside a heading. The first word is in the
 * server HTML, so the heading reads correctly without JavaScript, and the full
 * list stays available to assistive technology.
 */
export function RotatingWords({
  words,
  className,
  intervalMs = 2400,
}: {
  words: readonly string[];
  className?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [intervalMs, reduce, words.length]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span
        aria-hidden="true"
        className={`relative inline-grid overflow-hidden align-top ${className ?? ""}`}
      >
        {/* Reserve the width of the longest word so the line never shifts. */}
        {words.map((word) => (
          <span
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
            key={word}
          >
            {word}
          </span>
        ))}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="col-start-1 row-start-1 whitespace-nowrap"
            exit={{ opacity: 0, y: reduce ? 0 : "-40%" }}
            initial={{ opacity: 0, y: reduce ? 0 : "40%" }}
            key={words[index]}
            transition={{
              duration: reduce ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
