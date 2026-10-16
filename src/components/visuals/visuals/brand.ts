/**
 * The one brand-coupled file in the motion kit.
 *
 * Every slot points at a token in src/app/globals.css (Ailytics palette:
 * slate ink, teal accent, coral and citrus reserved for alerts). Derived
 * washes use color-mix() over those tokens, so a token change reaches the
 * visuals without an edit here. Do not paste a hex into this file.
 *
 * Roles:
 *   positive: resolved, connected, compliant (teal)
 *   system:   infrastructure, routing (slate)
 *   human:    alerts and people at risk (coral, alerts only)
 *   caution:  security events and warnings (citrus, security only)
 *   neutral:  resolved but unremarkable
 *
 * Framer cannot interpolate var() or color-mix() colours. Cross-fade stacked
 * layers by opacity for an animated colour change.
 */

export type AccentRole =
  "positive" | "system" | "human" | "caution" | "neutral";

export type Accent = { fg: string; tint: string; solid: string };

const wash = (token: string, amount: number) =>
  `color-mix(in srgb, var(${token}) ${amount}%, var(--paper))`;

const deepen = (token: string, amount: number) =>
  `color-mix(in srgb, var(${token}) ${amount}%, var(--ink))`;

export const BRAND: {
  accents: Record<AccentRole, Accent>;
  ink: string;
  body: string;
  muted: string;
  faint: string;
  line: string;
  inset: string;
  surface: string;
  plate: { maxWidth: string; radius: string; shadow: string };
} = {
  accents: {
    positive: {
      fg: deepen("--signal", 55),
      tint: wash("--signal", 16),
      solid: "var(--signal)",
    },
    system: {
      fg: "var(--ink-muted)",
      tint: "var(--muted)",
      solid: "var(--ink-faint)",
    },
    human: {
      fg: deepen("--alert", 72),
      tint: wash("--alert", 16),
      solid: "var(--alert)",
    },
    caution: {
      fg: deepen("--caution", 42),
      tint: wash("--caution", 22),
      solid: "var(--caution)",
    },
    neutral: {
      fg: "var(--ink-faint)",
      tint: "var(--muted)",
      solid: wash("--ink-faint", 55),
    },
  },

  ink: "var(--ink)",
  body: "var(--ink-muted)",
  muted: "var(--ink-faint)",
  faint: wash("--ink-faint", 45),
  line: "var(--line)",
  inset: "var(--muted)",
  surface: "var(--paper)",

  plate: {
    maxWidth: "400px",
    radius: "var(--visual-radius-panel, 8px)",
    shadow: "0 12px 32px color-mix(in srgb, var(--ink) 10%, transparent)",
  },
};
