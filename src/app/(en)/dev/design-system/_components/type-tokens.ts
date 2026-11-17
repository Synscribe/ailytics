import type { TypeRole } from "../_data/type-today";

export type TypeToken = {
  name: string;
  role?: TypeRole;
  className: string;
  size: string;
  weight: string;
  use: string;
};

// Mirrors the `--text-*` tokens in `src/app/globals.css`. The test checks
// that every name here is declared there.
export const TYPE_TOKENS: readonly TypeToken[] = [
  {
    name: "display",
    role: "display",
    className: "text-display",
    size: "40px on phones, 64px on desktop",
    weight: "Regular",
    use: "Homepage hero and detail-page heroes",
  },
  {
    name: "h1",
    role: "h1",
    className: "text-h1",
    size: "36px on phones, 56px on desktop",
    weight: "Regular",
    use: "Page title on every other page",
  },
  {
    name: "h2",
    role: "h2",
    className: "text-h2",
    size: "30px on phones, 44px on desktop",
    weight: "Regular",
    use: "Section headings",
  },
  {
    name: "h3",
    role: "h3",
    className: "text-h3",
    size: "22px on phones, 28px on desktop",
    weight: "Medium",
    use: "Feature names, steps and large card headings",
  },
  {
    name: "title",
    role: "title",
    className: "text-title",
    size: "18px on phones, 20px on desktop",
    weight: "Medium",
    use: "Card titles, FAQ questions and list items",
  },
  {
    name: "lead",
    role: "lead",
    className: "text-lead text-ink-muted",
    size: "17px",
    weight: "Regular",
    use: "The paragraph under a page or section heading",
  },
  {
    name: "body",
    role: "body",
    className: "text-body",
    size: "16px",
    weight: "Regular",
    use: "Paragraphs, card text, FAQ answers and articles",
  },
  {
    name: "small",
    role: "small",
    className: "text-small text-ink-muted",
    size: "14px",
    weight: "Regular",
    use: "Captions, meta lines and form help",
  },
  {
    name: "label",
    role: "label",
    className: "text-label",
    size: "13px",
    weight: "Medium",
    use: "Chips, tabs, alert lines and camera names",
  },
  {
    name: "ui-md",
    className: "text-ui-md",
    size: "13px",
    weight: "Any",
    use: "Inside app mockups: main text",
  },
  {
    name: "ui-sm",
    className: "text-ui-sm",
    size: "12px",
    weight: "Any",
    use: "Inside app mockups: secondary text",
  },
  {
    name: "ui-xs",
    className: "text-ui-xs",
    size: "11px",
    weight: "Any",
    use: "Inside app mockups: tags and timestamps, the smallest size allowed",
  },
];
