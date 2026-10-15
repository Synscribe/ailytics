import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { TYPE_ROLES, TYPE_TODAY } from "./type-today";

describe("type inventory", () => {
  it("covers every type role", () => {
    for (const role of TYPE_ROLES) {
      expect(TYPE_TODAY.some((row) => row.role === role)).toBe(true);
    }
  });

  it("points every variant at files that exist", () => {
    for (const row of TYPE_TODAY) {
      expect(row.usedIn.length).toBeGreaterThan(0);
      for (const use of row.usedIn) {
        expect(fs.existsSync(path.join("src", use.file)), use.file).toBe(true);
      }
    }
  });
});
