"use client";
import { useState } from "react";
import home from "@/app/(marketing)/home.module.css";
import proof from "@/components/customer-proof/customer-proof.module.css";
import styles from "./tuner.module.css";
const controls = [
  ["heroTop", "Hero top", 64, 0, 140],
  ["heroGap", "Heading, copy and buttons", 24, 8, 64],
  ["controlsTop", "Above alert and categories", 24, 0, 64],
  ["controlsGap", "Alert to categories", 24, 4, 60],
  ["cameraGap", "Categories to cameras", -8, -16, 100],
  ["proofSpace", "Hero to customer proof", 120, 24, 200],
  ["proofBottom", "Stats to problem", 120, 24, 200],
  ["featureTop", "How it works to features", 160, 24, 240],
  ["usesTop", "Features to use cases", 160, 24, 240],
  ["industriesTop", "Use cases to industries", 160, 24, 240],
  ["capabilitiesTop", "Industries to capabilities", 160, 24, 240],
  ["casesTop", "Capabilities to results", 160, 24, 240],
  ["trustTop", "Results to footage control", 160, 24, 240],
] as const;
type Values = Record<string, number>;
const defaults: Values = Object.fromEntries(
  controls.map(([key, , value]) => [key, value]),
);
export function LayoutTuner() {
  const [values, setValues] = useState(defaults);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const css = `.${home.hero}{padding-top:${values.heroTop}px!important}
 .${home.heroStack}{gap:${values.heroGap}px!important}
 .${home.heroControls}{margin-top:${values.controlsTop}px!important;gap:${values.controlsGap}px!important}
 .${home.wallPerspective}{margin-top:${values.cameraGap}px!important}
 .${proof.proof}{padding-top:${values.proofSpace}px!important;padding-bottom:${values.proofBottom}px!important}
 .${home.features}{padding-top:${values.featureTop}px!important}
 .${home.useCases}{padding-top:${values.usesTop}px!important}
 .${home.industries}{padding-top:${values.industriesTop}px!important}
 .${home.capabilities}{padding-top:${values.capabilitiesTop}px!important}
 .${home.cases}{padding-top:${values.casesTop}px!important}
 .${home.trust}{padding-top:${values.trustTop}px!important}`;
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
      <aside className={styles.panel} aria-label="Layout spacing controls">
        <button className={styles.toggle} onClick={() => setOpen(!open)}>
          {open ? "Hide spacing controls" : "Adjust spacing"}
        </button>
        {open && (
          <div className={styles.body}>
            <strong>Homepage spacing</strong>
            <p>Private preview. Sliders affect this page only.</p>
            {controls.map(([key, label, , min, max]) => (
              <label key={key}>
                <span>
                  {label}
                  <output>{values[key]} px</output>
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={2}
                  value={values[key]}
                  onChange={(e) => {
                    setValues({ ...values, [key]: Number(e.target.value) });
                    setCopied(false);
                  }}
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
