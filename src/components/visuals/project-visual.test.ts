import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FEATURE_VISUAL_IDS, VISUAL_IDS } from "../../lib/visuals";

import {
  getVisualSource,
  ProjectVisual,
  VISUAL_ENTRIES,
} from "./project-visual";

describe("project visual inventory", () => {
  it("keeps one exhaustive source for every validated visual ID", () => {
    expect(VISUAL_ENTRIES.map((entry) => entry.id)).toEqual(VISUAL_IDS);

    for (const id of VISUAL_IDS) {
      expect(getVisualSource(id).label).toBeTruthy();
      expect(
        renderToStaticMarkup(createElement(ProjectVisual, { id })),
      ).toContain(`data-visual-id="${id}"`);
    }
  });

  it("registers a project visual for every generator feature id", () => {
    const generatorFeatureIds = [
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
    ];

    expect([...FEATURE_VISUAL_IDS].sort()).toEqual(
      [...generatorFeatureIds].sort(),
    );

    for (const id of generatorFeatureIds) {
      expect(VISUAL_IDS).toContain(id);
      const source = getVisualSource(id as (typeof FEATURE_VISUAL_IDS)[number]);
      expect(source.status).toBe("project");
      // Feature visuals are live components, except approved screen
      // recordings, which must swap to a still frame for reduced motion.
      if (source.kind === "image") {
        expect(source.still).toBeTruthy();
        expect(
          renderToStaticMarkup(
            createElement(ProjectVisual, {
              id: id as (typeof FEATURE_VISUAL_IDS)[number],
            }),
          ),
        ).toContain('media="(prefers-reduced-motion: reduce)"');
      } else {
        expect(source.kind).toBe("component");
      }
      expect(source.motionPattern).toBeTruthy();
    }
  });

  it("does not repeat named motion patterns", () => {
    const patterns = VISUAL_ENTRIES.flatMap((entry) =>
      entry.motionPattern ? [entry.motionPattern] : [],
    );

    expect(new Set(patterns).size).toBe(patterns.length);
  });
});
