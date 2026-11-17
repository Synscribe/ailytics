import { describe, expect, it } from "vitest";

import { GUIDE_SECTIONS } from "./sections";

describe("design system guide sections", () => {
  it("lists every part of the system in review order", () => {
    expect(GUIDE_SECTIONS.map((section) => section.id)).toEqual([
      "type",
      "colour",
      "spacing",
      "buttons",
      "cards",
      "icons-motion-imagery",
      "decisions",
    ]);
  });

  it("gives every section a title and summary", () => {
    for (const section of GUIDE_SECTIONS) {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.summary.length).toBeGreaterThan(0);
    }
  });
});
