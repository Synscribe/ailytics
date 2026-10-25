import type { CSSProperties } from "react";

// Snapshot of the text styles on public pages, 15 Oct 2026. Temporary: this
// file is deleted once the type scale is applied across the site.

export const TYPE_ROLES = [
  "display",
  "h1",
  "h2",
  "h3",
  "title",
  "lead",
  "body",
  "small",
  "label",
] as const;

export type TypeRole = (typeof TYPE_ROLES)[number];

export type TypeUse = { page: string; file: string };

export type TypeVariant = {
  role: TypeRole;
  label: string;
  style: CSSProperties;
  usedIn: TypeUse[];
};

const home = "app/(marketing)/home.module.css";
const problemStory = "components/content-page/problem-switcher.module.css";
const cameraStory =
  "app/industries/[slug]/_components/construction-camera-story.module.css";

export const TYPE_TODAY: TypeVariant[] = [
  {
    role: "display",
    label: "40 to 68px, light",
    style: {
      fontSize: "clamp(2.5rem, 5.6vw, 4.25rem)",
      lineHeight: 1.04,
      fontWeight: 300,
      letterSpacing: "-0.035em",
    },
    usedIn: [{ page: "Homepage hero", file: home }],
  },
  {
    role: "display",
    label: "40 to 64px, light",
    style: {
      fontSize: "clamp(40px, 5vw, 64px)",
      lineHeight: 1.05,
      fontWeight: 300,
      letterSpacing: "-0.04em",
    },
    usedIn: [{ page: "Use case and industry heroes", file: problemStory }],
  },
  {
    role: "h1",
    label: "40 to 60px, light",
    style: {
      fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
      lineHeight: 1.05,
      fontWeight: 300,
      letterSpacing: "-0.035em",
    },
    usedIn: [
      {
        page: "About, careers, partnerships, projects",
        file: "app/globals.css",
      },
    ],
  },
  {
    role: "h1",
    label: "36 to 52px, light",
    style: {
      fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
      lineHeight: 1.08,
      fontWeight: 300,
      letterSpacing: "-0.03em",
    },
    usedIn: [
      { page: "Job posts", file: "app/careers/[slug]/page.tsx" },
      {
        page: "Privacy and EULA",
        file: "components/legal-document/legal-document.tsx",
      },
      {
        page: "Blog and news posts",
        file: "app/blog/[slug]/_components/article-layout.tsx",
      },
    ],
  },
  {
    role: "h2",
    label: "32 to 44px, light",
    style: {
      fontSize: "clamp(2rem, 4vw, 2.75rem)",
      lineHeight: 1.08,
      fontWeight: 300,
      letterSpacing: "-0.03em",
    },
    usedIn: [{ page: "Homepage sections", file: home }],
  },
  {
    role: "h2",
    label: "30 to 40px, light",
    style: {
      fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
      lineHeight: 1.08,
      fontWeight: 300,
      letterSpacing: "-0.03em",
    },
    usedIn: [{ page: "About, careers, partnerships", file: "app/globals.css" }],
  },
  {
    role: "h2",
    label: "32 to 48px, light",
    style: {
      fontSize: "clamp(32px, 4vw, 48px)",
      lineHeight: 1.08,
      fontWeight: 300,
      letterSpacing: "-0.035em",
    },
    usedIn: [
      { page: "Use case and industry sections", file: problemStory },
      { page: "Construction camera story", file: cameraStory },
      { page: "Homepage how it works", file: home },
    ],
  },
  {
    role: "h2",
    label: "28 to 40px, light",
    style: {
      fontSize: "clamp(28px, 3vw, 40px)",
      lineHeight: 1.1,
      fontWeight: 300,
      letterSpacing: "-0.03em",
    },
    usedIn: [{ page: "Use case problem rows", file: problemStory }],
  },
  {
    role: "h3",
    label: "28 to 40px, medium",
    style: {
      fontSize: "clamp(1.75rem, 2.7vw, 2.5rem)",
      lineHeight: 1.12,
      fontWeight: 500,
      letterSpacing: "-0.03em",
    },
    usedIn: [{ page: "Homepage problem payoff", file: home }],
  },
  {
    role: "h3",
    label: "24 to 36px, medium",
    style: {
      fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
      lineHeight: 1.15,
      fontWeight: 500,
      letterSpacing: "-0.025em",
    },
    usedIn: [{ page: "Homepage problem steps", file: home }],
  },
  {
    role: "h3",
    label: "24 to 30px, medium",
    style: {
      fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)",
      lineHeight: 1.15,
      fontWeight: 500,
      letterSpacing: "-0.02em",
    },
    usedIn: [{ page: "Homepage features", file: home }],
  },
  {
    role: "h3",
    label: "30px, medium",
    style: {
      fontSize: "1.875rem",
      lineHeight: 1.12,
      fontWeight: 500,
      letterSpacing: "-0.025em",
    },
    usedIn: [
      {
        page: "Use case features",
        file: "components/content-page/content-page.tsx",
      },
      { page: "Careers", file: "app/careers/page.tsx" },
    ],
  },
  {
    role: "h3",
    label: "21 to 24px, medium",
    style: {
      fontSize: "24px",
      lineHeight: 1.2,
      fontWeight: 500,
      letterSpacing: "-0.025em",
    },
    usedIn: [
      { page: "Use case problem rows", file: problemStory },
      {
        page: "Scroll steps",
        file: "components/content-page/step-scene.module.css",
      },
    ],
  },
  {
    role: "title",
    label: "20 to 24px, medium",
    style: {
      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
      lineHeight: 1.3,
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
    usedIn: [
      { page: "Homepage case studies", file: home },
      {
        page: "Customer proof",
        file: "components/customer-proof/customer-proof.module.css",
      },
    ],
  },
  {
    role: "title",
    label: "18px, medium",
    style: { fontSize: "1.125rem", lineHeight: 1.35, fontWeight: 500 },
    usedIn: [
      { page: "Homepage industry cards", file: home },
      {
        page: "Hub cards",
        file: "components/content-hub/content-hub.tsx",
      },
    ],
  },
  {
    role: "title",
    label: "17px, medium",
    style: { fontSize: "17px", lineHeight: 1.4, fontWeight: 500 },
    usedIn: [
      {
        page: "FAQ questions",
        file: "components/faq-accordion/faq-accordion.module.css",
      },
    ],
  },
  {
    role: "lead",
    label: "17px",
    style: { fontSize: "1.0625rem", lineHeight: 1.7 },
    usedIn: [
      { page: "Homepage hero and sections", file: home },
      { page: "Other page heroes", file: "app/globals.css" },
    ],
  },
  {
    role: "lead",
    label: "18px",
    style: { fontSize: "1.125rem", lineHeight: 1.7 },
    usedIn: [
      { page: "Job posts", file: "app/careers/[slug]/page.tsx" },
      { page: "Partnerships", file: "app/partnerships/page.tsx" },
    ],
  },
  {
    role: "body",
    label: "15px",
    style: { fontSize: "15px", lineHeight: 1.6 },
    usedIn: [
      { page: "Use case problem rows", file: problemStory },
      { page: "Homepage cards (15.2px)", file: home },
    ],
  },
  {
    role: "body",
    label: "15.5px",
    style: { fontSize: "15.5px", lineHeight: 1.65 },
    usedIn: [
      {
        page: "FAQ answers",
        file: "components/faq-accordion/faq-accordion.module.css",
      },
    ],
  },
  {
    role: "body",
    label: "16px",
    style: { fontSize: "1rem", lineHeight: 1.7 },
    usedIn: [
      {
        page: "Legal pages",
        file: "components/legal-document/legal-document.module.css",
      },
      { page: "Job posts", file: "app/careers/[slug]/job.module.css" },
    ],
  },
  {
    role: "small",
    label: "14px",
    style: { fontSize: "0.875rem", lineHeight: 1.5 },
    usedIn: [
      { page: "46 places across pages", file: "app/about-us/page.tsx" },
      { page: "Homepage legends", file: home },
    ],
  },
  {
    role: "small",
    label: "13px, medium",
    style: { fontSize: "0.8125rem", lineHeight: 1.4, fontWeight: 500 },
    usedIn: [
      { page: "Homepage alert line", file: home },
      { page: "Problem story captions", file: problemStory },
    ],
  },
  {
    role: "small",
    label: "12px",
    style: { fontSize: "12px", lineHeight: 1.4 },
    usedIn: [{ page: "Construction camera story", file: cameraStory }],
  },
  {
    role: "label",
    label: "11 to 11.5px, medium",
    style: { fontSize: "0.6875rem", lineHeight: 1.3, fontWeight: 500 },
    usedIn: [
      { page: "Homepage camera tags", file: home },
      { page: "Problem story camera labels", file: problemStory },
    ],
  },
  {
    role: "label",
    label: "10px, medium",
    style: { fontSize: "10px", lineHeight: 1.3, fontWeight: 500 },
    usedIn: [
      {
        page: "Camera wall",
        file: "components/site-camera-wall/site-camera-wall.module.css",
      },
      { page: "Construction camera story", file: cameraStory },
    ],
  },
];
