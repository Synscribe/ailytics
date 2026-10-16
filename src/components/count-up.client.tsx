"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts the first number in a stat (for example "60" in "60–80%") up from
 * zero when it scrolls into view. The full value is in the server HTML and
 * stays put under reduced motion.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/\d+(\.\d+)?/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce || !match) return;
    const target = Number(match[0]);
    const decimals = match[1] ? match[1].length - 1 : 0;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setShown(value.replace(match[0], n.toFixed(decimals))),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return <span ref={ref}>{shown}</span>;
}
