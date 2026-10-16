"use client";

import { useState } from "react";

import { ProjectVisual } from "@/components/visuals/project-visual";
import type { VisualId } from "@/lib/visuals";

import styles from "./capability-switcher.module.css";

export type Capability = { title: string; body: string; visualId: VisualId };

/**
 * Capabilities as a list beside one product visual, in one teal card. The
 * active item is white with its detail open; the rest fade back. Without
 * JavaScript the first item shows open and every title is still listed.
 */
export function CapabilitySwitcher({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
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
              onMouseEnter={() => setActive(i)}
              type="button"
            >
              <h3 className={styles.title}>{item.title}</h3>
              <span className={styles.body}>{item.body}</span>
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
