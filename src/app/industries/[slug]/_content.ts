import type { ContentPageRouteCopy } from "@/components/content-page/content-page";

/**
 * Route copy for each industry page, keyed by the JSON file's slug in
 * src/content/pages/industries. Every JSON page needs an entry here.
 */
export const INDUSTRY_ROUTE_COPY: Record<string, ContentPageRouteCopy> = {
  construction: {
    name: "Construction",
    heroVisualId: "construction-hero",
    howItWorks: {
      title: "How construction site monitoring works",
      introduction:
        "Ailytics runs on the cameras already on site, and most projects go live in under 2 weeks.",
      steps: [
        {
          title: "Connect your site cameras",
          description:
            "Link existing IP cameras and recording systems through RTSP or ONVIF. Your current camera network stays in place.",
        },
        {
          title: "Choose the hazards to watch",
          description:
            "Pick detections for each camera, such as missing PPE, open edges and suspended loads. Set zones and alert timing to match your site rules.",
        },
        {
          title: "Alert supervisors with evidence",
          description:
            "Supervisors receive an event frame, time and location for each alert. Reports bring the records into site reviews.",
        },
      ],
    },
    valueProps: {
      title: "Why construction teams choose Ailytics",
      items: [
        {
          title: "Works on your existing CCTV",
          description:
            "Connects to the cameras already on site through RTSP or ONVIF.",
        },
        {
          title: "Accurate in rain, dust and low light",
          description:
            "Detection models are built for the conditions on working outdoor sites.",
        },
        {
          title: "Real distance from one camera",
          description:
            "Measures 3D distance between workers and machinery from a single camera, with no lidar or radar.",
        },
        {
          title: "Deployment that fits your IT rules",
          description:
            "Run on the edge, on-premise or in the cloud. Ailytics is ISO/IEC 27001 certified.",
        },
      ],
    },
    featureLinks: {
      "ppe-detection": {
        href: "/uses/ppe-detection",
        phrase: "missing hard hats, vests, and gloves",
      },
    },
    related: {
      title: "Construction use cases in detail",
      items: [
        {
          title: "PPE detection",
          description:
            "Spot missing hard hats, vests and gloves on existing cameras and give supervisors evidence to act on.",
          href: "/uses/ppe-detection",
          label: "See PPE detection",
        },
      ],
    },
  },
};
