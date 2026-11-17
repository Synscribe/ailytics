import { describe, expect, it } from "vitest";

import { segmentWords } from "./text-segments";

describe("segmentWords", () => {
  it("splits spaced text on spaces and keeps the spacing", () => {
    const text = "Walkarounds see one moment of one shift.";
    const segments = segmentWords(text, "en");

    expect(segments).toEqual([
      "Walkarounds ",
      "see ",
      "one ",
      "moment ",
      "of ",
      "one ",
      "shift.",
    ]);
    expect(segments.join("")).toBe(text);
  });

  it("splits Japanese into words and keeps punctuation with them", () => {
    const text = "巡回で見えるのは、一瞬だけです。";
    const segments = segmentWords(text, "ja");

    expect(segments.length).toBeGreaterThan(3);
    expect(segments.join("")).toBe(text);
    expect(segments.some((segment) => /^[、。]/.test(segment))).toBe(false);
  });
});
