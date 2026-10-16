import type { VisualId } from "@/lib/visuals";

/** A box in the still's 1280×960 pixels, with its label and colour. */
export type SceneMark = {
  box: readonly [x: number, y: number, w: number, h: number];
  label: string;
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
      src: "/media/ailytics/stills/crowding.jpg",
      alt: "Factory-floor camera: workers in hard hats, vests and gloves, each boxed by Ailytics.",
      camera: "Cam 03 · Mesh line",
      marks: [
        {
          box: [262, 185, 160, 365],
          label: "Hard hat · vest · gloves",
          tone: "detect",
        },
        {
          box: [515, 0, 150, 245],
          label: "Hard hat · vest · gloves",
          tone: "detect",
        },
        {
          box: [960, 190, 210, 405],
          label: "Hard hat · vest · gloves",
          tone: "detect",
        },
      ],
      cards: [
        {
          title: "Missing hard hat · Cam 06",
          body: "Site entrance · sent to the site supervisor · 14:05",
          tone: "alert",
        },
        {
          title: "Resolved on site",
          body: "Hard hat on · checked 14:09",
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
