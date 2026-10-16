"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";

import { useScrollScene } from "@/app/(marketing)/_components/use-scroll-scene";
import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";

import styles from "./scroll-switcher.module.css";

export type ScrollItem = { title: string; body: string; visualId: VisualId };

/**
 * A list beside one visual, driven by scroll: the pair pins while the page
 * scrolls through each item. The section heading pins with them. Phones, reduced motion and no-JS get every
 * item stacked with its own visual.
 */
export function ScrollSwitcher({
  heading,
  items,
}: {
  heading: ReactNode;
  items: ScrollItem[];
}) {
  const scene = useScrollScene();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(items.length - 1, Math.floor(v * items.length))),
  );

  if (!scene) {
    return (
      <div className={styles.static}>
        {heading}
        {items.map((item) => (
          <div className={styles.card} key={item.title}>
            <div className={styles.text}>
              <h3 className={styles.title} data-active="true">
                {item.title}
              </h3>
              <p className={styles.body}>{item.body}</p>
            </div>
            <div className={styles.stage}>
              <ProjectVisual fill id={item.visualId} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={styles.track}
      ref={ref}
      style={{ height: `${items.length * 70 + 30}vh` }}
    >
      {/* Heading, list and visual pin together, centred in the screen. */}
      <div className={styles.pinned}>
        {heading}
        <div className={styles.card}>
          <ol className={styles.text}>
            {items.map((item, i) => (
              <li
                data-active={i === active ? "true" : undefined}
                key={item.title}
              >
                <span className={styles.bar}>
                  <span
                    style={{
                      transform: `scaleY(${i < active ? 1 : i === active ? 0.5 : 0})`,
                    }}
                  />
                </span>
                <div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.body}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.stage}>
            <ProjectVisual
              fill
              id={items[active].visualId}
              key={items[active].visualId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
