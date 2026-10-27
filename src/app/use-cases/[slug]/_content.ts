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
      title: "PPE detection by industry",
      items: [
        {
          title: "Construction",
          description:
            "Combine PPE checks with machinery, suspended-load and restricted-area detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
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
      title: "Suspended load safety by industry",
      items: [
        {
          title: "Construction",
          description:
            "Combine suspended load checks with PPE, open-edge and machinery proximity detection, plus workforce and progress records.",
          href: "/industries/construction",
          label: "See construction safety",
        },
      ],
    },
  },
};
