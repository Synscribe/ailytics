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
};
