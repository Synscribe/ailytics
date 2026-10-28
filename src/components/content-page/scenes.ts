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
    /**
     * Show the still's full height on wide screens, aligned right, with the
     * cards under the copy. Use it when the action runs from the top of the
     * frame to the bottom, so a full-width crop would cut part of it off.
     */
    fullHeight?: boolean;
    /** Cards for steps two to four; step one shows the marks alone. */
    cards: [SceneCard, SceneCard, SceneCard];
  };
};

export const DETAIL_SCENES: Record<
  "ppe" | "construction" | "suspendedLoad" | "openEdge" | "pedestrian",
  DetailScene
> = {
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
  suspendedLoad: {
    problemVisuals: [
      "under-load-overhead",
      "under-load-camera-wall",
      "under-load-missed",
    ],
    howItWorks: {
      src: "/media/ailytics/stills/under-load-detection.jpg",
      alt: "Construction-site camera: a suspended formwork panel with its drop zone projected on the ground, and a worker inside the zone flagged by Ailytics.",
      camera: "Cam 03 · Lifting area",
      marks: [
        { box: [561, 52, 184, 472], label: "Suspended load", tone: "detect" },
        {
          box: [808, 700, 76, 216],
          label: "Worker in drop zone",
          tone: "hazard",
        },
      ],
      // Drop lines from the load's lower corners to the projected zone.
      hazardPath:
        "M561 524 L462 876 M745 524 L890 876 M462 876 A214 58 0 1 0 890 876 A214 58 0 1 0 462 876",
      fullHeight: true,
      cards: [
        {
          title: "Worker under suspended load · Cam 03",
          body: "Lifting area · load moving · 10:42",
          tone: "alert",
        },
        {
          title: "Sent to the lifting supervisor",
          body: "Frame, time and location attached · 10:42",
          tone: "ack",
        },
        {
          title: "Event logged for review",
          body: "Added to the weekly safety report",
          tone: "report",
        },
      ],
    },
  },
  openEdge: {
    problemVisuals: [
      "open-edge-walkround",
      "open-edge-safety-walk",
      "open-edge-missed",
    ],
    howItWorks: {
      src: "/media/ailytics/stills/open-edge-shaft.jpg",
      alt: "Camera looking down a construction shaft: the unprotected front edge of a deck traced by Ailytics, and two workers standing at the edge flagged inside the safety buffer.",
      camera: "Cam 01 · Deck edge",
      marks: [
        {
          box: [828, 72, 40, 168],
          label: "Workers near open edge",
          tone: "hazard",
        },
        { box: [867, 53, 47, 187], tone: "hazard" },
        { box: [1080, 23, 60, 93], tone: "detect" },
        { box: [1195, 0, 53, 96], tone: "detect" },
      ],
      // The edge, then the safety buffer set back from it onto the roof.
      hazardPath: "M790 279 L1272 279 M1272 279 L1272 226 L798 226 L790 279",
      fullHeight: true,
      cards: [
        {
          title: "Workers near open edge · Cam 01",
          body: "Deck edge · inside the safety buffer · 14:40",
          tone: "alert",
        },
        {
          title: "Sent to the site supervisor",
          body: "Frame, time and location attached · 14:40",
          tone: "ack",
        },
        {
          title: "Event logged for review",
          body: "Added to the weekly safety report",
          tone: "report",
        },
      ],
    },
  },
  pedestrian: {
    problemVisuals: [
      "machinery-proximity",
      "pedestrian-crossing",
      "pedestrian-reporting",
    ],
    howItWorks: {
      src: "/media/ailytics/stills/forklift-yard.jpg",
      alt: "Outdoor yard camera: a forklift carrying a load with its danger area drawn on the ground, and a pedestrian standing inside the area flagged by Ailytics.",
      camera: "Cam 03 · Yard",
      marks: [
        // The forklift runs to the bottom of the frame, so it has no chip.
        { box: [588, 618, 328, 342], tone: "detect" },
        {
          box: [528, 582, 72, 165],
          label: "Pedestrian too close",
          tone: "hazard",
        },
      ],
      // The danger area on the ground around the moving forklift.
      hazardPath: "M440 840 A300 150 0 1 0 1040 840 A300 150 0 1 0 440 840",
      fullHeight: true,
      cards: [
        {
          title: "Pedestrian near moving forklift · Cam 03",
          body: "Yard · 1.4 m from the forklift · 10:14",
          tone: "alert",
        },
        {
          title: "Sent to the shift supervisor",
          body: "Frame, time and location attached · 10:14",
          tone: "ack",
        },
        {
          title: "Event logged for review",
          body: "Added to the weekly safety report",
          tone: "report",
        },
      ],
    },
  },
};

/** The scene for a detail page, chosen by its hero visual. */
export function sceneFor(heroVisualId: VisualId): DetailScene {
  if (heroVisualId === "construction-hero") return DETAIL_SCENES.construction;
  if (heroVisualId === "suspended-load-hero") {
    return DETAIL_SCENES.suspendedLoad;
  }
  if (heroVisualId === "open-edge-hero") return DETAIL_SCENES.openEdge;
  if (heroVisualId === "pedestrian-hero") return DETAIL_SCENES.pedestrian;
  return DETAIL_SCENES.ppe;
}
