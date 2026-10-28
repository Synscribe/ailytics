import type { ContentPageRouteCopy } from "@/components/content-page/content-page";

/**
 * Route copy for each industry page, keyed by the JSON file's slug in
 * src/content/pages/industries. Every JSON page needs an entry here.
 */
export const INDUSTRY_ROUTE_COPY: Record<string, ContentPageRouteCopy> = {
  construction: {
    name: "Construction",
    heroVisualId: "construction-hero",
    heroEmphasis: "safety and productivity",
    howItWorks: {
      title: "How construction site monitoring works",
      introduction:
        "Ailytics runs on the cameras already on site, and most projects go live in under 2 weeks.",
      steps: [
        {
          title: "Detect the hazard",
          description:
            "Watch configured camera views for missing PPE, workers near machinery, open edges and unsafe access beneath suspended loads.",
        },
        {
          title: "Warn the site team",
          description:
            "Send supervisors the camera frame, time and location while the event is happening.",
        },
        {
          title: "Act on the evidence",
          description:
            "The supervisor reviews the alert and follows site procedures to address the hazard.",
        },
        {
          title: "Review and report",
          description:
            "Use recorded events in toolbox talks, safety reviews and reports across your projects.",
        },
      ],
    },
    featureLinks: {
      "ppe-detection": {
        href: "/use-cases/ppe-detection",
        phrase: "missing hard hats, vests, and gloves",
      },
      "under-load-detection": {
        href: "/use-cases/suspended-load-safety",
        phrase: "people beneath suspended crane loads",
      },
      "machinery-proximity": {
        href: "/use-cases/pedestrian-detection-system",
        phrase: "workers moving too close to active machinery and vehicles",
      },
      "no-access-zones": {
        href: "/use-cases/open-edge-detection",
        phrase: "open edge detection",
      },
    },
    related: {
      title: "Construction use cases in detail",
      items: [
        {
          title: "PPE detection",
          description:
            "Spot missing hard hats, vests and gloves on existing cameras and give supervisors evidence to act on.",
          href: "/use-cases/ppe-detection",
          label: "See PPE detection",
        },
        {
          title: "Suspended load safety",
          description:
            "Project where a lifted load would fall from one camera and alert supervisors when a worker steps into the drop zone.",
          href: "/use-cases/suspended-load-safety",
          label: "See suspended load safety",
        },
        {
          title: "Open edge detection",
          description:
            "Mark unprotected slab edges and openings, and alert supervisors when a worker steps inside the safety buffer.",
          href: "/use-cases/open-edge-detection",
          label: "See open edge detection",
        },
        {
          title: "Pedestrian detection",
          description:
            "Measure the real distance between people and moving forklifts or excavators from one camera, and alert supervisors when someone gets too close.",
          href: "/use-cases/pedestrian-detection-system",
          label: "See pedestrian detection",
        },
      ],
    },
  },
};
