"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import styles from "./scroll-sequence.module.css";

type Item = { title: string; description: string };

function Step({
  item,
  index,
  total,
  progress,
  reduce,
}: {
  item: Item;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean | null;
}) {
  const fill = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  return (
    <li className={styles.step}>
      <div className={styles.rail} aria-hidden="true">
        <motion.span style={reduce ? undefined : { scaleX: fill }} />
      </div>
      <span className={styles.number} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </li>
  );
}

export function ScrollSequence({
  items,
  tone = "signal",
}: {
  items: Item[];
  tone?: "signal" | "alert";
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 45%"],
  });
  return (
    <ol
      ref={ref}
      className={styles.sequence}
      data-tone={tone}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item, index) => (
        <Step
          key={item.title}
          item={item}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </ol>
  );
}
