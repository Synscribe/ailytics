/**
 * The use cases listed on the /use-cases hub. `slug` names the page in
 * src/content/pages/uses; the hub lists it only once that JSON page exists.
 */
export type HubEntry = {
  slug: string;
  title: string;
  description: string;
};

export const USE_CASE_GROUPS: { title: string; items: HubEntry[] }[] = [
  {
    title: "Safety",
    items: [
      {
        slug: "ppe-detection",
        title: "PPE detection",
        description:
          "Spots missing hard hats, vests and gloves in each work area.",
      },
      {
        slug: "machinery-proximity",
        title: "Machinery proximity",
        description:
          "Measures the real distance between workers and moving machinery from one camera.",
      },
      {
        slug: "under-suspended-load",
        title: "Under suspended load",
        description:
          "Projects where a lifted load would fall and flags anyone inside that zone.",
      },
      {
        slug: "open-edge-detection",
        title: "Open edge detection",
        description:
          "Alerts when a worker gets too close to an unprotected edge.",
      },
      {
        slug: "smoke-and-fire-detection",
        title: "Smoke and fire",
        description:
          "Detects smoke or flames early, so the team can respond before it spreads.",
      },
      {
        slug: "ergonomics",
        title: "Ergonomics",
        description:
          "Flags unsafe lifting posture, such as a bent back with straight knees.",
      },
      {
        slug: "exclusion-zone",
        title: "Exclusion zones",
        description:
          "Alerts when someone enters a barricaded or no-access area.",
      },
      {
        slug: "unsafe-acts",
        title: "Unsafe acts",
        description:
          "Flags slips, trips, falls and other unsafe behaviour as it happens.",
      },
      {
        slug: "stair-safety",
        title: "Stair safety",
        description:
          "Checks that people keep the required points of contact on stairs.",
      },
      {
        slug: "crowding-and-occupancy",
        title: "Crowding and occupancy",
        description: "Alerts when a zone holds more people than its set limit.",
      },
      {
        slug: "phone-use-detection",
        title: "Phone use on site",
        description: "Flags phone use in zones where it puts people at risk.",
      },
      {
        slug: "water-hazards",
        title: "Water hazards",
        description:
          "Alerts when a person crosses the safety line near open water.",
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        slug: "restricted-areas",
        title: "Restricted areas",
        description:
          "Alerts when a person or vehicle enters a zone where it is not allowed.",
      },
      {
        slug: "loitering",
        title: "Loitering",
        description:
          "Flags anyone who stays in a set area longer than allowed.",
      },
      {
        slug: "unattended-objects",
        title: "Unattended objects",
        description:
          "Alerts when an object is left behind for longer than a set time.",
      },
      {
        slug: "speeding-and-wrong-way-driving",
        title: "Speeding and wrong-way driving",
        description:
          "Flags vehicles over the site speed limit or driving against traffic.",
      },
      {
        slug: "illegal-parking",
        title: "Illegal parking",
        description: "Alerts when a vehicle stops in a no-parking area.",
      },
      {
        slug: "vehicle-zones",
        title: "Vehicle zones",
        description:
          "Records vehicles entering and leaving, with license plate capture, and flags vehicles in the wrong zone.",
      },
    ],
  },
  {
    title: "Productivity and progress",
    items: [
      {
        slug: "machinery-utilization",
        title: "Machinery utilisation",
        description:
          "Shows when each machine is working or idle through the day.",
      },
      {
        slug: "manpower-tracking",
        title: "Manpower and work hours",
        description: "Totals the hours people spend in each work area.",
      },
      {
        slug: "people-counting",
        title: "People counting",
        description: "Counts people crossing a line or entering a zone.",
      },
      {
        slug: "timelapse-and-progress-comparison",
        title: "Timelapse and progress comparison",
        description:
          "Compares the same camera view over time to show what changed on site.",
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        slug: "real-time-alerts",
        title: "Real-time alerts",
        description:
          "Sends each alert to phone or dashboard with the event frame, time and location.",
      },
      {
        slug: "safety-reports",
        title: "Reports on demand",
        description:
          "Builds reports of alert trends for safety reviews and audits.",
      },
      {
        slug: "multi-site-dashboard",
        title: "Multi-site dashboard",
        description: "Shows every site and its open alerts in one view.",
      },
      {
        slug: "custom-use-cases",
        title: "Custom use cases",
        description:
          "Combine detections, zones and alert timing to match your own site rules.",
      },
      {
        slug: "deployment-options",
        title: "Edge, on-premise or cloud",
        description:
          "Run detection where your IT rules require, with footage kept on site when needed.",
      },
    ],
  },
];
