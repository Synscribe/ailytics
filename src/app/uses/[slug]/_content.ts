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
          title: "Connect existing cameras",
          description:
            "Link IP cameras and recording systems through RTSP or ONVIF, then confirm which views cover your work areas.",
        },
        {
          title: "Select the PPE to check",
          description:
            "Choose hard hats, vests or gloves for each work area, and set how long before an alert fires.",
        },
        {
          title: "Supervisors respond with evidence",
          description:
            "Each alert includes the event frame, time and location. Reports collect PPE events for reviews and audits.",
        },
      ],
    },
    valueProps: {
      title: "Why teams use Ailytics for PPE detection",
      items: [
        {
          title: "Built for harsh site conditions",
          description:
            "Detects missing PPE through rain, dust and low light, including night shifts.",
        },
        {
          title: "No new cameras",
          description:
            "Adds PPE checks to the CCTV you already own through RTSP or ONVIF.",
        },
        {
          title: "Fewer repeat alerts",
          description:
            "Cooldowns per camera and per person stop one violation from flooding supervisors with alerts.",
        },
        {
          title: "Footage can stay on site",
          description:
            "Run on the edge or on-premise. Ailytics is ISO/IEC 27001 certified.",
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
