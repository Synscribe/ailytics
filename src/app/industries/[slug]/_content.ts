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
          title: "Detect the hazard",
          description:
            "Watch configured camera views for missing PPE, workers near machinery and unsafe access beneath suspended loads.",
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
    valueProps: {
      title: "Will it work on a changing construction site?",
      items: [
        {
          title: "Distance that reflects the scene",
          description:
            "Measure the real 3D distance between workers and machinery from one camera, with no additional lidar or radar.",
        },
        {
          title: "Built for outdoor conditions",
          description:
            "Detection models are built for rain, dust and low light. Assess representative footage to confirm what each camera can reliably cover.",
        },
      ],
    },
    proof: {
      value: "69.1%",
      context: "Construction site · 16 months",
      title: "Fewer safety non-compliances on one construction site",
      description:
        "An Ailytics construction deployment recorded a 69.1% reduction in non-compliances over 16 months. This is a site-wide safety result, not a result for an individual detection.",
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
