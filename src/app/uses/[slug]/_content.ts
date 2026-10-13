import type { ContentPageRouteCopy } from "@/components/content-page/content-page";

/**
 * Route copy for each use-case page, keyed by the JSON file's slug in
 * src/content/pages/uses. Every JSON page needs an entry here.
 */
export const USE_CASE_ROUTE_COPY: Record<string, ContentPageRouteCopy> = {
  "ppe-detection": {
    name: "PPE detection",
    heroVisualId: "ppe-hero",
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
    valueProps: {
      title: "Will PPE checks work in our site conditions?",
      items: [
        {
          title: "Clear checks in difficult conditions",
          description:
            "Models are built for rain, dust and low light. Camera angle, obstructions and the size of PPE in the frame still determine what can be checked.",
        },
        {
          title: "Alerts your team can manage",
          description:
            "Set grace periods and cooldowns per camera and person to reduce repeat notifications from the same violation.",
        },
      ],
    },
    deployment: {
      title: "How does it fit our cameras and IT requirements?",
      items: [
        {
          title: "Connect existing CCTV",
          description:
            "Connect compatible IP cameras and recording systems through RTSP or ONVIF. Review camera views and coverage before choosing detections.",
        },
        {
          title: "Choose where footage stays",
          description:
            "Run on the edge, on-premise or in the cloud. Agree video storage, access and data-residency requirements with your IT team.",
        },
        {
          title: "Support security reviews",
          description:
            "Ailytics is ISO/IEC 27001 certified. Discuss face blurring, regional hosting and your security requirements during the demo.",
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
