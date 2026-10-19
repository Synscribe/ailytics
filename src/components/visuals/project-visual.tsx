import { RulesVisual, ReportsVisual } from "./visuals/workflow-stage.client";
import visualSystem from "./visual-system.module.css";
import type { ComponentType } from "react";
import Image, { getImageProps, type ImageProps } from "next/image";

import { VISUAL_IDS, type VisualId } from "../../lib/visuals";

import ConstructionHeroVisual from "./visuals/construction-hero.client";
import CrowdingVisual from "./visuals/crowding.client";
import DistractedActivityVisual from "./visuals/distracted-activity.client";
import EdgeEngineVisual from "./visuals/edge-engine.client";
import FireSmokeDetectionVisual from "./visuals/fire-smoke-detection.client";
import HardwareAgnosticVisual from "./visuals/hardware-agnostic.client";
import LoiteringUnattendedVisual from "./visuals/loitering-unattended.client";
import MachineryProximityVisual from "./visuals/machinery-proximity.client";
import MachineryUsageVisual from "./visuals/machinery-usage.client";
import ManHourTrackingVisual from "./visuals/man-hour-tracking.client";
import NoAccessZonesVisual from "./visuals/no-access-zones.client";
import OpenEdgeDetectionVisual from "./visuals/open-edge-detection.client";
import PoorErgonomicsVisual from "./visuals/poor-ergonomics.client";
import PpeDetectionVisual from "./visuals/ppe-detection.client";
import PpeHeroVisual from "./visuals/ppe-hero.client";
import RealTimeAlertsVisual from "./visuals/real-time-alerts.client";
import SpeedingWrongWayVisual from "./visuals/speeding-wrong-way.client";
import TimelapseXrayVisual from "./visuals/timelapse-xray.client";
import UnderLoadDetectionVisual from "./visuals/under-load-detection.client";
import WaterHazardVisual from "./visuals/water-hazard.client";

export type VisualStatus = "project" | "template-placeholder";

type VisualMetadata = {
  label: string;
  motionPattern: string | null;
  status: VisualStatus;
};

type ComponentVisualSource = VisualMetadata & {
  kind: "component";
  component: ComponentType;
  interactive?: boolean;
  /**
   * Set for visuals that fill a 4:3 stage instead of sizing themselves. The
   * text is the accessible description of the looping illustration.
   */
  stage?: { alt: string };
};

type ImageVisualSource = VisualMetadata & {
  kind: "image";
  src: ImageProps["src"];
  alt: string;
  /**
   * For an animated image: a still frame shown instead when the visitor
   * prefers reduced motion. Animated files are served as-is, unoptimized.
   */
  still?: string;
  /** "contain" letterboxes a screen recording instead of cropping it. */
  fit?: "cover" | "contain";
};

export type VisualSource = ComponentVisualSource | ImageVisualSource;

const stagedComponent = {
  kind: "component",
  status: "project",
} as const;

