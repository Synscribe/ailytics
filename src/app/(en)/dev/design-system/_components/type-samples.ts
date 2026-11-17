import type { TypeRole } from "../_data/type-today";

export const ROLE_NAMES: Record<TypeRole, string> = {
  display: "Hero heading",
  h1: "Page heading (H1)",
  h2: "Section heading (H2)",
  h3: "Sub-heading (H3)",
  title: "Card title",
  lead: "Intro paragraph",
  body: "Body",
  small: "Small text",
  label: "Label",
};

export const ROLE_SAMPLES: Record<TypeRole, string> = {
  display: "AI video analytics for safer sites",
  h1: "PPE detection on your existing cameras",
  h2: "Catch hazards before they become incidents",
  h3: "Works with the cameras you already own",
  title: "Exclusion zones",
  lead: "Ailytics watches every camera on site and alerts your team when someone enters a danger zone without the right PPE.",
  body: "Alerts arrive on the dashboard and on your phone within seconds, with a clip of what the camera saw.",
  small: "Updated every 15 minutes across all sites.",
  label: "Cam 12 · Loading bay",
};
