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
  // Suspended load versions of the alert and report feature visuals.
  "under-load-alerts",
  "under-load-reporting",
  "childsafe-vision-hero",
  ...FEATURE_VISUAL_IDS,
] as const;

export type VisualId = (typeof VISUAL_IDS)[number];

const visualIds: ReadonlySet<string> = new Set(VISUAL_IDS);

export function isVisualId(value: string): value is VisualId {
  return visualIds.has(value);
}