const visualSources: Record<VisualId, VisualSource> = {
  "construction-hero": {
    ...stagedComponent,
    label: "Construction site entrance checks",
    motionPattern: "one camera checks PPE, machine distance and the gate",
    component: ConstructionHeroVisual,
    stage: {
      alt: "A site entrance camera finds a worker and an excavator, confirms the worker's hard hat and vest, his distance from the machine and the closed gate, and reports no alerts.",
    },
  },
  "ppe-hero": {
    ...stagedComponent,
    label: "PPE check on every worker",
    motionPattern: "each worker is found, then checked item by item",
    component: PpeHeroVisual,
    stage: {
      alt: "A basement site camera finds three workers and checks the front worker's hard hat, vest and gloves, then confirms all three are wearing PPE.",
    },
  },
  "childsafe-vision-hero": {
    kind: "image",
    status: "project",
    label: "ChildSafe Vision unsupervised-child alert",
    motionPattern: null,
    src: "/media/childsafe-vision/unsupervised-child-alert.webp",
    alt: "ChildSafe Vision unsupervised-child alert with CCTV playback and automated analysis.",
  },
  "hardware-agnostic": {
    ...stagedComponent,
    label: "Existing cameras connecting",
    motionPattern: "packets converge on a hub",
    component: HardwareAgnosticVisual,
    stage: {
      alt: "Four existing cameras connect to Ailytics over RTSP and ONVIF, with no new cameras needed.",
    },
  },
  "edge-engine": {
    ...stagedComponent,
    label: "Where detection runs",
    motionPattern: "engine chip moves between deployment slots",
    component: EdgeEngineVisual,
    stage: {
      alt: "The Ailyssa detection engine moves between cloud, on-premise and edge, and shows that video stays on site when it runs there.",
    },
  },
  "ppe-detection": {
    ...stagedComponent,
    label: "PPE check at a site entrance",
    motionPattern: "head-to-toe scan resolves each item",
    component: PpeDetectionVisual,
    stage: {
      alt: "A worker at a site entrance is scanned head to toe and flagged for carrying his hard hat instead of wearing it, with no vest.",
    },
  },
  "open-edge-detection": {
    ...stagedComponent,
    label: "Worker near an open edge",
    motionPattern: "edge traces and a buffer extrudes",
    component: OpenEdgeDetectionVisual,
    stage: {
      alt: "The open edge of a slab is traced with a safety buffer, and a worker inside the buffer is flagged.",
    },
  },
  "under-load-detection": {
    ...stagedComponent,
    label: "Worker under a suspended load",
    motionPattern: "drop zone projects down from the load",
    component: UnderLoadDetectionVisual,
    stage: {
      alt: "A suspended formwork panel is detected, its drop zone is projected onto the ground, and a worker inside it is flagged.",
    },
  },
  "machinery-proximity": {
    ...stagedComponent,
    label: "Worker too close to a moving forklift",
    motionPattern: "ground radius arms while the machine moves",
    component: MachineryProximityVisual,
    stage: {
      alt: "A 3D ground radius switches on around a forklift while it moves, and a worker inside the radius is flagged.",
    },
  },
  "fire-smoke-detection": {
    ...stagedComponent,
    label: "Early smoke detection",
    motionPattern: "grid cells light up and merge into one frame",
    component: FireSmokeDetectionVisual,
    stage: {
      alt: "Grid cells over a skyline light up where smoke appears, then merge into one smoke detection and an alert.",
    },
  },
  "no-access-zones": {
    ...stagedComponent,
    label: "Restricted zone set-up",
    motionPattern: "zone outline draws vertex by vertex",
    component: NoAccessZonesVisual,
    stage: {
      alt: "A restricted zone drawn over a site camera view and saved with alerts on entry.",
    },
  },
  "poor-ergonomics": {
    ...stagedComponent,
    label: "Poor lifting posture",
    motionPattern: "pose skeleton joins and an angle gauge sweeps",
    component: PoorErgonomicsVisual,
    stage: {
      alt: "Pose keypoints mark a worker lifting a box, and an angle gauge shows his back bent past the safe limit.",
    },
  },
  "distracted-activity": {
    ...stagedComponent,
    label: "Phone use in a monitored zone",
    motionPattern: "lens magnifies the cue and a dwell timer runs",
    component: DistractedActivityVisual,
    stage: {
      alt: "A zoomed inset shows a person using a phone, and a timer counts how long until the alert fires.",
    },
  },
  "speeding-wrong-way": {
    ...stagedComponent,
    label: "Vehicle speeding the wrong way",
    motionPattern: "track points plot against the lane direction",
    component: SpeedingWrongWayVisual,
    stage: {
      alt: "Track points show a car driving against the lane's allowed direction, with a sample speed over the site limit.",
    },
  },
  crowding: {
    ...stagedComponent,
    label: "Zone over its head count",
    motionPattern: "head count ticks past a limit",
    component: CrowdingVisual,
    stage: {
      alt: "People are counted into a work zone until the count passes the zone's limit and the zone is flagged.",
    },
  },
  "water-hazard": {
    ...stagedComponent,
    label: "Person near the water",
    motionPattern: "marker walks across a waterline buffer",
    component: WaterHazardVisual,
    stage: {
      alt: "A plan of a quayside where a person walks past the safety line at the water's edge and is flagged.",
    },
  },
  "loitering-unattended": {
    ...stagedComponent,
    label: "Person loitering at a gate",
    motionPattern: "dwell ring fills around a still figure",
    component: LoiteringUnattendedVisual,
    stage: {
      alt: "A dwell ring fills around a person standing at a gate until they pass the dwell limit and are flagged as loitering.",
    },
  },
  "man-hour-tracking": {
    ...stagedComponent,
    label: "Worker working and idle time",
    motionPattern:
      "summary cards count up, idle bars grow against the team average, rows stamp their status",
    component: ManHourTrackingVisual,
    stage: {
      alt: "A workload dashboard for a sample week: summary cards, then idle hours per worker against the dashed team average, with three workers marked high idle.",
    },
  },
  "machinery-usage": {
    ...stagedComponent,
    label: "Machine working and idle time",
    motionPattern: "state timeline paints behind a playhead",
    component: MachineryUsageVisual,
    stage: {
      alt: "A sample day for one forklift, painted working or idle along a timeline, with utilisation totals.",
    },
  },
  "timelapse-xray": {
    ...stagedComponent,
    label: "Spot comparison of a work area",
    motionPattern: "sweeping before and after divider",
    component: TimelapseXrayVisual,
    stage: {
      alt: "The same construction camera view at two points in time, compared with a sweeping divider.",
    },
  },
  "custom-use-cases": {
    ...stagedComponent,
    label: "Build your own use case",
    motionPattern: "nodes connect detection, condition and response",
    component: RulesVisual,
    interactive: true,
    stage: {
      alt: "Interactive example: select a person detection, missing hard hat condition or supervisor alert to inspect the rule.",
    },
  },
  "real-time-alerts": {
    ...stagedComponent,
    label: "PPE Check alert on a phone",
    motionPattern:
      "notification lands in the list, opens the record, and the record is assigned",
    component: RealTimeAlertsVisual,
    stage: {
      alt: "A phone's notification list receives a PPE Check, which opens to show the event frame, camera, time, and an assignment in the activity log.",
    },
  },
  "unlimited-reporting": {
    ...stagedComponent,
    label: "On-demand PPE report",
    motionPattern: "camera evidence becomes an incident report",
    component: ReportsVisual,
    interactive: true,
    stage: {
      alt: "Interactive example: prepare a PPE incident report with event details, camera evidence and review history.",
    },
  },
  "multi-site-dashboard": {
    kind: "image",
    status: "project",
    label: "Every site on one map",
    motionPattern: "screen recording: sites are hovered, then opened",
    src: "/media/ailytics/multi-site-global-view.webp",
    still: "/media/ailytics/multi-site-global-view-still.webp",
    fit: "contain",
    alt: "The Ailytics Global View: sites on a map with an overall safety score, and a selected site opened to show its safety score, cameras and 30-day trend.",
  },
};

