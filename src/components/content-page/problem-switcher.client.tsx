"use client";

import { useRef, useState } from "react";

import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";

import styles from "./problem-switcher.module.css";

export type ProblemItem = { title: string; body: string; visualId: VisualId };

/**
 * A list beside one visual. Hovering, focusing or tapping an item opens its
 * detail and shows its visual. Without JavaScript the first item shows open
 * and every title is still listed.
 */
export function ProblemSwitcher({ items }: { items: ProblemItem[] }) {
  const [active, setActive] = useState(0);
  const pointer = useRef("");
  const current = items[active];
  return (
    <div className={styles.switcher}>
      <ul>
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              aria-pressed={i === active}
              data-active={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseMove={(event) => {
                // Opening an item shifts the list. An item sliding under a
                // still cursor fires events at the same point; ignore those.
                const point = `${event.clientX},${event.clientY}`;
                if (point === pointer.current) return;
                pointer.current = point;
                setActive(i);
              }}
              type="button"
            >
              <span className={styles.bar} />
              <span>
                <h3 className={styles.title}>{item.title}</h3>
                <span className={styles.body}>{item.body}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.stage}>
        <ProjectVisual
          fill
          id={current.visualId}
          key={current.visualId}
          sizes="(min-width: 1024px) 50vw, 92vw"
        />
      </div>
    </div>
  );
}
