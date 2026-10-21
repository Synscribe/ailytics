"use client";

import { type ReactNode } from "react";
import { SectionAnnotator } from "./section-annotator";
import home from "@/app/(marketing)/home.module.css";
import proof from "@/components/customer-proof/customer-proof.module.css";
import banner from "@/components/cta-banner/cta-banner.module.css";
import capability from "@/app/(marketing)/_components/capability-switcher.module.css";
import styles from "./surface-preview.module.css";

export function SurfacePreview({
  children,
  page,
}: {
  children: ReactNode;
  page: "home" | "ppe" | "construction";
}) {
  const selected = "colours";
  const scope = '[data-surface-preview][data-treatment="colours"]';
  return (
    <div
      className={styles.preview}
      data-surface-preview
      data-treatment={selected}
    >
      <SectionAnnotator page={page} />
      <div className={styles.content}>{children}</div>
      <style>{`
        ${scope} main > section[data-section-tone="white"] { background: #fff; --ink: #27405d; --ink-muted: #52667d; --ink-faint: #7d8c9e; --ink-dim: rgba(39,64,93,.32); --line: rgba(39,64,93,.12); color: #27405d; }
        ${scope} main > section[data-section-tone="dark"] {
          --ink: #fff; --ink-muted: #dce8f3; --ink-faint: #c3d4e5; --ink-dim: #b7cee2;
          --line: rgba(255,255,255,.23); --faint: #b7cee2; --past: #dce8f3;
          background: var(--review-blue); color: #fff;
        }
        ${scope} main > section[data-section-tone] :is(.surface-light, [data-visual-id]),
        ${scope} main > section[data-section-tone] .${home.fvis} {
          --ink: #27405d; --ink-muted: #52667d; --ink-faint: #7d8c9e; --ink-dim: rgba(39,64,93,.32);
          --line: rgba(39,64,93,.12); --faint: #c7cfd8; --past: #9aa7b5; color: #27405d;
        }
        ${scope} main > section[data-section-tone="dark"] .${home.btnSecondary} { color: #27405d; }
        /* Light surfaces remain readable inside a dark section. */
        ${scope} main > section[data-section-tone="dark"] .${home.trustCard} {
          background: rgba(255,255,255,.07); color: #fff; border: 1px solid rgba(255,255,255,.16);
        }
        ${scope} main > section[data-section-tone="dark"] .${home.trustCard} p { color: #dce8f3; }
        ${scope} main > section[data-section-tone="dark"] .${home.trustCard} h3 { color: #fff; }
        ${scope} main > section[data-section-tone="dark"] :is(.${home.pstate}, .${home.payoff}) span { color: rgba(183, 206, 226, .5); }
        ${scope} main > section[data-section-tone="dark"] :is(.${home.pstate}, .${home.payoff}) span[data-on] { color: #fff; }
        ${scope} main > section[data-section-tone="dark"] .${capability.title} { color: #c3d4e5; }
        ${scope} main > section[data-section-tone="dark"] .${capability.body} { color: #dce8f3; }
        ${scope} main > section[data-section-tone="dark"] .${capability.switcher} > ul button[data-active] .${capability.title} { color: #fff; }
        ${scope} .${proof.proof}[data-spacious] { padding-block: 200px; }
        ${scope} .${home.problem}[data-mode="scroll"] { margin-top: 0; }
        /* Brand chrome follows the chosen blue; detection colours stay semantic. */
        body:has([data-surface-preview]) .brand-btn-primary,
        ${scope} .${home.btnPrimary} { background: var(--review-brand-blue, #27405d); color: #fff; }
        body:has([data-surface-preview]) .brand-btn-primary:hover,
        ${scope} .${home.btnPrimary}:hover { background: #1c3048; }
        ${scope} main > section[data-section-tone="dark"] :is(.${home.btnPrimary}, .${home.btnSecondary}, .brand-btn-primary, .brand-btn-secondary),
        ${scope} .${banner.banner} .${banner.action} { background: #fff; color: var(--review-brand-blue, #27405d); border: 1px solid #d4dce6; box-shadow: none; }
        ${scope} main > section[data-section-tone="dark"] :is(.${home.btnPrimary}, .${home.btnSecondary}, .brand-btn-primary, .brand-btn-secondary):hover,
        ${scope} .${banner.banner} .${banner.action}:hover { background: #eaf0f6; color: #27405d; }
        ${scope} .${home.heroGlow} { background: radial-gradient(closest-side, color-mix(in srgb, var(--review-brand-blue, #27405d) 10%, transparent), color-mix(in srgb, var(--review-brand-blue, #27405d) 3%, transparent) 55%, transparent); }
        ${scope} .${home.legend} { background: color-mix(in srgb, var(--review-brand-blue, #27405d) 7%, white); }
        ${scope} .${home.legend} button[data-on] { color: var(--review-brand-blue, #27405d); box-shadow: 0 0 0 1px color-mix(in srgb, var(--review-brand-blue, #27405d) 22%, transparent); }
        ${scope} .${home.alertLine}:hover { border-color: var(--review-brand-blue, #27405d); box-shadow: inset 3px 0 0 var(--review-brand-blue, #27405d); }
        ${scope} .${banner.banner} { --ink: #27405d; --ink-muted: #52667d; --signal: var(--review-brand-blue, #27405d); --signal-strong: #27405d; }
        @media(max-width: 720px) { ${scope} .${proof.proof}[data-spacious] { padding-block: 160px; } }
      `}</style>
    </div>
  );
}
