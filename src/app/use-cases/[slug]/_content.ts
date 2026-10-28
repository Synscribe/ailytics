import type { ContentPageRouteCopy } from "@/components/content-page/content-page";

/**
 * Route copy for each use-case page, keyed by the JSON file's slug in
 * src/content/pages/uses. Every JSON page needs an entry here.
 */
export const USE_CASE_ROUTE_COPY: Record<string, ContentPageRouteCopy> = {
  "ppe-detection": {
    name: "PPE detection",
    heroVisualId: "ppe-hero",
    heroEmphasis: "PPE detection",
    howItWorks: {
      title: "How PPE detection works",
      introduction:
        "PPE detection runs on your current cameras and fits into the safety checks your team already does.",
      steps: [
        {
          title: "Check the required PPE",
          description:
            "Monitor visible workers for the hard hats, vests or gloves required in each work area.",
        },
        {
          title: "Notify the supervisor",
          description:
            "Send the event frame, time and location when a missing-PPE event is detected.",
        },
        {
          title: "Address missing protection",
          description:
            "The supervisor checks the evidence and follows up with the crew during the shift.",
        },
        {
          title: "Keep a record",
          description:
            "Collect PPE events in reports for safety reviews, toolbox talks and audit preparation.",
        },
      ],
    },
    related: {
      title: "Combine PPE detection with other safety checks",
      items: [
        {
          title: "Construction",
          description:
            "Combine PPE checks with machinery, suspended-load and restricted-area detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
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
  "suspended-load-safety": {
    name: "Suspended load safety",
    heroVisualId: "suspended-load-hero",
    heroEmphasis: "Suspended load safety",
    proofStats: [
      { value: "Up to 80%", label: "reduction in safety non-compliance" },
      {
        value: "50+",
        label: "configurable safety, security and productivity use cases",
      },
      { value: "<2 weeks", label: "to go live on the cameras you already own" },
    ],
    howItWorks: {
      title: "How suspended load detection works",
      introduction:
        "Suspended load detection runs on your current cameras and fits into the lifting checks your team already does.",
      steps: [
        {
          title: "Define the drop zone",
          description:
            "Choose the cameras and lifting areas to watch, then set the radius and dwell time for the zone projected beneath each load.",
        },
        {
          title: "Detect a worker crossing it",
          description:
            "Flag a worker whose feet enter the projected drop zone while the load is moving.",
        },
        {
          title: "Notify with frame, time and location",
          description:
            "Send the lifting supervisor the event evidence, so they can clear the area while the load is still overhead.",
        },
        {
          title: "Log events for review",
          description:
            "Collect events in reports for lift reviews and toolbox talks, and track them alongside your TRIR.",
        },
      ],
    },
    related: {
      title: "Combine suspended load safety with other construction checks",
      items: [
        {
          title: "Construction",
          description:
            "Combine suspended load checks with PPE, open-edge and machinery proximity detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
        },
        {
          title: "Open edge detection",
          description:
            "Mark unprotected slab edges and openings, and alert supervisors when a worker steps inside the safety buffer.",
          href: "/use-cases/open-edge-detection",
          label: "See open edge detection",
        },
        {
          title: "PPE detection",
          description:
            "Spot missing hard hats, vests and gloves on existing cameras and give supervisors evidence to act on.",
          href: "/use-cases/ppe-detection",
          label: "See PPE detection",
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
  "open-edge-detection": {
    name: "Open edge detection",
    heroVisualId: "open-edge-hero",
    heroEmphasis: "Open edge detection",
    proofStats: [
      { value: "Up to 80%", label: "reduction in safety non-compliance" },
      {
        value: "50+",
        label: "configurable safety, security and productivity use cases",
      },
      { value: "<2 weeks", label: "to go live on the cameras you already own" },
    ],
    howItWorks: {
      title: "How open edge detection works",
      introduction:
        "Open edge detection runs on your current cameras and fits into the fall prevention checks your team already does.",
      steps: [
        {
          title: "Mark the open edges",
          description:
            "Choose the cameras and levels to watch, then mark each unprotected edge and opening with a safety buffer.",
        },
        {
          title: "Detect a worker inside the buffer",
          description:
            "Flag a worker who steps inside the safety buffer at an open edge.",
        },
        {
          title: "Notify with frame, time and location",
          description:
            "Send the site supervisor the event evidence, so they can move the worker back and check the edge protection.",
        },
        {
          title: "Log events for review",
          description:
            "Collect events in reports for toolbox talks, audits and edge protection reviews.",
        },
      ],
    },
    related: {
      title: "Combine open edge detection with other construction checks",
      items: [
        {
          title: "Construction",
          description:
            "Combine open edge checks with PPE, suspended-load and machinery proximity detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
        },
        {
          title: "Suspended load safety",
          description:
            "Project where a lifted load would fall from one camera and alert supervisors when a worker steps into the drop zone.",
          href: "/use-cases/suspended-load-safety",
          label: "See suspended load safety",
        },
        {
          title: "PPE detection",
          description:
            "Spot missing hard hats, vests and gloves on existing cameras and give supervisors evidence to act on.",
          href: "/use-cases/ppe-detection",
          label: "See PPE detection",
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
  "pedestrian-detection-system": {
    name: "Pedestrian detection",
    heroVisualId: "pedestrian-hero",
    heroEmphasis: "Pedestrian detection system",
    proofStats: [
      { value: "Up to 80%", label: "reduction in safety non-compliance" },
      {
        value: "50+",
        label: "configurable safety, security and productivity use cases",
      },
      { value: "<2 weeks", label: "to go live on the cameras you already own" },
    ],
    howItWorks: {
      title: "How the pedestrian detection system works",
      introduction:
        "Pedestrian detection runs on your current cameras and fits into the traffic management your team already does.",
      steps: [
        {
          title: "Set the danger areas",
          description:
            "Choose the cameras, aisles and yards to watch, then set the danger area for the machines in each work area.",
        },
        {
          title: "Detect a pedestrian too close",
          description:
            "Flag a pedestrian whose feet enter the danger area while the machine is moving.",
        },
        {
          title: "Notify with frame, time and location",
          description:
            "Send the shift supervisor the event evidence, so they can clear the route while the machine is still working.",
        },
        {
          title: "Log near misses for review",
          description:
            "Collect events in reports for traffic management reviews, audits and toolbox talks.",
        },
      ],
    },
    related: {
      title: "Combine pedestrian detection with other safety checks",
      items: [
        {
          title: "PPE detection",
          description:
            "Spot missing hard hats, vests and gloves on existing cameras and give supervisors evidence to act on.",
          href: "/use-cases/ppe-detection",
          label: "See PPE detection",
        },
        {
          title: "Construction",
          description:
            "Combine machinery checks with PPE, open-edge and suspended-load detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
        },
        {
          title: "Suspended load safety",
          description:
            "Project where a lifted load would fall from one camera and alert supervisors when a worker steps into the drop zone.",
          href: "/use-cases/suspended-load-safety",
          label: "See suspended load safety",
        },
      ],
    },
  },
};