export const VISUAL_ENTRIES: (VisualSource & { id: VisualId })[] =
  VISUAL_IDS.map((id) => ({
    id,
    ...visualSources[id],
  }));

export function getVisualSource(id: VisualId): VisualSource {
  return visualSources[id];
}

const heroFrame =
  "relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-[0_24px_70px_rgba(29,41,38,0.07)]";

/**
 * Renders one validated visual. By default it draws its own hero frame.
 * With `fill`, it fills a positioned parent (for example a feature card's
 * stage) and leaves the frame to that parent.
 */
export function ProjectVisual({
  id,
  fill = false,
  priority = false,
  sizes = "(min-width: 1024px) 42vw, 100vw",
}: {
  id: VisualId;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const source: VisualSource = visualSources[id];
  const frameless = id === "real-time-alerts";
  const frame = fill
    ? "absolute inset-0 overflow-hidden"
    : frameless
      ? "relative h-[480px] min-w-0"
      : heroFrame;

  if (source.kind === "component") {
    const Visual = source.component;
    if (!source.stage) {
      return (
        <div data-visual-id={id}>
          <Visual />
        </div>
      );
    }
    return (
      <figure
        aria-label={source.stage.alt}
        className={`${visualSystem.system} ${frame} ${frameless ? "" : "bg-muted"}`}
        data-visual-id={id}
        role={source.interactive ? "group" : "img"}
      >
        <Visual />
      </figure>
    );
  }

  const fit = source.fit === "contain" ? "object-contain" : "object-cover";

  if (source.still) {
    // Art direction: the recording plays unless the visitor prefers reduced
    // motion, in which case the browser picks the still frame instead.
    const { props: still } = getImageProps({
      alt: "",
      fill: true,
      sizes,
      src: source.still,
    });
    const { props: animated } = getImageProps({
      alt: source.alt,
      fill: true,
      priority,
      src: source.src,
      unoptimized: true,
    });
    return (
      <figure
        className={`${visualSystem.system} ${frame} bg-paper`}
        data-visual-id={id}
      >
        <picture>
          <source
            media="(prefers-reduced-motion: reduce)"
            sizes={still.sizes}
            srcSet={still.srcSet}
          />
          <img {...animated} alt={source.alt} className={fit} />
        </picture>
      </figure>
    );
  }

  return (
    <figure className={`${visualSystem.system} ${frame}`} data-visual-id={id}>
      <Image
        alt={source.alt}
        className={fit}
        fill
        priority={priority}
        sizes={sizes}
        src={source.src}
      />
    </figure>
  );
}
