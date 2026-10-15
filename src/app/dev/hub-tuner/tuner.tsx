"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "../layout-tuner/tuner.module.css";

// [key, label, default, min, max, step, unit]
const controls = [
  ["visualShare", "Visual column width", 50, 35, 70, 1, "%"],
  ["bleed", "Runs off the right edge", 166, 0, 360, 2, "px"],
  ["shift", "Move hero row up or down", -60, -120, 120, 2, "px"],
  ["glowSpreadX", "Glow width", 12, 0, 60, 1, "%"],
  ["glowSpreadY", "Glow height", 18, 0, 60, 1, "%"],
  ["glowStrength", "Glow strength", 100, 0, 250, 5, "%"],
  ["glowBlur", "Glow softness", 24, 0, 80, 2, "px"],
  ["glowX", "Glow left or right", 0, -300, 300, 4, "px"],
  ["glowY", "Glow up or down", 0, -200, 200, 4, "px"],
  ["grey", "Grey on quiet cameras", 100, 0, 100, 5, "%"],
] as const;

type Values = Record<string, number>;

const defaults: Values = Object.fromEntries(
  controls.map(([key, , value]) => [key, value]),
);

export function HubTuner({ current }: { current: "use-cases" | "industries" }) {
  const [values, setValues] = useState(defaults);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const v = values;
  // Glow strength above 100% stacks a second copy so it can get brighter.
  const css = `[data-glow="visual"]{
  --hub-text-fr:${100 - v.visualShare}fr;
  --hub-visual-fr:${v.visualShare}fr;
  --hub-bleed:${v.bleed}px;
  --hub-shift:${v.shift}px;
  --hub-glow-spread-x:${v.glowSpreadX}%;
  --hub-glow-spread-y:${v.glowSpreadY}%;
  --hub-glow-strength:${Math.min(v.glowStrength, 100) / 100};
  --hub-glow-blur:${v.glowBlur}px;
  --hub-glow-x:${v.glowX}px;
  --hub-glow-y:${v.glowY}px;
  --hub-grey:${v.grey / 100};
}
${v.glowStrength > 100 ? `.brand-hero-glow::after{content:"";position:absolute;inset:0;background:inherit;opacity:${(v.glowStrength - 100) / 100}}` : ""}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(values, null, 2));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <style>{css}</style>
      <aside aria-label="Hub hero controls" className={styles.panel}>
        <button className={styles.toggle} onClick={() => setOpen(!open)}>
          {open ? "Hide controls" : "Adjust hero"}
        </button>
        {open && (
          <div className={styles.body}>
            <strong>Hub hero</strong>
            <p>
              Private preview. Showing{" "}
              <Link href="/dev/hub-tuner?page=use-cases">
                {current === "use-cases" ? <b>Use cases</b> : "Use cases"}
              </Link>{" "}
              ·{" "}
              <Link href="/dev/hub-tuner?page=industries">
                {current === "industries" ? <b>Industries</b> : "Industries"}
              </Link>
            </p>
            {controls.map(([key, label, , min, max, step, unit]) => (
              <label key={key}>
                <span>
                  {label}
                  <output>
                    {values[key]} {unit}
                  </output>
                </span>
                <input
                  max={max}
                  min={min}
                  onChange={(e) => {
                    setValues({ ...values, [key]: Number(e.target.value) });
                    setCopied(false);
                  }}
                  step={step}
                  type="range"
                  value={values[key]}
                />
              </label>
            ))}
            <div className={styles.actions}>
              <button onClick={() => setValues(defaults)}>Reset</button>
              <button onClick={copy}>
                {copied ? "Copied settings" : "Copy settings"}
              </button>
            </div>
            <details>
              <summary>Settings to share</summary>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </details>
          </div>
        )}
      </aside>
    </>
  );
}
