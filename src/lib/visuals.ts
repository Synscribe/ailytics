/**
 * The feature ids the content team's page generator can choose from. Each one
 * is also a visual id, so a feature always renders its own visual.
 */
export const FEATURE_VISUAL_IDS = [
  "hardware-agnostic",
  "edge-engine",
  "ppe-detection",
  "open-edge-detection",
  "under-load-detection",
  "machinery-proximity",
  "fire-smoke-detection",
  "no-access-zones",
  "poor-ergonomics",
  "distracted-activity",
  "speeding-wrong-way",
  "crowding",
  "water-hazard",
  "loitering-unattended",
  "man-hour-tracking",
  "machinery-usage",
  "timelapse-xray",
  "custom-use-cases",
  "real-time-alerts",
  "unlimited-reporting",
  "multi-site-dashboard",
] as const;

export const VISUAL_IDS = [
  "construction-hero",
  "ppe-hero",
  "suspended-load-hero",
  "open-edge-hero",
  "pedestrian-hero",
  "pedestrian-crossing",
  // Suspended load, open edge and pedestrian versions of the alert and
  // report visuals.
  "under-load-alerts",
  "under-load-reporting",
  "open-edge-alerts",
  "open-edge-reporting",
  "pedestrian-alerts",
  "pedestrian-reporting",
  // Why manual checks fall short, on the open edge and suspended load pages.
  "open-edge-walkround",
  "open-edge-safety-walk",
  "open-edge-missed",
  "under-load-overhead",
  "under-load-camera-wall",
  "under-load-missed",
  "childsafe-vision-hero",
  ...FEATURE_VISUAL_IDS,
] as const;

export type VisualId = (typeof VISUAL_IDS)[number];

const visualIds: ReadonlySet<string> = new Set(VISUAL_IDS);

export function isVisualId(value: string): value is VisualId {
  return visualIds.has(value);
}
