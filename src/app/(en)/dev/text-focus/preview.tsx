"use client";

import { useState } from "react";
import styles from "./preview.module.css";

const options = [
  {
    id: "focus",
    name: "Camera focus",
    description: "A brief scan, then four corners settle around the word.",
  },
  {
    id: "highlight",
    name: "Scanned highlight",
    description:
      "A translucent highlight sweeps across and stays behind the word.",
  },
  {
    id: "box",
    name: "Detection box",
    description:
      "A thin outline draws around the word, like a detected subject.",
  },
] as const;

export function FocusPreview() {
  const [selected, setSelected] =
    useState<(typeof options)[number]["id"]>("focus");
  const [replay, setReplay] = useState(0);
  const current = options.find((option) => option.id === selected)!;
  return (
    <main id="main-content">
      <div className={styles.controls}>
        <p>Heading emphasis</p>
        <div
          className={styles.options}
          role="group"
          aria-label="Emphasis treatment"
        >
          {options.map((option) => (
            <button
              type="button"
              aria-pressed={selected === option.id}
              key={option.id}
              onClick={() => setSelected(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
        <button
          className={styles.replay}
          type="button"
          onClick={() => setReplay(replay + 1)}
        >
          Replay animation
        </button>
      </div>
      <section className={`brand-hero ${styles.hero}`}>
        <p className={styles.label}>About Us</p>
        <h1>
          We&apos;re here to make
          <br className={styles.break} /> workplaces safer and{" "}
          <span
            className={styles.word}
            data-treatment={selected}
            key={`${selected}-${replay}`}
          >
            smarter
            <span aria-hidden="true" className={styles.mark}>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span aria-hidden="true" className={styles.scan} />
          </span>
        </h1>
        <p className={styles.description}>
          Ailytics is purpose-built for real-world industrial operations. It
          watches sites around the clock and alerts teams to hazards as they
          happen.
        </p>
      </section>
      <p className={styles.caption} aria-live="polite">
        {current.description} Animation plays once. Reduced-motion settings show
        the finished treatment.
      </p>
    </main>
  );
}
