import type { VisualId } from "@/lib/visuals";

/** A box in the still's 1280×960 pixels, with its colour and optional label. */
export type SceneMark = {
  box: readonly [x: number, y: number, w: number, h: number];
  /** Caption chip under the box. Omit to draw the box with no chip. */
  label?: string;
  tone: "detect" | "hazard";
};

export type SceneCard = {
  title: string;
  body: string;
  tone: "alert" | "ack" | "report";
};

export type DetailScene = {
  /** One visual per problem, in the order of the page's problem items. */
  problemVisuals: VisualId[];
  howItWorks: {
    src: string;
    alt: string;
    camera: string;
    marks: SceneMark[];
    /** A hazard line drawn in coral, as an SVG path in still pixels. */
    hazardPath?: string;
    /** Cards for steps two to four; step one shows the marks alone. */
    cards: [SceneCard, SceneCard, SceneCard];
  };
};

export const DETAIL_SCENES: Record<"ppe" | "construction", DetailScene> = {
  ppe: {
    problemVisuals: [
      "ppe-detection",
      "real-time-alerts",
      "unlimited-reporting",
    ],
    howItWorks: {
      src: "/media/ailytics/stills/ppe-walkway-view2.jpg",
      alt: "Construction-site camera: a worker in a hi-vis vest but no hard hat flagged by Ailytics, next to a worker wearing both.",
      camera: "Cam 07 · Walkway",
      marks: [
        {
          box: [348, 224, 116, 312],
          label: "Missing hard hat",
          tone: "hazard",
        },
        {
          box: [918, 210, 132, 148],
          label: "Hard hat · vest",
          tone: "detect",
        },
      ],
      cards: [
        {
          title: "Missing hard hat · Cam 07",
          body: "Walkway · sent to the site supervisor · 09:17",
          tone: "alert",
        },
        {
          title: "Resolved on site",
          body: "Hard hat on · checked 09:21",
          tone: "ack",
        },
        {
          title: "12 PPE events this week",
          body: "9 resolved within 10 minutes",
          tone: "report",
        },
      ],
    },
  },
  construction: {
    problemVisuals: [
      "ppe-detection",
      "machinery-proximity",
      "under-load-detection",
      "no-access-zones",
    ],
    howItWorks: {
      src: "/media/ailytics/stills/open-edge-detection.jpg",
      alt: "Camera over a building under construction: a worker on an upper floor near an unguarded edge.",
      camera: "Cam 11 · Level 4",
      marks: [
        {
          box: [474, 512, 62, 134],
          label: "Worker near open edge",
          tone: "hazard",
        },
      ],
      hazardPath: "M372 690 L548 664 L652 650 L700 566",
      cards: [
        {
          title: "Worker near open edge · Cam 11",
          body: "Level 4 · sent to the site team · 09:41",
          tone: "alert",
        },
        {
          title: "Edge barricaded",
          body: "Area made safe · checked 09:58",
          tone: "ack",
        },
        {
          title: "31 hazard events this week",
          body: "Across 4 work areas, in the weekly report",
          tone: "report",
        },
      ],
    },
  },
};
